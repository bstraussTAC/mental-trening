"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "no";

/** A piece of text available in both app languages. */
export type L10n = { en: string; no: string };

const STORAGE_KEY = "mt-lang";

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "no") {
      setLangState(stored);
    } else if (/^(no|nb|nn)/i.test(navigator.language)) {
      setLangState("no");
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "no" ? "nb" : "en";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Pick the current language's variant of a bilingual string. */
export function useT() {
  const { lang } = useLang();
  return useCallback((text: L10n) => text[lang], [lang]);
}
