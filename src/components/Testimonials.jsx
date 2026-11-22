import { TESTIMONIALS } from '../work-content';
import './Testimonials.css';

// Client quotes (data in work-content.js). Renders nothing when the list is
// empty. Layout: the first quote is a large feature card, the rest sit
// beside and below it.

const initials = (name) =>
  name
    .replace(/^(Dr|Prof)\.\s*/, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="tq" aria-labelledby="tq-title">
      <div className="wrap">
        <div className="tq-head">
          <p className="eyebrow">Testimonials</p>
          <h2 className="tq-head__title" id="tq-title">
            In their <em>own words.</em>
          </h2>
        </div>

        <ul className="tq-grid">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.name} className={`tq-card tq-card--${t.tone || 'paper'} reveal`} style={{ '--d': i }}>
              <figure>
                <span className="tq-card__mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="tq-card__avatar" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className="tq-card__who">
                    <strong>{t.name}</strong>
                    <span>
                      {t.role}, {t.client}
                    </span>
                  </span>
                  {t.project && <span className="tq-card__project">{t.project}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
