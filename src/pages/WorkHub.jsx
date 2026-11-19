import { useState } from 'react';
import { WORK_MODELS, WORK_COMPARE, WORK_QUESTIONS } from '../help-content';
import { Link } from '../router';
import useReveal from '../hooks/useReveal';
import WorkSwitcher from './WorkSwitcher';
import './WorkHub.css';

export default function WorkHub() {
  useReveal();
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;

  const scores = WORK_MODELS.reduce((acc, m) => ({ ...acc, [m.id]: 0 }), {});
  Object.entries(answers).forEach(([qi, oi]) => {
    const s = WORK_QUESTIONS[qi].options[oi].score;
    Object.keys(s).forEach((k) => {
      scores[k] += s[k];
    });
  });
  const best = answered
    ? WORK_MODELS.reduce((a, b) => (scores[b.id] > scores[a.id] ? b : a))
    : null;
  const max = Math.max(1, ...Object.values(scores));

  return (
    <main className="page work-hub" id="main">
      <section className="wh-hero">
        <div className="wrap">
          <WorkSwitcher current="/work" />
          <h1 className="display wh-hero__title">
            Three ways in. <em>Switch any time.</em>
          </h1>
          <p className="wh-hero__lede">
            Most clients start with a project, keep a care plan after launch, and bring in a team
            when the roadmap grows. Pick the one that matches where you are today.
          </p>
        </div>

        <ul className="wh-lanes wrap">
          {WORK_MODELS.map((m, i) => (
            <li key={m.id} className={`wh-lane wh-lane--${m.tone}`}>
              <Link to={m.to}>
                <span className="wh-lane__num">0{i + 1}</span>
                <span className="wh-lane__name">{m.name}</span>
                <span className="wh-lane__line">{m.line}</span>
                <span className="wh-lane__go" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wh-quiz section">
        <div className="wh-quiz__grid wrap">
          <div>
            <h2 className="section-title">Not sure? Answer three questions.</h2>
            <ol className="wh-qs">
              {WORK_QUESTIONS.map((q, qi) => (
                <li key={q.q} className="wh-q">
                  <p className="wh-q__text" id={`wq-${qi}`}>
                    <span>{qi + 1}</span>
                    {q.q}
                  </p>
                  <div className="wh-q__opts" role="group" aria-labelledby={`wq-${qi}`}>
                    {q.options.map((o, oi) => (
                      <button
                        key={o.label}
                        type="button"
                        aria-pressed={answers[qi] === oi}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className={`wh-result${best ? ` is-${best.tone}` : ''}`} aria-live="polite">
            <p className="wh-result__label">
              {answered === 0
                ? 'Your match'
                : answered < WORK_QUESTIONS.length
                  ? `Leaning towards (${answered} of ${WORK_QUESTIONS.length})`
                  : 'Your best fit'}
            </p>
            <p className="wh-result__name">{best ? best.name : 'Waiting for answers'}</p>
            <ul className="wh-result__bars">
              {WORK_MODELS.map((m) => (
                <li key={m.id}>
                  <span>{m.short}</span>
                  <span className="wh-result__track">
                    <span style={{ '--v': scores[m.id] / max }} />
                  </span>
                </li>
              ))}
            </ul>
            {best && (
              <Link className="wh-result__go" to={best.to}>
                See how it works &rarr;
              </Link>
            )}
            {answered > 0 && (
              <button type="button" className="wh-result__reset" onClick={() => setAnswers({})}>
                Start again
              </button>
            )}
          </aside>
        </div>
      </section>

      <section className="wh-compare section">
        <div className="wrap">
          <h2 className="section-title wh-compare__title">Side by side</h2>
          <div className="wh-table" role="table" aria-label="Ways to work compared">
            <div className="wh-row wh-row--head" role="row">
              <span role="columnheader" />
              {WORK_MODELS.map((m) => (
                <span role="columnheader" key={m.id} className={`wh-th wh-th--${m.tone}`}>
                  <Link to={m.to}>{m.name}</Link>
                </span>
              ))}
            </div>
            {WORK_COMPARE.map((r, i) => (
              <div className="wh-row reveal" role="row" key={r.row} style={{ '--d': i }}>
                <span role="rowheader" className="wh-row__label">
                  {r.row}
                </span>
                {WORK_MODELS.map((m) => (
                  <span role="cell" key={m.id} data-label={m.short}>
                    {r[m.id]}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
