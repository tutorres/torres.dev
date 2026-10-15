"use client"

import { Badge } from "@/components/ui/badge"
import { type Locale, getTranslations } from "@/lib/i18n"

interface ExperienceProps {
  locale: Locale
}

interface ExperienceItem {
  company: string
  role: { en: string; pt: string }
  period: { en: string; pt: string }
  location?: { en: string; pt: string }
  stack: string[]
  bullets: { en: string[]; pt: string[] }
}

interface EducationItem {
  institution: string
  degree: { en: string; pt: string }
  period: { en: string; pt: string }
  detail: { en: string; pt: string }
}

const education: EducationItem[] = [
  {
    institution: "CEFET-MG",
    degree: {
      en: "B.Eng. Computer Engineering",
      pt: "Bacharelado em Engenharia de Computação",
    },
    period: {
      en: "2024 to 2030 (expected)",
      pt: "2024 a 2030 (previsto)",
    },
    detail: {
      en: "Currently in the 5th semester",
      pt: "Atualmente no 5º semestre",
    },
  },
]

const experiences: ExperienceItem[] = [
  {
    company: "Banco Inter",
    role: {
      en: "Intern, Data & AI | Global Operations",
      pt: "Estagiário, Dados e IA | Global Operations",
    },
    period: {
      en: "Jan 2026 to Present",
      pt: "Jan 2026 até Atual",
    },
    stack: ["Python", "FastAPI", "SQL", "LLM Agents", "MCP", "Terraform", "AWS", "Kubernetes", "Argo CD", "Grafana"],
    bullets: {
      en: [
        "Python services in production for the bank's US operation: an onboarding decision job, a document analysis API that answers 202 and posts the result back, and a reconciliation API where an LLM queries data through a read-only MCP scoped to a dedicated service user",
        "Services written with TDD and shipped through the bank's CI/CD to Kubernetes, with per-environment configuration and Terraform for each service's AWS resources (Parameter Store, S3, IAM)",
        "Model choice by evaluation against reference answers kept out of the model call, with cost tracked in a Grafana dashboard I built",
      ],
      pt: [
        "Serviços em Python em produção para a operação dos Estados Unidos do banco: um job de decisão de onboarding, uma API de análise de documento que responde 202 e devolve o resultado por POST, e uma API de conciliação em que um LLM consulta dados por um MCP somente leitura, limitado a um usuário de serviço dedicado",
        "Serviços escritos com TDD e entregues pelo CI/CD do banco em Kubernetes, com configuração por ambiente e Terraform para os recursos de AWS de cada serviço (Parameter Store, S3, IAM)",
        "Escolha de modelo por avaliação contra respostas de referência fora da chamada ao modelo, com o custo acompanhado em um dashboard de Grafana que eu construí",
      ],
    },
  },
  {
    company: "CEFET-MG",
    role: {
      en: "Undergraduate Researcher · LLM Financial Research",
      pt: "Iniciação Científica · Pesquisa em LLM para Finanças",
    },
    period: {
      en: "Aug 2026 to Present",
      pt: "Ago 2026 até Atual",
    },
    stack: ["Python", "LLMs", "Time Series", "FinBERT", "Portfolio Optimization"],
    bullets: {
      en: [
        "Hybrid LLM Models for Market Prediction and Financial Risk Management, advised at CEFET-MG",
        "Integrating numerical and textual signals: price series, financial news and sentiment, aligned on the same timeline",
        "Evaluating the combined method against each approach on its own, rather than reporting a single number in isolation",
      ],
      pt: [
        "Modelos Híbridos Baseados em LLM para Previsão de Mercado e Gestão de Risco Financeiro, com orientação no CEFET-MG",
        "Integração de sinais numéricos e textuais: séries de preços, notícias financeiras e análise de sentimento, alinhados na mesma linha temporal",
        "Avaliação do método combinado contra cada abordagem isolada, em vez de reportar um número sozinho",
      ],
    },
  },
  {
    company: "TMB Scan",
    role: {
      en: "Software Engineer · built with a partner",
      pt: "Engenheiro de Software · feito em dupla",
    },
    period: {
      en: "Mar 2026 to Sep 2026",
      pt: "Mar 2026 a Set 2026",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vitest"],
    bullets: {
      en: [
        "Live physical assessment platform for a paying client, built with a partner: patient records, a multi step evaluation wizard and a generated report",
        "Wrote the initial base, the Morph module with vitest tests, the paginated PDF report rendering and the deploy configuration; co-designed the multi-tenant data model with my partner",
        "Per-user access with Supabase row level security",
      ],
      pt: [
        "Plataforma de avaliação física no ar para um cliente pagante, feita em dupla: prontuários, um formulário de avaliação em várias etapas e um relatório gerado",
        "Escrevi a base inicial, o módulo Morph com testes em vitest, a paginação do relatório em PDF e a configuração de deploy; desenhei o modelo de dados multi-tenant junto com meu parceiro",
        "Acesso por usuário com row level security do Supabase",
      ],
    },
  },
  {
    company: "Akyou",
    role: {
      en: "Software Engineer · contractor",
      pt: "Engenheiro de Software · PJ",
    },
    period: {
      en: "Apr 2024 to Dec 2025",
      pt: "Abr 2024 a Dez 2025",
    },
    location: {
      en: "Remote",
      pt: "Remoto",
    },
    stack: ["Python", "FastAPI", "OpenAI API", "React", "TypeScript", "Supabase", "Docker", "AWS Elastic Beanstalk"],
    bullets: {
      en: [
        "Only engineer at a five person accessibility edtech. Built the product prototype used in meetings with clients and investors",
        "A FastAPI service that extracts a textbook PDF's text and runs it through an OpenAI Assistant for the chosen accessibility need, returning structured JSON, and a React and TypeScript app that shows each page with its adaptations, editable before use. Login and history on Supabase",
        "Generated only the adaptation the teacher selects, to keep token cost down. Containerized with Docker and deployed on AWS Elastic Beanstalk, learned on my own",
      ],
      pt: [
        "Único engenheiro de uma edtech de acessibilidade com cinco pessoas. Construí o protótipo do produto usado em reuniões com clientes e investidores",
        "Um serviço FastAPI que extrai o texto de um PDF de livro didático e o envia a um OpenAI Assistant para a necessidade de acessibilidade escolhida, devolvendo JSON estruturado, e um app em React e TypeScript que mostra cada página com suas adaptações, editável antes do uso. Login e histórico no Supabase",
        "Gerava só a adaptação que o professor escolhia, para reduzir o custo de tokens. Conteinerizado com Docker e publicado no AWS Elastic Beanstalk, aprendido por conta própria",
      ],
    },
  },
]

export function Experience({ locale }: ExperienceProps) {
  const t = getTranslations(locale)

  return (
    <section id="experience" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {t.experience.title}
      </h2>
      <div className="mt-8 space-y-12">
        {experiences.map((exp, index) => (
          <article key={index} className="relative pl-6 border-l border-border">
            <div className="absolute -left-1.5 top-1 size-3 rounded-full bg-foreground" />
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.company}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {exp.role[locale]}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {exp.period[locale]}
                  {exp.location && ` · ${exp.location[locale]}`}
                </p>
              </div>
              <ul className="space-y-1.5 text-sm text-foreground">
                {exp.bullets[locale].map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-muted-foreground">·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="font-mono text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <h3 className="mt-16 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {t.experience.education}
      </h3>
      <div className="mt-6 space-y-8">
        {education.map((item) => (
          <article key={item.institution} className="relative pl-6 border-l border-border">
            <div className="absolute -left-1.5 top-1 size-3 rounded-full bg-foreground" />
            <h4 className="text-lg font-semibold text-foreground">{item.institution}</h4>
            <p className="text-sm text-muted-foreground">{item.degree[locale]}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {item.period[locale]} · {item.detail[locale]}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
