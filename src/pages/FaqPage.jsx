import { Fragment, useEffect, useMemo, useState } from 'react';
import { FAQ_GROUPS } from '../faq-content';
import { Link } from '../router';
import NextStep from '../components/NextStep';
import './FaqPage.css';

const STEP = 4; // questions revealed per "Show more"
const TOTAL = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

// Wraps every match of the search words in <mark>.
function Highlight({ text, words }) {
  if (!words.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return text.split(re).map((part, i) =>
    i % 2 ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>
  );
}

function Question({ item, id, open, onToggle, words }) {
  return (
    <li className={`fq-q${open ? ' is-open' : ''}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span className="fq-q__text">
            <Highlight text={item.q} words={words} />
          </span>
          <span className="fq-q__icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="fq-q__a" id={id} role="region">
        <div>
          <p>
            <Highlight text={item.a} words={words} />
          </p>
          {item.link && (
            <Link className="fq-q__link" to={item.link.to}>
              {item.link.label} &rarr;
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export default function FaqPage() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(() => new Set());
  const [shown, setShown] = useState(() => Object.fromEntries(FAQ_GROUPS.map((g) => [g.id, STEP])));
  const [active, setActive] = useState(FAQ_GROUPS[0].id);

  const words = query.trim().toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  const searching = words.length > 0;

  const groups = useMemo(
    () =>
      FAQ_GROUPS.map((g) => ({
        ...g,
        matches: searching
          ? g.items.filter((it) => words.every((w) => `${it.q} ${it.a}`.toLowerCase().includes(w)))
          : g.items,
      })).filter((g) => g.matches.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );
  const found = groups.reduce((n, g) => n + g.matches.length, 0);

  // Highlight the section in view in the side list.
  useEffect(() => {
    if (searching) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace('fq-', ''));
      },
      { rootMargin: '-25% 0px -60% 0px' }
    );
    FAQ_GROUPS.forEach((g) => {
      const el = document.getElementById(`fq-${g.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [searching]);

  // On phones the section list is a sideways row: keep the active chip in view.
  useEffect(() => {
    const chip = document.querySelector(`.fq-nav a[href="#fq-${active}"]`);
    const row = chip?.closest('ol');
    if (!chip || !row || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  const toggle = (key) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });

  const more = (id, total) => setShown((s) => ({ ...s, [id]: Math.min(total, s[id] + STEP) }));
  const fewer = (id) => {
    setShown((s) => ({ ...s, [id]: STEP }));
    document.getElementById(`fq-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="page faq-page" id="main">
      <section className="fq-hero">
        <div className="fq-hero__inner wrap">
          <div className="fq-hero__copy">
            <p className="eyebrow">FAQs</p>
            <h1 className="display">
              Questions, <em>answered.</em>
            </h1>
            <p className="fq-hero__lede">
              {TOTAL} straight answers about cost, timelines, ownership, AI and support. Search, or
              browse by section.
            </p>
          </div>
          <div className="fq-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <label className="sr-only" htmlFor="faq-q">
              Search the questions
            </label>
            <input
              id="faq-q"
              type="search"
              placeholder="Try “invoice”, “hosting” or “AI”"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {searching && (
              <button type="button" className="fq-search__clear" onClick={() => setQuery('')}>
                Clear
              </button>
            )}
          </div>
          <p className="fq-search__count" aria-live="polite">
            {searching ? `${found} of ${TOTAL} questions match` : `${FAQ_GROUPS.length} sections · ${TOTAL} questions`}
          </p>
        </div>
      </section>

      <div className="fq-body wrap">
        <nav className="fq-nav" aria-label="FAQ sections">
          <ol>
            {FAQ_GROUPS.map((g, i) => {
              const hit = groups.find((x) => x.id === g.id);
              const count = hit ? hit.matches.length : 0;
              return (
                <li key={g.id}>
                  <a
                    href={`#fq-${g.id}`}
                    aria-current={!searching && active === g.id ? 'true' : undefined}
                    className={searching && !count ? 'is-empty' : undefined}
                  >
                    <span className="fq-nav__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fq-nav__label">{g.label}</span>
                    <span className="fq-nav__count">{searching ? count : g.items.length}</span>
                  </a>
                </li>
              );
            })}
          </ol>
          <Link className="fq-ask" to="/contact?topic=hello">
            <span className="fq-ask__title">Can’t find your question?</span>
            <span className="fq-ask__text">We reply within one working day.</span>
            <span className="fq-ask__go">
              Ask us <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </nav>

        <div className="fq-sections">
          {groups.length === 0 && (
            <div className="fq-empty">
              <p>Nothing matches “{query}”.</p>
              <Link to="/contact?topic=hello">Ask us directly &rarr;</Link>
            </div>
          )}

          {groups.map((g) => {
            const index = FAQ_GROUPS.findIndex((x) => x.id === g.id);
            const limit = searching ? g.matches.length : shown[g.id];
            const visible = g.matches.slice(0, limit);
            const left = g.matches.length - visible.length;
            return (
              <section className="fq-section" id={`fq-${g.id}`} key={g.id}>
                <header className="fq-section__head">
                  <span className="fq-section__n">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2>{g.label}</h2>
                    <p>{g.blurb}</p>
                  </div>
                </header>

                <ul className="fq-list">
                  {visible.map((it) => {
                    const key = `${g.id}-${g.items.indexOf(it)}`;
                    return (
                      <Question
                        key={key}
                        id={`fqa-${key}`}
                        item={it}
                        words={words}
                        open={searching || open.has(key)}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </ul>

                {!searching && g.matches.length > STEP && (
                  <div className="fq-more">
                    <div className="fq-more__bar" aria-hidden="true">
                      <span style={{ '--p': visible.length / g.matches.length }} />
                    </div>
                    <span className="fq-more__count">
                      {visible.length} of {g.matches.length}
                    </span>
                    {left > 0 ? (
                      <button type="button" onClick={() => more(g.id, g.matches.length)}>
                        Show {Math.min(STEP, left)} more
                        <span aria-hidden="true">+</span>
                      </button>
                    ) : (
                      <button type="button" className="is-less" onClick={() => fewer(g.id)}>
                        Show fewer
                        <span aria-hidden="true">−</span>
                      </button>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <NextStep
        variant="split"
        tone="white"
        doors={[
          { kicker: 'Already a client', title: 'Get help with something live', label: 'Support Centre', to: '/support' },
          { kicker: 'Still wondering', title: 'Ask us directly', label: 'Connect with Welqor', to: '/contact?topic=hello' },
        ]}
      />
    </main>
  );
}
