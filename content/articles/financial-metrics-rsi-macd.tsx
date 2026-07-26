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

/* Code samples are identical in both languages, so they live outside the copy object. */
const code = {
  dailyReturnMath: "(today - yesterday) / yesterday",
  dailyReturnPandas: "close.pct_change()",
  maMath: "MA(X) = (day_t + day_(t-1) + ... + day_(t-X+1)) / X",
  maPandas: 'df["ma_7"] = close.rolling(7).mean()',
  rsiAlpha: "α = 1 / (1 + com) = 1 / 14",
  rsiFinal: "RSI = 100 - (100 / (1 + RS))",
  rsiCode: `def _rsi(close: pd.Series, period: int = 14) -> pd.Series:
    delta = close.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(com=period - 1, min_periods=period).mean()
    avg_loss = loss.ewm(com=period - 1, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0, float("nan"))  # Avoid division by zero
    return 100 - (100 / (1 + rs))`,
  emaFormula: "EMA(t) = Price(t) × α + EMA(t-1) × (1 - α)",
  macd: "MACD = EMA12 - EMA26",
  macdHist: "MACD Histogram = MACD - Signal",
  macdCode: `ema12 = close.ewm(span=12, adjust=False).mean()
ema26 = close.ewm(span=26, adjust=False).mean()
df["macd"] = ema12 - ema26
df["macd_signal"] = df["macd"].ewm(span=9, adjust=False).mean()
df["macd_hist"] = df["macd"] - df["macd_signal"]
df["volatility_21"] = df["daily_return"].rolling(21).std()`,
}

interface Copy {
  intro: ReactNode
  mathIs: string
  example: string
  why: string
  dailyReturn: {
    title: string
    body: ReactNode
    why: ReactNode
    examples: ReactNode[]
    codeLead: ReactNode
  }
  movingAverages: { title: string; body: ReactNode; why: ReactNode; note: ReactNode }
  rsi: {
    title: string
    lead: ReactNode
    range: ReactNode
    bands: ReactNode[]
    why: ReactNode
    mathLead: string
    mathItems: string[]
    thenLabel: string
    thenItems: string[]
    ewm: {
      title: string
      body: ReactNode
      weights: { label: string; value: string }[]
      decay: string
      comLead: ReactNode
      alphaNote: ReactNode
    }
    formulaTitle: string
    interpretationLead: ReactNode
    interpretation: string[]
    codeTitle: string
  }
  macd: {
    title: string
    body: ReactNode
    emaLead: ReactNode
    alphaLead: string
    alphaBlock: string
    spanNote: ReactNode
    signal: ReactNode
    histogram: ReactNode
    tableHead: { value: string; meaning: string }
    tableRows: { value: string; meaning: string }[]
  }
  volatility: { title: string; body: ReactNode }
  code: { title: string; closing: ReactNode }
  conclusion: { title: string; body: ReactNode }
}

const copy: Record<Locale, Copy> = {
  en: {
    intro: (
      <>
        In this article I will share my understanding and use of some financial metrics used in my
        Financial Dashboard project. You can see it in{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          this link
        </a>{" "}
        and the full article by clicking{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          here
        </a>
        . The main point here is understanding the math used to transform data from the bronze
        layer, where we have raw information such as date, open, high, low, close, and volume, and
        aggregate useful data to improve consumption and future use in the data pipeline.
      </>
    ),
    mathIs: "The math is:",
    example: "Example:",
    why: "Why?",
    dailyReturn: {
      title: "First metric: Daily Return",
      body: (
        <>
          Not a difficult one. It returns the percentage change between today&apos;s and
          yesterday&apos;s stock prices.
        </>
      ),
      why: (
        <>Seeing day-to-day changes can be useful and later used in the gold layer for analysis.</>
      ),
      examples: [
        <>
          <span className="text-muted-foreground">day 1: 150.0</span>
          <span className="text-muted-foreground"> → </span>
          <Inline>NaN</Inline>
        </>,
        <>
          <span className="text-muted-foreground">day 2: 152.3</span>
          <span className="text-muted-foreground"> → </span>
          <span className="font-mono">(152.3 - 150.0) / 150.0 = +0.0153 (+1.53%)</span>
        </>,
        <>
          <span className="text-muted-foreground">day 3: 149.8</span>
          <span className="text-muted-foreground"> → </span>
          <span className="font-mono">(149.8 - 152.3) / 152.3 = -0.0164 (-1.64%)</span>
        </>,
      ],
      codeLead: <>Simple, right? In code, we use pandas:</>,
    },
    movingAverages: {
      title: "Second metric: Moving Averages (MA7, MA21, MA50)",
      body: <>Moving average shows the average price over the last X days.</>,
      why: (
        <>
          Individually, they show the direction of the stock, not very powerful alone, but when
          analyzed together they can provide strong signals. Golden cross and death cross are the
          most relevant examples.
        </>
      ),
      note: <>As we can see, for example, MA7 will only return a valid result after the 7th day.</>,
    },
    rsi: {
      title: "Third metric: RSI (Relative Strength Index)",
      lead: <>Probably the most complex in this list, so let&apos;s go step by step.</>,
      range: <>RSI returns a number between 0 and 100:</>,
      bands: [
        <>
          <B>70+</B> → overbought
        </>,
        <>
          <B>30-</B> → oversold
        </>,
      ],
      why: (
        <>
          It helps analyze market momentum. Sometimes stocks are not priced only by their real
          value, hype, news, or unexpected events can influence behavior.
        </>
      ),
      mathLead: "Let's dive into the math:",
      mathItems: [
        "Period = 14 (default market value)",
        "Delta = difference between current day and previous day",
        "Gain = delta if positive, otherwise 0",
        "Loss = absolute delta if negative, otherwise 0",
      ],
      thenLabel: "Then:",
      thenItems: [
        "Average Gain = exponential moving average (EWM) of gains",
        "Average Loss = exponential moving average (EWM) of losses",
        "RS = avg_gain / avg_loss",
      ],
      ewm: {
        title: "About EWM",
        body: (
          <>
            EWM (Exponential Weighted Mean) gives more weight to recent values. The weight decays
            exponentially over time:
          </>
        ),
        weights: [
          { label: "most recent day", value: "weight = 1" },
          { label: "2 days ago", value: "weight = (1 - α)" },
          { label: "3 days ago", value: "weight = (1 - α)²" },
        ],
        decay:
          "If α is close to 1  →  fast decay (focus on recent data)\nIf α is close to 0  →  slow decay (longer memory)",
        comLead: (
          <>
            In the RSI calculation, we use <Inline>com=period-1</Inline> in pandas, which relates to
            alpha as:
          </>
        ),
        alphaNote: (
          <>Small alpha → slow decay → all 14 days matter, not just the most recent ones.</>
        ),
      },
      formulaTitle: "Final RSI formula",
      interpretationLead: <>The result is interpreted as:</>,
      interpretation: ["RSI < 30  →  oversold", "RSI > 70  →  overbought"],
      codeTitle: "Code",
    },
    macd: {
      title: "Fourth indicator: MACD (Moving Average Convergence Divergence)",
      body: (
        <>
          MACD shows the momentum of the stock using EMA (Exponential Moving Average) to weight
          recent values more heavily.
        </>
      ),
      emaLead: (
        <>
          Unlike a simple moving average where all days have equal weight, EMA applies exponential
          decay:
        </>
      ),
      alphaLead: "Where alpha is defined as:",
      alphaBlock:
        "α = 2 / (span + 1)\n\nspan = 12  →  α ≈ 0.154  (more reactive, short-term)\nspan = 26  →  α ≈ 0.074  (smoother, long-term)",
      spanNote: <>So EMA12 reacts faster to price changes, while EMA26 captures the longer trend.</>,
      signal: (
        <>
          The <B>MACD Signal line</B> is an EMA of the MACD itself (span=9), used to identify
          buy/sell triggers.
        </>
      ),
      histogram: (
        <>
          The <B>MACD Histogram</B> is the difference between MACD and Signal:
        </>
      ),
      tableHead: { value: "Value", meaning: "Meaning" },
      tableRows: [
        { value: "Positive and going up", meaning: "Growing momentum" },
        { value: "Positive and going down", meaning: "High stock losing strength" },
        { value: "Negative and going down", meaning: "Downward momentum accelerating" },
        { value: "Negative and rising", meaning: "Going down but losing strength" },
      ],
    },
    volatility: {
      title: "Fifth metric: Volatility (21-day)",
      body: (
        <>
          Simple but useful, evaluates the standard deviation of daily returns over the last 21
          days. Higher volatility means bigger price oscillations in the period. We use it to set
          risk/reward accuracy.
        </>
      ),
    },
    code: {
      title: "Code (MACD + Volatility)",
      closing: <>With that, we complete our silver layer.</>,
    },
    conclusion: {
      title: "Conclusion",
      body: (
        <>
          We can create from raw data some really interesting and useful indicators to aggregate
          information and extract real value from it. Data without purpose is useless, we need to
          learn how to extract meaning from it. And that&apos;s the point of this article: not the
          math, not the code, but that we can get real-world insights from data. That&apos;s what
          makes this work worthwhile.
        </>
      ),
    },
  },
  pt: {
    intro: (
      <>
        Neste artigo compartilho meu entendimento e uso de algumas métricas financeiras aplicadas no
        meu projeto Financial Dashboard. Você pode vê-lo{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          neste link
        </a>{" "}
        e o artigo completo clicando{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          aqui
        </a>
        . O ponto central aqui é entender a matemática usada para transformar os dados da camada
        bronze, onde temos a informação crua como data, abertura, máxima, mínima, fechamento e
        volume, e agregar dados úteis para melhorar o consumo e o uso futuro no pipeline de dados.
      </>
    ),
    mathIs: "A matemática é:",
    example: "Exemplo:",
    why: "Por quê?",
    dailyReturn: {
      title: "Primeira métrica: Retorno Diário",
      body: (
        <>
          Nada complicado. Retorna a variação percentual entre o preço da ação de hoje e o de ontem.
        </>
      ),
      why: (
        <>
          Enxergar a variação de um dia para o outro é útil e pode ser reaproveitado depois na
          camada gold para análise.
        </>
      ),
      examples: [
        <>
          <span className="text-muted-foreground">dia 1: 150.0</span>
          <span className="text-muted-foreground"> → </span>
          <Inline>NaN</Inline>
        </>,
        <>
          <span className="text-muted-foreground">dia 2: 152.3</span>
          <span className="text-muted-foreground"> → </span>
          <span className="font-mono">(152.3 - 150.0) / 150.0 = +0.0153 (+1.53%)</span>
        </>,
        <>
          <span className="text-muted-foreground">dia 3: 149.8</span>
          <span className="text-muted-foreground"> → </span>
          <span className="font-mono">(149.8 - 152.3) / 152.3 = -0.0164 (-1.64%)</span>
        </>,
      ],
      codeLead: <>Simples, né? No código, usamos pandas:</>,
    },
    movingAverages: {
      title: "Segunda métrica: Médias Móveis (MA7, MA21, MA50)",
      body: <>A média móvel mostra o preço médio dos últimos X dias.</>,
      why: (
        <>
          Isoladamente elas mostram a direção da ação, o que não é muito forte sozinho, mas
          analisadas em conjunto podem dar sinais bem claros. Golden cross e death cross são os
          exemplos mais relevantes.
        </>
      ),
      note: (
        <>Como dá para ver, a MA7, por exemplo, só devolve um resultado válido a partir do 7º dia.</>
      ),
    },
    rsi: {
      title: "Terceira métrica: RSI (Índice de Força Relativa)",
      lead: <>Provavelmente a mais complexa desta lista, então vamos por partes.</>,
      range: <>O RSI retorna um número entre 0 e 100:</>,
      bands: [
        <>
          <B>70+</B> → sobrecomprado
        </>,
        <>
          <B>30-</B> → sobrevendido
        </>,
      ],
      why: (
        <>
          Ajuda a analisar o momentum do mercado. Às vezes as ações não são precificadas só pelo
          valor real delas: hype, notícias ou eventos inesperados influenciam o comportamento.
        </>
      ),
      mathLead: "Vamos à matemática:",
      mathItems: [
        "Período = 14 (valor padrão de mercado)",
        "Delta = diferença entre o dia atual e o dia anterior",
        "Gain = delta se positivo, caso contrário 0",
        "Loss = delta absoluto se negativo, caso contrário 0",
      ],
      thenLabel: "Depois:",
      thenItems: [
        "Average Gain = média móvel exponencial (EWM) dos ganhos",
        "Average Loss = média móvel exponencial (EWM) das perdas",
        "RS = avg_gain / avg_loss",
      ],
      ewm: {
        title: "Sobre a EWM",
        body: (
          <>
            A EWM (Exponential Weighted Mean) dá mais peso aos valores recentes. O peso decai
            exponencialmente ao longo do tempo:
          </>
        ),
        weights: [
          { label: "dia mais recente", value: "weight = 1" },
          { label: "2 dias atrás", value: "weight = (1 - α)" },
          { label: "3 dias atrás", value: "weight = (1 - α)²" },
        ],
        decay:
          "Se α está perto de 1  →  decaimento rápido (foco nos dados recentes)\nSe α está perto de 0  →  decaimento lento (memória mais longa)",
        comLead: (
          <>
            No cálculo do RSI usamos <Inline>com=period-1</Inline> no pandas, que se relaciona com o
            alpha assim:
          </>
        ),
        alphaNote: (
          <>
            Alpha pequeno → decaimento lento → todos os 14 dias importam, não só os mais recentes.
          </>
        ),
      },
      formulaTitle: "Fórmula final do RSI",
      interpretationLead: <>O resultado é interpretado assim:</>,
      interpretation: ["RSI < 30  →  sobrevendido", "RSI > 70  →  sobrecomprado"],
      codeTitle: "Código",
    },
    macd: {
      title: "Quarto indicador: MACD (Moving Average Convergence Divergence)",
      body: (
        <>
          O MACD mostra o momentum da ação usando EMA (Exponential Moving Average) para dar mais
          peso aos valores recentes.
        </>
      ),
      emaLead: (
        <>
          Diferente de uma média móvel simples, em que todos os dias têm o mesmo peso, a EMA aplica
          um decaimento exponencial:
        </>
      ),
      alphaLead: "Onde o alpha é definido como:",
      alphaBlock:
        "α = 2 / (span + 1)\n\nspan = 12  →  α ≈ 0.154  (mais reativa, curto prazo)\nspan = 26  →  α ≈ 0.074  (mais suave, longo prazo)",
      spanNote: (
        <>
          Ou seja, a EMA12 reage mais rápido às mudanças de preço, enquanto a EMA26 captura a
          tendência mais longa.
        </>
      ),
      signal: (
        <>
          A <B>linha de sinal do MACD</B> é uma EMA do próprio MACD (span=9), usada para identificar
          gatilhos de compra e venda.
        </>
      ),
      histogram: (
        <>
          O <B>histograma do MACD</B> é a diferença entre o MACD e a linha de sinal:
        </>
      ),
      tableHead: { value: "Valor", meaning: "Significado" },
      tableRows: [
        { value: "Positivo e subindo", meaning: "Momentum crescente" },
        { value: "Positivo e caindo", meaning: "Ação em alta perdendo força" },
        { value: "Negativo e caindo", meaning: "Momentum de queda acelerando" },
        { value: "Negativo e subindo", meaning: "Ainda caindo, mas perdendo força" },
      ],
    },
    volatility: {
      title: "Quinta métrica: Volatilidade (21 dias)",
      body: (
        <>
          Simples, mas útil: avalia o desvio padrão dos retornos diários dos últimos 21 dias. Mais
          volatilidade significa oscilações maiores de preço no período. Usamos isso para calibrar a
          relação risco/retorno.
        </>
      ),
    },
    code: {
      title: "Código (MACD + Volatilidade)",
      closing: <>Com isso, fechamos a nossa camada silver.</>,
    },
    conclusion: {
      title: "Conclusão",
      body: (
        <>
          Dá para criar, a partir de dados crus, indicadores realmente interessantes e úteis que
          agregam informação e extraem valor real. Dado sem propósito não serve para nada, é preciso
          aprender a extrair significado dele. E esse é o ponto deste artigo: não a matemática, não
          o código, mas o fato de que dá para tirar insights do mundo real a partir de dados. É isso
          que faz esse trabalho valer a pena.
        </>
      ),
    },
  },
}

export function FinancialMetricsArticle({ locale }: { locale: Locale }) {
  const c = pickCopy(copy, locale)

  return (
    <div className="space-y-5 text-foreground">

      {/* Intro */}
      <p className="leading-relaxed">{c.intro}</p>

      <hr className="border-t border-border" />

      {/* ===== DAILY RETURN ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.dailyReturn.title}</h2>

        <p className="leading-relaxed">{c.dailyReturn.body}</p>

        <p className="leading-relaxed">
          <B>{c.why}</B> {c.dailyReturn.why}
        </p>

        <p className="text-muted-foreground text-sm">{c.mathIs}</p>

        <Block>{code.dailyReturnMath}</Block>

        <p className="text-muted-foreground text-sm">{c.example}</p>

        <Bullets items={c.dailyReturn.examples} />

        <p className="leading-relaxed">{c.dailyReturn.codeLead}</p>

        <Block lang="python">{code.dailyReturnPandas}</Block>
      </section>

      <hr className="border-t border-border" />

      {/* ===== MOVING AVERAGES ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.movingAverages.title}</h2>

        <p className="leading-relaxed">{c.movingAverages.body}</p>

        <p className="leading-relaxed">
          <B>{c.why}</B> {c.movingAverages.why}
        </p>

        <p className="text-muted-foreground text-sm">{c.mathIs}</p>

        <Block>{code.maMath}</Block>

        <p className="leading-relaxed">{c.movingAverages.note}</p>

        <Block lang="python">{code.maPandas}</Block>
      </section>

      <hr className="border-t border-border" />

      {/* ===== RSI ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.rsi.title}</h2>

        <p className="leading-relaxed">{c.rsi.lead}</p>

        <p className="leading-relaxed">{c.rsi.range}</p>

        <Bullets items={c.rsi.bands} tight />

        <p className="leading-relaxed">
          <B>{c.why}</B> {c.rsi.why}
        </p>

        <p className="text-muted-foreground text-sm">{c.rsi.mathLead}</p>

        <Bullets items={c.rsi.mathItems} tight />

        <p className="text-muted-foreground text-sm">{c.rsi.thenLabel}</p>

        <Bullets items={c.rsi.thenItems} tight />

        {/* About EWM */}
        <div className="space-y-4 rounded-lg border border-border bg-secondary/30 p-5">
          <h3 className="text-base font-semibold text-foreground">{c.rsi.ewm.title}</h3>

          <p className="leading-relaxed text-sm">{c.rsi.ewm.body}</p>

          <ul className="space-y-1.5 pl-1">
            {c.rsi.ewm.weights.map(({ label, value }, i) => (
              <li key={i} className="flex gap-2.5 text-sm">
                <Dash />
                <span>
                  <span className="text-muted-foreground">{label}:</span>{" "}
                  <span className="font-mono">{value}</span>
                </span>
              </li>
            ))}
          </ul>

          <Block>{c.rsi.ewm.decay}</Block>

          <p className="leading-relaxed text-sm">{c.rsi.ewm.comLead}</p>

          <Block>{code.rsiAlpha}</Block>

          <p className="leading-relaxed text-sm">{c.rsi.ewm.alphaNote}</p>
        </div>

        {/* Final RSI formula */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground pt-2">{c.rsi.formulaTitle}</h3>

          <Block>{code.rsiFinal}</Block>

          <p className="leading-relaxed text-sm">{c.rsi.interpretationLead}</p>

          <ul className="space-y-1.5 pl-1">
            {c.rsi.interpretation.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm">
                <Dash />
                <span className="font-mono">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RSI Code */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground pt-2">{c.rsi.codeTitle}</h3>

          <Block lang="python">{code.rsiCode}</Block>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ===== MACD ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.macd.title}</h2>

        <p className="leading-relaxed">{c.macd.body}</p>

        <p className="leading-relaxed">{c.macd.emaLead}</p>

        <Block>{code.emaFormula}</Block>

        <p className="text-muted-foreground text-sm">{c.macd.alphaLead}</p>

        <Block>{c.macd.alphaBlock}</Block>

        <p className="leading-relaxed">{c.macd.spanNote}</p>

        <Block>{code.macd}</Block>

        <p className="leading-relaxed">{c.macd.signal}</p>

        <p className="leading-relaxed">{c.macd.histogram}</p>

        <Block>{code.macdHist}</Block>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.macd.tableHead.value}
                </th>
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.macd.tableHead.meaning}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {c.macd.tableRows.map(({ value, meaning }, i) => (
                <tr key={i} className="transition-colors hover:bg-secondary/50">
                  <td className="px-4 py-3 text-foreground">{value}</td>
                  <td className="px-4 py-3 text-muted-foreground">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ===== VOLATILITY ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.volatility.title}</h2>

        <p className="leading-relaxed">{c.volatility.body}</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== CODE (MACD + VOLATILITY) ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.code.title}</h2>

        <Block lang="python">{code.macdCode}</Block>

        <p className="leading-relaxed">{c.code.closing}</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== CONCLUSION ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.conclusion.title}</h2>

        <p className="leading-relaxed">{c.conclusion.body}</p>
      </section>
    </div>
  )
}
