"use client"

import { Badge } from "@/components/ui/badge"
import { type Locale, getTranslations } from "@/lib/i18n"

interface SkillsProps {
  locale: Locale
}

interface Skill {
  name: string
  status?: "inProgress" | "planned"
}

interface SkillCategory {
  key: keyof ReturnType<typeof getTranslations>["skills"]["categories"]
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    key: "languages",
    skills: [{ name: "Python" }, { name: "SQL" }, { name: "TypeScript" }],
  },
  {
    key: "aiml",
    skills: [
      { name: "LLM Agents" },
      { name: "MCP" },
      { name: "Tool design" },
      { name: "System prompt design" },
      { name: "LLM evaluation" },
      { name: "RAG" },
      { name: "OpenAI / Groq API" },
    ],
  },
  {
    key: "ml",
    skills: [
      { name: "PyTorch" },
      { name: "XGBoost / LightGBM" },
      { name: "LSTM" },
      { name: "SHAP" },
    ],
  },
  {
    key: "data",
    skills: [
      { name: "DuckDB" },
      { name: "Pandas" },
      { name: "Plotly" },
      { name: "Streamlit" },
    ],
  },
  {
    key: "infra",
    skills: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "GitLab CI/CD" },
      { name: "AWS" },
    ],
  },
  {
    key: "tools",
    skills: [
      { name: "FastAPI" },
      { name: "n8n" },
      { name: "Git" },
      { name: "GitHub" },
    ],
  },
  {
    key: "practices",
    skills: [
      { name: "TDD" },
      { name: "Spec-Driven Development" },
      { name: "Agentic coding workflows" },
    ],
  },
  {
    key: "certifications",
    skills: [
      { name: "Lean Six Sigma Yellow Belt" },
      { name: "EF SET C1 English (65/100)" },
      { name: "Claude Code 101" },
    ],
  },
]

export function Skills({ locale }: SkillsProps) {
  const t = getTranslations(locale)

  return (
    <section id="skills" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {t.skills.title}
      </h2>
      <div className="mt-8 space-y-6">
        {skillCategories.map((category) => (
          <div key={category.key}>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t.skills.categories[category.key]}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="font-mono text-xs"
                >
                  {skill.name}
                  {skill.status && (
                    <span className="ml-1 text-muted-foreground">
                      ({t.skills[skill.status]})
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
