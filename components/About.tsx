"use client"

import { Badge } from "@/components/ui/badge"
import { type Locale, getTranslations } from "@/lib/i18n"

interface AboutProps {
  locale: Locale
}

const stackItems = [
  "Python",
  "LLM Agents",
  "MCP",
  "FastAPI",
  "OpenAI API",
  "Groq",
  "PyTorch",
  "DuckDB",
  "Docker",
  "Kubernetes",
]

export function About({ locale }: AboutProps) {
  const t = getTranslations(locale)

  return (
    <section id="about" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {t.about.title}
      </h2>
      <div className="mt-6 space-y-4 text-foreground leading-relaxed whitespace-pre-line">
        {t.about.description}
      </div>
      <div className="mt-8">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.about.stack}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {stackItems.map((item) => (
            <Badge key={item} variant="secondary" className="font-mono text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
