export type ProjectStatus = "live" | "inDevelopment" | "previousWork"

export interface Project {
  title: string
  description: { en: string; pt: string }
  stack: string[]
  status?: ProjectStatus
  github?: string
  demo?: string
  demoSlug?: string
  caseStudy?: string
  caseStudyTitle?: string
  caseStudyTagline?: string
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
    github: "https://github.com/tutorres/Financial-Intelligence-Dashboard",
    demo: "https://financial-intelligence-dashboard-arthurtorres.streamlit.app",
    demoSlug: "financial-dashboard",
  },
  {
    title: "Vale Desenvolver 2026: Mining Fleet Telemetry",
    description: {
      en: "End-to-end predictive pipeline to anticipate critical failures (Don't Go events) on 37M+ telemetry records from an iron ore mining fleet. Built for Vale's Programa Desenvolver 2026.",
      pt: "Pipeline preditivo de ponta a ponta para antecipar falhas críticas (eventos Don't Go) em 37M+ registros de telemetria de uma frota de mineração de ferro. Construído para o Programa Desenvolver 2026 da Vale.",
    },
    stack: ["Python", "Pandas", "XGBoost", "LightGBM", "SHAP", "DuckDB", "scikit-learn", "pytest"],
    github: "https://github.com/tutorres/Vale_Desenvolver",
    caseStudy: "vale-desenvolver-2026",
    caseStudyTitle: "Anticipating Critical Alerts in Mining Fleets",
    caseStudyTagline:
      "Predictive maintenance on mining equipment telemetry, from raw data to an explainable model.",
  },
]

export function getProjectByDemoSlug(slug: string): Project | undefined {
  return projects.find((p) => p.demoSlug === slug)
}

export function getProjectByCaseStudy(slug: string): Project | undefined {
  return projects.find((p) => p.caseStudy === slug)
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter((p) => p.caseStudy)
}
