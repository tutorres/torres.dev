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
  devtoUrl?: string
}

export const articles: Article[] = [
  {
    slug: "data-quality-37m-rows",
    title: {
      en: "One Bug Hit 11 Rows. Another Hit 36 Million.",
      pt: "Um Bug Atingiu 11 Linhas. Outro Atingiu 36 Milhões.",
    },
    description: {
      en: "Four data quality problems in 37 million rows of mining telemetry. Three I knew about. The fourth only showed up when I stopped testing on a sample.",
      pt: "Quatro problemas de qualidade de dados em 37 milhões de linhas de telemetria de mineração. Três eu já conhecia. O quarto só apareceu quando parei de testar em uma amostra.",
    },
    date: "2026-08-05",
    readTime: 7,
    published: true,
    devtoUrl: "https://dev.to/arthurtorres/one-bug-hit-11-rows-another-hit-36-million-lc0",
  },
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
    published: false,
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
