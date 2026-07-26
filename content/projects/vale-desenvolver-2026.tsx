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
        The dataset is proprietary and is not redistributed. The code, the methodology, and the
        results are public.
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
              <strong className="font-semibold">Real scale:</strong> tens of millions of telemetry
              records, processed on a commodity machine, which demanded careful memory engineering.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Rare events:</strong> Don&apos;t Go alerts are
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
              <strong className="font-semibold">Data quality diagnosis and cleaning:</strong>{" "}
              identifying and correcting real issues (encoding corruption, null values masked as
              text, inconsistent decimal separators), with documented change control
              (before/after + rationale).
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Temporal feature engineering:</strong> alarm counts
              across multiple sliding windows, time since the last critical event, and equipment
              type, all computed in a vectorized way and{" "}
              <strong className="font-semibold">with no temporal leakage</strong>.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Comparative modeling:</strong> reference baselines,
              a main gradient boosting model, and a second approach to cross-validate results, all
              evaluated on the <strong className="font-semibold">same temporal split</strong> (train
              on the past, test on the future, never random).
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
              <strong className="font-semibold">Explainability and error analysis:</strong> SHAP to
              interpret the model and a critical analysis of where and when it fails (including
              temporal drift detection).
            </span>
          </li>
        </ul>
      </section>

      <hr className="border-t border-border" />

      {/* ===== RESULTS ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">Results</h2>

        <p className="leading-relaxed">
          Don&apos;t Go events are rare: only 1.6% of the test window is positive. In that regime a
          low absolute F1 is the expected outcome, not a failure, and the honest question is not
          &quot;is F1 high?&quot; but{" "}
          <strong className="font-semibold">
            &quot;how much better is this than what operations could do without a model?&quot;
          </strong>{" "}
          So the reference point is the best rule-based heuristic, not a perfect classifier.
        </p>

        <p className="leading-relaxed">
          Every number below comes from the same temporal split: trained on January to April
          (23,273,520 rows) and tested on May and June (13,890,534 rows), predicting a Don&apos;t Go
          event within the next 4 hours (<Inline>label_4h</Inline>).
        </p>

        <ul className="space-y-2 pl-1">
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">XGBoost (selected model):</strong> F1 0.186,
              precision 0.111, recall 0.577, AUC-ROC 0.767, AUC-PR 0.205.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Best heuristic baseline</strong> (
              <Inline>critical_1h &gt; 0</Inline>): F1 0.038.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Gain: 4.9x the F1 of the best heuristic</strong>, and
              an AUC-PR 12.5x the base rate of the event. Both comparisons are the ones that
              actually matter operationally.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Cross-check:</strong> LightGBM, trained
              independently as a second approach, landed at F1 0.185. Two different algorithms
              converging on the same number is evidence that the result comes from the features and
              the split, not from one lucky model.
            </span>
          </li>
        </ul>

        <p className="leading-relaxed">
          Recall was the deliberate priority. Catching 57.7% of the events at 11.1% precision means
          most alerts will not turn into a stop, and that trade is only defensible because the two
          errors do not cost the same. The next section is where that gets pulled apart.
        </p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== ERROR ANALYSIS ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Error Analysis: Where the Model Breaks
        </h2>

        <p className="leading-relaxed">
          A model that only reports its wins is not auditable. Breaking the 96,918 false negatives
          down by month, equipment type, and alarm volume turned out to be the most useful part of
          the project, because it says precisely where the model can be trusted and where it cannot.
          The two error types are not interchangeable in the field: a false negative is a
          Don&apos;t Go that was never anticipated, so an unplanned stop, while a false positive is
          an alert with no Don&apos;t Go behind it, so an unnecessary inspection.
        </p>

        <ul className="space-y-2 pl-1">
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Temporal drift:</strong> recall is 0.423 in May
              against 0.922 in June. The same model, on two consecutive months of the same test
              window, behaves like two different models. Anything shipped on this data needs
              monitoring and periodic retraining, not a one-off fit.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Bias by equipment type:</strong> of the 96,918 false
              negatives, 94,932 are excavators against 1,986 trucks. Almost every miss is an
              excavator, which lines up with what SHAP had already shown: the model leans on a
              baseline risk per equipment type instead of on the dynamic alarm pattern.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <Dash />
            <span>
              <strong className="font-semibold">Concentration in noisy regimes:</strong> 96,869 of
              the 96,918 false negatives sit in the band of 21 or more alarms in 4 hours. Once the
              equipment is already alarming heavily, the counts saturate and stop discriminating, so
              the misses pile up exactly where an operator would most want a second opinion.
            </span>
          </li>
        </ul>

        <p className="leading-relaxed">
          None of this is solved by moving a threshold. It points at a concrete next iteration:
          features that separate signal inside high-alarm regimes, and calibration per equipment
          type rather than a single global model.
        </p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== EXPLAINABILITY ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">
          Explainability: What the Model Actually Learned
        </h2>

        <p className="leading-relaxed">
          Instead of treating the model as a black box, I used SHAP to understand which signals drive
          the predictions, and to honestly expose a limitation: the model leans more on a baseline
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
          Exploratory Analysis: Relationships Between Variables
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
              memory optimization), a problem that only shows up outside the toy dataset.
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
