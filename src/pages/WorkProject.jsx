import { PROJECT_PAGE } from '../pages-content';
import { Link } from '../router';
import useReveal from '../hooks/useReveal';
import NextStep from '../components/NextStep';
import WorkSwitcher from './WorkSwitcher';
import './Work.css';

export default function WorkProject() {
  useReveal();
  const { milestones, included, change, fit, notFit } = PROJECT_PAGE;

  return (
    <main className="page work-page" id="main">
      <section className="wp-hero">
        <div className="wrap">
          <WorkSwitcher current="/work/project" />
          <h1 className="display wp-hero__title">
            One scope. One price. <em>Paid as it ships.</em>
          </h1>
          <p className="wp-hero__lede">
            For a website, app or tool with a clear goal. You approve a written scope and a fixed
            price before we start, and pay in milestones you can see and test.
          </p>

          <ol className="wp-track" aria-label="Project milestones">
            {milestones.map((m, i) => (
              <li key={m.name} className="wp-track__stop" style={{ '--i': i }}>
                <span className="wp-track__dot" aria-hidden="true">
                  {i + 1}
                </span>
                <h2>{m.name}</h2>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
          <p className="wp-track__note">
            Each milestone is invoiced only after you have seen it working.
          </p>
        </div>
      </section>

      <section className="wp-quote section">
        <div className="wp-quote__grid wrap">
          <div className="wp-quote__copy">
            <h2 className="section-title">What is in the quote</h2>
            <p className="section-lede">
              Everything below is part of the fixed price. No line items appear later for things
              you assumed were included.
            </p>
            <Link className="more-link" to="/#how">
              See how a project runs
            </Link>
          </div>
          <div className="receipt reveal" role="group" aria-label="Included in every project quote">
            <p className="receipt__head">
              <span>Welqor</span>
              <span>Project quote</span>
            </p>
            <ul className="receipt__lines">
              {included.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                  <span className="receipt__dots" aria-hidden="true" />
                  <span className="receipt__val">Included</span>
                </li>
              ))}
            </ul>
            <p className="receipt__total">
              <span>Total</span>
              <span>One fixed number</span>
            </p>
            <p className="receipt__foot">Agreed in writing before work starts</p>
          </div>
        </div>
      </section>

      <section className="wp-change section dark-band on-dark">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">When plans change</p>
            <h2 className="section-title">New ideas are welcome. Surprise invoices are not.</h2>
          </div>
          <ol className="wp-change__steps">
            {change.map((c, i) => (
              <li key={c.step} className="reveal" style={{ '--d': i }}>
                <span className="wp-change__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.step}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wp-fit section">
        <div className="wp-fit__grid wrap">
          <div className="wp-fit__col reveal">
            <h2>Choose a project if</h2>
            <ul className="wp-fit__list is-yes">
              {fit.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="wp-fit__col reveal" style={{ '--d': 1 }}>
            <h2>Look elsewhere if</h2>
            <ul className="wp-fit__list is-no">
              {notFit.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="wp-fit__alt">
              That sounds more like a <Link to="/work/team">dedicated team</Link>.
            </p>
          </div>
        </div>
      </section>

      <NextStep
        variant="ticket"
        kicker="Step one"
        title="Get your fixed quote"
        text="A short call, then a written scope, timeline and price, usually within two working days."
        stub="2 days"
        label="Request a quote"
        to="/contact?topic=project"
      />
    </main>
  );
}
