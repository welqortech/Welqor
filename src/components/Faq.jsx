import { useState } from 'react';
import { FAQS } from '../content';
import './Faq.css';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq section" id="faq">
      <div className="faq__grid wrap">
        <div className="section-head faq__head">
          <h2 className="section-title">Questions</h2>
          <p className="section-lede">
            Something else on your mind? Ask in the form below and we will answer it directly.
          </p>
        </div>

        <ul className="faq__list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <h3 className="faq__q">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__a" id={panelId} role="region" aria-labelledby={buttonId}>
                  <div className="faq__a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
