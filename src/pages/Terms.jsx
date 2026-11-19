import { useEffect, useState } from 'react';
import { TERMS, LEGAL_UPDATED } from '../help-content';
import { SITE } from '../config';
import { Link } from '../router';
import './Legal.css';

export default function Terms() {
  const [active, setActive] = useState(TERMS[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = TERMS.map((t) => document.getElementById(`t-${t.id}`)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.slice(2));
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));

    const list = document.querySelector('.tm-clauses');
    const onScroll = () => {
      if (!list) return;
      const r = list.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / r.height)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <main className="page legal terms" id="main">
      <section className="tm-hero">
        <div className="wrap">
          <p className="eyebrow">Terms &amp; Conditions</p>
          <h1 className="display">
            The fine print, <em>in plain words.</em>
          </h1>
          <p className="tm-hero__meta">
            Last updated {LEGAL_UPDATED} · {TERMS.length} short sections · about 4 minutes to read
          </p>
        </div>
      </section>

      <div className="tm-body wrap">
        <nav className="tm-toc" aria-label="Sections">
          <div className="tm-toc__bar" aria-hidden="true">
            <span style={{ '--p': progress }} />
          </div>
          <ol>
            {TERMS.map((t, i) => (
              <li key={t.id}>
                <a href={`#t-${t.id}`} aria-current={active === t.id ? 'true' : undefined}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {t.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ol className="tm-clauses">
          {TERMS.map((t, i) => (
            <li key={t.id} id={`t-${t.id}`} className={`tm-clause${active === t.id ? ' is-active' : ''}`}>
              <span className="tm-clause__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="tm-clause__main">
                <h2>{t.title}</h2>
                {t.body.map((b) => (
                  <p key={b.slice(0, 24)}>{b}</p>
                ))}
              </div>
              <aside className="tm-clause__short">
                <span>In short</span>
                {t.short}
              </aside>
            </li>
          ))}
          <li className="tm-clause tm-clause--end">
            <div className="tm-clause__main">
              <h2>Questions about these terms?</h2>
              <p>
                Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See also our{' '}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </main>
  );
}
