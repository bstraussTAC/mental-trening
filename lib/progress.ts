"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * localStorage-backed state. Reads after mount (SSR-safe) and writes on
 * every change. Used for lesson progress, exercise entries, and chat history.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // corrupted entry — fall back to the initial value
    }
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — the app still works, just without persistence
    }
  }, [key, value, loaded]);

  return [value, setValue, loaded] as const;
}

const PROGRESS_KEY = "mt-completed-lessons";

export function useProgress() {
  const [completed, setCompleted] = useLocalStorage<string[]>(PROGRESS_KEY, []);

  const markComplete = useCallback(
    (id: string) => {
      setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setCompleted],
  );

  const isComplete = useCallback(
    (id: string) => completed.includes(id),
    [completed],
  );

  return { completed, markComplete, isComplete };
}
