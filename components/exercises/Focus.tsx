"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const DURATION = 60;

export default function Focus() {
  const t = useT();
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [taps, setTaps] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    setSecondsLeft(DURATION);
    setTaps(0);
    setDone(false);
    setRunning(true);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      {!running && !done && (
        <>
          <p className="max-w-md text-sm text-slate-500">
            {t({
              en: "Breathe normally. Tap the circle once on every exhale. When your mind wanders, notice it — and come back to the breath.",
              no: "Pust normalt. Trykk på sirkelen én gang for hver utpust. Når tankene vandrer, legg merke til det — og kom tilbake til pusten.",
            })}
          </p>
          <button
            onClick={start}
            className="rounded-full bg-tq-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-tq-600"
          >
            {t({ en: "Start 60 seconds", no: "Start 60 sekunder" })}
          </button>
        </>
      )}

      {running && (
        <>
          <p className="text-3xl font-bold tabular-nums text-tq-800">
            {secondsLeft}s
          </p>
          <button
            onClick={() => setTaps((n) => n + 1)}
            className="flex h-44 w-44 select-none items-center justify-center rounded-full bg-tq-100 text-4xl font-bold text-tq-700 transition-transform active:scale-95"
          >
            {taps}
          </button>
          <p className="text-sm text-slate-400">
            {t({ en: "Tap on every exhale", no: "Trykk for hver utpust" })}
          </p>
        </>
      )}

      {done && (
        <>
          <p className="text-lg font-semibold text-tq-800">
            {t({ en: "60 seconds — done!", no: "60 sekunder — ferdig!" })}
          </p>
          <p className="max-w-md text-sm text-slate-500">
            {t({
              en: `You counted ${taps} exhales. Did your mind wander? Perfect — every time you noticed and came back was a successful rep. That's the exact skill you'll use after mistakes in competition.`,
              no: `Du telte ${taps} utpust. Vandret tankene? Perfekt — hver gang du merket det og kom tilbake, var en vellykket repetisjon. Det er nøyaktig samme ferdighet du bruker etter feil i konkurranse.`,
            })}
          </p>
          <button
            onClick={start}
            className="rounded-full bg-tq-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-tq-600"
          >
            {t({ en: "Go again", no: "En gang til" })}
          </button>
        </>
      )}
    </div>
  );
}
