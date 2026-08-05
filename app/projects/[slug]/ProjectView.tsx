"use client"

import Link from "next/link"
import { ArrowLeft, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectByCaseStudy } from "@/lib/projects"
import { projectComponents } from "@/content/projects"
import { author } from "@/lib/author"
import { getTranslations } from "@/lib/i18n"
import { useLocale } from "@/lib/locale-context"
import { LocaleToggle } from "@/components/LocaleToggle"

/**
 * Client shell for a case study. The route itself stays a server component so
 * generateStaticParams/generateMetadata and static prerendering keep working;
 * this part reads the active locale and re-renders chrome + body on a switch.
 */
export function ProjectView({ slug }: { slug: string }) {
  const { locale } = useLocale()
  const t = getTranslations(locale)
  const project = getProjectByCaseStudy(slug)

  if (!project) return null

  const Content = projectComponents[slug]
  const title = project.caseStudyTitle?.[locale] ?? project.title
  const tagline = project.caseStudyTagline?.[locale] ?? project.description[locale]
  const tags = project.caseStudyTags?.[locale] ?? []

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-24">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.projectPage.back}
          </Link>
          <LocaleToggle />
        </div>

        <p className="mt-10 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.projectPage.kicker}
        </p>

        <header className="mt-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-3">
                <span>{tag}</span>
                <span className="text-border">·</span>
              </span>
            ))}
            <span>Arthur Torres</span>
          </div>
          {project.github && (
            <div className="mt-5">
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                  {t.projectPage.repository}
                </a>
              </Button>
            </div>
          )}
        </header>

        <div className="mt-10">
          {Content ? (
            <Content locale={locale} />
          ) : (
            <p className="text-muted-foreground">{t.projectPage.placeholder}</p>
          )}
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t.projectPage.writtenBy}
              </p>
              <p className="mt-2 font-medium text-foreground">{author.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{author.bio[locale]}</p>
            </div>
            <Link
              href="/#projects"
              className="inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.projectPage.more}
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            <a
              href={author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-muted-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
