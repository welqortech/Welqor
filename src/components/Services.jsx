import { SERVICES } from '../content';
import './Services.css';

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">What we build</h2>
          <p className="section-lede">
            From a five-page website to a full platform. If it runs on a screen, we can plan it,
            design it and ship it.
          </p>
        </div>

        <ul className="services__list">
          {SERVICES.map((s) => (
            <li className="service" key={s.name}>
              <h3 className="service__name">{s.name}</h3>
              <p className="service__text">{s.text}</p>
              <p className="service__tools">{s.tools}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
