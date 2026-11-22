import { useEffect, useRef, useState } from 'react';
import { PRODUCTS, BUSINESSES, HERO_PROOF } from '../home-content';
import { Link } from '../router';
import './HomeHero.css';

/* ------------------------------------------------------------------
   Hero: "I need ___ for my ___". Each pick rebuilds a live mock-up of
   that product for that business, and the main button turns the pick
   into a ready-written quote request. Until someone interacts, it plays
   through examples on its own.
------------------------------------------------------------------- */

const AUTOPLAY = [
  ['website', 'clinic'],
  ['ai', 'restaurant'],
  ['mobile', 'shop'],
  ['dashboard', 'logistics'],
  ['tool', 'school'],
  ['website', 'startup'],
];

function useTyping(text, deps) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length);
      return undefined;
    }
    let i = 0;
    let timer = setTimeout(function tick() {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, 28);
    }, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return text.slice(0, n);
}

function Website({ b }) {
  return (
    <div className="pv pv--site">
      <div className="pv-browser">
        <span />
        <span />
        <span />
        <em>{b.brand.toLowerCase().replace(/[^a-z]+/g, '')}.in</em>
      </div>
      <div className="pv-site__nav pv-in" style={{ '--d': 1 }}>
        <strong>{b.brand}</strong>
        <i />
        <i />
        <i />
      </div>
      <div className="pv-site__hero pv-in" style={{ '--d': 2 }}>
        <h3>{b.tagline}</h3>
        <p className="pv-line" />
        <p className="pv-line pv-line--short" />
        <span className="pv-btn">{b.action}</span>
      </div>
      <div className="pv-site__cards">
        {b.items.map((it, i) => (
          <div key={it} className="pv-in" style={{ '--d': 3 + i }}>
            <span className="pv-thumb" />
            <small>{it}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function Mobile({ b }) {
  return (
    <div className="pv pv--phone">
      <div className="pv-phone">
        <div className="pv-phone__notch" />
        <div className="pv-phone__head pv-in" style={{ '--d': 1 }}>
          <strong>{b.brand}</strong>
          <small>Good morning</small>
        </div>
        <div className="pv-phone__hero pv-in" style={{ '--d': 2 }}>
          {b.tagline}
        </div>
        <ul>
          {b.items.map((it, i) => (
            <li key={it} className="pv-in" style={{ '--d': 3 + i }}>
              <span className="pv-dot" />
              {it}
            </li>
          ))}
        </ul>
        <span className="pv-btn pv-btn--block pv-in" style={{ '--d': 6 }}>
          {b.action}
        </span>
        <div className="pv-phone__tabs">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function Dashboard({ b, seed }) {
  const bars = Array.from({ length: 9 }, (_, i) => 30 + ((i * 37 + seed * 13) % 65));
  return (
    <div className="pv pv--dash">
      <aside className="pv-dash__side">
        <strong>{b.brand.split(' ')[0]}</strong>
        <i className="is-on" />
        <i />
        <i />
        <i />
      </aside>
      <div className="pv-dash__main">
        <div className="pv-dash__stats">
          {b.stats.map(([k, v], i) => (
            <div key={k} className="pv-in" style={{ '--d': 1 + i }}>
              <small>{k}</small>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
        <div className="pv-dash__chart pv-in" style={{ '--d': 4 }}>
          {bars.map((h, i) => (
            <span key={i} style={{ '--h': `${h}%`, '--i': i }} />
          ))}
        </div>
        <ul className="pv-dash__rows">
          {b.items.map((it, i) => (
            <li key={it} className="pv-in" style={{ '--d': 5 + i }}>
              {it}
              <em />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Assistant({ b }) {
  const typed = useTyping(b.a, [b.id]);
  return (
    <div className="pv pv--chat">
      <div className="pv-chat__head">
        <span className="pv-chat__avatar">{b.brand[0]}</span>
        <div>
          <strong>{b.brand} assistant</strong>
          <small>Replies instantly</small>
        </div>
      </div>
      <div className="pv-chat__body">
        <p className="pv-bubble pv-bubble--me pv-in" style={{ '--d': 1 }}>
          {b.q}
        </p>
        <p className="pv-bubble pv-bubble--bot pv-in" style={{ '--d': 3 }}>
          {typed}
          <span className="pv-caret" aria-hidden="true" />
        </p>
        <div className="pv-chat__chips pv-in" style={{ '--d': 6 }}>
          <span>{b.action}</span>
          <span>Talk to a person</span>
        </div>
      </div>
      <div className="pv-chat__input">
        <span>Type a message…</span>
        <i />
      </div>
    </div>
  );
}

function Tool({ b }) {
  return (
    <div className="pv pv--board">
      <div className="pv-board__top pv-in" style={{ '--d': 1 }}>
        <strong>{b.brand}</strong>
        <span className="pv-btn pv-btn--sm">+ New</span>
      </div>
      <div className="pv-board__cols">
        {b.board.map((col, ci) => (
          <div key={col} className="pv-board__col">
            <small>{col}</small>
            {b.items
              .filter((_, i) => (i + ci) % 3 !== 2)
              .map((it, i) => (
                <div key={it} className="pv-card pv-in" style={{ '--d': 2 + ci + i }}>
                  {it}
                  <span />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS = { website: Website, mobile: Mobile, dashboard: Dashboard, ai: Assistant, tool: Tool };

export default function HomeHero() {
  const [product, setProduct] = useState('website');
  const [business, setBusiness] = useState('clinic');
  const [auto, setAuto] = useState(true);
  const step = useRef(0);
  const stageRef = useRef(null);

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      step.current = (step.current + 1) % AUTOPLAY.length;
      const [p, b] = AUTOPLAY[step.current];
      setProduct(p);
      setBusiness(b);
    }, 4200);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (setter, value) => {
    setAuto(false);
    setter(value);
  };

  const p = PRODUCTS.find((x) => x.id === product);
  const b = BUSINESSES.find((x) => x.id === business);
  const View = VIEWS[product];
  const message = `I need ${p.name} for my ${b.label.toLowerCase()}.\n\nA bit more about it: `;
  const quoteHref = `/contact?topic=project&message=${encodeURIComponent(message)}`;

  // Tilt the device stage gently toward the pointer.
  const onMove = (e) => {
    const el = stageRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--rx', `${(((e.clientY - r.top) / r.height - 0.5) * -6).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2)}deg`);
  };
  const onLeave = () => {
    stageRef.current?.style.setProperty('--rx', '0deg');
    stageRef.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <section className="hh" style={{ '--hue': b.hue }}>
      <div className="hh__glow" aria-hidden="true" />
      <div className="hh__grid wrap">
        <div className="hh__copy">
          <h1 className="hh__title">
            {/* Fixed text for search engines and screen readers; the rotating
                line below is decorative and hidden from assistive tech. */}
            <span className="sr-only">
              We design and build websites, mobile apps, custom software and AI tools that get used.
            </span>
            <span aria-hidden="true">
              We design and build{' '}
              <span className="hh__title-swap">
                <span key={product}>{p.plural}</span>
              </span>{' '}
              that get used.
            </span>
          </h1>

          <div className="hh-compose">
            <p className="hh-compose__label" id="hh-p">
              I need
            </p>
            <div className="hh-chips" role="radiogroup" aria-labelledby="hh-p">
              {PRODUCTS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={product === x.id}
                  onClick={() => pick(setProduct, x.id)}
                >
                  {x.label}
                </button>
              ))}
            </div>
            <p className="hh-compose__label" id="hh-b">
              for my
            </p>
            <div className="hh-chips hh-chips--biz" role="radiogroup" aria-labelledby="hh-b">
              {BUSINESSES.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={business === x.id}
                  onClick={() => pick(setBusiness, x.id)}
                  style={{ '--c': x.hue }}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hh__ctas">
            <Link className="hh-go" to={quoteHref}>
              <span>
                Get a quote for {p.name}
              </span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link className="hh-alt" to="/services">
              See everything we do
            </Link>
          </div>

          <ul className="hh__proof">
            {HERO_PROOF.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="hh-stage" ref={stageRef} onPointerMove={onMove} onPointerLeave={onLeave}>
          <div className="hh-stage__tilt">
            <div className="hh-stage__screen" key={`${product}-${business}`} aria-hidden="true">
              <View b={b} seed={BUSINESSES.indexOf(b)} />
            </div>
            <p className="hh-stage__caption">
              <span>Sample</span> {p.label} for {b.brand}
            </p>
          </div>
          {auto && (
            <button type="button" className="hh-stage__pause" onClick={() => setAuto(false)}>
              Pause examples
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
