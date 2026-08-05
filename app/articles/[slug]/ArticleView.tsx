"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getArticleBySlug } from "@/lib/articles"
import { articleComponents } from "@/content/articles"
import { author } from "@/lib/author"
import { getTranslations } from "@/lib/i18n"
import { useLocale } from "@/lib/locale-context"
import { LocaleToggle } from "@/components/LocaleToggle"

/**
 * Client shell for an article. The route itself stays a server component so
 * generateStaticParams/generateMetadata and static prerendering keep working;
 * this part reads the active locale and re-renders chrome + body on a switch.
 */
export function ArticleView({ slug }: { slug: string }) {
  const { locale } = useLocale()
  const t = getTranslations(locale)
  const article = getArticleBySlug(slug)

  if (!article) return null

  const Content = articleComponents[slug]

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(t.dateLocale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-24">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.articlePage.back}
          </Link>
          <LocaleToggle />
        </div>

        <p className="mt-10 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.articlePage.kicker}
        </p>

        <header className="mt-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {article.title[locale]}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.description[locale]}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="text-border">·</span>
            <span>
              {article.readTime} {t.articles.readTime}
            </span>
            <span className="text-border">·</span>
            <span>Arthur Torres</span>
          </div>
        </header>

        <div className="mt-10">
          {Content ? (
            <Content locale={locale} />
          ) : (
            <p className="text-muted-foreground">{t.articlePage.placeholder}</p>
          )}
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t.articlePage.writtenBy}
              </p>
              <p className="mt-2 font-medium text-foreground">{author.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>
            </div>
            <Link
              href="/#articles"
              className="inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.articlePage.more}
            </Link>
          </div>

          {(article.mediumUrl || article.substackUrl || article.devtoUrl) && (
            <p className="mt-6 text-sm text-muted-foreground">
              {t.articlePage.alsoPublishedOn}{" "}
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
              {(article.mediumUrl || article.substackUrl) && article.devtoUrl && " · "}
              {article.devtoUrl && (
                <a
                  href={article.devtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  Dev.to
                </a>
              )}
            </p>
          )}
        </footer>
      </div>
    </main>
  )
}
