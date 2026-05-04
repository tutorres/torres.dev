import type { FC } from "react"

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
  <span className="text-muted-foreground font-mono mt-0.5 shrink-0">—</span>
)

export function FinancialMetricsArticle() {
  return (
    <div className="space-y-5 text-foreground">

      {/* Intro */}
      <p className="leading-relaxed">
        In this article I will share my understanding and use of some financial metrics used in my
        Financial Dashboard project. You can see it in{" "}
        <a href="#" className="underline underline-offset-4 hover:text-muted-foreground transition-colors">
          this link
        </a>{" "}
        and the full article by clicking{" "}
        <a href="#" className="underline underline-offset-4 hover:text-muted-foreground transition-colors">
          here
        </a>
        . The main point here is understanding the math used to transform data from the bronze layer,
        where we have raw information such as date, open, high, low, close, and volume, and aggregate
        useful data to improve consumption and future use in the data pipeline.
      </p>

      <hr className="border-t border-border" />

      {/* ===== DAILY RETURN ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          First metric: Daily Return
        </h2>

        <p className="leading-relaxed">
          Not a difficult one. It returns the percentage change between today's and yesterday's stock
          prices.
        </p>

        <p className="leading-relaxed">
          <strong className="font-semibold">Why?</strong> Seeing day-to-day changes can be useful and
          later used in the gold layer for analysis.
        </p>

        <p className="text-muted-foreground text-sm">The math is:</p>

        <Block>{"(today - yesterday) / yesterday"}</Block>

        <p className="text-muted-foreground text-sm">Example:</p>

        <ul className="space-y-2 pl-1">
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <span className="text-muted-foreground">day 1: 150.0</span>
              <span className="text-muted-foreground"> → </span>
              <Inline>NaN</Inline>
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <span className="text-muted-foreground">day 2: 152.3</span>
              <span className="text-muted-foreground"> → </span>
              <span className="font-mono">(152.3 - 150.0) / 150.0 = +0.0153 (+1.53%)</span>
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <span className="text-muted-foreground">day 3: 149.8</span>
              <span className="text-muted-foreground"> → </span>
              <span className="font-mono">(149.8 - 152.3) / 152.3 = -0.0164 (-1.64%)</span>
            </span>
          </li>
        </ul>

        <p className="leading-relaxed">Simple, right? In code, we use pandas:</p>

        <Block lang="python">{"close.pct_change()"}</Block>
      </section>

      <hr className="border-t border-border" />

      {/* ===== MOVING AVERAGES ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Second metric:Moving Averages (MA7, MA21, MA50)
        </h2>

        <p className="leading-relaxed">
          Moving average shows the average price over the last X days.
        </p>

        <p className="leading-relaxed">
          <strong className="font-semibold">Why?</strong> Individually, they show the direction of the
          stock, not very powerful alone, but when analyzed together they can provide strong signals.
          Golden cross and death cross are the most relevant examples.
        </p>

        <p className="text-muted-foreground text-sm">The math is:</p>

        <Block>{`MA(X) = (day_t + day_(t-1) + ... + day_(t-X+1)) / X`}</Block>

        <p className="leading-relaxed">
          As we can see, for example, MA7 will only return a valid result after the 7th day.
        </p>

        <Block lang="python">{'df["ma_7"] = close.rolling(7).mean()'}</Block>
      </section>

      <hr className="border-t border-border" />

      {/* ===== RSI ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Third metric:  RSI (Relative Strength Index)
        </h2>

        <p className="leading-relaxed">
          Probably the most complex in this list, so let's go step by step.
        </p>

        <p className="leading-relaxed">RSI returns a number between 0 and 100:</p>

        <ul className="space-y-1.5 pl-1">
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">70+</strong> → overbought
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">30-</strong> → oversold
            </span>
          </li>
        </ul>

        <p className="leading-relaxed">
          <strong className="font-semibold">Why?</strong> It helps analyze market momentum. Sometimes
          stocks are not priced only by their real value, hype, news, or unexpected events can
          influence behavior.
        </p>

        <p className="text-muted-foreground text-sm">Let's dive into the math:</p>

        <ul className="space-y-1.5 pl-1">
          {[
            "Period = 14 (default market value)",
            "Delta = difference between current day and previous day",
            "Gain = delta if positive, otherwise 0",
            "Loss = absolute delta if negative, otherwise 0",
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm">
              <Dash />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground text-sm">Then:</p>

        <ul className="space-y-1.5 pl-1">
          {[
            "Average Gain = exponential moving average (EWM) of gains",
            "Average Loss = exponential moving average (EWM) of losses",
            "RS = avg_gain / avg_loss",
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm">
              <Dash />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* About EWM */}
        <div className="space-y-4 rounded-lg border border-border bg-secondary/30 p-5">
          <h3 className="text-base font-semibold text-foreground">About EWM</h3>

          <p className="leading-relaxed text-sm">
            EWM (Exponential Weighted Mean) gives more weight to recent values. The weight decays
            exponentially over time:
          </p>

          <ul className="space-y-1.5 pl-1">
            {[
              { label: "most recent day", value: "weight = 1" },
              { label: "2 days ago", value: "weight = (1 - α)" },
              { label: "3 days ago", value: "weight = (1 - α)²" },
            ].map(({ label, value }, i) => (
              <li key={i} className="flex gap-2.5 text-sm">
                <Dash />
                <span>
                  <span className="text-muted-foreground">{label}:</span>{" "}
                  <span className="font-mono">{value}</span>
                </span>
              </li>
            ))}
          </ul>

          <Block>{`If α is close to 1  →  fast decay (focus on recent data)\nIf α is close to 0  →  slow decay (longer memory)`}</Block>

          <p className="leading-relaxed text-sm">
            In the RSI calculation, we use <Inline>com=period-1</Inline> in pandas, which relates to
            alpha as:
          </p>

          <Block>{"α = 1 / (1 + com) = 1 / 14"}</Block>

          <p className="leading-relaxed text-sm">
            Small alpha → slow decay → all 14 days matter, not just the most recent ones.
          </p>
        </div>

        {/* Final RSI formula */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground pt-2">Final RSI formula</h3>

          <Block>{"RSI = 100 - (100 / (1 + RS))"}</Block>

          <p className="leading-relaxed text-sm">The result is interpreted as:</p>

          <ul className="space-y-1.5 pl-1">
            {["RSI < 30  →  oversold", "RSI > 70  →  overbought"].map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm">
                <Dash />
                <span className="font-mono">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RSI Code */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground pt-2">Code</h3>

          <Block lang="python">{`def _rsi(close: pd.Series, period: int = 14) -> pd.Series:
    delta = close.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(com=period - 1, min_periods=period).mean()
    avg_loss = loss.ewm(com=period - 1, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0, float("nan"))  # Avoid division by zero
    return 100 - (100 / (1 + rs))`}</Block>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ===== MACD ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Fourth indicator: MACD (Moving Average Convergence Divergence)
        </h2>

        <p className="leading-relaxed">
          MACD shows the momentum of the stock using EMA (Exponential Moving Average) to weight
          recent values more heavily.
        </p>

        <p className="leading-relaxed">
          Unlike a simple moving average where all days have equal weight, EMA applies exponential
          decay:
        </p>

        <Block>{"EMA(t) = Price(t) × α + EMA(t-1) × (1 - α)"}</Block>

        <p className="text-muted-foreground text-sm">Where alpha is defined as:</p>

        <Block>{`α = 2 / (span + 1)\n\nspan = 12  →  α ≈ 0.154  (more reactive, short-term)\nspan = 26  →  α ≈ 0.074  (smoother, long-term)`}</Block>

        <p className="leading-relaxed">
          So EMA12 reacts faster to price changes, while EMA26 captures the longer trend.
        </p>

        <Block>{"MACD = EMA12 - EMA26"}</Block>

        <p className="leading-relaxed">
          The <strong className="font-semibold">MACD Signal line</strong> is an EMA of the MACD
          itself (span=9), used to identify buy/sell triggers.
        </p>

        <p className="leading-relaxed">
          The <strong className="font-semibold">MACD Histogram</strong> is the difference between
          MACD and Signal:
        </p>

        <Block>{"MACD Histogram = MACD - Signal"}</Block>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Value
                </th>
                <th className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { value: "Positive and going up", meaning: "Growing momentum" },
                { value: "Positive and going down", meaning: "High stock losing strength" },
                { value: "Negative and going down", meaning: "Downward momentum accelerating" },
                { value: "Negative and rising", meaning: "Going down but losing strength" },
              ].map(({ value, meaning }, i) => (
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
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Fifth metric: Volatility (21-day)
        </h2>

        <p className="leading-relaxed">
          Simple but useful, evaluates the standard deviation of daily returns over the last 21
          days. Higher volatility means bigger price oscillations in the period. We use it to set
          risk/reward accuracy.
        </p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== CODE (MACD + VOLATILITY) ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">Code (MACD + Volatility)</h2>

        <Block lang="python">{`ema12 = close.ewm(span=12, adjust=False).mean()
ema26 = close.ewm(span=26, adjust=False).mean()
df["macd"] = ema12 - ema26
df["macd_signal"] = df["macd"].ewm(span=9, adjust=False).mean()
df["macd_hist"] = df["macd"] - df["macd_signal"]
df["volatility_21"] = df["daily_return"].rolling(21).std()`}</Block>

        <p className="leading-relaxed">With that, we complete our silver layer.</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== CONCLUSION ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">Conclusion</h2>

        <p className="leading-relaxed">
          We can create from raw data some really interesting and useful indicators to aggregate
          information and extract real value from it. Data without purpose is useless, we need to
          learn how to extract meaning from it. And that's the point of this article: not the math,
          not the code, but that we can get real-world insights from data. That's what makes this
          work worthwhile.
        </p>
      </section>
    </div>
  )
}
