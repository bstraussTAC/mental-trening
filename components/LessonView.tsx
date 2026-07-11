"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { LESSONS, getLesson } from "@/lib/lessons";
import { sourcesForTopic } from "@/lib/sources";
import { useProgress } from "@/lib/progress";
import Exercise from "@/components/exercises";

export default function LessonView({ lessonId }: { lessonId: string }) {
  const t = useT();
  const { isComplete, markComplete } = useProgress();

  const lesson = getLesson(lessonId);
  if (!lesson) return null;

  const idx = LESSONS.findIndex((l) => l.id === lessonId);
  const next = LESSONS[idx + 1];
  const sources = sourcesForTopic(lesson.topic);
  const done = isComplete(lesson.id);

  return (
    <article className="flex flex-col gap-6">
      <div>
        <Link href="/lessons" className="text-sm font-medium text-tq-600">
          ← {t({ en: "All lessons", no: "Alle leksjoner" })}
        </Link>
        <div className="mt-3 flex items-start gap-3">
          <span className="text-4xl" aria-hidden>
            {lesson.emoji}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-tq-600">
              {t({ en: "Lesson", no: "Leksjon" })} {idx + 1} · ~
              {lesson.minutes} {t({ en: "min", no: "min" })}
            </p>
            <h1 className="text-2xl font-bold leading-tight text-tq-900">
              {t(lesson.title)}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{t(lesson.tagline)}</p>
          </div>
        </div>
      </div>

      <p className="leading-relaxed text-slate-700">{t(lesson.intro)}</p>

      <section className="rounded-2xl bg-tq-50 p-4">
        <h2 className="flex items-center gap-2 font-bold text-tq-800">
          <span aria-hidden>🔬</span>
          {t({ en: "What the research says", no: "Hva forskningen sier" })}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-tq-900">
          {t(lesson.science)}
        </p>
        {sources.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1.5 border-t border-tq-100 pt-3">
            {sources.map((s) => (
              <li key={s.id} className="text-xs text-tq-800">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-tq-300 underline-offset-2 hover:text-tq-600"
                >
                  {s.authors} ({s.year}). {s.title}. <em>{s.venue}</em>.
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-xs text-tq-700">
          {t({
            en: "Peer-reviewed sources, verified against PubMed/publisher records. Full list under Science.",
            no: "Fagfellevurderte kilder, verifisert mot PubMed/utgiverens registre. Full liste under Forskning.",
          })}
        </p>
      </section>

      {lesson.sections.map((section, i) => (
        <section key={i}>
          <h2 className="mb-1.5 text-lg font-bold text-tq-900">
            {t(section.heading)}
          </h2>
          <p className="leading-relaxed text-slate-700">{t(section.body)}</p>
        </section>
      ))}

      <section className="rounded-2xl border-2 border-tq-200 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-tq-600">
          {t({ en: "Exercise", no: "Øvelse" })}
        </p>
        <h2 className="mt-1 text-lg font-bold text-tq-900">
          {t(lesson.exerciseTitle)}
        </h2>
        <p className="mb-4 mt-1 text-sm text-slate-500">
          {t(lesson.exerciseIntro)}
        </p>
        <Exercise kind={lesson.exercise} />
      </section>

      <section className="rounded-2xl bg-tq-50 p-4">
        <h2 className="font-bold text-tq-800">
          {t({ en: "Remember", no: "Husk" })}
        </h2>
        <ul className="mt-2 flex flex-col gap-2">
          {lesson.takeaways.map((takeaway, i) => (
            <li key={i} className="flex gap-2 text-sm text-tq-900">
              <span className="text-tq-500" aria-hidden>
                ✓
              </span>
              {t(takeaway)}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => markComplete(lesson.id)}
          disabled={done}
          className={`rounded-full px-6 py-3 font-semibold transition-colors ${
            done
              ? "bg-tq-100 text-tq-700"
              : "bg-tq-600 text-white hover:bg-tq-700"
          }`}
        >
          {done
            ? t({ en: "Lesson completed ✓", no: "Leksjon fullført ✓" })
            : t({ en: "Mark lesson complete", no: "Merk leksjonen som fullført" })}
        </button>
        {next ? (
          <Link
            href={`/lessons/${next.id}`}
            className="rounded-full border border-tq-300 px-6 py-3 text-center font-semibold text-tq-700 transition-colors hover:bg-tq-50"
          >
            {t({ en: "Next lesson", no: "Neste leksjon" })}: {t(next.title)} →
          </Link>
        ) : (
          <Link
            href="/chat"
            className="rounded-full border border-tq-300 px-6 py-3 text-center font-semibold text-tq-700 transition-colors hover:bg-tq-50"
          >
            {t({
              en: "Course done! Ask the coach what to train next →",
              no: "Kurset er fullført! Spør coachen hva du bør trene på videre →",
            })}
          </Link>
        )}
      </div>
    </article>
  );
}
