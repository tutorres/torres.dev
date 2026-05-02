"use client"

import { type Locale, getTranslations } from "@/lib/i18n"

interface NavbarProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function Navbar({ locale, onLocaleChange }: NavbarProps) {
  const t = getTranslations(locale)

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#articles", label: t.nav.articles },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <a
          href="#"
          className="font-mono text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          torres.dev
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onLocaleChange(locale === "en" ? "pt" : "en")}
            className="flex h-8 items-center gap-1 rounded-md border border-border bg-secondary px-2 font-mono text-xs font-medium text-secondary-foreground hover:bg-accent transition-colors"
            aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
          >
            <span className={locale === "en" ? "text-foreground" : "text-muted-foreground"}>
              EN
            </span>
            <span className="text-muted-foreground">/</span>
            <span className={locale === "pt" ? "text-foreground" : "text-muted-foreground"}>
              PT
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}
