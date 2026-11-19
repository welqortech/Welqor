import { PRIVACY, PRIVACY_LEDGER, LEGAL_UPDATED } from '../help-content';
import { SITE } from '../config';
import { Link } from '../router';
import useReveal from '../hooks/useReveal';
import './Legal.css';

const PROMISES = ['No cookies.', 'No trackers.', 'No selling data.'];

export default function Privacy() {
  useReveal();

  return (
    <main className="page legal privacy" id="main">
      <section className="pv-hero">
        <div className="wrap">
          <p className="eyebrow">Privacy Policy</p>
          <h1 className="pv-hero__promises">
            {PROMISES.map((p, i) => (
              <span key={p} style={{ '--i': i }}>
                {p}
              </span>
            ))}
          </h1>
          <p className="pv-hero__lede">
            That is the short version. The rest of this page explains exactly what we collect, why,
            and for how long. Last updated {LEGAL_UPDATED}.
          </p>
        </div>
      </section>

      <section className="pv-ledger section">
        <div className="wrap">
          <h2 className="pv-title">What we hold, and why</h2>
          <ul className="pv-ledger__list">
            {PRIVACY_LEDGER.map((row, i) => (
              <li key={row.what} className="pv-row reveal" style={{ '--d': i }}>
                <h3>{row.what}</h3>
                <dl>
                  <div>
                    <dt>For example</dt>
                    <dd>{row.examples}</dd>
                  </div>
                  <div>
                    <dt>Why</dt>
                    <dd>{row.why}</dd>
                  </div>
                  <div>
                    <dt>How long</dt>
                    <dd>{row.keep}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pv-details section">
        <div className="pv-details__grid wrap">
          {PRIVACY.map((s) => (
            <article key={s.id} className="pv-card reveal">
              <h2>{s.title}</h2>
              {s.body.map((b) => (
                <p key={b.slice(0, 24)}>{b}</p>
              ))}
            </article>
          ))}
          <article className="pv-card pv-card--ask reveal">
            <h2>Ask, change or delete</h2>
            <p>
              Email <a href={`mailto:${SITE.email}?subject=Privacy%20request`}>{SITE.email}</a> with
              “Privacy request” in the subject. See also our{' '}
              <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
