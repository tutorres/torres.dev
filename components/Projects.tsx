"use client"

import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Locale, getTranslations } from "@/lib/i18n"

interface ProjectsProps {
  locale: Locale
}

type ProjectStatus = "live" | "inDevelopment" | "comingSoon" | "previousWork"

interface Project {
  title: string
  description: { en: string; pt: string }
  stack: string[]
  status: ProjectStatus
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    title: "Financial Intelligence Dashboard",
    description: {
      en: "End-to-end financial data pipeline with medallion architecture, LSTM trend classification and Text-to-SQL LLM interface.",
      pt: "Pipeline de dados financeiros de ponta a ponta com arquitetura medallion, classificação de tendências LSTM e interface Text-to-SQL com LLM.",
    },
    stack: ["Python", "DuckDB", "PyTorch", "Groq API", "Streamlit"],
    status: "live",
    github: "https://github.com/arthurtorres/financial-dashboard",
    demo: "https://financial-intelligence-dashboard-arthurtorres.streamlit.app",
  },
  {
    title: "Vale Desenvolver 2026",
    description: {
      en: "Predictive analytics on 37M+ telemetry records from an iron ore mining fleet. Built for Vale's Programa Desenvolver 2026.",
      pt: "Análise preditiva em 37M+ registros de telemetria de uma frota de mineração de ferro. Construído para o Programa Desenvolver 2026 da Vale.",
    },
    stack: ["Python", "Pandas", "XGBoost", "SHAP", "DuckDB"],
    status: "comingSoon",
    github: "https://github.com/arthurtorres/vale-desenvolver",
  },
  {
    title: "PDF Accessibility (Akyou)",
    description: {
      en: "Automated PDF accessibility solution using OpenAI API — extracting and restructuring complex document content for end users.",
      pt: "Solução automatizada de acessibilidade de PDFs usando OpenAI API — extraindo e reestruturando conteúdo de documentos complexos para usuários finais.",
    },
    stack: ["Python", "OpenAI API", "LLM Pipelines"],
    status: "previousWork",
  },
]

const statusColors: Record<ProjectStatus, string> = {
  live: "bg-green-500/10 text-green-500 border-green-500/20",
  inDevelopment: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  comingSoon: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  previousWork: "bg-muted text-muted-foreground border-border",
}

export function Projects({ locale }: ProjectsProps) {
  const t = getTranslations(locale)

  return (
    <section id="projects" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {t.projects.title}
      </h2>
      <div className="mt-8 space-y-6">
        {projects.map((project, index) => (
          <article
            key={index}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <Badge
                variant="outline"
                className={`font-mono text-xs ${statusColors[project.status]}`}
              >
                {t.projects.status[project.status]}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {project.description[locale]}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="font-mono text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            {(project.github || project.demo) && (
              <div className="mt-4 flex gap-3">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      {t.projects.viewGithub}
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      {t.projects.viewDemo}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
