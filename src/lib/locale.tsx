"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, LOCALES, type L, type Locale } from "@/data/portfolio";

const STORAGE_KEY = "sarah-portfolio:locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  /** Ambil teks sesuai bahasa aktif. */
  t: (value: L) => string;
  is: (locale: Locale) => boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/* ------------------------------------------------------------------ */
/* Penyimpanan bahasa (external store)                                 */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

/** Menyimpan pilihan terbaru agar tetap benar walau localStorage diblokir. */
let override: Locale | null = null;

function isLocale(value: string | null): value is Locale {
  return value !== null && LOCALES.includes(value as Locale);
}

function readStoredLocale(): Locale {
  if (override) return override;
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* localStorage bisa diblokir — pakai nilai bawaan */
  }
  return DEFAULT_LOCALE;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (typeof window === "undefined") return () => listeners.delete(onStoreChange);

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    override = null;
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

const getServerSnapshot = () => DEFAULT_LOCALE;

function applyLocale(next: Locale) {
  override = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* abaikan */
  }
  document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readStoredLocale, getServerSnapshot);

  const setLocale = useCallback((next: Locale) => applyLocale(next), []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggle: () => applyLocale(locale === "id" ? "en" : "id"),
      t: (text: L) => text[locale] ?? text[DEFAULT_LOCALE],
      is: (target: Locale) => target === locale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale harus dipakai di dalam <LocaleProvider>.");
  }
  return context;
}
