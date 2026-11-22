import { useEffect, useState } from 'react';
import { SITE, whatsappLink } from '../config';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { SUPPORT_LEVELS, SUPPORT_SYMPTOMS, SUPPORT_CHECKLIST, SUPPORT_FIND } from '../help-content';
import { Link } from '../router';
import './Support.css';

// Office hours used for the live status light. Keep in sync with SITE.hours.
const OPEN = { days: [1, 2, 3, 4, 5], from: 9.5, to: 18.5 }; // IST, Mon-Fri

function officeStatus() {
  const now = new Date();
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
  const hour = ist.getHours() + ist.getMinutes() / 60;
  const open = OPEN.days.includes(ist.getDay()) && hour >= OPEN.from && hour < OPEN.to;
  // Same "11:47 PM" format as the reply clock on the Connect page.
  const h = ist.getHours();
  const time = `${((h + 11) % 12) + 1}:${String(ist.getMinutes()).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
  return { open, time };
}

const REPORT = [
  'What happened:',
  '',
  'Where (page address or app screen):',
  '',
  'Steps to make it happen again:',
  '',
  'When it started:',
  '',
].join('\n');

function mailFor(symptom, level) {
  const subject = `[${level.subject}] ${symptom.label}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(REPORT)}`;
}

function Console({ status, pick, setPick }) {
  const symptom = SUPPORT_SYMPTOMS.find((x) => x.id === pick);
  const level = symptom ? SUPPORT_LEVELS[symptom.level] : null;
  const step = symptom ? 3 : 1;

  return (
    <div className={`sx-console${level ? ` is-${level.tone}` : ''}`}>
      <div className="sx-console__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="sx-console__card">
        <ol className="sx-steps" aria-hidden="true">
          {['What is wrong', 'How urgent', 'Send it'].map((label, i) => (
            <li key={label} className={step > i ? 'is-done' : ''}>
              <span>{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>

        {!symptom ? (
          <div className="sx-pick">
            <p className="sx-console__q" id="sx-q">
              What is going on?
            </p>
            <div className="sx-pick__grid" role="group" aria-labelledby="sx-q">
              {SUPPORT_SYMPTOMS.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  className={`sx-sym sx-sym--${SUPPORT_LEVELS[x.level].tone}`}
                  onClick={() => setPick(x.id)}
                  style={{ '--i': i }}
                >
                  <span className="sx-sym__glyph" aria-hidden="true">
                    {x.glyph}
                  </span>
                  {x.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="sx-result" aria-live="polite">
            <p className="sx-result__picked">
              <span>{symptom.glyph}</span>
              {symptom.label}
            </p>

            <div className="sx-gauge" aria-hidden="true">
              {SUPPORT_LEVELS.map((l, i) => (
                <span
                  key={l.level}
                  className={`sx-gauge__seg sx-gauge__seg--${l.tone}${i === symptom.level ? ' is-on' : ''}`}
                >
                  {l.level}
                </span>
              ))}
            </div>

            <p className="sx-result__level">{level.level}</p>
            <p className="sx-result__target">{level.target}</p>
            {symptom.level === 0 && !status.open && (
              <p className="sx-result__night">It is out of hours, but urgent emails are still watched.</p>
            )}
            <p className="sx-result__tip">
              <strong>Tip</strong> {symptom.tip}
            </p>

            <div className="sx-result__actions">
              <a
                className="sx-send sx-send--wa"
                href={whatsappLink(`[${level.subject}] ${symptom.label}

${REPORT}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="sx-send__icon" />
                WhatsApp us
              </a>
              <a className="sx-send sx-send--mail" href={mailFor(symptom, level)}>
                Email support
                <span aria-hidden="true">&rarr;</span>
              </a>
              <button type="button" className="sx-back" onClick={() => setPick(null)}>
                Pick something else
              </button>
            </div>
            <p className="sx-result__note">
              Both open with the subject and a short report template filled in. WhatsApp ({SITE.whatsappLabel}) is fastest.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// How fast each level gets a response, drawn as a ruler that starts at "now".
// Segment widths grow with the wait, so the speed difference is visible.
function Ruler({ active }) {
  const [hover, setHover] = useState(null);
  const on = hover ?? active;
  return (
    <div className="sx-ruler" aria-label="How fast we respond">
      <p className="sx-ruler__title">How fast we respond</p>
      <ol className="sx-ruler__track">
        {SUPPORT_LEVELS.map((l, i) => (
          <li
            key={l.level}
            className={`sx-ruler__seg sx-legend--${l.tone}${on === i ? ' is-on' : ''}${on !== null && on !== i ? ' is-dim' : ''}`}
            style={{ '--i': i }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="sx-ruler__name">{l.short}</span>
            <span className="sx-ruler__bar" aria-hidden="true" />
            <span className="sx-ruler__eta">{l.eta}</span>
            <span className="sr-only">: {l.target}</span>
          </li>
        ))}
      </ol>
      <div className="sx-ruler__scale" aria-hidden="true">
        <span>Now</span>
        <span>Later</span>
      </div>
      <p className="sx-ruler__detail" aria-hidden="true">
        {on === null
          ? 'Point at a level, or pick a problem in the console.'
          : `${SUPPORT_LEVELS[on].level}: ${SUPPORT_LEVELS[on].target}`}
      </p>
    </div>
  );
}

export default function Support() {
  const [status, setStatus] = useState(officeStatus);
  const [ticks, setTicks] = useState([]);
  const [pick, setPick] = useState(null);
  const picked = SUPPORT_SYMPTOMS.find((x) => x.id === pick);
  const activeLevel = picked ? picked.level : null;

  useEffect(() => {
    const t = setInterval(() => setStatus(officeStatus()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggle = (i) => setTicks((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]));

  return (
    <main className="page support-page" id="main">
      <div className="sx-strip" role="status">
        <div className="sx-strip__inner wrap">
          <span className={`sx-strip__state${status.open ? ' is-open' : ''}`}>
            <i aria-hidden="true" />
            {status.open ? 'Studio is in' : 'Out of hours'}
          </span>
          <span className="sx-strip__clock">
            India <b>{status.time}</b>
          </span>
          <span className="sx-strip__hours">{SITE.hours}</span>
        </div>
      </div>

      <section className="sx-hero">
        <div className="sx-hero__grid wrap">
          <div className="sx-hero__copy">
            <p className="eyebrow">Support Centre</p>
            <h1 className="display">
              Tell us what broke. <em>We will take it from there.</em>
            </h1>
            <p className="sx-hero__lede">
              For clients on a care plan or within 30 days of launch. No ticket system to learn:
              answer one question and send the email it writes for you.
            </p>
            <Ruler active={activeLevel} />
          </div>
          <Console status={status} pick={pick} setPick={setPick} />
        </div>
      </section>

      <section className="sp-report section">
        <div className="sp-report__grid wrap">
          <div>
            <h2 className="sp-section-title">Write a report we can fix in one read</h2>
            <p className="sp-report__lede">
              Tick these off as you write. Reports with all five usually get fixed without a
              single follow-up question.
            </p>
          </div>
          <div className="sp-ticket">
            <div className="sp-ticket__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>{ticks.length} / {SUPPORT_CHECKLIST.length} ready</em>
            </div>
            <ul>
              {SUPPORT_CHECKLIST.map((c, i) => (
                <li key={c}>
                  <label>
                    <input type="checkbox" checked={ticks.includes(i)} onChange={() => toggle(i)} />
                    <span>{c}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div
              className="sp-ticket__meter"
              style={{ '--p': ticks.length / SUPPORT_CHECKLIST.length }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section className="sp-find">
        <div className="wrap">
          <h2 className="sp-section-title">Where to find things</h2>
          <ul className="sp-find__grid">
            {SUPPORT_FIND.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
          <p className="sp-find__foot">
            Not a client yet? <Link to="/work/care">See care plans</Link> or{' '}
            <Link to="/faq">browse the FAQs</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
