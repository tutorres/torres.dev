"use client"

import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Locale, getTranslations } from "@/lib/i18n"
import { projects, type ProjectStatus } from "@/lib/projects"

interface ProjectsProps {
  locale: Locale
}

const statusColors: Record<ProjectStatus, string> = {
  live: "bg-green-500/10 text-green-500 border-green-500/20",
  inDevelopment: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  previousWork: "bg-muted text-muted-foreground border-border",
  deepDive: "bg-primary/10 text-primary border-primary/20",
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
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
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
