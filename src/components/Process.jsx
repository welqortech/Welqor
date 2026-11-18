import { STEPS } from '../content';
import './Process.css';

export default function Process() {
  return (
    <section className="process section" id="process">
      <div className="process__grid wrap">
        <div className="process__intro">
          <h2 className="section-title">How a project runs</h2>
          <p className="section-lede">
            The same five steps on every project, so you always know what is happening and what
            comes next.
          </p>
        </div>

        <ol className="steps">
          {STEPS.map((step, i) => (
            <li className="step" key={step.title}>
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
                <p className="step__out">
                  <strong>You get</strong> {step.out}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
