import type { FC } from "react"
import type { Locale } from "@/lib/i18n"
import { ValeDesenvolverCaseStudy } from "./vale-desenvolver-2026"

/** Long-form content takes the active locale and picks its own copy block. */
export type LocalizedContent = FC<{ locale: Locale }>

export const projectComponents: Record<string, LocalizedContent> = {
  "vale-desenvolver-2026": ValeDesenvolverCaseStudy,
}
