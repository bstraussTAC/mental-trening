"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, useT } from "@/lib/i18n";
import { useLocalStorage } from "@/lib/progress";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STARTERS = [
  {
    en: "I get really nervous before games. What can I do?",
    no: "Jeg blir veldig nervøs før kamper. Hva kan jeg gjøre?",
  },
  {
    en: "How do I stop thinking about mistakes mid-match?",
    no: "Hvordan slutter jeg å tenke på feil midt i kampen?",
  },
  {
    en: "Does visualization actually work?",
    no: "Virker visualisering egentlig?",
  },
  {
    en: "My confidence is low after a bad season.",
    no: "Selvtilliten min er lav etter en dårlig sesong.",
  },
];

export default function ChatPage() {
  const t = useT();
  const { lang } = useLang();
  const [messages, setMessages, loaded] = useLocalStorage<ChatMessage[]>(
    "mt-chat",
    [],
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<"config" | "generic" | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Drop a dangling empty assistant bubble left behind if the page was
  // closed mid-stream.
  useEffect(() => {
    if (!loaded) return;
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      return last && last.role === "assistant" && !last.content.trim()
        ? prev.slice(0, -1)
        : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setError(null);
    setInput("");
    setBusy(true);

    const history: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(history);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, lang }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        setError(res.status === 503 ? "config" : "generic");
        return;
      }

      setMessages([...history, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const current = acc;
          setMessages([...history, { role: "assistant", content: current }]);
        }
        acc += decoder.decode();
      } catch {
        if (!controller.signal.aborted) setError("generic");
      }
      // Keep whatever streamed before an interruption; only roll back if
      // nothing arrived at all.
      if (acc.trim()) {
        setMessages([...history, { role: "assistant", content: acc }]);
      } else {
        setMessages(history);
        setError("generic");
      }
    } catch {
      if (!controller.signal.aborted) setError("generic");
      setMessages(history);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-tq-900">
          {t({ en: "Ask the coach", no: "Spør coachen" })}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {t({
            en: "An AI coach grounded in peer-reviewed sport psychology — the same verified sources as the lessons.",
            no: "En AI-coach bygget på fagfellevurdert idrettspsykologi — de samme verifiserte kildene som leksjonene.",
          })}
        </p>
        <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500">
          {t({
            en: "The coach helps with performance skills, not medical or mental health issues. If you're struggling, talk to a trusted adult.",
            no: "Coachen hjelper med prestasjonsferdigheter, ikke medisinske eller psykiske plager. Sliter du, snakk med en voksen du stoler på.",
          })}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3" role="log" aria-live="polite">
        {loaded && messages.length === 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t({ en: "Try asking", no: "Prøv å spørre" })}
            </p>
            {STARTERS.map((s) => (
              <button
                key={s.en}
                onClick={() => send(s[lang])}
                className="rounded-2xl border border-tq-200 px-4 py-3 text-left text-sm text-tq-800 transition-colors hover:bg-tq-50"
              >
                {s[lang]}
              </button>
            ))}
          </div>
        )}

        {messages.map((message, i) => (
          <div
            key={i}
            className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              message.role === "user"
                ? "self-end bg-tq-600 text-white"
                : "self-start bg-tq-50 text-slate-800"
            }`}
          >
            {message.content ||
              (busy && i === messages.length - 1 ? (
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:120ms]">●</span>
                  <span className="animate-bounce [animation-delay:240ms]">●</span>
                </span>
              ) : (
                ""
              ))}
          </div>
        ))}

        {error === "config" && (
          <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {t({
              en: "The coach isn't connected yet: the app needs an ANTHROPIC_API_KEY environment variable on the server. Ask whoever runs the app to add it.",
              no: "Coachen er ikke koblet til ennå: appen trenger miljøvariabelen ANTHROPIC_API_KEY på serveren. Be den som drifter appen om å legge den inn.",
            })}
          </div>
        )}
        {error === "generic" && (
          <div role="alert" className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {t({
              en: "Something went wrong. Try again in a moment.",
              no: "Noe gikk galt. Prøv igjen om litt.",
            })}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-[calc(5rem+env(safe-area-inset-bottom))] flex flex-col gap-2">
        <div className="flex gap-2 rounded-full border border-tq-200 bg-white p-1.5 shadow-sm transition-colors focus-within:border-tq-600">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label={t({ en: "Message the coach", no: "Melding til coachen" })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) send(input);
            }}
            placeholder={t({
              en: "Ask about nerves, focus, confidence...",
              no: "Spør om nerver, fokus, selvtillit ...",
            })}
            className="flex-1 bg-transparent px-3 text-sm outline-none"
          />
          <button
            onClick={() => send(input)}
            disabled={busy || !input.trim()}
            className="rounded-full bg-tq-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-tq-700 disabled:opacity-40"
          >
            {t({ en: "Send", no: "Send" })}
          </button>
        </div>
        {messages.length > 0 && !busy && (
          <button
            onClick={() => {
              if (
                window.confirm(
                  t({
                    en: "Delete the whole conversation?",
                    no: "Slette hele samtalen?",
                  }),
                )
              ) {
                setMessages([]);
                setError(null);
              }
            }}
            className="self-center px-3 py-2 text-xs text-slate-500 hover:text-slate-700"
          >
            {t({ en: "Clear conversation", no: "Tøm samtalen" })}
          </button>
        )}
      </div>
    </div>
  );
}
