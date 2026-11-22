import { useState } from 'react';
import { SOLUTIONS, SOLUTION_GROUPS } from '../pages-content';
import useReveal from '../hooks/useReveal';
import NextStep from '../components/NextStep';
import './Solutions.css';

const FILTERS = [{ id: 'all', label: 'All' }, ...SOLUTION_GROUPS];
const groupLabel = (id) => SOLUTION_GROUPS.find((g) => g.id === id)?.label;

export default function Solutions() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? SOLUTIONS : SOLUTIONS.filter((s) => s.group === filter);
  useReveal([filter]);

  return (
    <main className="page solutions-page" id="main">
      <section className="so-hero">
        <div className="wrap">
          <p className="eyebrow">Solutions</p>
          <h1 className="display so-hero__title">
            Start from
            <br />
            the{' '}
            <del className="so-hero__strike" aria-hidden="true">
              feature list
            </del>{' '}
            <em>problem.</em>
          </h1>
          <div className="so-hero__foot">
            <p className="so-hero__lede">
              Nobody wakes up wanting an ERP. They want the stock count to be right. Find the
              problem that sounds like yours, and see what we would build for it.
            </p>
            <p className="so-hero__count">
              <strong>{SOLUTIONS.length}</strong> problems we solve often
            </p>
          </div>
        </div>
      </section>

      <div className="so-filter">
        <div className="wrap">
          <div className="so-filter__bar" role="group" aria-label="Filter solutions">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="so-filter__btn"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="so-filter__n">
                  {f.id === 'all'
                    ? SOLUTIONS.length
                    : SOLUTIONS.filter((s) => s.group === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="so-list section" aria-live="polite">
        <ul className="so-grid wrap">
          {shown.map((s, i) => (
            <li key={s.name} className="so-card reveal" style={{ '--d': i % 3 }}>
              <div className="so-card__problem">
                <span className="so-card__tag">{groupLabel(s.group)}</span>
                <p>&ldquo;{s.problem}&rdquo;</p>
              </div>
              <div className="so-card__answer">
                <h2>{s.name}</h2>
                <p>{s.answer}</p>
                <ul aria-label="Includes">
                  {s.parts.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <NextStep
        variant="ticket"
        kicker="Bring us the problem"
        title="Not the spec. The problem."
        text="Describe what is slowing you down in your own words. We will suggest the simplest fix, even if it is not software."
        stub="Free"
        label="First call"
        to="/contact?topic=project"
      />
    </main>
  );
}
