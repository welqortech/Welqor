import { useRef, useState } from 'react';
import { BUILD_CARDS, BEFORE, AFTER, TRACK, FLIPS, FINAL_PICKS } from '../home-content';
import { WORK_MODELS } from '../help-content';
import { SITE } from '../config';
import { Link } from '../router';
import useReveal from '../hooks/useReveal';
import { CASE_STUDIES } from '../work-content';
import Testimonials from '../components/Testimonials';
import ProjectArt from '../home/ProjectArt';
import '../home/HomeProjects.css';
import HomeHero from '../home/HomeHero';
import Grain from '../components/Grain';
import '../home/Home.css';

const ROW_A = ['Websites', 'Web apps', 'Mobile apps', 'Online stores', 'CRMs', 'ERPs', 'Client portals'];
const ROW_B = ['AI assistants', 'Automations', 'Dashboards', 'Booking systems', 'Internal tools', 'UI and UX design'];

function Marquee() {
  const row = (items, reverse) => (
    // Each word is drawn twice for the endless scroll, so the moving rows are
    // hidden from screen readers and the list below is read once instead.
    <div className={`hm-marquee__row${reverse ? ' is-reverse' : ''}`} aria-hidden="true">
      <div className="hm-marquee__track">
        {[...items, ...items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
  return (
    <section className="hm-marquee" aria-label="What we build">
      <ul className="sr-only">
        {[...ROW_A, ...ROW_B].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {row(ROW_A)}
      {row(ROW_B, true)}
    </section>
  );
}

function Art({ kind }) {
  if (kind === 'site')
    return (
      <div className="art art--site">
        <div className="art-browser">
          <i />
          <i />
          <i />
        </div>
        <div className="art-site__hero" />
        <div className="art-site__row">
          <span />
          <span />
          <span />
        </div>
        <span className="art-cursor" />
      </div>
    );
  if (kind === 'app')
    return (
      <div className="art art--app">
        <div className="art-phone art-phone--back" />
        <div className="art-phone">
          <span />
          <span />
          <span />
          <b />
        </div>
      </div>
    );
  if (kind === 'grid')
    return (
      <div className="art art--grid">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>
    );
  return (
    <div className="art art--ai">
      <p className="art-bubble art-bubble--me">Read this invoice</p>
      <p className="art-bubble">
        Done. ₹48,200, due 30 Nov. Added to accounts.
      </p>
      <p className="art-bubble art-bubble--typing">
        <i />
        <i />
        <i />
      </p>
    </div>
  );
}

function BuildStack() {
  return (
    <section className="hm-build" id="what">
      <div className="wrap">
        <div className="hm-head">
          <p className="eyebrow">What we do</p>
          <h2 className="section-title">Four areas, seven services, start to finish.</h2>
        </div>
        <ol className="hm-build__stack">
          {BUILD_CARDS.map((c, i) => (
            <li key={c.title} className={`hm-card hm-card--${c.tone}`} style={{ '--i': i }}>
              <div className="hm-card__copy">
                <span className="hm-card__n">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <ul className="hm-card__chips">
                  {c.chips.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="hm-card__foot">
                  <span>
                    Typical timeline <strong>{c.time}</strong>
                  </span>
                  <Link to={c.to}>Explore &rarr;</Link>
                </div>
              </div>
              <div className="hm-card__art" aria-hidden="true">
                <Art kind={c.art} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const boxRef = useRef(null);
  const dragging = useRef(false);

  const fromPointer = (e) => {
    const r = boxRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="hm-ba section">
      <div className="wrap">
        <div className="hm-head hm-head--split">
          <h2 className="section-title">Drag to see the difference.</h2>
          <p className="section-lede">
            A sample business, before and after the right software. Slide the handle.
          </p>
        </div>
        <div
          className="hm-ba__box"
          ref={boxRef}
          style={{ '--pos': `${pos}%` }}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            fromPointer(e);
          }}
          onPointerMove={(e) => dragging.current && fromPointer(e)}
          onPointerUp={() => {
            dragging.current = false;
          }}
        >
          <div className="hm-ba__side hm-ba__before" aria-hidden="true">
            <span className="hm-ba__tag">Before</span>
            {BEFORE.map((b, i) => (
              <p key={b.text} className={`mess mess--${b.kind}`} style={{ '--i': i }}>
                {b.text}
              </p>
            ))}
          </div>
          <div className="hm-ba__side hm-ba__after" aria-hidden="true">
            <span className="hm-ba__tag">After</span>
            <div className="calm">
              {AFTER.map((a) => (
                <div key={a.label} className="calm__tile">
                  <small>{a.label}</small>
                  <strong>{a.value}</strong>
                  <span>{a.note}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hm-ba__handle" aria-hidden="true">
            <span>&larr; &rarr;</span>
          </div>
          <label className="sr-only" htmlFor="ba-range">
            Compare before and after
          </label>
          <input
            id="ba-range"
            className="hm-ba__range"
            type="range"
            min="0"
            max="100"
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
          />
        </div>
      </div>
    </section>
  );
}

function Track() {
  return (
    <section className="hm-track section on-dark" id="how">
      <Grain />
      <div className="wrap">
        <div className="hm-head">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">From first call to launch, without the guesswork.</h2>
        </div>
        <ol className="hm-track__list reveal">
          {TRACK.map((t, i) => (
            <li key={t.title} style={{ '--i': i }}>
              <span className="hm-track__dot" aria-hidden="true" />
              <span className="hm-track__when">{t.when}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Flips() {
  const [open, setOpen] = useState(null);
  return (
    <section className="hm-flips section">
      <div className="wrap">
        <div className="hm-head hm-head--split">
          <h2 className="section-title">What you can hold us to.</h2>
          <p className="section-lede">Hover or tap a card. These go into every proposal in writing.</p>
        </div>
        <ul className="hm-flips__grid">
          {FLIPS.map((f, i) => (
            <li key={f.front}>
              <button
                type="button"
                className={`flip${open === i ? ' is-flipped' : ''}`}
                aria-pressed={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                style={{ '--i': i }}
              >
                <span className="flip__face flip__front">
                  <span className="flip__n">0{i + 1}</span>
                  <span className="flip__title">{f.front}</span>
                  <span className="flip__hint" aria-hidden="true">
                    &#8635;
                  </span>
                </span>
                <span className="flip__face flip__back">{f.back}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Ways() {
  return (
    <section className="hm-ways">
      <div className="wrap">
        <div className="hm-head hm-head--split">
          <h2 className="section-title">Three ways to work with us.</h2>
          <Link className="more-link" to="/work">
            Compare them
          </Link>
        </div>
        <ul className="hm-ways__list">
          {WORK_MODELS.map((m, i) => (
            <li key={m.id} className={`hm-way hm-way--${m.tone}`}>
              <Link to={m.to}>
                <span className="hm-way__n">0{i + 1}</span>
                <span className="hm-way__name">{m.name}</span>
                <span className="hm-way__line">{m.line}</span>
                <span className="hm-way__go" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Projects: a bento of three tiles, each with a live mini preview of the
// product (home/ProjectArt.jsx). Content lives in work-content.js.
function RecentProjects() {
  return (
    <section className="px" id="projects" aria-labelledby="px-title">
      <div className="wrap">
        <div className="px-head">
          <p className="eyebrow">Projects</p>
          <h2 className="px-head__title" id="px-title">
            Built, shipped, <em>in use.</em>
          </h2>
          <p className="px-head__note">Client names stay private. The work does the talking.</p>
        </div>

        <ul className="px-grid">
          {CASE_STUDIES.map((c, i) => (
            <li key={c.slug} id={c.slug} className={`px-tile px-tile--${c.tone} reveal`} style={{ '--d': i }}>
              <div className="px-tile__art" aria-hidden="true">
                <ProjectArt kind={c.art} />
              </div>
              <div className="px-tile__meta">
                <p className="px-tile__client">
                  <span>{c.area}</span>
                  {c.client}, Coimbatore
                </p>
                <h3 className="px-tile__name">{c.name}</h3>
                <p className="px-tile__line">{c.line}</p>
                <ul className="px-tile__tags" aria-label="Highlights">
                  {c.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="px-tile__stack">
                  <span className="sr-only">Built with </span>
                  {c.stack.join(' · ')}
                </p>
              </div>
              <span className="px-tile__n" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Final() {
  const href = (pick) =>
    `/contact?topic=project&message=${encodeURIComponent(`${pick}.\n\nA bit more about it: `)}`;
  return (
    <section className="hm-final on-dark">
      <Grain />
      <div className="hm-final__inner wrap">
        <p className="eyebrow">Start a project</p>
        <h2 className="hm-final__title">
          What are we <em>building</em> together?
        </h2>
        <p className="hm-final__lede">Tap one to start. We reply within one working day.</p>
        <ul className="hm-final__picks">
          {FINAL_PICKS.map((p, i) => (
            <li key={p} style={{ '--i': i }}>
              <Link to={href(p)}>
                {p}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="hm-final__alt">
          Or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  return (
    <main className="page home" id="main">
      <HomeHero />
      <Marquee />
      <BuildStack />
      <BeforeAfter />
      <Track />
      <Flips />
      <RecentProjects />
      <Testimonials />
      <Ways />
      <Final />
    </main>
  );
}
