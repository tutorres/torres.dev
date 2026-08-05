"use client"

import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Locale, getTranslations } from "@/lib/i18n"
import { TechOrbit } from "@/components/ui/tech-orbit"

interface HeroProps {
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale)

  // Each claim links to the evidence that backs it.
  const proofPoints = [
    { label: t.hero.proof.agents, href: "#experience" },
    { label: t.hero.proof.fte, href: "#experience" },
    { label: t.hero.proof.telemetry, href: "/projects/vale-desenvolver-2026" },
  ]

  return (
    <section className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pt-14 text-center">
      {/* Decorative. Sits behind the copy so the proof line stays above the fold. */}
      <TechOrbit />

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Arthur Torres
      </h1>
      <p className="mt-3 font-mono text-lg text-muted-foreground sm:text-xl">
        {t.hero.title}
      </p>
      <p className="mt-4 max-w-xl text-balance text-base text-muted-foreground">
        {t.hero.tagline}
      </p>

      <ul className="mt-4 flex flex-col items-center gap-1 font-mono text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 sm:gap-y-1">
        {proofPoints.map((point, index) => (
          <li key={point.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="hidden select-none opacity-60 sm:inline">
                ·
              </span>
            ) : null}
            <a
              href={point.href}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {point.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" />
        {t.hero.location}
      </p>

      <div className="mt-6 flex items-center gap-4">
        <a
          href="https://github.com/tutorres"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github className="size-5" />
        </a>
        <a
          href="https://linkedin.com/in/torres-arthur"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="size-5" />
        </a>
        <a
          href="#contact"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Email"
        >
          <Mail className="size-5" />
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <a href="#projects">{t.hero.cta}</a>
        </Button>
      </div>
    </section>
  )
}
