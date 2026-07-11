"use client";

import { useState } from "react";
import { useT, useLang, type L10n } from "@/lib/i18n";
import { useLocalStorage } from "@/lib/progress";

type StoredRoutine = { moment: string; steps: string[] };

const SUGGESTIONS: L10n[] = [
  { en: "One calm breath (long exhale)", no: "Én rolig pust (lang utpust)" },
  { en: "Bounce / spin the ball", no: "Sprett / snurr ballen" },
  { en: "Adjust grip or stance", no: "Juster grep eller stilling" },
  { en: "Roll shoulders, release tension", no: "Rull skuldrene, slipp spenningen" },
  { en: "Say my cue word", no: "Si stikkordet mitt" },
  { en: "Picture the perfect execution", no: "Se for meg den perfekte utførelsen" },
  { en: "Eyes on the target", no: "Blikket på målet" },
];

const MAX_STEPS = 4;

export default function Routine() {
  const t = useT();
  const { lang } = useLang();
  const [stored, setStored] = useLocalStorage<StoredRoutine>("mt-routine", {
    moment: "",
    steps: [],
  });
  const [custom, setCustom] = useState("");
  const [saved, setSaved] = useState(false);

  const addStep = (step: string) => {
    if (!step.trim()) return;
    setSaved(false);
    setStored((r) =>
      r.steps.length >= MAX_STEPS
        ? r
        : { ...r, steps: [...r.steps, step.trim()] },
    );
  };

  const removeStep = (idx: number) => {
    setSaved(false);
    setStored((r) => ({ ...r, steps: r.steps.filter((_, i) => i !== idx) }));
  };

  const move = (idx: number, dir: -1 | 1) => {
    setSaved(false);
    setStored((r) => {
      const steps = [...r.steps];
      const j = idx + dir;
      if (j < 0 || j >= steps.length) return r;
      [steps[idx], steps[j]] = [steps[j], steps[idx]];
      return { ...r, steps };
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">
          {t({
            en: "Which moment is this routine for?",
            no: "Hvilket øyeblikk er rutinen for?",
          })}
        </span>
        <input
          type="text"
          value={stored.moment}
          onChange={(e) => {
            setSaved(false);
            setStored((r) => ({ ...r, moment: e.target.value }));
          }}
          placeholder={t({
            en: "e.g. Before my serve / at the start line",
            no: "f.eks. Før serven min / på startstreken",
          })}
          className="mt-1 w-full rounded-xl border border-tq-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-tq-500"
        />
      </label>

      <div>
        <span className="text-sm font-semibold text-slate-700">
          {t({
            en: `My steps (${stored.steps.length}/${MAX_STEPS})`,
            no: `Stegene mine (${stored.steps.length}/${MAX_STEPS})`,
          })}
        </span>
        {stored.steps.length === 0 ? (
          <p className="mt-1 text-sm text-slate-400">
            {t({
              en: "Add 2–4 steps from the suggestions or write your own.",
              no: "Legg til 2–4 steg fra forslagene eller skriv dine egne.",
            })}
          </p>
        ) : (
          <ol className="mt-2 flex flex-col gap-2">
            {stored.steps.map((step, i) => (
              <li
                key={`${step}-${i}`}
                className="flex items-center gap-2 rounded-xl border border-tq-100 px-3 py-2 text-sm animate-fade-up"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tq-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 break-words text-slate-700">
                  {step}
                </span>
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label={t({ en: "Move up", no: "Flytt opp" })}
                  className="p-2 text-slate-500 hover:text-tq-600 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === stored.steps.length - 1}
                  aria-label={t({ en: "Move down", no: "Flytt ned" })}
                  className="p-2 text-slate-500 hover:text-tq-600 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeStep(i)}
                  aria-label={t({ en: "Remove", no: "Fjern" })}
                  className="p-2 text-slate-500 hover:text-red-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      {stored.steps.length < MAX_STEPS && (
        <>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.filter(
              (s) =>
                !stored.steps.includes(s.en) && !stored.steps.includes(s.no),
            ).map(
              (s) => (
                <button
                  key={s.en}
                  onClick={() => addStep(s[lang])}
                  className="rounded-full border border-tq-200 px-3 py-1.5 text-xs font-medium text-tq-700 transition-colors hover:bg-tq-50"
                >
                  + {t(s)}
                </button>
              ),
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  addStep(custom);
                  setCustom("");
                }
              }}
              placeholder={t({ en: "Write your own step...", no: "Skriv ditt eget steg ..." })}
              className="flex-1 rounded-xl border border-tq-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-tq-500"
            />
            <button
              onClick={() => {
                addStep(custom);
                setCustom("");
              }}
              disabled={!custom.trim()}
              aria-label={t({ en: "Add step", no: "Legg til steg" })}
              className="rounded-xl bg-tq-600 px-4 text-sm font-semibold text-white hover:bg-tq-700 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </>
      )}

      <button
        onClick={() => setSaved(true)}
        disabled={stored.steps.length < 2}
        className="rounded-full bg-tq-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-tq-700 disabled:opacity-50"
      >
        {saved
          ? t({ en: "Saved ✓ — now drill it in practice", no: "Lagret ✓ — drill den på trening" })
          : t({ en: "Save my routine", no: "Lagre rutinen min" })}
      </button>
    </div>
  );
}
