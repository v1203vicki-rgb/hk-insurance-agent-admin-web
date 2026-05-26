"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { type LocalizedText, type MiniLocale, getLocalizedText, hasLocalizedFallback } from "@/src/data";

const STORAGE_KEY = "hk-insurance-agent-mini-locale";

type MiniLocaleContextValue = {
  locale: MiniLocale;
  setLocale: (locale: MiniLocale) => void;
  t: (text: LocalizedText) => string;
  hasFallback: (text: LocalizedText) => boolean;
};

const MiniLocaleContext = createContext<MiniLocaleContextValue | null>(null);

export function MiniLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<MiniLocale>("ZH_HANS");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "ZH_HANS" || raw === "ZH_HANT") {
      setLocaleState(raw);
    }
  }, []);

  const setLocale = (nextLocale: MiniLocale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  };

  const value = useMemo<MiniLocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (text) => getLocalizedText(text, locale),
      hasFallback: (text) => hasLocalizedFallback(text, locale),
    }),
    [locale],
  );

  return <MiniLocaleContext.Provider value={value}>{children}</MiniLocaleContext.Provider>;
}

export function useMiniLocale() {
  const context = useContext(MiniLocaleContext);
  if (!context) throw new Error("useMiniLocale must be used inside MiniLocaleProvider");
  return context;
}
