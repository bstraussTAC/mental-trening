"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { LESSONS } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

export default function LessonsPage() {
  const t = useT();
  const { isComplete } = useProgress();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-tq-900">
          {t({ en: "Lessons", no: "Leksjoner" })}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {t({
            en: "Eight short lessons, each with a hands-on exercise. Best taken in order.",
            no: "Åtte korte leksjoner, hver med en praktisk øvelse. Best å ta i rekkefølge.",
          })}
        </p>
      </div>

      <ol className="flex flex-col gap-3">
        {LESSONS.map((lesson, i) => {
          const done = isComplete(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${lesson.id}`}
                className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors ${
                  done
                    ? "border-tq-200 bg-tq-50/60"
                    : "border-tq-100 hover:border-tq-300"
                }`}
              >
                <span className="text-2xl" aria-hidden>
                  {lesson.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-tq-500">
                      {i + 1}
                    </span>
                    <h2 className="truncate font-semibold text-tq-900">
                      {t(lesson.title)}
                    </h2>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {t(lesson.tagline)}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    ~{lesson.minutes} {t({ en: "min", no: "min" })}
                  </p>
                </div>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    done ? "bg-tq-500 text-white" : "bg-tq-50 text-tq-300"
                  }`}
                  aria-label={
                    done
                      ? t({ en: "Completed", no: "Fullført" })
                      : t({ en: "Not completed", no: "Ikke fullført" })
                  }
                >
                  ✓
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
