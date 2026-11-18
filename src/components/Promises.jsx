import { PROMISES } from '../content';
import './Promises.css';

export default function Promises() {
  return (
    <section className="promises section on-dark" id="promises">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">What you can count on</h2>
        </div>
        <ul className="promises__grid">
          {PROMISES.map((p) => (
            <li className="promise" key={p.title}>
              <h3 className="promise__title">{p.title}</h3>
              <p className="promise__text">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
