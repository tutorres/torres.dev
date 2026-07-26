"use client"

import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { type Locale, getTranslations } from "@/lib/i18n"
import { projects, type ProjectStatus } from "@/lib/projects"

interface ProjectsProps {
  locale: Locale
}

const statusColors: Record<ProjectStatus, string> = {
  live: "bg-green-500/10 text-green-500 border-green-500/20",
  inDevelopment: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
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
          <article key={index} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              {project.status && (
                <Badge
                  variant="outline"
                  className={`font-mono text-xs ${statusColors[project.status]}`}
                >
                  {t.projects.status[project.status]}
                </Badge>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {project.description[locale]}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-mono text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            {(project.github || project.demo || project.caseStudy) && (
              <div className="mt-4 flex gap-3">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="size-4" />
                      {t.projects.viewGithub}
                    </a>
                  </Button>
                )}
                {project.caseStudy && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/projects/${project.caseStudy}`}>
                      <ArrowUpRight className="size-4" />
                      {t.projects.viewCaseStudy}
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="size-4" />
                        {t.projects.viewDemo}
                      </Button>
                    </DialogTrigger>
                    <DialogContent showCloseButton className="max-w-sm">
                      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {locale === "en" ? "Before you go" : "Antes de sair"}
                      </p>
                      <DialogTitle className="text-base font-semibold text-foreground">
                        {project.title}
                      </DialogTitle>
                      <DialogDescription className="leading-relaxed">
                        {locale === "en"
                          ? "This app runs on free hosting and may be asleep. If so, Streamlit will show a button asking you to wake it up. Just click it and the app will be ready in a few seconds."
                          : "Este app roda em hospedagem gratuita e pode estar dormindo. Se estiver, o Streamlit vai mostrar um botão pedindo para acordá-lo. É só clicar e o app estará pronto em alguns segundos."}
                      </DialogDescription>
                      <div className="border-t border-border pt-4">
                        <Button asChild className="w-full">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            {locale === "en" ? "Open application" : "Abrir aplicação"}
                            <ArrowUpRight className="size-4" />
                          </a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
