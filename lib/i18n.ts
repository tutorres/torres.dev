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
      title: "Software Engineer & AI Engineer",
      // Leads with outcome, not method. An earlier version led with "show how I
      // know they work", which answers a doubt the reader has not raised yet and
      // reads as self-justification. "Measure what they change" says the same
      // thing from a position of confidence: I quantify impact, rather than I
      // prove myself.
      tagline: "I build Python services and LLM agents, and decide what becomes an agent, what stays deterministic code, and what should not be built.",
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
        result: "Model choice by evaluation against reference answers, before rollout",
        honesty: "Predictive maintenance over 37M rows of mining telemetry, benchmarked on a temporal split",
        production: "Python services shipped through a bank's CI/CD to Kubernetes",
      },
    },
    // About
    about: {
      title: "About",
      description: `Software engineer from Brazil with over two years of professional work, today an intern at Banco Inter, building Python and FastAPI services with SQL as the data layer, and LLM agents for the bank's US operation.

At Inter I work with the team that serves the US operation. I write Python services behind onboarding decisions, document analysis and financial reconciliation with TDD. They ship through the bank's CI/CD to Kubernetes, and I create each service's AWS resources with Terraform: Parameter Store, S3 and IAM. Part of it is agentic: LLM agents that read company formation documents and return the fields and the mismatches, and an MCP server that gives a model read-only access to data, scoped to a dedicated service user. I compare candidate models against reference answers before shipping.

Alongside that I do undergraduate research at CEFET-MG on hybrid LLM models for market prediction and financial risk, benchmarking the combined method against each approach on its own.

Before Inter I spent 21 months at Akyou, the only engineer at an accessibility edtech, where I built the product prototype in Python and deployed it on AWS. I also built a live assessment platform for a paying client with a partner, on Next.js and Supabase.`,
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
      title: "Software Engineer & AI Engineer",
      // Lidera por resultado, não por método. A versão anterior liderava com
      // "mostro como sei que funcionam", que responde a uma dúvida que o leitor
      // ainda não levantou e soa como autojustificativa. "Meço o que mudam" diz
      // o mesmo de um lugar confiante: eu quantifico impacto, em vez de eu me
      // provo.
      tagline: "Construo serviços em Python e agentes de LLM, e decido o que vira agente, o que continua código determinístico e o que não deveria ser construído.",
      location: "Belo Horizonte, Brasil (UTC-3)",
      cta: "Ler o case study",
      // Sem métrica de desempenho aqui, por decisão. F1 solto numa landing page
      // convida a uma comparação que o leitor não tem como fazer e a página não
      // tem como defender; os números moram no case study e nos artigos, com o
      // contexto que os torna legíveis. Fica capacidade e rigor: o que foi
      // avaliado, em que escala, sob que restrição. "37M registros" fica porque
      // é escala, não nota.
      proof: {
        result: "Escolha de modelo por avaliação contra respostas de referência, antes do rollout",
        honesty: "Manutenção preditiva sobre 37M registros de telemetria de mineração, com split temporal",
        production: "Serviços em Python entregues pelo CI/CD do banco em Kubernetes",
      },
    },
    // About
    about: {
      title: "Sobre",
      description: `Engenheiro de software, com mais de dois anos de trabalho profissional, hoje estagiário no Banco Inter, construindo serviços em Python e FastAPI, com SQL como camada de dados, e agentes de LLM para a operação dos Estados Unidos do banco.

No Inter, trabalho com o time que atende a operação dos Estados Unidos. Escrevo com TDD serviços em Python por trás de decisões de onboarding, análise documental e conciliação financeira. Eles chegam à produção pelo CI/CD do banco, em Kubernetes, e eu crio os recursos de AWS de cada serviço com Terraform: Parameter Store, S3 e IAM. Parte disso é agêntico: agentes de LLM que leem documentos de constituição de empresa e devolvem os campos e as divergências, e um servidor MCP que dá ao modelo acesso somente leitura ao dado, limitado a um usuário de serviço dedicado. Comparo modelos candidatos contra respostas de referência antes de entregar.

Em paralelo, faço iniciação científica no CEFET-MG sobre modelos híbridos de LLM para previsão de mercado e risco financeiro, comparando o método combinado contra cada abordagem isolada.

Antes do Inter foram 21 meses na Akyou, como único engenheiro de uma edtech de acessibilidade, onde construí o protótipo do produto em Python e fiz o deploy na AWS. Também construí, em dupla, uma plataforma de avaliação no ar para um cliente pagante, em Next.js e Supabase.`,
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
