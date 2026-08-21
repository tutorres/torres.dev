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
      title: "Applied AI Engineer",
      // Leads with outcome, not method. An earlier version led with "show how I
      // know they work", which answers a doubt the reader has not raised yet and
      // reads as self-justification. "Measure what they change" says the same
      // thing from a position of confidence: I quantify impact, rather than I
      // prove myself.
      tagline: "I architect AI into operational pipelines: what becomes an agent, what stays deterministic, and what should not be built.",
      location: "Belo Horizonte, Brazil (UTC-3)",
      cta: "Read the case study",
      // No performance metrics here, by decision. An F1 read off a landing page
      // invites a comparison the reader cannot make and the page cannot defend;
      // the figures live in the case study and the articles, with the context
      // that makes them mean anything. What is left is capability and rigour:
      // what was evaluated, at what scale, under what constraints. "37M rows"
      // stays because it is scale, not a score, and it is the only thing
      // separating production telemetry from a public dataset.
      proof: {
        result: "LLM agents evaluated for decision quality before rollout",
        honesty: "End-to-end ML over 37M rows of production telemetry, benchmarked on a temporal split",
        production: "Containerized services in production under audit constraints",
      },
    },
    // About
    about: {
      title: "About",
      description: `I decide where AI belongs in an operational pipeline, and where it does not. What becomes an agent, what stays deterministic code, and what should not be built at all.

Currently at Banco Inter's Global Operations, where I design the system prompts, tools and MCP integrations behind agents running in production, plus the Python automations around them. Nine of those shipped in seven months.

Working inside a bank means every agent ships under audit, access and governance constraints, so I care as much about evaluation and guardrails as about the prompt.

Alongside that I do undergraduate research at CEFET-MG on hybrid LLM models for market prediction and financial risk, where the point is benchmarking the combined method against each approach on its own rather than reporting one number in isolation.

Previously at Akyou, where I built an end-to-end document intelligence pipeline using the OpenAI API.`,
      stack: "Stack",
    },
    // Experience
    experience: {
      title: "Experience",
      present: "Present",
      remote: "Remote",
      education: "Education",
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
        deepDive: "Deep dive",
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
        ml: "ML & Modeling",
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
      resume: "Résumé (PDF)",
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
      repository: "Repository",
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
      title: "Applied AI Engineer",
      // Lidera por resultado, não por método. A versão anterior liderava com
      // "mostro como sei que funcionam", que responde a uma dúvida que o leitor
      // ainda não levantou e soa como autojustificativa. "Meço o que mudam" diz
      // o mesmo de um lugar confiante: eu quantifico impacto, em vez de eu me
      // provo.
      tagline: "Arquiteto IA dentro de pipelines operacionais: o que vira agente, o que continua determinístico, e o que não deveria ser construído.",
      location: "Belo Horizonte, Brasil (UTC-3)",
      cta: "Ler o case study",
      // Sem métrica de desempenho aqui, por decisão. F1 solto numa landing page
      // convida a uma comparação que o leitor não tem como fazer e a página não
      // tem como defender; os números moram no case study e nos artigos, com o
      // contexto que os torna legíveis. Fica capacidade e rigor: o que foi
      // avaliado, em que escala, sob que restrição. "37M registros" fica porque
      // é escala, não nota.
      proof: {
        result: "Agentes LLM avaliados em qualidade de decisão antes do rollout",
        honesty: "ML de ponta a ponta sobre 37M registros de telemetria em produção, com split temporal",
        production: "Microsserviços conteinerizados em produção sob restrição de auditoria",
      },
    },
    // About
    about: {
      title: "Sobre",
      description: `Decido onde a IA entra numa pipeline operacional, e onde ela não entra. O que vira agente, o que continua código determinístico, e o que não deveria ser construído.

Atualmente nas Operações Globais do Banco Inter, onde desenho os system prompts, as tools e as integrações MCP por trás de agentes rodando em produção, além das automações em Python ao redor deles. Nove delas entraram em produção em sete meses.

Trabalhar dentro de um banco significa que todo agente entra em produção sob restrições de auditoria, acesso e governança. Por isso me preocupo tanto com avaliação e guardrails quanto com o prompt.

Em paralelo, faço iniciação científica no CEFET-MG sobre modelos híbridos de LLM para previsão de mercado e risco financeiro, onde o ponto é comparar o método combinado contra cada abordagem isolada, em vez de reportar um número sozinho.

Anteriormente na Akyou, onde construí um pipeline completo de inteligência documental usando a OpenAI API.`,
      stack: "Stack",
    },
    // Experience
    experience: {
      title: "Experiência",
      present: "Atual",
      remote: "Remoto",
      education: "Formação",
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
        deepDive: "Análise aprofundada",
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
        ml: "ML & Modelagem",
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
      resume: "Currículo (PDF)",
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
      repository: "Repositório",
      writtenBy: "Escrito por",
      placeholder: "O conteúdo do estudo de caso vai aqui.",
      notFound: "Projeto não encontrado",
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}
