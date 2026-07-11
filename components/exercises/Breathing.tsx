"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";

const PHASES = [
  { key: "in", seconds: 4, scale: 1 },
  { key: "hold", seconds: 2, scale: 1 },
  { key: "out", seconds: 6, scale: 0.55 },
] as const;

const TOTAL_ROUNDS = 6;

export default function Breathing() {
  const t = useT();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!running) return;
    const phase = PHASES[phaseIdx];
    timer.current = setTimeout(() => {
      if (phaseIdx < PHASES.length - 1) {
        setPhaseIdx(phaseIdx + 1);
      } else if (round < TOTAL_ROUNDS - 1) {
        setRound(round + 1);
        setPhaseIdx(0);
      } else {
        setRunning(false);
        setDone(true);
      }
    }, phase.seconds * 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, phaseIdx, round]);

  const start = () => {
    setDone(false);
    setRound(0);
    setPhaseIdx(0);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    setRound(0);
    setPhaseIdx(0);
  };

  const phase = PHASES[phaseIdx];
  const label = running
    ? phase.key === "in"
      ? t({ en: "Breathe in...", no: "Pust inn ..." })
      : phase.key === "hold"
        ? t({ en: "Hold", no: "Hold" })
        : t({ en: "Breathe out...", no: "Pust ut ..." })
    : done
      ? t({ en: "Well done! Notice how your body feels.", no: "Bra jobba! Kjenn etter hvordan kroppen føles." })
      : t({ en: "Ready when you are", no: "Start når du er klar" });

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-tq-50" />
        <div
          className="absolute inset-4 rounded-full bg-tq-200/70 motion-reduce:transition-none"
          style={{
            transform: `scale(${running ? phase.scale : 0.55})`,
            transition: running
              ? `transform ${phase.seconds}s ease-in-out`
              : "transform 0.5s ease-in-out",
          }}
        />
        <div className="relative z-10 text-center" aria-live="assertive">
          <p className="text-lg font-semibold text-tq-800">{label}</p>
          {running && (
            <p className="mt-1 text-sm text-tq-600">
              {t({ en: "Round", no: "Runde" })} {round + 1}/{TOTAL_ROUNDS}
            </p>
          )}
        </div>
      </div>
      {running ? (
        <button
          onClick={stop}
          className="rounded-full border border-tq-300 px-8 py-3 font-semibold text-tq-700 transition-colors hover:bg-tq-50"
        >
          {t({ en: "Stop", no: "Stopp" })}
        </button>
      ) : (
        <button
          onClick={start}
          className="rounded-full bg-tq-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-tq-700"
        >
          {done
            ? t({ en: "Go again", no: "En gang til" })
            : t({ en: "Start breathing", no: "Start pusteøvelsen" })}
        </button>
      )}
    </div>
  );
}
