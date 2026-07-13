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
      en: "Data & Automation — Global Operations",
      pt: "Dados & Automação — Operações Globais",
    },
    period: {
      en: "Jan 2026 – Present",
      pt: "Jan 2026 – Atual",
    },
    stack: ["Python", "FastAPI", "LLM Agents", "Docker", "Kubernetes", "GitLab CI/CD"],
    bullets: {
      en: [
        "Built and deployed LLM agents in production for contextual analysis supporting governance decisions",
        "Engineered Python automations orchestrating operational workflows, saving 1.0 FTE in under 5 months",
        "Deployed automations as containerized microservices on the team's Docker, Kubernetes, and GitLab CI/CD platform",
      ],
      pt: [
        "Construí e coloquei agentes LLM em produção para análise contextual apoiando decisões de governança",
        "Desenvolvi automações em Python orquestrando workflows operacionais, economizando 1,0 FTE em menos de 5 meses",
        "Fiz deploy das automações como microsserviços conteinerizados na plataforma de Docker, Kubernetes e GitLab CI/CD do time",
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
    stack: ["Python", "TypeScript", "OpenAI API", "LLM Pipelines", "AWS Elastic Beanstalk"],
    bullets: {
      en: [
        "Took a document intelligence product from scratch to a working prototype, owning it end to end",
        "Built the Python + OpenAI backend and LLM pipelines for unstructured PDF processing — extracting and restructuring complex documents into accessible, structured output",
        "Built the TypeScript frontend from the ground up and deployed the backend on AWS Elastic Beanstalk behind a load balancer",
      ],
      pt: [
        "Levei um produto de inteligência documental do zero a um protótipo funcional, com responsabilidade de ponta a ponta",
        "Construí o backend em Python + OpenAI e pipelines LLM para processamento de PDFs não estruturados — extraindo e reestruturando documentos complexos em saída acessível e estruturada",
        "Construí o frontend em TypeScript do zero e fiz deploy do backend no AWS Elastic Beanstalk atrás de um load balancer",
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
