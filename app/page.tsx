"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { LESSONS } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

export default function Home() {
  const t = useT();
  const { completed, isComplete } = useProgress();

  const doneCount = LESSONS.filter((l) => isComplete(l.id)).length;
  const nextLesson = LESSONS.find((l) => !isComplete(l.id)) ?? LESSONS[0];
  const pct = Math.round((doneCount / LESSONS.length) * 100);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-3xl bg-gradient-to-br from-tq-500 to-tq-700 p-6 text-white">
        <h1 className="text-2xl font-bold leading-snug">
          {t({
            en: "Train your head like you train your body",
            no: "Tren hodet som du trener kroppen",
          })}
        </h1>
        <p className="mt-2 text-sm text-tq-100">
          {t({
            en: "Beginner mental training for young athletes — built on peer-reviewed sport psychology, not random internet advice.",
            no: "Grunnleggende mental trening for unge utøvere — bygget på fagfellevurdert idrettspsykologi, ikke tilfeldige råd fra nettet.",
          })}
        </p>
        <Link
          href={`/lessons/${nextLesson.id}`}
          className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-tq-700 transition-transform hover:scale-[1.02]"
        >
          {doneCount === 0
            ? t({ en: "Start lesson 1", no: "Start leksjon 1" })
            : doneCount === LESSONS.length
              ? t({ en: "Review lessons", no: "Repeter leksjoner" })
              : t({ en: "Continue training", no: "Fortsett treningen" })}
        </Link>
      </section>

      <section className="rounded-2xl border border-tq-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-tq-900">
            {t({ en: "Your progress", no: "Fremgangen din" })}
          </h2>
          <span className="text-sm font-bold text-tq-600">
            {doneCount}/{LESSONS.length} {t({ en: "lessons", no: "leksjoner" })}
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-tq-50">
          <div
            className="h-full rounded-full bg-tq-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {completed.length > 0 && doneCount < LESSONS.length && (
          <p className="mt-2 text-xs text-slate-400">
            {t({
              en: "Little and often beats big and rarely. One lesson a week is a great pace.",
              no: "Litt og ofte slår mye og sjelden. Én leksjon i uka er et supert tempo.",
            })}
          </p>
        )}
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Link
          href="/chat"
          className="rounded-2xl border border-tq-100 p-4 transition-colors hover:border-tq-300"
        >
          <span className="text-2xl" aria-hidden>
            💬
          </span>
          <h3 className="mt-2 font-semibold text-tq-900">
            {t({ en: "Ask the coach", no: "Spør coachen" })}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {t({
              en: "AI coach grounded in the same research as the lessons.",
              no: "AI-coach bygget på samme forskning som leksjonene.",
            })}
          </p>
        </Link>
        <Link
          href="/sources"
          className="rounded-2xl border border-tq-100 p-4 transition-colors hover:border-tq-300"
        >
          <span className="text-2xl" aria-hidden>
            🔬
          </span>
          <h3 className="mt-2 font-semibold text-tq-900">
            {t({ en: "The science", no: "Forskningen" })}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {t({
              en: "Every lesson cites verified, peer-reviewed sources.",
              no: "Hver leksjon viser til verifiserte, fagfellevurderte kilder.",
            })}
          </p>
        </Link>
      </section>

      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
        {t({
          en: "This app teaches performance skills — it is not medical advice or therapy. If you're struggling with how you feel, talk to a parent, coach, school nurse or doctor.",
          no: "Denne appen lærer bort prestasjonsferdigheter — den er ikke medisinsk hjelp eller terapi. Hvis du sliter med hvordan du har det, snakk med en forelder, trener, helsesykepleier eller lege.",
        })}
      </p>
    </div>
  );
}
