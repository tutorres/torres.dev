export type Locale = "en" | "pt"

/**
 * A value that exists in every locale. Used for short strings that live in data
 * files (article titles, project taglines) rather than in `translations`.
 */
export type Localized<T> = Record<Locale, T>

/**
 * Picks the copy block for `locale`, falling back to English when a locale is
 * missing. Long-form content uses this so a partially translated article still
 * renders instead of blowing up the page.
 */
export function pickCopy<T>(copy: { en: T } & Partial<Record<Locale, T>>, locale: Locale): T {
  return copy[locale] ?? copy.en
}

export const translations = {
  en: {
    // Date formatting locale used by toLocaleDateString
    dateLocale: "en-US",
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
      tagline: "Production LLM agents & automation. Turning operational problems into shipped systems.",
      location: "Belo Horizonte, Brazil · Open to remote",
      cta: "See projects",
      resume: "Résumé",
    },
    // About
    about: {
      title: "About",
      description: `I build AI-powered systems and automations that solve real operational problems.

Currently at Banco Inter's Global Operations, building LLM agents and Python automations that saved 1.0 FTE in under 5 months.

Previously at Akyou, where I built an end-to-end document intelligence pipeline using the OpenAI API.`,
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
    // Article detail page chrome
    articlePage: {
      kicker: "Article",
      back: "Back to articles",
      more: "More articles",
      writtenBy: "Written by",
      alsoPublishedOn: "Also published on:",
      placeholder: "Article content goes here.",
      notFound: "Article Not Found",
    },
    // Case study detail page chrome
    projectPage: {
      kicker: "Case study",
      back: "Back to projects",
      more: "More projects",
      writtenBy: "Written by",
      placeholder: "Case study content goes here.",
      notFound: "Project Not Found",
    },
  },
  pt: {
    // Date formatting locale used by toLocaleDateString
    dateLocale: "pt-BR",
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
      tagline: "Agentes LLM e automação em produção. Transformando problemas operacionais em sistemas entregues.",
      location: "Belo Horizonte, Brasil · Aberto a remoto",
      cta: "Ver projetos",
      resume: "Currículo",
    },
    // About
    about: {
      title: "Sobre",
      description: `Construo sistemas e automações com IA que resolvem problemas operacionais reais.

Atualmente nas Operações Globais do Banco Inter, construindo agentes LLM e automações em Python que economizaram 1,0 FTE em menos de 5 meses.

Anteriormente na Akyou, onde construí um pipeline completo de inteligência documental usando a OpenAI API.`,
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
    // Article detail page chrome
    articlePage: {
      kicker: "Artigo",
      back: "Voltar aos artigos",
      more: "Mais artigos",
      writtenBy: "Escrito por",
      alsoPublishedOn: "Também publicado em:",
      placeholder: "O conteúdo do artigo vai aqui.",
      notFound: "Artigo não encontrado",
    },
    // Case study detail page chrome
    projectPage: {
      kicker: "Estudo de caso",
      back: "Voltar aos projetos",
      more: "Mais projetos",
      writtenBy: "Escrito por",
      placeholder: "O conteúdo do estudo de caso vai aqui.",
      notFound: "Projeto não encontrado",
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}
