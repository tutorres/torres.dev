import type { Localized } from "@/lib/i18n"

export const author = {
  name: "Arthur Torres",
  role: "AI Engineer",
  // Rendered in the author block of articles and case studies, so it follows
  // the same Localized<string> pattern as the rest of the user-facing copy.
  bio: {
    en: "AI Engineer building production LLM agents in regulated finance. System prompts, tool design and MCP integrations, plus the Python and ML pipelines around them.",
    pt: "Engenheiro de IA construindo agentes LLM em produção no setor financeiro regulado. System prompts, design de tools e integrações MCP, mais os pipelines de Python e ML ao redor deles.",
  } satisfies Localized<string>,
  github: "https://github.com/tutorres",
}
