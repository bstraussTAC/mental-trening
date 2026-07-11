"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";
import { useLocalStorage } from "@/lib/progress";

type Reframe = { negative: string; positive: string };

export default function SelfTalk() {
  const t = useT();
  const [reframes, setReframes] = useLocalStorage<Reframe[]>("mt-reframes", []);
  const [negative, setNegative] = useState("");
  const [positive, setPositive] = useState("");

  const add = () => {
    if (!negative.trim() || !positive.trim()) return;
    setReframes((prev) => [
      ...prev,
      { negative: negative.trim(), positive: positive.trim() },
    ]);
    setNegative("");
    setPositive("");
  };

  const remove = (idx: number) => {
    setReframes((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">
          {t({
            en: "A harsh thought you've had in sport",
            no: "En streng tanke du har hatt i idretten",
          })}
        </span>
        <input
          type="text"
          value={negative}
          onChange={(e) => setNegative(e.target.value)}
          placeholder={t({
            en: "e.g. I always mess up when it matters",
            no: "f.eks. Jeg roter det alltid til når det gjelder",
          })}
          className="mt-1 w-full rounded-xl border border-tq-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-tq-500"
        />
      </label>
      <div className="rounded-xl bg-tq-50 px-3 py-2 text-xs text-tq-800">
        {t({
          en: "The teammate test: what would a good coach or your best friend say instead? Keep it short, honest and useful.",
          no: "Lagkamerat-testen: hva ville en god trener eller bestevennen din sagt i stedet? Hold det kort, ærlig og nyttig.",
        })}
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">
          {t({ en: "Your coach version", no: "Din trener-versjon" })}
        </span>
        <input
          type="text"
          value={positive}
          onChange={(e) => setPositive(e.target.value)}
          placeholder={t({
            en: "e.g. That one's gone — next play, low and hard",
            no: "f.eks. Den er borte — neste aksjon, lavt og hardt",
          })}
          className="mt-1 w-full rounded-xl border border-tq-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-tq-500"
        />
      </label>
      <button
        onClick={add}
        disabled={!negative.trim() || !positive.trim()}
        className="rounded-full bg-tq-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-tq-600 disabled:opacity-50"
      >
        {t({ en: "Add to my script", no: "Legg til i manuset mitt" })}
      </button>

      {reframes.length > 0 && (
        <div className="mt-2">
          <h4 className="mb-2 text-sm font-bold text-tq-800">
            {t({ en: "My script", no: "Manuset mitt" })}
          </h4>
          <ul className="flex flex-col gap-2">
            {reframes.map((r, i) => (
              <li
                key={i}
                className="rounded-xl border border-tq-100 p-3 text-sm animate-fade-up"
              >
                <p className="text-slate-400 line-through">{r.negative}</p>
                <p className="mt-1 font-medium text-tq-800">→ {r.positive}</p>
                <button
                  onClick={() => remove(i)}
                  className="mt-1 text-xs text-slate-400 hover:text-red-500"
                >
                  {t({ en: "Remove", no: "Fjern" })}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
