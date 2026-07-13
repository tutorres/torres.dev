import type { FC } from "react"
import { Badge } from "@/components/ui/badge"

const Inline: FC<{ children: string }> = ({ children }) => (
  <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded-sm text-foreground">
    {children}
  </code>
)

const Dash: FC = () => (
  <span className="text-muted-foreground font-mono mt-0.5 shrink-0">—</span>
)

const Figure: FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <figure className="space-y-2">
    <img src={src} alt={alt} className="w-full rounded-lg border border-border" />
    <figcaption className="text-center text-xs text-muted-foreground">{caption}</figcaption>
  </figure>
)

const stack = [
  "Python",
  "pandas",
  "PyArrow",
  "DuckDB",
  "XGBoost",
  "LightGBM",
  "scikit-learn",
  "imbalanced-learn",
  "SHAP",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "pytest",
  "Git",
]

export function ValeDesenvolverCaseStudy() {
  return (
    <div className="space-y-5 text-foreground">

      {/* Intro */}
      <p className="leading-relaxed">
        Developed within the Programa Desenvolver (Vale). An end-to-end analytical solution to
        anticipate critical equipment stop alerts (&quot;Don&apos;t Go&quot;) from the telemetry
        alarm history, allowing operations to act before a failure instead of merely reacting to it.
      </p>

      <blockquote className="border-l-2 border-border pl-4 text-sm italic leading-relaxed text-muted-foreground">
        The data is proprietary and is not redistributed. This case describes the technical
        approach; the quantitative results remain in the challenge report.
      </blockquote>

      <hr className="border-t border-border" />

      {/* ===== THE PROBLEM ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">The Problem</h2>

        <p className="leading-relaxed">
          Mining equipment (haul trucks and excavators) emits a constant stream of telemetry alarms.
          Among them are the &quot;Don&apos;t Go&quot; alerts: conditions in which the equipment must
          not operate, with a direct impact on safety, fleet availability, and production. The
          challenge: <strong className="font-semibold">predict these events hours in advance</strong>,
          turning a historical log into an operational decision tool.
        </p>

        <p className="leading-relaxed">Two obstacles defined the project:</p>

        <ul className="space-y-2 pl-1">
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Real scale</strong> — tens of millions of telemetry
              records, processed on a commodity machine, which demanded careful memory engineering.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Rare events</strong> — Don&apos;t Go alerts are
              highly imbalanced, which makes accuracy misleading and requires specific metrics and
              strategies.
            </span>
          </li>
        </ul>
      </section>

      <hr className="border-t border-border" />

      {/* ===== THE APPROACH ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">The Approach</h2>

        <p className="leading-relaxed">
          A reproducible, modular, and tested pipeline covering every stage of a data solution:
        </p>

        <ul className="space-y-2 pl-1">
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Data quality diagnosis and cleaning</strong> —
              identifying and correcting real issues (encoding corruption, null values masked as
              text, inconsistent decimal separators), with documented change control
              (before/after + rationale).
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Temporal feature engineering</strong> — alarm counts
              across multiple sliding windows, time since the last critical event, and equipment
              type, all computed in a vectorized way and{" "}
              <strong className="font-semibold">with no temporal leakage</strong>.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Comparative modeling</strong> — reference baselines,
              a main gradient boosting model, and a second approach to cross-validate results, all
              evaluated on the <strong className="font-semibold">same temporal split</strong> (train
              on the past, test on the future — never random).
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Imbalance handling</strong> and a choice of metrics
              suited to rare events (precision/recall, F1, AUC-ROC, and AUC-PR instead of accuracy).
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Explainability and error analysis</strong> — SHAP to
              interpret the model and a critical analysis of where and when it fails (including
              temporal drift detection).
            </span>
          </li>
        </ul>
      </section>

      <hr className="border-t border-border" />

      {/* ===== EXPLAINABILITY ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Explainability — What the Model Actually Learned
        </h2>

        <p className="leading-relaxed">
          Instead of treating the model as a black box, I used SHAP to understand which signals drive
          the predictions — and to honestly expose a limitation: the model leans more on a baseline
          risk per equipment type than on the fine-grained dynamic alarm pattern that precedes a
          failure. This kind of critical reading is what separates &quot;a model that runs&quot; from
          &quot;a model that is understood&quot;.
        </p>

        <Figure
          src="/vale/shap_summary.png"
          alt="Feature importance and direction via SHAP"
          caption="Feature importance and direction via SHAP"
        />
      </section>

      <hr className="border-t border-border" />

      {/* ===== EXPLORATORY ANALYSIS ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Exploratory Analysis — Relationships Between Variables
        </h2>

        <p className="leading-relaxed">
          Before modeling, I mapped the structure of the data and the relationships between the
          engineered features, identifying redundancies (multicollinearity) and hypotheses to test
          during modeling.
        </p>

        <Figure
          src="/vale/feature_correlation.png"
          alt="Correlation map across the numeric features"
          caption="Correlation map across the numeric features"
        />
      </section>

      <hr className="border-t border-border" />

      {/* ===== WHAT I LEARNED ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">What I Learned</h2>

        <ul className="space-y-2 pl-1">
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Engineering matters as much as the model.</strong>{" "}
              Much of the effort went into making the pipeline viable at real scale (data type and
              memory optimization) — a problem that only shows up outside the toy dataset.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Analytical honesty is a skill.</strong> Reporting the
              model&apos;s limitations (bias by equipment type, temporal drift, cost of false
              positives) is worth more than dressing up a result.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Software rigor in data science.</strong>{" "}
              Test-driven development (TDD), documented decisions, and reproducibility turn an
              exploratory notebook into an auditable solution.
            </span>
          </li>
        </ul>
      </section>

      <hr className="border-t border-border" />

      {/* ===== STACK ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">Stack</h2>

        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* ===== SKILLS DEMONSTRATED ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">Skills Demonstrated</h2>

        <p className="leading-relaxed text-sm text-muted-foreground">
          Data engineering / ETL at scale · Temporal feature engineering · Machine learning with
          imbalanced classes · Temporal validation (no data leakage) · Model and baseline comparison
          · Explainability (SHAP) · Error and drift analysis · TDD and reproducibility · Technical
          communication and translation into business impact.
        </p>
      </section>

      <hr className="border-t border-border" />

      <p className="text-sm italic text-muted-foreground">
        Reproducible source code available on GitHub. Dataset not included (proprietary data).
      </p>
    </div>
  )
}
