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
      title: "AI Engineer",
      tagline: "Production LLM agents & automation — turning operational problems into shipped systems.",
      location: "Belo Horizonte, Brazil · Open to remote",
      cta: "See projects",
      resume: "Résumé",
    },
    // About
    about: {
      title: "About",
      description: `I build AI-powered systems and automations that solve real operational problems.

Currently at Banco Inter's Global Operations — LLM agents, Python automations, and data pipelines saving 1.0 FTE in under 5 months.

Previously at Akyou — end-to-end document intelligence pipeline using OpenAI API.`,
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
      viewCaseStudy: "Case study",
      status: {
        live: "Live",
        inDevelopment: "In development",
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
        aiml: "AI & LLM",
        data: "Data",
        infra: "Infrastructure",
        tools: "Tools",
        practices: "Practices",
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
      title: "Engenheiro de IA",
      tagline: "Agentes LLM e automação em produção — transformando problemas operacionais em sistemas entregues.",
      location: "Belo Horizonte, Brasil · Aberto a remoto",
      cta: "Ver projetos",
      resume: "Currículo",
    },
    // About
    about: {
      title: "Sobre",
      description: `Construo sistemas e automações com IA que resolvem problemas operacionais reais.

Atualmente nas Operações Globais do Banco Inter — agentes LLM, automações em Python e pipelines de dados economizando 1,0 FTE em menos de 5 meses.

Anteriormente na Akyou — pipeline completo de inteligência documental usando OpenAI API.`,
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
      viewCaseStudy: "Estudo de caso",
      status: {
        live: "Ativo",
        inDevelopment: "Em desenvolvimento",
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
        aiml: "IA & LLM",
        data: "Dados",
        infra: "Infraestrutura",
        tools: "Ferramentas",
        practices: "Práticas",
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
