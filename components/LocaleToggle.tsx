"use client"

import { useLocale } from "@/lib/locale-context"

/**
 * EN/PT switch. Extracted from the Navbar so the article and case study pages,
 * which have no Navbar, can offer the same control.
 */
export function LocaleToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "pt" : "en")}
      className="flex h-8 items-center gap-1 rounded-md border border-border bg-secondary px-2 font-mono text-xs font-medium text-secondary-foreground hover:bg-accent transition-colors"
      aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
    >
      <span className={locale === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
      <span className="text-muted-foreground">/</span>
      <span className={locale === "pt" ? "text-foreground" : "text-muted-foreground"}>PT</span>
    </button>
  )
}
