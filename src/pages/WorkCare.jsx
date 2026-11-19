import { CARE_PAGE } from '../pages-content';
import useReveal from '../hooks/useReveal';
import NextStep from '../components/NextStep';
import WorkSwitcher from './WorkSwitcher';
import './Work.css';

// Heartbeat line for the hero. Flat, blip, flat, repeated.
const PULSE =
  'M0 60 H140 l14 -36 l18 76 l16 -64 l12 24 H420 l14 -36 l18 76 l16 -64 l12 24 H700 l14 -36 l18 76 l16 -64 l12 24 H1000';

export default function WorkCare() {
  useReveal();
  const { month, covered, notCovered, takeover } = CARE_PAGE;

  return (
    <main className="page work-page" id="main">
      <section className="wc-hero">
        <div className="wrap">
          <WorkSwitcher current="/work/care" />
          <h1 className="display wc-hero__title">
            Launch day is <em>day one.</em>
          </h1>
          <p className="wc-hero__lede">
            A monthly plan for websites and apps that are already live, whether we built them or
            not. Updates, fixes, backups and steady small improvements, handled before you notice
            they were needed.
          </p>
        </div>
        <div className="wc-pulse" aria-hidden="true">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none">
            <path className="wc-pulse__base" d={PULSE} />
            <path className="wc-pulse__line" d={PULSE} pathLength="1" />
          </svg>
          <span className="wc-pulse__status">
            <span className="wc-pulse__led" /> All systems normal
          </span>
        </div>
      </section>

      <section className="wc-month section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">A month on a care plan</h2>
            <p className="section-lede">
              The same rhythm every month, so nothing depends on someone remembering.
            </p>
          </div>
          <ol className="wc-cal">
            {month.map((w, i) => (
              <li key={w.week} className="wc-cal__week reveal" style={{ '--d': i }}>
                <h3>{w.week}</h3>
                <ul>
                  {w.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="wc-cal__always">
            <span className="wc-pulse__led" aria-hidden="true" /> Every day: uptime and error
            alerts, watched by us.
          </p>
        </div>
      </section>

      <section className="wc-cover section">
        <div className="wc-cover__grid wrap">
          <div className="wc-cover__yes reveal">
            <h2>Covered</h2>
            <ul>
              {covered.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="wc-cover__no reveal" style={{ '--d': 1 }}>
            <h2>Not covered</h2>
            <ul>
              {notCovered.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p>
              Bigger work is quoted separately as a fixed-scope project, so your monthly plan
              stays predictable.
            </p>
          </div>
        </div>
      </section>

      <section className="wc-takeover section dark-band on-dark">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Built by someone else?</p>
            <h2 className="section-title">We take over carefully.</h2>
          </div>
          <ol className="wc-takeover__steps">
            {takeover.map((t, i) => (
              <li key={t.step} className="reveal" style={{ '--d': i }}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{t.step}</h3>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NextStep
        variant="orbit"
        tone="sky"
        title="Put it in safe hands."
        text="Tell us what is live and where it is hosted. We start with a health check and suggest a plan."
        ring="Start with a health check"
        label="Start with a health check"
        to="/contact?topic=care"
      />
    </main>
  );
}
