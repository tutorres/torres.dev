"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { type Locale } from "@/lib/i18n"

const STORAGE_KEY = "torres.locale"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
})

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "pt"
}

/**
 * Holds the active locale for the whole app.
 *
 * The initial render is always "en" so the statically prerendered HTML and the
 * first client render agree (no hydration mismatch). The stored preference is
 * applied in an effect right after mount, which is what makes the language
 * chosen on the home page carry over to article and case study pages.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored) && stored !== "en") {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en"
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode or storage disabled: the toggle still works for the session.
    }
  }, [])

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}
