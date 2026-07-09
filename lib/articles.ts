export interface Article {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  published: boolean
  mediumUrl?: string
  substackUrl?: string
}

export const articles: Article[] = [
  {
    slug: "financial-metrics-rsi-macd",
    title: "Designing Financial Features: The Math Behind RSI, MACD, and Rolling Statistics",
    description:
      "A deep dive into the math behind common financial indicators: daily return, moving averages, RSI, MACD, and volatility, and how they transform raw market data into actionable signals.",
    date: "2026-05-03",
    readTime: 8,
    published: true,
  },
]

export function getArticles(): Article[] {
  return articles.filter((article) => article.published)
}

export function getAllArticles(): Article[] {
  return articles
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
