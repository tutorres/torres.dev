import type { Localized } from "@/lib/i18n"

export const author = {
  name: "Arthur Torres",
  role: "Software Engineer & AI Engineer",
  // Rendered in the author block of articles and case studies, so it follows
  // the same Localized<string> pattern as the rest of the user-facing copy.
  bio: {
    en: "Software engineer from Brazil, intern at Banco Inter, building Python and FastAPI services and LLM agents for the bank's US operation. Undergraduate researcher at CEFET-MG on LLM models for market prediction and financial risk.",
    pt: "Engenheiro de software, estagiário no Banco Inter, construindo serviços em Python e FastAPI e agentes de LLM para a operação dos Estados Unidos do banco. Faz iniciação científica no CEFET-MG sobre modelos de LLM para previsão de mercado e risco financeiro.",
  } satisfies Localized<string>,
  github: "https://github.com/tutorres",
}
