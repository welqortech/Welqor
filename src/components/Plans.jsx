import { PLANS } from '../content';
import './Plans.css';

export default function Plans() {
  return (
    <section className="plans section" id="plans">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">Ways to work with us</h2>
          <p className="section-lede">
            Pick the setup that matches where you are. You can switch between them as the work
            changes.
          </p>
        </div>
        <ul className="plans__grid">
          {PLANS.map((plan) => (
            <li className="plan" key={plan.name}>
              <h3 className="plan__name">{plan.name}</h3>
              <p className="plan__text">{plan.text}</p>
              <p className="plan__fit">{plan.fit}</p>
              <a className="plan__link" href="#contact">
                {plan.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
