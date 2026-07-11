"use client";

import Link from "next/link";
import { useLang, useT } from "@/lib/i18n";

export default function Header() {
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <header className="sticky top-0 z-20 border-b border-tq-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-tq-500 text-sm font-bold text-white">
            MT
          </span>
          <span className="text-sm font-semibold tracking-tight text-tq-900">
            {t({ en: "Mental Training", no: "Mental Trening" })}
          </span>
        </Link>
        <div
          className="flex rounded-full border border-tq-200 p-0.5"
          role="group"
          aria-label={t({ en: "Language", no: "Språk" })}
        >
          {(["en", "no"] as const).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                lang === code
                  ? "bg-tq-500 text-white"
                  : "text-tq-700 hover:bg-tq-50"
              }`}
            >
              {code === "en" ? "EN" : "NO"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
