"use client"

import { type Locale, getTranslations } from "@/lib/i18n"
import { getAllArticles } from "@/lib/articles"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface ArticlesProps {
  locale: Locale
}

export function Articles({ locale }: ArticlesProps) {
  const t = getTranslations(locale)
  const articles = getAllArticles()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "en" ? "en-US" : "pt-BR", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section id="articles" className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-8 font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {t.articles.title}
        </h2>

        {articles.length === 0 ? (
          <p className="text-muted-foreground">
            {locale === "en" ? "No articles published yet." : "Nenhum artigo publicado ainda."}
          </p>
        ) : (
          <ul className="space-y-6">
            {articles.map((article) => (
              <li key={article.slug}>
                {article.published ? (
                  <a
                    href={`/articles/${article.slug}`}
                    className="group block"
                  >
                    <article className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                        <span className="text-border">·</span>
                        <span>
                          {article.readTime} {t.articles.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground">{article.description}</p>
                      <span className="inline-flex items-center gap-1 pt-1 font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {locale === "en" ? "Read" : "Ler"}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </article>
                  </a>
                ) : (
                  <article className="space-y-2 opacity-60">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                      <span className="text-border">·</span>
                      <span>
                        {article.readTime} {t.articles.readTime}
                      </span>
                      <Badge variant="outline" className="ml-2 font-mono text-xs">
                        {locale === "en" ? "Coming soon" : "Em breve"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium text-foreground">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground">{article.description}</p>
                  </article>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
