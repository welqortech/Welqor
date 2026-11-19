import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ABOUT } from '../pages-content';
import useReveal from '../hooks/useReveal';
import NextStep from '../components/NextStep';
import './About.css';

/* ------------------------------------------------------------------
   The story is drawn as two threads, one per founder. They run side by
   side through school, split into two columns for college, then merge
   again. The paths are measured from the real layout, so they always
   meet the cards, and they draw themselves as the page scrolls.
------------------------------------------------------------------- */

function useThreads(rootRef, splitRef, colBRef, colPRef) {
  const [geo, setGeo] = useState({ w: 0, h: 0, b: '', p: '' });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const measure = () => {
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      if (window.matchMedia('(max-width: 760px)').matches) {
        const x = Number.parseFloat(getComputedStyle(root).getPropertyValue('--thread-x')) || 24;
        setGeo({ w, h, b: `M${x - 4} 0 V${h}`, p: `M${x + 4} 0 V${h}` });
        return;
      }
      const split = splitRef.current;
      const st = split.offsetTop;
      const sb = st + split.offsetHeight;
      const mid = (el) => el.offsetLeft + el.offsetWidth / 2;
      const cx = w / 2;
      const k = 150; // how long each bend is
      const path = (x0, x1) =>
        `M${x0} 0 V${st - k} ` +
        `C${x0} ${st - k / 3} ${x1} ${st - k / 2} ${x1} ${st + k / 4} ` +
        `V${sb - k / 4} ` +
        `C${x1} ${sb + k / 2} ${x0} ${sb + k / 3} ${x0} ${sb + k} V${h}`;
      setGeo({ w, h, b: path(cx - 5, mid(colBRef.current)), p: path(cx + 5, mid(colPRef.current)) });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [rootRef, splitRef, colBRef, colPRef]);

  return geo;
}

function Story() {
  const rootRef = useRef(null);
  const splitRef = useRef(null);
  const colBRef = useRef(null);
  const colPRef = useRef(null);
  const drawB = useRef(null);
  const drawP = useRef(null);
  const headB = useRef(null);
  const headP = useRef(null);
  const geo = useThreads(rootRef, splitRef, colBRef, colPRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !geo.b) return undefined;
    const pairs = [
      [drawB.current, headB.current],
      [drawP.current, headP.current],
    ];
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / r.height));
      pairs.forEach(([path, head]) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len} ${len}`;
        path.style.strokeDashoffset = `${len * (1 - progress)}`;
        const pt = path.getPointAtLength(len * progress);
        head.setAttribute('cx', pt.x);
        head.setAttribute('cy', pt.y);
        head.style.opacity = progress > 0.002 && progress < 0.998 ? '1' : '0';
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [geo]);

  const { before, b, p, after } = ABOUT;

  return (
    <section className="st" ref={rootRef} aria-label="How Welqor started">
      <svg
        className="st__threads"
        width={geo.w}
        height={geo.h}
        viewBox={`0 0 ${geo.w || 1} ${geo.h || 1}`}
        aria-hidden="true"
      >
        <path className="st__base" d={geo.b} />
        <path className="st__base" d={geo.p} />
        <path className="st__draw st__draw--b" d={geo.b} ref={drawB} />
        <path className="st__draw st__draw--p" d={geo.p} ref={drawP} />
        <circle className="st__head st__head--b" r="7" ref={headB} />
        <circle className="st__head st__head--p" r="7" ref={headP} />
      </svg>

      <div className="st__wrap wrap">
        <ol className="st__shared">
          {before.map((c) => (
            <li className="st-card reveal" key={c.title}>
              <span className="st-card__tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>

        <div className="st__split" ref={splitRef}>
          {[
            [b, 'b', colBRef],
            [p, 'p', colPRef],
          ].map(([person, key, ref], ci) => (
            <div className={`st__col st__col--${key}`} ref={ref} key={key}>
              <header className="st-who reveal" style={{ '--d': ci }}>
                <span className="st-who__mono" aria-hidden="true">
                  {key.toUpperCase()}
                </span>
                <h3>{person.who}</h3>
                <p>{person.course}</p>
              </header>
              {person.chapters.map((c, i) => (
                <article className="st-card st-card--side reveal" key={c.title} style={{ '--d': ci + i }}>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
          ))}
        </div>

        <ol className="st__shared">
          {after.map((c, i) => (
            <li
              className={`st-card reveal${i === after.length - 1 ? ' st-card--finale' : ''}`}
              key={c.title}
            >
              <span className="st-card__tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function About() {
  useReveal();

  return (
    <main className="page about" id="main">
      <section className="ab-hero">
        <div className="ab-hero__grid wrap">
          <div className="ab-hero__copy">
            <p className="eyebrow">About Welqor</p>
            <h1 className="display">
              Two Kavinkumars. <em>One roll call.</em>
            </h1>
            <p className="ab-hero__lede">
              Welqor was started by two friends who have shared a name since Class 5 and have been
              building things together ever since. This is how a school register turned into a
              software studio.
            </p>
            <a className="ab-hero__scroll" href="#story">
              Read the story
              <span aria-hidden="true">&darr;</span>
            </a>
          </div>

          <div className="ab-mono" aria-hidden="true">
            <span className="ab-mono__letter ab-mono__letter--b">
              <span>B</span>
            </span>
            <span className="ab-mono__letter ab-mono__letter--p">
              <span>P</span>
            </span>
            <span className="ab-mono__tag ab-mono__tag--b">Kavinkumar B</span>
            <span className="ab-mono__tag ab-mono__tag--p">Kavinkumar P</span>
          </div>
        </div>
      </section>

      <div className="ab-story-head wrap" id="story">
        <h2 className="section-title">How it started</h2>
      </div>
      <Story />

      <section className="ab-founders section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">Meet B and P</h2>
            <p className="section-lede">
              Both founders work on every project. Here is who to ask about what.
            </p>
          </div>
          <ul className="ab-founders__grid">
            {ABOUT.founders.map((f, i) => (
              <li className={`founder founder--${f.initial.toLowerCase()} reveal`} key={f.name} style={{ '--d': i }}>
                <span className="founder__mono" aria-hidden="true">
                  {f.initial}
                </span>
                <p className="founder__role">{f.role}</p>
                <h3 className="founder__name">{f.name}</h3>
                <p className="founder__degree">{f.degree}</p>
                <p className="founder__text">{f.text}</p>
                <div className="founder__ask">
                  <span>Ask {f.initial} about</span>
                  <ul>
                    {f.ask.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NextStep
        variant="note"
        title="A note from B and P"
        text="We read every message ourselves. Tell us what you are building and what is getting in the way, and one of us will write back within a working day."
        sign="B and P"
        label="Write to the founders"
        to="/contact?topic=hello"
      />
    </main>
  );
}
