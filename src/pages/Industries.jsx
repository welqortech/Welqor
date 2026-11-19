import { INDUSTRIES } from '../pages-content';
import { Link } from '../router';
import useReveal from '../hooks/useReveal';
import NextStep from '../components/NextStep';
import './Industries.css';

export default function Industries() {
  useReveal();
  const names = INDUSTRIES.map((i) => i.name);

  return (
    <main className="page industries-page" id="main">
      <section className="in-hero">
        <div className="in-hero__grid wrap">
          <p className="eyebrow">Industries</p>
          <h1 className="display in-hero__title">
            Software shaped by <em>the work it supports.</em>
          </h1>
          <p className="in-hero__lede">
            A clinic, a warehouse and a school need very different things from the same button.
            We learn how your trade actually runs before we design for it.
          </p>
        </div>
        <div className="in-ticker" aria-hidden="true">
          <div className="in-ticker__track">
            {[...names, ...names].map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="in-grid-wrap section">
        <div className="wrap">
          <ul className="in-grid">
            {INDUSTRIES.map((ind, i) => (
              <li
                key={ind.name}
                className={`in-tile in-tile--${ind.tone} in-tile--${ind.size} reveal`}
                style={{ '--d': i % 4 }}
              >
                <span className="in-tile__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="in-tile__name">{ind.name}</h2>
                <ul className="in-tile__builds" aria-label="What we build">
                  {ind.builds.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="in-tile__watch">
                  <span>What we watch for</span>
                  {ind.watch}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="in-method section">
        <div className="in-method__grid wrap">
          <h2 className="section-title">How we get to know a new trade</h2>
          <ol className="in-method__steps">
            <li className="reveal">
              <strong>Shadow a shift.</strong> A few hours watching the people who will use the
              software, on site or over video.
            </li>
            <li className="reveal" style={{ '--d': 1 }}>
              <strong>Map the paperwork.</strong> Every form, sheet and message that moves through
              the day, and where it gets stuck.
            </li>
            <li className="reveal" style={{ '--d': 2 }}>
              <strong>Check the rules.</strong> Privacy, tax and industry rules that the software
              has to respect.
            </li>
            <li className="reveal" style={{ '--d': 3 }}>
              <strong>Test on the floor.</strong> Early builds go in front of real staff, not just
              managers.
            </li>
          </ol>
        </div>
        <div className="wrap">
          <Link className="more-link" to="/solutions">
            See the solutions we build across industries
          </Link>
        </div>
      </section>

      <NextStep
        variant="orbit"
        tone="cobalt"
        title="Not every trade fits on a list."
        text="Most problems repeat across industries. Tell us how your day runs and we will show you what we would build."
        ring="Tell us about your trade"
        label="Tell us about your trade"
        to="/contact?topic=hello"
      />
    </main>
  );
}
