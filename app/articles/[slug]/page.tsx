import { notFound } from "next/navigation"
import Link from "next/link"
import { getArticleBySlug, getAllArticles } from "@/lib/articles"
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
    return {
      title: "Article Not Found",
    }
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  if (!article.published) {
    return (
      <main className="min-h-screen bg-background py-24">
        <article className="mx-auto max-w-2xl px-4">
          <Link
            href="/#articles"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="text-border">·</span>
              <span>{article.readTime} min read</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
          </header>

          <div className="rounded-lg border border-border bg-secondary/50 p-8 text-center">
            <p className="text-muted-foreground">
              This article is coming soon. Check back after{" "}
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              .
            </p>
          </div>
        </article>
      </main>
    )
  }

  // For published articles, we'll load MDX content here
  // This is a placeholder until MDX content is added
  return (
    <main className="min-h-screen bg-background py-24">
      <article className="mx-auto max-w-2xl px-4">
        <Link
          href="/#articles"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="text-border">·</span>
            <span>{article.readTime} min read</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
        </header>

        <div className="prose prose-invert max-w-none">
          {/* MDX content will be rendered here */}
          <p className="text-muted-foreground">Article content goes here.</p>
        </div>

        {(article.mediumUrl || article.substackUrl) && (
          <footer className="mt-12 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
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
          </footer>
        )}
      </article>
    </main>
  )
}
