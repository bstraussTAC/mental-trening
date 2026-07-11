import Anthropic from "@anthropic-ai/sdk";
import { buildCoachSystemPrompt } from "@/lib/coach";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 2000;

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

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
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
    const stream = client.messages.stream({
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
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        stream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });
        stream.on("end", () => controller.close());
        stream.on("error", (err) => {
          console.error("chat stream error:", err);
          controller.error(err);
        });
      },
      cancel() {
        stream.abort();
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
