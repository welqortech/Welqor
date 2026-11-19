import { useRef, useState } from 'react';
import { TECH_LAYERS, TECH_QUESTIONS } from '../pages-content';
import useReveal from '../hooks/useReveal';
import NextStep from '../components/NextStep';
import Grain from '../components/Grain';
import './Technologies.css';

const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, '-');

export default function Technologies() {
  useReveal();
  const layers = TECH_LAYERS; // first layer (Interface) sits on top of the visual
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const tiltRef = useRef(null);

  // Tilt the stack a few degrees toward the pointer.
  const onMove = (e) => {
    const el = tiltRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--tx', `${(x * 14).toFixed(2)}deg`);
    el.style.setProperty('--ty', `${(-y * 10).toFixed(2)}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty('--tx', '0deg');
    tiltRef.current?.style.setProperty('--ty', '0deg');
    setOpen(false);
    setActive(null);
  };

  return (
    <main className="page tech-page" id="main">
      <section className="tc-hero">
        <div className="tc-hero__grid wrap">
          <div className="tc-hero__copy">
            <p className="eyebrow">Technologies</p>
            <h1 className="display">
              The stack follows <em>the problem.</em>
            </h1>
            <p className="tc-hero__lede">
              Every product is a pile of layers. We pick each one for your team, your traffic and
              your budget, then explain why in plain words.
            </p>
            <nav aria-label="Layers on this page">
              <ol className="tc-hero__jump">
                {TECH_LAYERS.map((l, i) => (
                  <li key={l.layer}>
                    <a
                      href={`#${slug(l.layer)}`}
                      className={active === l.layer ? 'is-active' : undefined}
                      onMouseEnter={() => setActive(l.layer)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(l.layer)}
                      onBlur={() => setActive(null)}
                    >
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {l.layer}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div
            className={`tc-stack${open ? ' is-open' : ''}${active ? ' has-active' : ''}`}
            aria-hidden="true"
            onPointerMove={onMove}
            onPointerEnter={() => setOpen(true)}
            onPointerLeave={onLeave}
          >
            <div className="tc-stack__tilt" ref={tiltRef}>
              <div className="tc-stack__inner">
                {layers.map((l, i) => (
                  <div
                    key={l.layer}
                    className={`tc-slab${active === l.layer ? ' is-active' : ''}`}
                    style={{ '--z': layers.length - 1 - i, '--n': layers.length }}
                    onPointerEnter={() => setActive(l.layer)}
                  >
                    <span>{l.layer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tc-layers">
        {TECH_LAYERS.map((l, i) => (
          <section className="tc-layer" id={slug(l.layer)} key={l.layer}>
            <div className="tc-layer__grid wrap">
              <header className="tc-layer__head">
                <span className="tc-layer__idx">
                  Layer {i + 1} of {TECH_LAYERS.length}
                </span>
                <h2 className="tc-layer__name">{l.layer}</h2>
                <p className="tc-layer__note">{l.note}</p>
              </header>
              <div className="tc-layer__groups">
                {l.groups.map((g, gi) => (
                  <div className="tc-group reveal" key={g.name} style={{ '--d': gi }}>
                    <h3>{g.name}</h3>
                    <ul>
                      {g.items.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="tc-questions section dark-band on-dark">
        <Grain />
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How we choose</p>
            <h2 className="section-title">Four questions before any tool makes the cut.</h2>
          </div>
          <ol className="tc-questions__grid">
            {TECH_QUESTIONS.map((q, i) => (
              <li key={q.q} className="tc-q reveal" style={{ '--d': i }}>
                <span className="tc-q__mark" aria-hidden="true">
                  ?
                </span>
                <h3>{q.q}</h3>
                <p>{q.a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NextStep
        variant="split"
        doors={[
          { kicker: 'Already have a stack', title: 'We will work inside it', label: 'Tell us what you run', to: '/contact?topic=team' },
          { kicker: 'Starting from zero', title: 'We will pick it with you', label: 'Start a project', to: '/contact?topic=project' },
        ]}
      />
    </main>
  );
}
