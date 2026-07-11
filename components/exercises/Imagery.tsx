"use client";

import { useEffect, useState } from "react";
import { useT, type L10n } from "@/lib/i18n";

const STEPS: { text: L10n; seconds: number }[] = [
  {
    text: {
      en: "Sit comfortably. Close your eyes if you like. Take two slow breaths.",
      no: "Sitt godt. Lukk gjerne øynene. Ta to rolige pust.",
    },
    seconds: 12,
  },
  {
    text: {
      en: "Pick ONE skill you want to sharpen — a serve, a shot, a start, a landing.",
      no: "Velg ÉN ferdighet du vil skjerpe — en serve, et skudd, en start, en landing.",
    },
    seconds: 10,
  },
  {
    text: {
      en: "Build the scene: where are you? Notice the light, the sounds, the smell of the venue.",
      no: "Bygg scenen: hvor er du? Legg merke til lyset, lydene, lukten av stedet.",
    },
    seconds: 18,
  },
  {
    text: {
      en: "Feel your body: your grip, your stance, your breathing. You see everything from your own eyes.",
      no: "Kjenn kroppen: grepet, stillingen, pusten din. Du ser alt fra dine egne øyne.",
    },
    seconds: 18,
  },
  {
    text: {
      en: "Now perform the skill once — in real time, smooth and successful. Feel every part of the movement.",
      no: "Utfør ferdigheten én gang — i sanntid, mykt og vellykket. Kjenn hver del av bevegelsen.",
    },
    seconds: 20,
  },
  {
    text: {
      en: "This time it goes wrong. Notice it, take one calm breath, reset — and do it again, successfully.",
      no: "Denne gangen går det galt. Merk det, ta én rolig pust, nullstill — og gjør det igjen, vellykket.",
    },
    seconds: 22,
  },
  {
    text: {
      en: "Finish with the feeling of it going right. Open your eyes. That was a real rep for your brain.",
      no: "Avslutt med følelsen av at det sitter. Åpne øynene. Det der var en ekte repetisjon for hjernen.",
    },
    seconds: 12,
  },
];

export default function Imagery() {
  const t = useT();
  const [stepIdx, setStepIdx] = useState(-1); // -1 = not started
  const [secondsLeft, setSecondsLeft] = useState(0);

  const playing = stepIdx >= 0 && stepIdx < STEPS.length;
  const done = stepIdx >= STEPS.length;

  // Set the countdown together with the step change so there's never a
  // stale value; timers only advance the step or decrement the display.
  const goToStep = (i: number) => {
    setStepIdx(i);
    setSecondsLeft(i >= 0 && i < STEPS.length ? STEPS[i].seconds : 0);
  };

  useEffect(() => {
    if (!playing) return;
    const advance = setTimeout(() => {
      setStepIdx(stepIdx + 1);
      setSecondsLeft(
        stepIdx + 1 < STEPS.length ? STEPS[stepIdx + 1].seconds : 0,
      );
    }, STEPS[stepIdx].seconds * 1000);
    const tick = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => {
      clearTimeout(advance);
      clearInterval(tick);
    };
  }, [stepIdx, playing]);

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      {!playing && !done && (
        <button
          onClick={() => goToStep(0)}
          className="rounded-full bg-tq-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-tq-700"
        >
          {t({ en: "Start (about 2 min)", no: "Start (cirka 2 min)" })}
        </button>
      )}

      {playing && (
        <>
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full ${
                  i < stepIdx
                    ? "bg-tq-600"
                    : i === stepIdx
                      ? "bg-tq-300"
                      : "bg-tq-100"
                }`}
              />
            ))}
          </div>
          <p
            key={stepIdx}
            aria-live="polite"
            className="min-h-24 max-w-md text-lg font-medium leading-relaxed text-tq-900 animate-fade-up"
          >
            {t(STEPS[stepIdx].text)}
          </p>
          <p className="text-sm text-slate-500">{secondsLeft}s</p>
          <div className="flex gap-3">
            <button
              onClick={() => goToStep(stepIdx + 1)}
              className="rounded-full border border-tq-300 px-5 py-2.5 text-sm font-semibold text-tq-700 hover:bg-tq-50"
            >
              {t({ en: "Next step", no: "Neste steg" })}
            </button>
            <button
              onClick={() => goToStep(-1)}
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50"
            >
              {t({ en: "Stop", no: "Stopp" })}
            </button>
          </div>
        </>
      )}

      {done && (
        <>
          <p aria-live="polite" className="text-lg font-semibold text-tq-800">
            {t({
              en: "Rep complete! 🎬 Elite athletes do this daily — a few minutes is plenty.",
              no: "Repetisjon fullført! 🎬 Topputøvere gjør dette daglig — noen få minutter er nok.",
            })}
          </p>
          <button
            onClick={() => goToStep(0)}
            className="rounded-full bg-tq-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-tq-700"
          >
            {t({ en: "Go again", no: "En gang til" })}
          </button>
        </>
      )}
    </div>
  );
}
