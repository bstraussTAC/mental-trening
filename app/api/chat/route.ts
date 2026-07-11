import Anthropic from "@anthropic-ai/sdk";
import { buildCoachSystemPrompt } from "@/lib/coach";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 2000;
// 30 messages × 2000 chars fits comfortably; reject anything bigger early.
const MAX_BODY_BYTES = 256 * 1024;

// Best-effort per-IP throttle. In-memory state only protects a single
// long-lived Node process; on serverless platforms add a durable limiter
// (e.g. Upstash Ratelimit) and ALWAYS set a workspace spend limit for the
// API key in the Anthropic Console — that's the real circuit breaker.
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 60_000; // per minute
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((ts) => ts > windowStart);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear(); // crude memory bound
  return recent.length > RATE_LIMIT;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

function sanitizeMessages(raw: unknown): IncomingMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const cleaned: IncomingMessage[] = [];
  for (const entry of raw.slice(-MAX_MESSAGES)) {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("role" in entry) ||
      !("content" in entry)
    ) {
      return null;
    }
    const { role, content } = entry as { role: unknown; content: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (!trimmed) continue;
    // Merge consecutive same-role messages so the history always alternates.
    const last = cleaned[cleaned.length - 1];
    if (last && last.role === role) {
      last.content += `\n${trimmed}`;
    } else {
      cleaned.push({ role, content: trimmed });
    }
  }

  // Drop any leading assistant turns — the API requires the first message to be from the user.
  while (cleaned.length > 0 && cleaned[0].role === "assistant") cleaned.shift();
  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== "user") {
    return null;
  }
  return cleaned;
}

/** Read the body with a hard byte cap so oversized payloads never reach JSON.parse. */
async function readBoundedBody(request: Request): Promise<string | null> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const rawBody = await readBoundedBody(request);
  if (rawBody === null) {
    return Response.json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const { messages: rawMessages, lang } = (body ?? {}) as {
    messages?: unknown;
    lang?: unknown;
  };
  const messages = sanitizeMessages(rawMessages);
  if (!messages) {
    return Response.json({ error: "invalid_messages" }, { status: 400 });
  }

  const client = new Anthropic();
  const system = buildCoachSystemPrompt(lang === "no" ? "no" : "en");

  try {
    // `stream: true` awaits the HTTP connection, so auth/rate-limit/overload
    // errors surface here — before we've committed to a 200 response.
    const upstream = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: system,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of upstream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("chat stream error:", err);
          try {
            controller.error(err);
          } catch {
            // controller already closed/errored
          }
        }
      },
      cancel() {
        upstream.controller.abort();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("chat request failed:", err);
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      return Response.json({ error: "not_configured" }, { status: 503 });
    }
    return Response.json({ error: "upstream_error" }, { status: 502 });
  }
}
