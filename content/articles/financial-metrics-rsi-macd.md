---
title: "From Raw Prices to Real Signals: Financial Metrics for a Data Pipeline (Daily Return, MA, RSI, MACD, Volatility)"
published: false
description: "How I compute and reason about Daily Return, Moving Averages, RSI, MACD, and Volatility to transform raw OHLCV data into useful indicators in a financial dashboard's silver layer."
tags: python, datascience, finance, pandas
---

In this article I will share my understanding and use of some financial metrics used in my Financial Dashboard project. You can see it in [this link](#) and the full article by clicking [here](#).

The main point here is understanding the math used to transform data from the **bronze layer** (where we have raw information such as date, open, high, low, close, and volume) and aggregate useful data to improve consumption and future use in the data pipeline.

---

## First metric: Daily Return

Not a difficult one. It returns the percentage change between today's and yesterday's stock prices.

**Why?** Seeing day-to-day changes can be useful and later used in the gold layer for analysis.

The math is:

```
(today - yesterday) / yesterday
```

Example:

- day 1: 150.0 → `NaN`
- day 2: 152.3 → `(152.3 - 150.0) / 150.0 = +0.0153 (+1.53%)`
- day 3: 149.8 → `(149.8 - 152.3) / 152.3 = -0.0164 (-1.64%)`

Simple, right? In code, we use pandas:

```python
close.pct_change()
```

---

## Second metric: Moving Averages (MA7, MA21, MA50)

Moving average shows the average price over the last X days.

**Why?** Individually, they show the direction of the stock. Not very powerful alone, but when analyzed together they can provide strong signals. Golden cross and death cross are the most relevant examples.

The math is:

```
MA(X) = (day_t + day_(t-1) + ... + day_(t-X+1)) / X
```

As we can see, for example, MA7 will only return a valid result after the 7th day.

```python
df["ma_7"] = close.rolling(7).mean()
```

---

## Third metric: RSI (Relative Strength Index)

Probably the most complex in this list, so let's go step by step.

RSI returns a number between 0 and 100:

- **70+** → overbought
- **30-** → oversold

**Why?** It helps analyze market momentum. Sometimes stocks are not priced only by their real value. Hype, news, or unexpected events can influence behavior.

Let's dive into the math:

- Period = 14 (default market value)
- Delta = difference between current day and previous day
- Gain = delta if positive, otherwise 0
- Loss = absolute delta if negative, otherwise 0

Then:

- Average Gain = exponential moving average (EWM) of gains
- Average Loss = exponential moving average (EWM) of losses
- RS = avg_gain / avg_loss

### About EWM

EWM (Exponential Weighted Mean) gives more weight to recent values. The weight decays exponentially over time:

- most recent day: `weight = 1`
- 2 days ago: `weight = (1 - α)`
- 3 days ago: `weight = (1 - α)²`

```
If α is close to 1  →  fast decay (focus on recent data)
If α is close to 0  →  slow decay (longer memory)
```

In the RSI calculation, we use `com=period-1` in pandas, which relates to alpha as:

```
α = 1 / (1 + com) = 1 / 14
```

Small alpha → slow decay → all 14 days matter, not just the most recent ones.

### Final RSI formula

```
RSI = 100 - (100 / (1 + RS))
```

The result is interpreted as:

- `RSI < 30  →  oversold`
- `RSI > 70  →  overbought`

### Code

```python
def _rsi(close: pd.Series, period: int = 14) -> pd.Series:
    delta = close.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(com=period - 1, min_periods=period).mean()
    avg_loss = loss.ewm(com=period - 1, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0, float("nan"))  # Avoid division by zero
    return 100 - (100 / (1 + rs))
```

---

## Fourth indicator: MACD (Moving Average Convergence Divergence)

MACD shows the momentum of the stock using EMA (Exponential Moving Average) to weight recent values more heavily.

Unlike a simple moving average where all days have equal weight, EMA applies exponential decay:

```
EMA(t) = Price(t) × α + EMA(t-1) × (1 - α)
```

Where alpha is defined as:

```
α = 2 / (span + 1)

span = 12  →  α ≈ 0.154  (more reactive, short-term)
span = 26  →  α ≈ 0.074  (smoother, long-term)
```

So EMA12 reacts faster to price changes, while EMA26 captures the longer trend.

```
MACD = EMA12 - EMA26
```

The **MACD Signal line** is an EMA of the MACD itself (span=9), used to identify buy/sell triggers.

The **MACD Histogram** is the difference between MACD and Signal:

```
MACD Histogram = MACD - Signal
```

| Value | Meaning |
| --- | --- |
| Positive and going up | Growing momentum |
| Positive and going down | High stock losing strength |
| Negative and going down | Downward momentum accelerating |
| Negative and rising | Going down but losing strength |

---

## Fifth metric: Volatility (21-day)

Simple but useful. It evaluates the standard deviation of daily returns over the last 21 days. Higher volatility means bigger price oscillations in the period. We use it to set risk/reward accuracy.

---

## Code (MACD + Volatility)

```python
ema12 = close.ewm(span=12, adjust=False).mean()
ema26 = close.ewm(span=26, adjust=False).mean()
df["macd"] = ema12 - ema26
df["macd_signal"] = df["macd"].ewm(span=9, adjust=False).mean()
df["macd_hist"] = df["macd"] - df["macd_signal"]
df["volatility_21"] = df["daily_return"].rolling(21).std()
```

With that, we complete our silver layer.

---

## Conclusion

We can create from raw data some really interesting and useful indicators to aggregate information and extract real value from it. Data without purpose is useless. We need to learn how to extract meaning from it.

And that's the point of this article: not the math, not the code, but that we can get real-world insights from data. That's what makes this work worthwhile.
