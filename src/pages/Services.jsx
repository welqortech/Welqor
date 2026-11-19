import { SERVICE_DETAILS } from '../pages-content';
import { Link } from '../router';
import useReveal from '../hooks/useReveal';
import NextStep from '../components/NextStep';
import Grain from '../components/Grain';
import './Services.css';

const num = (i) => String(i + 1).padStart(2, '0');

export default function Services() {
  useReveal();

  return (
    <main className="page services-page" id="main">
      <section className="sv-hero dark-band on-dark">
        <Grain />
        <div className="wrap">
          <div className="sv-hero__top">
            <p className="eyebrow">Services</p>
            <h1 className="display">
              Seven things,
              <br />
              <em>done properly.</em>
            </h1>
            <p className="sv-hero__lede">
              Each one can be booked on its own or combined into a single project. Same team, same
              fixed-quote process, whichever you choose.
            </p>
          </div>
          <nav aria-label="Services on this page">
            <ol className="sv-index">
              {SERVICE_DETAILS.map((s, i) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`}>
                    <span className="sv-index__num">{num(i)}</span>
                    <span className="sv-index__name">{s.name}</span>
                    <span className="sv-index__line">{s.line}</span>
                  </a>
                </li>
              ))}
              <li className="sv-index__after">
                <Link to="/work/care">
                  <span className="sv-index__num">After launch</span>
                  <span className="sv-index__name">Care plans</span>
                  <span className="sv-index__line">Updates, fixes and backups, monthly.</span>
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <div className="sv-chapters">
        {SERVICE_DETAILS.map((s, i) => (
          <section className="sv-chapter" id={s.slug} key={s.slug}>
            <div className="sv-chapter__grid wrap">
              <header className="sv-chapter__side">
                <span className="sv-chapter__num" aria-hidden="true">
                  {num(i)}
                </span>
                <h2 className="sv-chapter__name">{s.name}</h2>
                <p className="sv-chapter__time">
                  <span>Typical timeline</span>
                  {s.timeline}
                </p>
              </header>

              <div className="sv-chapter__body">
                <p className="sv-chapter__text reveal">{s.text}</p>

                <div className="sv-chapter__block reveal">
                  <h3>What you get</h3>
                  <ul className="sv-ticks">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="sv-chapter__meta reveal">
                  <p className="sv-chapter__fit">
                    <span>A good fit when</span>
                    {s.fit}
                  </p>
                  <ul className="sv-chapter__tools" aria-label="Typical tools">
                    {s.tools.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <NextStep
        variant="split"
        tone="white"
        doors={[
          { kicker: 'Know what you need', title: 'Get a fixed quote', label: 'Start a project', to: '/contact?topic=project' },
          { kicker: 'Not sure yet', title: 'Compare ways to work', label: 'See the options', to: '/work' },
        ]}
      />
    </main>
  );
}
