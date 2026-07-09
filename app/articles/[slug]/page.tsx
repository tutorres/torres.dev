import { notFound } from "next/navigation"
import Link from "next/link"
import { getArticleBySlug, getAllArticles } from "@/lib/articles"
import { articleComponents } from "@/content/articles"
import { ArrowLeft } from "lucide-react"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found" }
  }

  return {
    title: `${article.title} — Arthur Torres`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: ["Arthur Torres"],
    },
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const Content = articleComponents[slug]

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-24">
        <Link
          href="/#articles"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to articles
        </Link>

        <p className="mt-10 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Article
        </p>

        <header className="mt-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="text-border">·</span>
            <span>{article.readTime} min read</span>
            <span className="text-border">·</span>
            <span>Arthur Torres</span>
          </div>
        </header>

        <div className="mt-10">
          {Content ? (
            <Content />
          ) : (
            <p className="text-muted-foreground">Article content goes here.</p>
          )}
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Written by
              </p>
              <p className="mt-2 font-medium text-foreground">Arthur Torres</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Data engineer & ML practitioner. Building financial pipelines and LLM applications.
              </p>
            </div>
            <Link
              href="/#articles"
              className="inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              More articles
            </Link>
          </div>

          {(article.mediumUrl || article.substackUrl) && (
            <p className="mt-6 text-sm text-muted-foreground">
              Also published on:{" "}
              {article.mediumUrl && (
                <a
                  href={article.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  Medium
                </a>
              )}
              {article.mediumUrl && article.substackUrl && " · "}
              {article.substackUrl && (
                <a
                  href={article.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  Substack
                </a>
              )}
            </p>
          )}
        </footer>
      </div>
    </main>
  )
}
