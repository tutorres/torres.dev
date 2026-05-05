export type ProjectStatus = "live" | "inDevelopment" | "comingSoon" | "previousWork"

export interface Project {
  title: string
  description: { en: string; pt: string }
  stack: string[]
  status: ProjectStatus
  github?: string
  demo?: string
  demoSlug?: string
}

export const projects: Project[] = [
  {
    title: "Financial Intelligence Dashboard",
    description: {
      en: "End-to-end financial data pipeline with medallion architecture, LSTM trend classification and Text-to-SQL LLM interface.",
      pt: "Pipeline de dados financeiros de ponta a ponta com arquitetura medallion, classificação de tendências LSTM e interface Text-to-SQL com LLM.",
    },
    stack: ["Python", "DuckDB", "PyTorch", "Groq API", "Streamlit"],
    status: "live",
    github: "https://github.com/arthurtorres/financial-dashboard",
    demo: "https://financial-intelligence-dashboard-arthurtorres.streamlit.app",
    demoSlug: "financial-dashboard",
  },
  {
    title: "Vale Desenvolver 2026",
    description: {
      en: "Predictive analytics on 37M+ telemetry records from an iron ore mining fleet. Built for Vale's Programa Desenvolver 2026.",
      pt: "Análise preditiva em 37M+ registros de telemetria de uma frota de mineração de ferro. Construído para o Programa Desenvolver 2026 da Vale.",
    },
    stack: ["Python", "Pandas", "XGBoost", "SHAP", "DuckDB"],
    status: "comingSoon",
    github: "https://github.com/arthurtorres/vale-desenvolver",
  },
  {
    title: "PDF Accessibility (Akyou)",
    description: {
      en: "Automated PDF accessibility solution using OpenAI API — extracting and restructuring complex document content for end users.",
      pt: "Solução automatizada de acessibilidade de PDFs usando OpenAI API — extraindo e reestruturando conteúdo de documentos complexos para usuários finais.",
    },
    stack: ["Python", "OpenAI API", "LLM Pipelines"],
    status: "previousWork",
  },
]

export function getProjectByDemoSlug(slug: string): Project | undefined {
  return projects.find((p) => p.demoSlug === slug)
}
