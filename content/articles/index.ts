import type { FC } from "react"
import type { Locale } from "@/lib/i18n"
import { FinancialMetricsArticle } from "./financial-metrics-rsi-macd"
import { DataQualityArticle } from "./data-quality-37m-rows"

/** Long-form content takes the active locale and picks its own copy block. */
export type LocalizedContent = FC<{ locale: Locale }>

export const articleComponents: Record<string, LocalizedContent> = {
  "financial-metrics-rsi-macd": FinancialMetricsArticle,
  "data-quality-37m-rows": DataQualityArticle,
}
