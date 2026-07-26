import { notFound } from "next/navigation"
import { getProjectByCaseStudy, getCaseStudyProjects } from "@/lib/projects"
import { translations } from "@/lib/i18n"
import { ProjectView } from "./ProjectView"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getCaseStudyProjects()
  return projects.map((project) => ({
    slug: project.caseStudy!,
  }))
}

/**
 * Metadata is emitted at build time, before any client locale is known, so it
 * always uses the English copy. The rendered page itself is fully bilingual.
 */
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectByCaseStudy(slug)

  if (!project) {
    return { title: translations.en.projectPage.notFound }
  }

  const title = project.caseStudyTitle?.en ?? project.title
  const description = project.caseStudyTagline?.en ?? project.description.en

  return {
    title: `${title} · Arthur Torres`,
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

  return <ProjectView slug={slug} />
}
