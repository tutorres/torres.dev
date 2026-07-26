import type { Localized } from "@/lib/i18n"

export interface Article {
  slug: string
  title: Localized<string>
  description: Localized<string>
  date: string
  readTime: number
  published: boolean
  mediumUrl?: string
  substackUrl?: string
}

export const articles: Article[] = [
  {
    slug: "financial-metrics-rsi-macd",
    title: {
      en: "Designing Financial Features: The Math Behind RSI, MACD, and Rolling Statistics",
      pt: "Construindo Features Financeiras: A Matemática por Trás de RSI, MACD e Estatísticas Móveis",
    },
    description: {
      en: "A deep dive into the math behind common financial indicators: daily return, moving averages, RSI, MACD, and volatility, and how they transform raw market data into actionable signals.",
      pt: "Um mergulho na matemática por trás dos indicadores financeiros mais comuns: retorno diário, médias móveis, RSI, MACD e volatilidade, e como eles transformam dados brutos de mercado em sinais acionáveis.",
    },
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
