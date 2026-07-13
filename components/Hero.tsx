"use client"

import { Github, Linkedin, Mail, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Locale, getTranslations } from "@/lib/i18n"

interface HeroProps {
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale)

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-14 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Arthur Torres
      </h1>
      <p className="mt-3 font-mono text-lg text-muted-foreground sm:text-xl">
        {t.hero.title}
      </p>
      <p className="mt-4 max-w-xl text-balance text-base text-muted-foreground">
        {t.hero.tagline}
      </p>
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
        <Button asChild variant="outline" size="lg">
          <a href="/arthur_torres_cv.pdf" target="_blank" rel="noopener noreferrer">
            <FileText className="size-4" />
            {t.hero.resume}
          </a>
        </Button>
      </div>
    </section>
  )
}
