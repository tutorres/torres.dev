import type { MetadataRoute } from "next"
import { getArticles } from "@/lib/articles"
import { getCaseStudyProjects } from "@/lib/projects"
import { absoluteUrl } from "@/lib/site"

/**
 * Routes are derived from the same data the pages render from, so a new
 * published article or case study shows up here without a second edit.
 *
 * getArticles() already filters on the `published` flag. getCaseStudyProjects()
 * returns only projects that have a caseStudy slug, which is exactly the set
 * app/projects/[slug] builds pages for.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date()

  const home: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 1,
    },
  ]

  const projects: MetadataRoute.Sitemap = getCaseStudyProjects().map((project) => ({
    // Non-null: getCaseStudyProjects only returns projects with a caseStudy.
    url: absoluteUrl(`/projects/${project.caseStudy!}`),
    lastModified: buildDate,
    changeFrequency: "yearly",
    priority: 0.8,
  }))

  const articles: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }))

  return [...home, ...projects, ...articles]
}
