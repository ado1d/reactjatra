"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "rj-completed-days";
const CHANGE_EVENT = "rj-progress-change";

/* stable snapshot cache — getSnapshot MUST return a stable reference */
let cachedRaw: string | null = null;
let cachedValue: string[] = [];

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): string[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedValue = raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      cachedValue = [];
    }
  }
  return cachedValue;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

const EMPTY: string[] = [];

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** localStorage-backed tracker of which days the learner completed */
export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((dayId: string) => {
    const current = getSnapshot();
    const next = current.includes(dayId)
      ? current.filter((d) => d !== dayId)
      : [...current, dayId];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const isDone = useCallback(
    (dayId: string) => completed.includes(dayId),
    [completed]
  );

  return { completed, toggle, isDone };
}
