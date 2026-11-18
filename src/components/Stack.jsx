import { STACK } from '../content';
import './Stack.css';

export default function Stack() {
  return (
    <section className="stack section" id="stack">
      <div className="stack__grid wrap">
        <div className="stack__head">
          <h2 className="stack__title">Tools we work with</h2>
          <p className="stack__lede">
            We choose the stack that suits your project and your team, not whatever is
            fashionable this month.
          </p>
        </div>
        <ul className="stack__list">
          {STACK.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
