import { useId } from 'react';
import { Link } from '../router';
import './NextStep.css';

// The closing call to action at the end of a page. Five looks, so pages
// that sit next to each other in the nav never end the same way.
//
//   giant  - one huge sentence that is the link
//   split  - two doors side by side
//   ticket - a tear-off ticket
//   orbit  - a round button ringed by rotating text
//   note   - a signed note from the founders

const Arrow = () => (
  <svg className="ns-arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export default function NextStep({ variant, tone = 'paper', ...p }) {
  const ringId = `ring-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  if (variant === 'giant') {
    return (
      <section className={`ns ns--giant ns--${tone}`}>
        <div className="wrap">
          <p className="ns__kicker">{p.kicker}</p>
          <Link className="ns-giant__link" to={p.to}>
            <span className="ns-giant__text">{p.title}</span>
            <Arrow />
          </Link>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className={`ns ns--split ns--${tone}`}>
        <div className="ns-split wrap">
          {p.doors.map((d) => (
            <Link className="ns-door" to={d.to} key={d.title}>
              <span className="ns__kicker">{d.kicker}</span>
              <span className="ns-door__title">{d.title}</span>
              <span className="ns-door__go">
                {d.label} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'ticket') {
    return (
      <section className={`ns ns--ticket ns--${tone}`}>
        <div className="wrap">
          <Link className="ns-ticket" to={p.to}>
            <span className="ns-ticket__main">
              <span className="ns__kicker">{p.kicker}</span>
              <span className="ns-ticket__title">{p.title}</span>
              <span className="ns-ticket__text">{p.text}</span>
            </span>
            <span className="ns-ticket__stub">
              <span className="ns-ticket__stub-label">{p.stub}</span>
              <span className="ns-ticket__go">
                {p.label} <Arrow />
              </span>
            </span>
          </Link>
        </div>
      </section>
    );
  }

  if (variant === 'orbit') {
    return (
      <section className={`ns ns--orbit ns--${tone}`}>
        <div className="ns-orbit wrap">
          <div className="ns-orbit__copy">
            <h2 className="ns-orbit__title">{p.title}</h2>
            <p>{p.text}</p>
          </div>
          <Link className="ns-orbit__btn" to={p.to} aria-label={p.label}>
            <svg className="ns-orbit__ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id={ringId} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
              </defs>
              <text>
                <textPath href={`#${ringId}`}>{`${p.ring} · `.repeat(3)}</textPath>
              </text>
            </svg>
            <span className="ns-orbit__core">
              <Arrow />
            </span>
          </Link>
        </div>
      </section>
    );
  }

  // note
  return (
    <section className={`ns ns--note ns--${tone}`}>
      <div className="wrap">
        <div className="ns-note">
          <h2 className="ns-note__title">{p.title}</h2>
          <p className="ns-note__text">{p.text}</p>
          <div className="ns-note__foot">
            <p className="ns-note__sign" aria-label={p.sign}>
              {p.sign}
            </p>
            <Link className="ns-note__go" to={p.to}>
              {p.label} <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
