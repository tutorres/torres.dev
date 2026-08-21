import type { Localized } from "@/lib/i18n"

export const author = {
  name: "Arthur Torres",
  role: "Applied AI Engineer",
  // Rendered in the author block of articles and case studies, so it follows
  // the same Localized<string> pattern as the rest of the user-facing copy.
  bio: {
    en: "Applied AI Engineer building production LLM agents in regulated finance. System prompts, tool design and MCP integrations, plus the Python and ML pipelines around them. Undergraduate researcher at CEFET-MG on LLM models for market prediction and financial risk.",
    pt: "Applied AI Engineer construindo agentes LLM em produção no setor financeiro regulado. System prompts, design de tools e integrações MCP, mais os pipelines de Python e ML ao redor deles. Faz iniciação científica no CEFET-MG sobre modelos de LLM para previsão de mercado e risco financeiro.",
  } satisfies Localized<string>,
  github: "https://github.com/tutorres",
}
