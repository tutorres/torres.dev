export type Locale = "en" | "pt"

export const translations = {
  en: {
    // Navigation
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      articles: "Articles",
      skills: "Skills",
      contact: "Contact",
    },
    // Hero
    hero: {
      title: "Data & Automation Engineer",
      location: "Belo Horizonte, Brazil",
      cta: "See projects",
    },
    // About
    about: {
      title: "About",
      description: `I build data pipelines and AI-powered automations that reduce manual work and support operational decisions.

Currently at Banco Inter's Global Operations team — Python automations, LLM agents, SQL dashboards.

Previously at Akyou — end-to-end PDF accessibility solution with OpenAI API.`,
      stack: "Stack",
    },
    // Experience
    experience: {
      title: "Experience",
      present: "Present",
      remote: "Remote",
    },
    // Projects
    projects: {
      title: "Projects",
      viewGithub: "GitHub",
      viewDemo: "Demo",
      status: {
        live: "Live",
        inDevelopment: "In development",
        comingSoon: "Coming soon",
        previousWork: "Previous work",
      },
    },
    // Articles
    articles: {
      title: "Articles",
      readTime: "min read",
    },
    // Skills
    skills: {
      title: "Skills",
      categories: {
        languages: "Languages",
        data: "Data",
        mlai: "ML / AI",
        cloud: "Cloud",
        tools: "Tools",
        certifications: "Certifications",
      },
      inProgress: "in progress",
      planned: "planned",
    },
    // Contact
    contact: {
      title: "Contact",
      email: "Email",
    },
  },
  pt: {
    // Navigation
    nav: {
      about: "Sobre",
      experience: "Experiência",
      projects: "Projetos",
      articles: "Artigos",
      skills: "Habilidades",
      contact: "Contato",
    },
    // Hero
    hero: {
      title: "Engenheiro de Dados & Automação",
      location: "Belo Horizonte, Brasil",
      cta: "Ver projetos",
    },
    // About
    about: {
      title: "Sobre",
      description: `Construo pipelines de dados e automações com IA que reduzem trabalho manual e apoiam decisões operacionais.

Atualmente no time de Operações Globais do Banco Inter — automações em Python, agentes LLM, dashboards SQL.

Anteriormente na Akyou — solução completa de acessibilidade de PDFs com OpenAI API.`,
      stack: "Stack",
    },
    // Experience
    experience: {
      title: "Experiência",
      present: "Atual",
      remote: "Remoto",
    },
    // Projects
    projects: {
      title: "Projetos",
      viewGithub: "GitHub",
      viewDemo: "Demo",
      status: {
        live: "Ativo",
        inDevelopment: "Em desenvolvimento",
        comingSoon: "Em breve",
        previousWork: "Trabalho anterior",
      },
    },
    // Articles
    articles: {
      title: "Artigos",
      readTime: "min de leitura",
    },
    // Skills
    skills: {
      title: "Habilidades",
      categories: {
        languages: "Linguagens",
        data: "Dados",
        mlai: "ML / IA",
        cloud: "Cloud",
        tools: "Ferramentas",
        certifications: "Certificações",
      },
      inProgress: "em progresso",
      planned: "planejado",
    },
    // Contact
    contact: {
      title: "Contato",
      email: "Email",
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}
