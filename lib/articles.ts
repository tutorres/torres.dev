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
  {
    slug: "medallion-architecture-financial-pipeline",
    title: "How I built a financial data pipeline using the medallion architecture",
    description: "A deep dive into building a bronze-silver-gold data pipeline for financial analytics with DuckDB and Python.",
    date: "2026-06-15",
    readTime: 8,
    published: false,
  },
  {
    slug: "lstm-stock-trend-classification",
    title: "Training my first LSTM for stock trend classification — what worked and what didn't",
    description: "Lessons learned from building a PyTorch LSTM model for predicting stock price trends.",
    date: "2026-06-22",
    readTime: 12,
    published: false,
  },
  {
    slug: "text-to-sql-llm-duckdb",
    title: "Building a Text-to-SQL interface with LLMs and DuckDB",
    description: "How I built a natural language interface for querying financial data using Groq API and DuckDB.",
    date: "2026-07-01",
    readTime: 10,
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
