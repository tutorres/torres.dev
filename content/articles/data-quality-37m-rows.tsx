import type { FC, ReactNode } from "react"
import { type Locale, pickCopy } from "@/lib/i18n"

const Inline: FC<{ children: string }> = ({ children }) => (
  <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded-sm text-foreground">
    {children}
  </code>
)

const Block: FC<{ children: string; lang?: string }> = ({ children, lang }) => (
  <div className="my-1">
    {lang && (
      <div className="flex items-center rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{lang}</span>
      </div>
    )}
    <pre
      className={`bg-secondary border border-border px-5 py-4 font-mono text-sm text-foreground overflow-x-auto ${
        lang ? "rounded-b-lg" : "rounded-lg"
      }`}
    >
      <code>{children}</code>
    </pre>
  </div>
)

const Dash: FC = () => (
  <span className="text-muted-foreground font-mono mt-0.5 shrink-0">·</span>
)

const B: FC<{ children: ReactNode }> = ({ children }) => (
  <strong className="font-semibold">{children}</strong>
)

const Bullets: FC<{ items: ReactNode[]; tight?: boolean }> = ({ items, tight }) => (
  <ul className={`${tight ? "space-y-1.5" : "space-y-2"} pl-1`}>
    {items.map((item, i) => (
      <li key={i} className="flex gap-2.5 text-sm">
        <Dash />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

/* Code samples are identical in both languages, so they live outside the copy object.
   The accented Portuguese inside them is the subject matter and must stay as is. */
const code = {
  corrupted: "N??o Crítico",
  criticidadeFix: `_CRITICIDADE_PATTERN = r"N.{1,2}o Cr.{1,2}tico"

df["Criticidade"] = df["Criticidade"].str.replace(
    _CRITICIDADE_PATTERN, "Não Crítico", regex=True
)`,
  nullString: '"NULL"',
  classeFix: 'df["Classe"] = df["Classe"].replace("NULL", np.nan)',
  commaValue: '"43,7999992370605"',
  valorFix:
    'df["Valor"] = df["Valor"].astype(str).str.replace(",", ".", regex=False).astype(float)',
  valorNullFix: `mask_valor_null = df["Valor"].astype(str) == "NULL"
df.loc[mask_valor_null, "Valor"] = np.nan`,
  report: `@dataclass
class QualityReport:
    criticidade_fixed: int
    null_string_fixed: int
    decimal_fixed: int
    valor_null_fixed: int
    inicio_after_fim: int
    tag_mismatches: List[str]
    duplicate_rows: int
    timestamp_gaps: List[str]
    summary: str`,
}

interface Copy {
  intro: ReactNode
  before: ReactNode
  spread: ReactNode
  setup: {
    title: string
    body: ReactNode
    tableHead: { index: string; column: string; problem: string; rows: string }
    tableRows: { index: string; column: string; problem: string; rows: string }[]
  }
  criticidade: {
    title: string
    lead: ReactNode
    afterBlock: ReactNode
    impact: ReactNode
    regexNote: ReactNode
  }
  classe: {
    title: string
    lead: ReactNode
    afterBlock: ReactNode
    silent: ReactNode
    worry: ReactNode
  }
  decimal: {
    title: string
    lead: ReactNode
    afterBlock: ReactNode
    cast: ReactNode
  }
  fullScale: {
    title: string
    lead: ReactNode
    discovery: ReactNode
    sample: ReactNode
    fixLead: ReactNode
    ordering: ReactNode
  }
  pattern: {
    title: string
    lead: ReactNode
    outcomeLead: string
    outcomes: ReactNode[]
  }
  conclusion: { title: string; body: ReactNode[] }
}

const copy: Record<Locale, Copy> = {
  en: {
    intro: (
      <>
        I built a predictive maintenance model on 37,164,054 telemetry records from an iron ore
        mine. Six months of alarms from haul trucks and excavators. The goal was to predict
        &quot;Don&apos;t Go&quot; events, the ones that stop a machine mid-operation, hours before
        they happen.
      </>
    ),
    before: <>Before any of that, I had to deal with four data quality problems.</>,
    spread: (
      <>
        Here is what makes them interesting. One of them touched <B>11 rows</B>. Another touched{" "}
        <B>36,104,611</B>. Both were silent. Neither threw an exception.
      </>
    ),
    setup: {
      title: "The setup",
      body: (
        <>
          The dataset came from Vale&apos;s Programa Desenvolver, with quality problems deliberately
          inserted as part of the challenge. Three were documented in the challenge material. The
          fourth was not, and I only found it when I stopped working on a sample.
        </>
      ),
      tableHead: { index: "#", column: "Column", problem: "Problem", rows: "Rows fixed" },
      tableRows: [
        { index: "1", column: "Criticidade", problem: "UTF-8 encoding corruption", rows: "11" },
        { index: "2", column: "Classe", problem: 'Literal string "NULL"', rows: "36,104,611" },
        { index: "3", column: "Valor", problem: 'Literal string "NULL"', rows: "237,443" },
        { index: "4", column: "Valor", problem: "Comma as decimal separator", rows: "821,849" },
      ],
    },
    criticidade: {
      title: "1. Eleven rows out of thirty seven million",
      lead: (
        <>
          The <Inline>Criticidade</Inline> column holds the alarm severity label. Almost every row
          was fine. Eleven were not:
        </>
      ),
      afterBlock: (
        <>
          <Inline>Não Crítico</Inline> had lost its accented characters somewhere in the export
          chain, replaced by question marks.
        </>
      ),
      impact: (
        <>
          Eleven rows. That is 0.00003% of the dataset. It would never show up in a{" "}
          <Inline>head()</Inline>, a random sample, or a summary statistic. But group by that column
          and you silently get an extra category, splitting one class into two.
        </>
      ),
      regexNote: (
        <>
          The regex is loose on purpose. I did not want to assume the corruption was always exactly
          two question marks, because it was not consistent.
        </>
      ),
    },
    classe: {
      title: '2. Thirty six million rows of the word "NULL"',
      lead: (
        <>
          The <Inline>Classe</Inline> column should hold <Inline>Activate</Inline> or{" "}
          <Inline>Inactive</Inline>. Instead, 97% of the dataset held this:
        </>
      ),
      afterBlock: <>Not a null value. The four characters N, U, L, L, as text.</>,
      silent: (
        <>
          Every null check I had written came back clean. <Inline>isna()</Inline> saw a perfectly
          valid string. The column reported 100% populated while being almost entirely empty.
        </>
      ),
      worry: (
        <>
          This is the one that worries me most, because it fails in the direction of looking
          healthy. A column that reports zero missing values does not get a second look.
        </>
      ),
    },
    decimal: {
      title: "3. A decimal separator that changed its mind",
      lead: (
        <>
          <Inline>Valor</Inline> holds the numeric sensor reading behind each alarm. It arrived
          typed as a string, which was already a hint. Inside, 821,849 rows looked like this:
        </>
      ),
      afterBlock: (
        <>
          Comma as decimal separator, Brazilian convention, in a column that also held dot-separated
          values.
        </>
      ),
      cast: (
        <>
          Cast the column to float and you get an exception. Cast with{" "}
          <Inline>errors=&quot;coerce&quot;</Inline> and you get <Inline>NaN</Inline> exactly where
          the values were, which then reads as missing data rather than as a bug you introduced.
        </>
      ),
    },
    fullScale: {
      title: "4. The one that only appeared at full scale",
      lead: (
        <>
          <Inline>Valor</Inline> also contained the literal string <Inline>&quot;NULL&quot;</Inline>
          . 237,443 rows of it.
        </>
      ),
      discovery: (
        <>
          I did not find this one in the challenge documentation, and I did not find it while
          iterating on a sample. It surfaced the first time I ran the pipeline against all six
          months at once.
        </>
      ),
      sample: (
        <>
          That is the part worth sitting with. The sample was not small: it was large enough to feel
          representative and fast enough to iterate on. It still hid a problem affecting a quarter
          of a million rows, because 237,443 out of 37 million is 0.6%, and 0.6% is easy to miss
          when you are slicing the first N rows of one file.
        </>
      ),
      fixLead: <>The fix is one line. Finding it was the work:</>,
      ordering: (
        <>
          Ordering matters here. This has to run before the comma replacement, or{" "}
          <Inline>&quot;NULL&quot;</Inline> reaches <Inline>astype(float)</Inline> and takes the
          whole cast down with it.
        </>
      ),
    },
    pattern: {
      title: "The pattern that made this tractable",
      lead: (
        <>
          I stopped writing cleaning code first. Instead every fix reports what it touched, into a
          dataclass:
        </>
      ),
      outcomeLead: "Three things came out of that:",
      outcomes: [
        <>
          <B>The report is the diagnosis.</B>{" "}
          <>
            When I had to defend the choices in the final report, I had exact counts per problem,
            not a memory of having fixed something.
          </>
        </>,
        <>
          <B>Cleaning becomes testable.</B>{" "}
          <>Every fix got a test asserting the count. Reruns are cheap and regressions are loud.</>
        </>,
        <>
          <B>It has room for problems I had not found yet.</B>{" "}
          <>
            Fields like <Inline>inicio_after_fim</Inline>, <Inline>tag_mismatches</Inline> and{" "}
            <Inline>timestamp_gaps</Inline> are checks on the operational log that were not part of
            the planted three. Building the structure to hold unknown problems is what let the
            fourth one surface as a number instead of as a crash three notebooks later.
          </>
        </>,
      ],
    },
    conclusion: {
      title: "What I took from it",
      body: [
        <>
          None of these four throws an exception. A pipeline with no validation layer runs end to
          end, trains a model, prints a metric, and is wrong in a way no stack trace will ever
          mention.
        </>,
        <>
          The spread is the lesson. Eleven rows and thirty six million rows are the same class of
          bug and need the same defense, because neither announces itself. At this volume you cannot
          eyeball anything, and your sample is not as representative as it feels.
        </>,
        <>
          The validator is not overhead you add if there is time left. It is the thing standing
          between you and a confident wrong answer.
        </>,
      ],
    },
  },
  pt: {
    intro: (
      <>
        Construí um modelo de manutenção preditiva sobre 37.164.054 registros de telemetria de uma
        mina de minério de ferro. Seis meses de alarmes de caminhões fora de estrada e escavadeiras.
        O objetivo era prever eventos de &quot;Don&apos;t Go&quot;, aqueles que param a máquina no
        meio da operação, horas antes de acontecerem.
      </>
    ),
    before: <>Antes de qualquer coisa, precisei lidar com quatro problemas de qualidade de dados.</>,
    spread: (
      <>
        O interessante é o seguinte. Um deles atingiu <B>11 linhas</B>. Outro atingiu{" "}
        <B>36.104.611</B>. Os dois eram silenciosos. Nenhum levantou exceção.
      </>
    ),
    setup: {
      title: "O contexto",
      body: (
        <>
          O dataset veio do Programa Desenvolver da Vale, com problemas de qualidade inseridos de
          propósito como parte do desafio. Três estavam documentados no material do desafio. O
          quarto não estava, e só apareceu quando parei de trabalhar com uma amostra.
        </>
      ),
      tableHead: { index: "#", column: "Coluna", problem: "Problema", rows: "Linhas corrigidas" },
      tableRows: [
        { index: "1", column: "Criticidade", problem: "Corrupção de encoding UTF-8", rows: "11" },
        { index: "2", column: "Classe", problem: 'String literal "NULL"', rows: "36.104.611" },
        { index: "3", column: "Valor", problem: 'String literal "NULL"', rows: "237.443" },
        { index: "4", column: "Valor", problem: "Vírgula como separador decimal", rows: "821.849" },
      ],
    },
    criticidade: {
      title: "1. Onze linhas em trinta e sete milhões",
      lead: (
        <>
          A coluna <Inline>Criticidade</Inline> guarda o rótulo de severidade do alarme. Quase toda
          linha estava certa. Onze não estavam:
        </>
      ),
      afterBlock: (
        <>
          <Inline>Não Crítico</Inline> perdeu os caracteres acentuados em algum ponto da cadeia de
          exportação, substituídos por pontos de interrogação.
        </>
      ),
      impact: (
        <>
          Onze linhas. Isso é 0,00003% do dataset. Nunca apareceria em um <Inline>head()</Inline>,
          em uma amostra aleatória ou em uma estatística resumida. Mas agrupe por essa coluna e você
          ganha silenciosamente uma categoria extra, dividindo uma classe em duas.
        </>
      ),
      regexNote: (
        <>
          O regex é frouxo de propósito. Eu não queria assumir que a corrupção era sempre
          exatamente dois pontos de interrogação, porque não era consistente.
        </>
      ),
    },
    classe: {
      title: '2. Trinta e seis milhões de linhas com a palavra "NULL"',
      lead: (
        <>
          A coluna <Inline>Classe</Inline> deveria guardar <Inline>Activate</Inline> ou{" "}
          <Inline>Inactive</Inline>. Em vez disso, 97% do dataset tinha isto:
        </>
      ),
      afterBlock: <>Não é um valor nulo. São os quatro caracteres N, U, L, L, como texto.</>,
      silent: (
        <>
          Toda checagem de nulo que eu tinha escrito voltava limpa. O <Inline>isna()</Inline> via
          uma string perfeitamente válida. A coluna reportava 100% preenchida sendo quase
          inteiramente vazia.
        </>
      ),
      worry: (
        <>
          Esse é o que mais me preocupa, porque ele falha na direção de parecer saudável. Uma coluna
          que reporta zero valores ausentes não recebe uma segunda olhada.
        </>
      ),
    },
    decimal: {
      title: "3. Um separador decimal que mudou de ideia",
      lead: (
        <>
          <Inline>Valor</Inline> guarda a leitura numérica do sensor por trás de cada alarme. Ele
          chegou tipado como string, o que já era uma pista. Dentro dele, 821.849 linhas eram assim:
        </>
      ),
      afterBlock: (
        <>
          Vírgula como separador decimal, convenção brasileira, em uma coluna que também guardava
          valores separados por ponto.
        </>
      ),
      cast: (
        <>
          Converta a coluna para float e você recebe uma exceção. Converta com{" "}
          <Inline>errors=&quot;coerce&quot;</Inline> e você recebe <Inline>NaN</Inline> exatamente
          onde estavam os valores, o que depois se lê como dado ausente e não como um bug que você
          mesmo introduziu.
        </>
      ),
    },
    fullScale: {
      title: "4. O que só apareceu na escala completa",
      lead: (
        <>
          <Inline>Valor</Inline> também continha a string literal{" "}
          <Inline>&quot;NULL&quot;</Inline>. 237.443 linhas dela.
        </>
      ),
      discovery: (
        <>
          Não achei esse na documentação do desafio, e não achei enquanto iterava sobre uma amostra.
          Ele apareceu na primeira vez que rodei o pipeline contra os seis meses de uma vez.
        </>
      ),
      sample: (
        <>
          Essa é a parte que vale parar para pensar. A amostra não era pequena: era grande o
          suficiente para parecer representativa e rápida o suficiente para iterar. Mesmo assim ela
          escondeu um problema em um quarto de milhão de linhas, porque 237.443 de 37 milhões é
          0,6%, e 0,6% é fácil de perder quando você está fatiando as primeiras N linhas de um
          arquivo.
        </>
      ),
      fixLead: <>A correção é uma linha. Achar o problema é que foi o trabalho:</>,
      ordering: (
        <>
          A ordem importa aqui. Isso precisa rodar antes da troca da vírgula, senão{" "}
          <Inline>&quot;NULL&quot;</Inline> chega no <Inline>astype(float)</Inline> e derruba a
          conversão inteira.
        </>
      ),
    },
    pattern: {
      title: "O padrão que tornou isso tratável",
      lead: (
        <>
          Parei de escrever código de limpeza primeiro. Em vez disso, cada correção reporta o que
          tocou, dentro de uma dataclass:
        </>
      ),
      outcomeLead: "Três coisas saíram disso:",
      outcomes: [
        <>
          <B>O relatório é o diagnóstico.</B>{" "}
          <>
            Quando precisei defender as escolhas no relatório final, eu tinha contagens exatas por
            problema, não a lembrança de ter corrigido alguma coisa.
          </>
        </>,
        <>
          <B>A limpeza vira testável.</B>{" "}
          <>
            Cada correção ganhou um teste checando a contagem. Reexecutar é barato e regressão é
            barulhenta.
          </>
        </>,
        <>
          <B>Sobra espaço para problemas que eu ainda não tinha achado.</B>{" "}
          <>
            Campos como <Inline>inicio_after_fim</Inline>, <Inline>tag_mismatches</Inline> e{" "}
            <Inline>timestamp_gaps</Inline> são checagens no log operacional que não faziam parte
            dos três plantados. Construir a estrutura para segurar problemas desconhecidos é o que
            deixou o quarto aparecer como número em vez de como um crash três notebooks depois.
          </>
        </>,
      ],
    },
    conclusion: {
      title: "O que eu tirei disso",
      body: [
        <>
          Nenhum dos quatro levanta exceção. Um pipeline sem camada de validação roda de ponta a
          ponta, treina um modelo, imprime uma métrica e está errado de um jeito que nenhum stack
          trace vai mencionar.
        </>,
        <>
          A amplitude é a lição. Onze linhas e trinta e seis milhões de linhas são a mesma classe de
          bug e precisam da mesma defesa, porque nenhum dos dois se anuncia. Nesse volume você não
          consegue olhar nada no olho, e sua amostra não é tão representativa quanto parece.
        </>,
        <>
          O validador não é um custo extra que você adiciona se sobrar tempo. Ele é o que está entre
          você e uma resposta errada com cara de certa.
        </>,
      ],
    },
  },
}

export function DataQualityArticle({ locale }: { locale: Locale }) {
  const c = pickCopy(copy, locale)

  return (
    <div className="space-y-5 text-foreground">

      {/* Intro */}
      <p className="leading-relaxed">{c.intro}</p>

      <p className="leading-relaxed">{c.before}</p>

      <p className="leading-relaxed">{c.spread}</p>

      <hr className="border-t border-border" />

      {/* ===== SETUP ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.setup.title}</h2>

        <p className="leading-relaxed">{c.setup.body}</p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.setup.tableHead.index}
                </th>
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.setup.tableHead.column}
                </th>
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.setup.tableHead.problem}
                </th>
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.setup.tableHead.rows}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {c.setup.tableRows.map(({ index, column, problem, rows }, i) => (
                <tr key={i} className="transition-colors hover:bg-secondary/50">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{index}</td>
                  <td className="px-4 py-3 font-mono text-foreground">{column}</td>
                  <td className="px-4 py-3 text-muted-foreground">{problem}</td>
                  <td className="px-4 py-3 font-mono text-foreground">{rows}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ===== 1. CRITICIDADE ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.criticidade.title}</h2>

        <p className="leading-relaxed">{c.criticidade.lead}</p>

        <Block>{code.corrupted}</Block>

        <p className="leading-relaxed">{c.criticidade.afterBlock}</p>

        <p className="leading-relaxed">{c.criticidade.impact}</p>

        <Block lang="python">{code.criticidadeFix}</Block>

        <p className="leading-relaxed">{c.criticidade.regexNote}</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== 2. CLASSE ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.classe.title}</h2>

        <p className="leading-relaxed">{c.classe.lead}</p>

        <Block>{code.nullString}</Block>

        <p className="leading-relaxed">{c.classe.afterBlock}</p>

        <p className="leading-relaxed">{c.classe.silent}</p>

        <Block lang="python">{code.classeFix}</Block>

        <p className="leading-relaxed">{c.classe.worry}</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== 3. DECIMAL SEPARATOR ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.decimal.title}</h2>

        <p className="leading-relaxed">{c.decimal.lead}</p>

        <Block>{code.commaValue}</Block>

        <p className="leading-relaxed">{c.decimal.afterBlock}</p>

        <p className="leading-relaxed">{c.decimal.cast}</p>

        <Block lang="python">{code.valorFix}</Block>
      </section>

      <hr className="border-t border-border" />

      {/* ===== 4. FULL SCALE ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.fullScale.title}</h2>

        <p className="leading-relaxed">{c.fullScale.lead}</p>

        <p className="leading-relaxed">{c.fullScale.discovery}</p>

        <p className="leading-relaxed">{c.fullScale.sample}</p>

        <p className="leading-relaxed">{c.fullScale.fixLead}</p>

        <Block lang="python">{code.valorNullFix}</Block>

        <p className="leading-relaxed">{c.fullScale.ordering}</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== THE PATTERN ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.pattern.title}</h2>

        <p className="leading-relaxed">{c.pattern.lead}</p>

        <Block lang="python">{code.report}</Block>

        <p className="text-muted-foreground text-sm">{c.pattern.outcomeLead}</p>

        <Bullets items={c.pattern.outcomes} />
      </section>

      <hr className="border-t border-border" />

      {/* ===== CONCLUSION ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.conclusion.title}</h2>

        {c.conclusion.body.map((paragraph, i) => (
          <p key={i} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>
    </div>
  )
}
