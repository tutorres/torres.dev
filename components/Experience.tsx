"use client"

import { Badge } from "@/components/ui/badge"
import { type Locale, getTranslations } from "@/lib/i18n"

interface ExperienceProps {
  locale: Locale
}

interface ExperienceItem {
  company: string
  role: { en: string; pt: string }
  period: { en: string; pt: string }
  location?: { en: string; pt: string }
  stack: string[]
  bullets: { en: string[]; pt: string[] }
}

const experiences: ExperienceItem[] = [
  {
    company: "Banco Inter",
    role: {
      en: "Data & Automation Intern — Global Operations",
      pt: "Estagiário de Dados & Automação — Operações Globais",
    },
    period: {
      en: "Jan 2026 – Present",
      pt: "Jan 2026 – Atual",
    },
    stack: ["Python", "SQL", "Tableau", "LLM Agents"],
    bullets: {
      en: [
        "Built Python automations orchestrating workflows, reducing manual work",
        "Developed LLM agents for contextual analysis supporting governance decisions",
        "Designed SQL dashboards delivering operational insights for global team",
      ],
      pt: [
        "Construí automações em Python orquestrando workflows, reduzindo trabalho manual",
        "Desenvolvi agentes LLM para análise contextual apoiando decisões de governança",
        "Projetei dashboards SQL entregando insights operacionais para o time global",
      ],
    },
  },
  {
    company: "Akyou",
    role: {
      en: "Backend Engineer — AI & Accessibility",
      pt: "Engenheiro Backend — IA & Acessibilidade",
    },
    period: {
      en: "Apr 2025 – Dec 2025",
      pt: "Abr 2025 – Dez 2025",
    },
    location: {
      en: "Remote",
      pt: "Remoto",
    },
    stack: ["Python", "OpenAI API", "LLM Pipelines"],
    bullets: {
      en: [
        "Built end-to-end PDF accessibility solution using OpenAI API",
        "Developed LLM pipelines for unstructured document processing",
        "Handled API integration and output formatting from scratch",
      ],
      pt: [
        "Construí solução completa de acessibilidade de PDFs usando OpenAI API",
        "Desenvolvi pipelines LLM para processamento de documentos não estruturados",
        "Implementei integração de API e formatação de saída do zero",
      ],
    },
  },
]

export function Experience({ locale }: ExperienceProps) {
  const t = getTranslations(locale)

  return (
    <section id="experience" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {t.experience.title}
      </h2>
      <div className="mt-8 space-y-12">
        {experiences.map((exp, index) => (
          <article key={index} className="relative pl-6 border-l border-border">
            <div className="absolute -left-1.5 top-1 size-3 rounded-full bg-foreground" />
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.company}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {exp.role[locale]}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {exp.period[locale]}
                  {exp.location && ` · ${exp.location[locale]}`}
                </p>
              </div>
              <ul className="space-y-1.5 text-sm text-foreground">
                {exp.bullets[locale].map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-muted-foreground">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="font-mono text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
