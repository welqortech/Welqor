import { Fragment, useMemo, useState } from 'react';
import { FAQ_GROUPS } from '../help-content';
import NextStep from '../components/NextStep';
import './FaqPage.css';

const ALL = FAQ_GROUPS.flatMap((g) => g.items.map((it) => ({ ...it, group: g.id })));

// Wraps every match of the search words in <mark>.
function Highlight({ text, words }) {
  if (!words.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return text.split(re).map((part, i) =>
    i % 2 ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>
  );
}

export default function FaqPage() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [open, setOpen] = useState(() => new Set([ALL[0].q]));

  const words = query.trim().toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  const shown = useMemo(
    () =>
      ALL.filter(
        (it) =>
          (group === 'all' || it.group === group) &&
          words.every((w) => `${it.q} ${it.a}`.toLowerCase().includes(w))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [group, query]
  );

  const toggle = (q) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(q)) n.delete(q);
      else n.add(q);
      return n;
    });

  return (
    <main className="page faq-page" id="main">
      <section className="fq-hero">
        <div className="wrap">
          <p className="eyebrow">FAQs</p>
          <h1 className="display fq-hero__title">
            Ask us <em>anything.</em>
          </h1>
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
              placeholder="Try “price”, “code” or “AI”"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <span className="fq-search__count" aria-live="polite">
              {shown.length} of {ALL.length}
            </span>
          </div>
          <div className="fq-chips" role="group" aria-label="Filter by topic">
            {[{ id: 'all', label: 'Everything' }, ...FAQ_GROUPS].map((g) => (
              <button
                type="button"
                key={g.id}
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="fq-list section">
        <div className="wrap">
          {shown.length === 0 ? (
            <p className="fq-empty">
              Nothing matches “{query}”. Ask us directly and we will add the answer here.
            </p>
          ) : (
            <ul className="fq-grid">
              {shown.map((it) => {
                const isOpen = open.has(it.q) || words.length > 0;
                const id = `fq-${ALL.indexOf(it)}`;
                return (
                  <li key={it.q} className={`fq-item${isOpen ? ' is-open' : ''}`}>
                    <h2>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={id}
                        onClick={() => toggle(it.q)}
                      >
                        <span className="fq-item__group">
                          {FAQ_GROUPS.find((g) => g.id === it.group).label}
                        </span>
                        <span className="fq-item__q">
                          <Highlight text={it.q} words={words} />
                        </span>
                        <span className="fq-item__icon" aria-hidden="true" />
                      </button>
                    </h2>
                    <div className="fq-item__a" id={id}>
                      <div>
                        <p>
                          <Highlight text={it.a} words={words} />
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

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
