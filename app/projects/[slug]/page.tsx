import { notFound } from "next/navigation"
import Link from "next/link"
import { Github } from "lucide-react"
import { getProjectByCaseStudy, getCaseStudyProjects } from "@/lib/projects"
import { author } from "@/lib/author"
import { projectComponents } from "@/content/projects"
import { ArrowLeft } from "lucide-react"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getCaseStudyProjects()
  return projects.map((project) => ({
    slug: project.caseStudy!,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectByCaseStudy(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  const title = project.caseStudyTitle ?? project.title
  const description = project.caseStudyTagline ?? project.description.en

  return {
    title: `${title} — Arthur Torres`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      authors: ["Arthur Torres"],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectByCaseStudy(slug)

  if (!project) {
    notFound()
  }

  const Content = projectComponents[slug]

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <p className="mt-10 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Case study
        </p>

        <header className="mt-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {project.caseStudyTitle ?? project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {project.caseStudyTagline ?? project.description.en}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
            <span>Predictive Maintenance</span>
            <span className="text-border">·</span>
            <span>Machine Learning</span>
            <span className="text-border">·</span>
            <span>Arthur Torres</span>
          </div>
        </header>

        <div className="mt-10">
          {Content ? (
            <Content />
          ) : (
            <p className="text-muted-foreground">Case study content goes here.</p>
          )}
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Written by
              </p>
              <p className="mt-2 font-medium text-foreground">{author.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>
            </div>
            <Link
              href="/#projects"
              className="inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              More projects
            </Link>
          </div>

          {project.github && (
            <p className="mt-6 text-sm text-muted-foreground">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground hover:text-muted-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </p>
          )}
        </footer>
      </div>
    </main>
  )
}
