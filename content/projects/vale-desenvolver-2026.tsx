import type { FC, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { type Locale, pickCopy } from "@/lib/i18n"

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

const Bullets: FC<{ items: ReactNode[] }> = ({ items }) => (
  <ul className="space-y-2 pl-1">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2.5 text-sm">
        <Dash />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const B: FC<{ children: ReactNode }> = ({ children }) => (
  <strong className="font-semibold">{children}</strong>
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

interface Copy {
  intro: ReactNode
  disclaimer: ReactNode
  problem: { title: string; body: ReactNode; lead: ReactNode; bullets: ReactNode[] }
  approach: { title: string; lead: ReactNode; bullets: ReactNode[] }
  results: {
    title: string
    rarity: ReactNode
    split: ReactNode
    bullets: ReactNode[]
    tradeoff: ReactNode
  }
  errors: {
    title: string
    threshold: ReactNode
    unitNote: ReactNode
    lead: ReactNode
    bullets: ReactNode[]
    closing: ReactNode
  }
  explainability: { title: string; body: ReactNode; alt: string; caption: string }
  eda: { title: string; body: ReactNode; alt: string; caption: string }
  learned: { title: string; bullets: ReactNode[] }
  stackTitle: string
  skills: { title: string; body: ReactNode }
  footnote: ReactNode
}

const copy: Record<Locale, Copy> = {
  en: {
    intro: (
      <>
        Developed within the Programa Desenvolver (Vale). An end-to-end analytical solution to
        anticipate critical equipment stop alerts (&quot;Don&apos;t Go&quot;) from the telemetry
        alarm history, allowing operations to act before a failure instead of merely reacting to it.
      </>
    ),
    disclaimer: (
      <>
        The dataset is proprietary and is not redistributed. The code, the methodology, and the
        results are public.
      </>
    ),
    problem: {
      title: "The Problem",
      body: (
        <>
          Mining equipment (haul trucks and excavators) emits a constant stream of telemetry alarms.
          Among them are the &quot;Don&apos;t Go&quot; alerts: conditions in which the equipment must
          not operate, with a direct impact on safety, fleet availability, and production. The
          challenge: <B>predict these events hours in advance</B>, turning a historical log into an
          operational decision tool.
        </>
      ),
      lead: <>Two obstacles defined the project:</>,
      bullets: [
        <>
          <B>Real scale:</B> tens of millions of telemetry records, processed on a commodity
          machine, which demanded careful memory engineering.
        </>,
        <>
          <B>Rare events:</B> Don&apos;t Go alerts are highly imbalanced, which makes accuracy
          misleading and requires specific metrics and strategies.
        </>,
      ],
    },
    approach: {
      title: "The Approach",
      lead: (
        <>A reproducible, modular, and tested pipeline covering every stage of a data solution:</>
      ),
      bullets: [
        <>
          <B>Data quality diagnosis and cleaning:</B> identifying and correcting real issues
          (encoding corruption, null values masked as text, inconsistent decimal separators), with
          documented change control (before/after + rationale).
        </>,
        <>
          <B>Temporal feature engineering:</B> alarm counts across multiple sliding windows, time
          since the last critical event, and equipment type, all computed in a vectorized way and{" "}
          <B>with no temporal leakage</B>.
        </>,
        <>
          <B>Comparative modeling:</B> reference baselines, a main gradient boosting model, and a
          second approach to cross-validate results, all evaluated on the <B>same temporal split</B>{" "}
          (train on the past, test on the future, never random).
        </>,
        <>
          <B>Imbalance handling</B> and a choice of metrics suited to rare events (precision/recall,
          F1, AUC-ROC, and AUC-PR instead of accuracy).
        </>,
        <>
          <B>Explainability and error analysis:</B> SHAP to interpret the model and a critical
          analysis of where and when it fails (including temporal drift detection).
        </>,
      ],
    },
    results: {
      title: "Results",
      rarity: (
        <>
          Don&apos;t Go events are rare: only 1.6% of the test window is positive. In that regime a
          low absolute F1 is the expected outcome, not a failure, and the honest question is not
          &quot;is F1 high?&quot; but{" "}
          <B>&quot;how much better is this than what operations could do without a model?&quot;</B>{" "}
          So the reference point is the best rule-based heuristic, not a perfect classifier.
        </>
      ),
      split: (
        <>
          Every number in this section comes from the same temporal split: trained on January to
          April (23,273,520 rows) and tested on May and June (13,890,534 rows), predicting a
          Don&apos;t Go event within the next 4 hours (<Inline>label_4h</Inline>), scored at the{" "}
          <B>default decision threshold of 0.5</B>.
        </>
      ),
      bullets: [
        <>
          <B>XGBoost (selected model), threshold 0.5:</B> F1 0.186, precision 0.111, recall 0.577,
          AUC-ROC 0.767, AUC-PR 0.205.
        </>,
        <>
          <B>Best heuristic baseline</B> (<Inline>critical_1h &gt; 0</Inline>): F1 0.038.
        </>,
        <>
          <B>Gain: 4.9x the F1 of the best heuristic</B>, and an AUC-PR 12.5x the base rate of the
          event. Both comparisons are the ones that actually matter operationally.
        </>,
        <>
          <B>Cross-check:</B> LightGBM, trained independently as a second approach and scored at the
          same threshold, landed at F1 0.185. Two different algorithms converging on the same number
          is evidence that the result comes from the features and the split, not from one lucky
          model.
        </>,
      ],
      tradeoff: (
        <>
          Recall was the deliberate priority. Catching 57.7% of the events at 11.1% precision, still
          at threshold 0.5, means most alerts will not turn into a stop, and that trade is only
          defensible because the two errors do not cost the same. The next section is where that
          gets pulled apart.
        </>
      ),
    },
    errors: {
      title: "Error Analysis: Where the Model Breaks",
      threshold: (
        <>
          One label before the numbers: the error analysis is run at <B>threshold 0.7</B>, not at
          the 0.5 used in the section above. The stricter cut buys a little precision for a little
          recall, landing at <B>recall 0.574 and precision 0.126</B>, with 130,705 true positives,
          907,848 false positives, and 96,918 false negatives against 227,623 positive rows. Every
          count below refers to that 0.7 threshold.
        </>
      ),
      unitNote: (
        <>
          These are <B>row counts, not distinct events</B>. Each telemetry record inside the 4h
          window before a Don&apos;t Go is labelled positive, so a single event contributes many
          positive rows. Row level is the right unit for scoring the classifier, but converting
          these figures into a count of anticipated stoppages would require deduplicating by event
          first.
        </>
      ),
      lead: (
        <>
          A model that only reports its wins is not auditable. Breaking those 96,918 false negatives
          down by month, equipment type, and alarm volume turned out to be the most useful part of
          the project, because it says precisely where the model can be trusted and where it cannot.
          The two error types are not interchangeable in the field: a false negative is a
          Don&apos;t Go that was never anticipated, so an unplanned stop, while a false positive is
          an alert with no Don&apos;t Go behind it, so an unnecessary inspection.
        </>
      ),
      bullets: [
        <>
          <B>Temporal drift:</B> recall is 0.423 in May against 0.922 in June. The same model, on
          two consecutive months of the same test window, behaves like two different models.
          Anything shipped on this data needs monitoring and periodic retraining, not a one-off fit.
        </>,
        <>
          <B>Bias by equipment type:</B> of the 96,918 false negatives, 94,932 are excavators
          against 1,986 trucks. Almost every miss is an excavator, which lines up with what SHAP had
          already shown: the model leans on a baseline risk per equipment type instead of on the
          dynamic alarm pattern.
        </>,
        <>
          <B>Concentration in noisy regimes:</B> 96,869 of the 96,918 false negatives sit in the
          band of 21 or more alarms in 4 hours. Once the equipment is already alarming heavily, the
          counts saturate and stop discriminating, so the misses pile up exactly where an operator
          would most want a second opinion.
        </>,
      ],
      closing: (
        <>
          None of this is solved by moving a threshold. It points at a concrete next iteration:
          features that separate signal inside high-alarm regimes, and calibration per equipment
          type rather than a single global model.
        </>
      ),
    },
    explainability: {
      title: "Explainability: What the Model Actually Learned",
      body: (
        <>
          Instead of treating the model as a black box, I used SHAP to understand which signals
          drive the predictions, and to honestly expose a limitation: the model leans more on a
          baseline risk per equipment type than on the fine-grained dynamic alarm pattern that
          precedes a failure. This kind of critical reading is what separates &quot;a model that
          runs&quot; from &quot;a model that is understood&quot;.
        </>
      ),
      alt: "Feature importance and direction via SHAP",
      caption: "Feature importance and direction via SHAP",
    },
    eda: {
      title: "Exploratory Analysis: Relationships Between Variables",
      body: (
        <>
          Before modeling, I mapped the structure of the data and the relationships between the
          engineered features, identifying redundancies (multicollinearity) and hypotheses to test
          during modeling.
        </>
      ),
      alt: "Correlation map across the numeric features",
      caption: "Correlation map across the numeric features",
    },
    learned: {
      title: "What I Learned",
      bullets: [
        <>
          <B>Engineering matters as much as the model.</B> Much of the effort went into making the
          pipeline viable at real scale (data type and memory optimization), a problem that only
          shows up outside the toy dataset.
        </>,
        <>
          <B>Analytical honesty is a skill.</B> Reporting the model&apos;s limitations (bias by
          equipment type, temporal drift, cost of false positives) is worth more than dressing up a
          result.
        </>,
        <>
          <B>Software rigor in data science.</B> Test-driven development (TDD), documented
          decisions, and reproducibility turn an exploratory notebook into an auditable solution.
        </>,
      ],
    },
    stackTitle: "Stack",
    skills: {
      title: "Skills Demonstrated",
      body: (
        <>
          Data engineering / ETL at scale · Temporal feature engineering · Machine learning with
          imbalanced classes · Temporal validation (no data leakage) · Model and baseline comparison
          · Explainability (SHAP) · Error and drift analysis · TDD and reproducibility · Technical
          communication and translation into business impact.
        </>
      ),
    },
    footnote: (
      <>Reproducible source code available on GitHub. Dataset not included (proprietary data).</>
    ),
  },
  pt: {
    intro: (
      <>
        Desenvolvido dentro do Programa Desenvolver (Vale). Uma solução analítica de ponta a ponta
        para antecipar alertas críticos de parada de equipamento (&quot;Don&apos;t Go&quot;) a
        partir do histórico de alarmes de telemetria, permitindo que a operação aja antes da falha
        em vez de apenas reagir a ela.
      </>
    ),
    disclaimer: (
      <>
        O dataset é proprietário e não é redistribuído. O código, a metodologia e os resultados são
        públicos.
      </>
    ),
    problem: {
      title: "O Problema",
      body: (
        <>
          Equipamentos de mineração (caminhões fora de estrada e escavadeiras) emitem um fluxo
          constante de alarmes de telemetria. Entre eles estão os alertas &quot;Don&apos;t Go&quot;:
          condições em que o equipamento não deve operar, com impacto direto em segurança,
          disponibilidade de frota e produção. O desafio:{" "}
          <B>prever esses eventos com horas de antecedência</B>, transformando um log histórico em
          uma ferramenta de decisão operacional.
        </>
      ),
      lead: <>Dois obstáculos definiram o projeto:</>,
      bullets: [
        <>
          <B>Escala real:</B> dezenas de milhões de registros de telemetria, processados em uma
          máquina comum, o que exigiu engenharia de memória cuidadosa.
        </>,
        <>
          <B>Eventos raros:</B> os alertas Don&apos;t Go são altamente desbalanceados, o que torna a
          acurácia enganosa e exige métricas e estratégias específicas.
        </>,
      ],
    },
    approach: {
      title: "A Abordagem",
      lead: (
        <>
          Um pipeline reprodutível, modular e testado, cobrindo todas as etapas de uma solução de
          dados:
        </>
      ),
      bullets: [
        <>
          <B>Diagnóstico e limpeza de qualidade de dados:</B> identificação e correção de problemas
          reais (corrupção de encoding, nulos mascarados como texto, separadores decimais
          inconsistentes), com controle de mudanças documentado (antes/depois + justificativa).
        </>,
        <>
          <B>Feature engineering temporal:</B> contagens de alarme em várias janelas deslizantes,
          tempo desde o último evento crítico e tipo de equipamento, tudo calculado de forma
          vetorizada e <B>sem vazamento temporal</B>.
        </>,
        <>
          <B>Modelagem comparativa:</B> baselines de referência, um modelo principal de gradient
          boosting e uma segunda abordagem para validar os resultados de forma cruzada, todos
          avaliados no <B>mesmo split temporal</B> (treino no passado, teste no futuro, nunca
          aleatório).
        </>,
        <>
          <B>Tratamento do desbalanceamento</B> e escolha de métricas adequadas a eventos raros
          (precision/recall, F1, AUC-ROC e AUC-PR no lugar de acurácia).
        </>,
        <>
          <B>Explicabilidade e análise de erros:</B> SHAP para interpretar o modelo e uma análise
          crítica de onde e quando ele falha (incluindo detecção de drift temporal).
        </>,
      ],
    },
    results: {
      title: "Resultados",
      rarity: (
        <>
          Eventos Don&apos;t Go são raros: apenas 1,6% da janela de teste é positiva. Nesse regime,
          um F1 absoluto baixo é o resultado esperado, não um fracasso, e a pergunta honesta não é
          &quot;o F1 está alto?&quot; e sim{" "}
          <B>&quot;o quanto isso é melhor do que a operação conseguiria sem modelo?&quot;</B> Ou
          seja, a referência é a melhor heurística baseada em regras, não um classificador perfeito.
        </>
      ),
      split: (
        <>
          Todos os números desta seção vêm do mesmo split temporal: treino de janeiro a abril
          (23,273,520 linhas) e teste em maio e junho (13,890,534 linhas), prevendo um evento
          Don&apos;t Go nas 4 horas seguintes (<Inline>label_4h</Inline>), avaliados no{" "}
          <B>threshold de decisão padrão de 0.5</B>.
        </>
      ),
      bullets: [
        <>
          <B>XGBoost (modelo escolhido), threshold 0.5:</B> F1 0.186, precision 0.111, recall 0.577,
          AUC-ROC 0.767, AUC-PR 0.205.
        </>,
        <>
          <B>Melhor baseline heurístico</B> (<Inline>critical_1h &gt; 0</Inline>): F1 0.038.
        </>,
        <>
          <B>Ganho: 4,9x o F1 da melhor heurística</B>, e um AUC-PR 12,5x a taxa base do evento. As
          duas comparações são as que de fato importam do ponto de vista operacional.
        </>,
        <>
          <B>Validação cruzada:</B> o LightGBM, treinado de forma independente como segunda
          abordagem e avaliado no mesmo threshold, chegou a F1 0.185. Dois algoritmos diferentes
          convergindo para o mesmo número é evidência de que o resultado vem das features e do
          split, e não de um modelo sortudo.
        </>,
      ],
      tradeoff: (
        <>
          O recall foi prioridade deliberada. Capturar 57,7% dos eventos com 11,1% de precision,
          ainda no threshold 0.5, significa que a maioria dos alertas não vai virar uma parada, e
          essa troca só se sustenta porque os dois erros não custam a mesma coisa. É isso que a
          próxima seção destrincha.
        </>
      ),
    },
    errors: {
      title: "Análise de Erros: Onde o Modelo Falha",
      threshold: (
        <>
          Um rótulo antes dos números: a análise de erros roda no <B>threshold 0.7</B>, e não no 0.5
          usado na seção acima. O corte mais rígido compra um pouco de precision em troca de um
          pouco de recall, chegando a <B>recall 0.574 e precision 0.126</B>, com 130,705 verdadeiros
          positivos, 907,848 falsos positivos e 96,918 falsos negativos contra 227,623 linhas
          positivas. Todas as contagens abaixo se referem a esse threshold de 0.7.
        </>
      ),
      unitNote: (
        <>
          São <B>contagens de linha, não de eventos distintos</B>. Cada registro de telemetria dentro
          da janela de 4h antes de um Don&apos;t Go recebe label positivo, então um único evento
          gera muitas linhas positivas. Nível de linha é a unidade certa para avaliar o
          classificador, mas converter esses números em quantidade de paradas antecipadas exigiria
          deduplicar por evento antes.
        </>
      ),
      lead: (
        <>
          Um modelo que só reporta os acertos não é auditável. Abrir esses 96,918 falsos negativos
          por mês, tipo de equipamento e volume de alarmes acabou sendo a parte mais útil do
          projeto, porque diz com precisão onde dá para confiar no modelo e onde não dá. Os dois
          tipos de erro não são intercambiáveis em campo: um falso negativo é um Don&apos;t Go que
          nunca foi antecipado, ou seja, uma parada não planejada, enquanto um falso positivo é um
          alerta sem Don&apos;t Go por trás, ou seja, uma inspeção desnecessária.
        </>
      ),
      bullets: [
        <>
          <B>Drift temporal:</B> o recall é 0.423 em maio contra 0.922 em junho. O mesmo modelo, em
          dois meses consecutivos da mesma janela de teste, se comporta como dois modelos
          diferentes. Qualquer coisa colocada em produção sobre esses dados precisa de monitoramento
          e retreino periódico, não de um ajuste único.
        </>,
        <>
          <B>Viés por tipo de equipamento:</B> dos 96,918 falsos negativos, 94,932 são escavadeiras
          contra 1,986 caminhões. Quase todo erro é escavadeira, o que bate com o que o SHAP já
          tinha mostrado: o modelo se apoia em um risco base por tipo de equipamento em vez do
          padrão dinâmico de alarmes.
        </>,
        <>
          <B>Concentração em regimes ruidosos:</B> 96,869 dos 96,918 falsos negativos estão na faixa
          de 21 ou mais alarmes em 4 horas. Quando o equipamento já está alarmando muito, as
          contagens saturam e param de discriminar, então os erros se acumulam exatamente onde um
          operador mais gostaria de ter uma segunda opinião.
        </>,
      ],
      closing: (
        <>
          Nada disso se resolve mexendo no threshold. Aponta para uma próxima iteração concreta:
          features que separem sinal dentro de regimes de alto volume de alarmes, e calibração por
          tipo de equipamento em vez de um único modelo global.
        </>
      ),
    },
    explainability: {
      title: "Explicabilidade: O Que o Modelo Realmente Aprendeu",
      body: (
        <>
          Em vez de tratar o modelo como caixa preta, usei SHAP para entender quais sinais guiam as
          previsões e para expor com honestidade uma limitação: o modelo se apoia mais em um risco
          base por tipo de equipamento do que no padrão dinâmico e fino de alarmes que precede uma
          falha. Esse tipo de leitura crítica é o que separa &quot;um modelo que roda&quot; de
          &quot;um modelo que é compreendido&quot;.
        </>
      ),
      alt: "Importância e direção das features via SHAP",
      caption: "Importância e direção das features via SHAP",
    },
    eda: {
      title: "Análise Exploratória: Relações Entre as Variáveis",
      body: (
        <>
          Antes de modelar, mapeei a estrutura dos dados e as relações entre as features
          construídas, identificando redundâncias (multicolinearidade) e hipóteses para testar
          durante a modelagem.
        </>
      ),
      alt: "Mapa de correlação entre as features numéricas",
      caption: "Mapa de correlação entre as features numéricas",
    },
    learned: {
      title: "O Que Eu Aprendi",
      bullets: [
        <>
          <B>Engenharia pesa tanto quanto o modelo.</B> Boa parte do esforço foi tornar o pipeline
          viável em escala real (otimização de tipos de dado e de memória), um problema que só
          aparece fora do dataset de brinquedo.
        </>,
        <>
          <B>Honestidade analítica é uma habilidade.</B> Reportar as limitações do modelo (viés por
          tipo de equipamento, drift temporal, custo dos falsos positivos) vale mais do que enfeitar
          um resultado.
        </>,
        <>
          <B>Rigor de software em ciência de dados.</B> Test-driven development (TDD), decisões
          documentadas e reprodutibilidade transformam um notebook exploratório em uma solução
          auditável.
        </>,
      ],
    },
    stackTitle: "Stack",
    skills: {
      title: "Competências Demonstradas",
      body: (
        <>
          Engenharia de dados / ETL em escala · Feature engineering temporal · Machine learning com
          classes desbalanceadas · Validação temporal (sem data leakage) · Comparação de modelos e
          baselines · Explicabilidade (SHAP) · Análise de erros e de drift · TDD e reprodutibilidade
          · Comunicação técnica e tradução em impacto de negócio.
        </>
      ),
    },
    footnote: (
      <>
        Código-fonte reprodutível disponível no GitHub. Dataset não incluído (dados proprietários).
      </>
    ),
  },
}

export function ValeDesenvolverCaseStudy({ locale }: { locale: Locale }) {
  const c = pickCopy(copy, locale)

  return (
    <div className="space-y-5 text-foreground">

      {/* Intro */}
      <p className="leading-relaxed">{c.intro}</p>

      <blockquote className="border-l-2 border-border pl-4 text-sm italic leading-relaxed text-muted-foreground">
        {c.disclaimer}
      </blockquote>

      <hr className="border-t border-border" />

      {/* ===== THE PROBLEM ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.problem.title}</h2>

        <p className="leading-relaxed">{c.problem.body}</p>

        <p className="leading-relaxed">{c.problem.lead}</p>

        <Bullets items={c.problem.bullets} />
      </section>

      <hr className="border-t border-border" />

      {/* ===== THE APPROACH ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.approach.title}</h2>

        <p className="leading-relaxed">{c.approach.lead}</p>

        <Bullets items={c.approach.bullets} />
      </section>

      <hr className="border-t border-border" />

      {/* ===== RESULTS ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.results.title}</h2>

        <p className="leading-relaxed">{c.results.rarity}</p>

        <p className="leading-relaxed">{c.results.split}</p>

        <Bullets items={c.results.bullets} />

        <p className="leading-relaxed">{c.results.tradeoff}</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== ERROR ANALYSIS ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.errors.title}</h2>

        <p className="leading-relaxed">{c.errors.threshold}</p>

        <p className="leading-relaxed text-muted-foreground">{c.errors.unitNote}</p>

        <p className="leading-relaxed">{c.errors.lead}</p>

        <Bullets items={c.errors.bullets} />

        <p className="leading-relaxed">{c.errors.closing}</p>
      </section>

      <hr className="border-t border-border" />

      {/* ===== EXPLAINABILITY ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.explainability.title}</h2>

        <p className="leading-relaxed">{c.explainability.body}</p>

        <Figure
          src="/vale/shap_summary.png"
          alt={c.explainability.alt}
          caption={c.explainability.caption}
        />
      </section>

      <hr className="border-t border-border" />

      {/* ===== EXPLORATORY ANALYSIS ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.eda.title}</h2>

        <p className="leading-relaxed">{c.eda.body}</p>

        <Figure src="/vale/feature_correlation.png" alt={c.eda.alt} caption={c.eda.caption} />
      </section>

      <hr className="border-t border-border" />

      {/* ===== WHAT I LEARNED ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.learned.title}</h2>

        <Bullets items={c.learned.bullets} />
      </section>

      <hr className="border-t border-border" />

      {/* ===== STACK ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.stackTitle}</h2>

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
        <h2 className="text-xl font-semibold text-foreground pt-2">{c.skills.title}</h2>

        <p className="leading-relaxed text-sm text-muted-foreground">{c.skills.body}</p>
      </section>

      <hr className="border-t border-border" />

      <p className="text-sm italic text-muted-foreground">{c.footnote}</p>
    </div>
  )
}
