"use client";

import { useEffect, useState } from "react";
import { useT, type L10n } from "@/lib/i18n";
import { useLocalStorage } from "@/lib/progress";

type Snapshot = { date: string; values: Record<string, number> };

const SKILLS: { key: string; label: L10n }[] = [
  { key: "confidence", label: { en: "Confidence in competition", no: "Selvtillit i konkurranse" } },
  { key: "calm", label: { en: "Staying calm under pressure", no: "Å holde meg rolig under press" } },
  { key: "focus", label: { en: "Refocusing after mistakes", no: "Å finne fokus igjen etter feil" } },
  { key: "motivation", label: { en: "Motivation to train", no: "Motivasjon til å trene" } },
];

export default function Checkin() {
  const t = useT();
  const [history, setHistory, loaded] = useLocalStorage<Snapshot[]>(
    "mt-checkin",
    [],
  );
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(SKILLS.map((s) => [s.key, 5])),
  );
  const [saved, setSaved] = useState(false);
  // Snapshot from before this visit, so "Last time" doesn't show what the
  // user just saved.
  const [previous, setPrevious] = useState<Snapshot | null>(null);

  useEffect(() => {
    if (loaded) setPrevious(history[history.length - 1] ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const save = () => {
    setHistory((prev) => [
      ...prev,
      { date: new Date().toISOString().slice(0, 10), values },
    ]);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-5">
      {SKILLS.map((skill) => (
        <label key={skill.key} className="block">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">{t(skill.label)}</span>
            <span className="font-bold text-tq-600">{values[skill.key]}/10</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={values[skill.key]}
            onChange={(e) => {
              setSaved(false);
              setValues((v) => ({ ...v, [skill.key]: Number(e.target.value) }));
            }}
            className="w-full accent-tq-500"
          />
          {previous && (
            <p className="mt-0.5 text-xs text-slate-400">
              {t({ en: "Last time", no: "Sist" })} ({previous.date}):{" "}
              {previous.values[skill.key] ?? "–"}/10
            </p>
          )}
        </label>
      ))}
      <button
        onClick={save}
        disabled={saved}
        className="rounded-full bg-tq-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-tq-700 disabled:opacity-50"
      >
        {saved
          ? t({ en: "Saved ✓", no: "Lagret ✓" })
          : t({ en: "Save check-in", no: "Lagre innsjekk" })}
      </button>
      {saved && (
        <p className="text-sm text-tq-700">
          {t({
            en: "Nice. Come back after a few weeks of lessons and see how these numbers move.",
            no: "Flott. Kom tilbake etter noen uker med leksjoner og se hvordan tallene har endret seg.",
          })}
        </p>
      )}
    </div>
  );
}
