import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/articles"
import { translations } from "@/lib/i18n"
import { BlogPostingJsonLd } from "@/components/JsonLd"
import { ArticleView } from "./ArticleView"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

/**
 * Metadata is emitted at build time, before any client locale is known, so it
 * always uses the English copy. The rendered page itself is fully bilingual.
 */
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: translations.en.articlePage.notFound }
  }

  return {
    title: `${article.title.en} · Arthur Torres`,
    description: article.description.en,
    openGraph: {
      title: article.title.en,
      description: article.description.en,
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

  // Structured data mirrors the metadata above: English copy, since it is read
  // by crawlers at build time and no locale is known yet.
  return (
    <>
      <BlogPostingJsonLd
        slug={article.slug}
        headline={article.title.en}
        description={article.description.en}
        datePublished={article.date}
      />
      <ArticleView slug={slug} />
    </>
  )
}
