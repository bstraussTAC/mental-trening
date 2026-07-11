"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";
import { useLocalStorage } from "@/lib/progress";

type Evidence = { text: string; date: string };

export default function Confidence() {
  const t = useT();
  const [entries, setEntries] = useLocalStorage<Evidence[]>("mt-evidence", []);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setEntries((prev) => [
      ...prev,
      { text: text.trim(), date: new Date().toISOString().slice(0, 10) },
    ]);
    setText("");
  };

  const remove = (idx: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) add();
          }}
          placeholder={t({
            en: "e.g. Kept my cool in the last 5 minutes vs. Lyn",
            no: "f.eks. Holdt hodet kaldt de siste 5 minuttene mot Lyn",
          })}
          className="flex-1 rounded-xl border border-tq-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-tq-500"
        />
        <button
          onClick={add}
          disabled={!text.trim()}
          aria-label={t({ en: "Add evidence", no: "Legg til bevis" })}
          className="rounded-xl bg-tq-600 px-4 text-sm font-semibold text-white hover:bg-tq-700 disabled:opacity-50"
        >
          +
        </button>
      </div>

      <p className="text-xs text-slate-400">
        {t({
          en: "Wins, progress, tough sessions you completed, skills you've built — anything counts as evidence.",
          no: "Seire, framgang, tøffe økter du fullførte, ferdigheter du har bygget — alt teller som bevis.",
        })}
      </p>

      {entries.length > 0 && (
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-sm font-bold text-tq-800">
              {t({ en: "My evidence bank", no: "Bevisbanken min" })}
            </h4>
            <span className="text-xs font-semibold text-tq-600">
              {entries.length}{" "}
              {t({ en: "deposits", no: "innskudd" })}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {[...entries].reverse().map((entry, revIdx) => {
              const idx = entries.length - 1 - revIdx;
              return (
                <li
                  key={`${entry.date}-${idx}`}
                  className="flex items-start gap-2 rounded-xl border border-tq-100 px-3 py-2.5 text-sm animate-fade-up"
                >
                  <span aria-hidden>💪</span>
                  <div className="min-w-0 flex-1 break-words">
                    <p className="text-slate-700">{entry.text}</p>
                    <p className="text-xs text-slate-400">{entry.date}</p>
                  </div>
                  <button
                    onClick={() => remove(idx)}
                    aria-label={t({ en: "Remove", no: "Fjern" })}
                    className="px-1 text-slate-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {entries.length >= 3 && (
        <p className="rounded-xl bg-tq-50 px-3 py-2 text-sm text-tq-800">
          {t({
            en: "Solid bank! 💰 Read it before your next competition — that's what it's for.",
            no: "Solid bank! 💰 Les den før neste konkurranse — det er det den er til.",
          })}
        </p>
      )}
    </div>
  );
}
