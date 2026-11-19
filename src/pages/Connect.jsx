import { useMemo, useRef, useState } from 'react';
import { SITE } from '../config';
import { CONNECT_TOPICS, CONNECT_NEEDS, CONNECT_WHEN, CONNECT_NEXT } from '../help-content';
import './Connect.css';

// The site's one form. It reads like a letter: visitors fill in the blanks.
// Links can preset it, e.g. /contact?topic=team&message=...

function readPreset() {
  const params = new URLSearchParams(window.location.search);
  const topic = CONNECT_TOPICS[params.get('topic')] ? params.get('topic') : 'project';
  return { topic, message: params.get('message') || '' };
}

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Your name';
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'An email we can reply to';
  if (v.message.trim().length < 10) e.message = 'A sentence or two about the idea';
  return e;
}

function Blank({ id, label, error, width, ...props }) {
  return (
    <span className={`blank${error ? ' blank--error' : ''}`} style={{ '--w': width }}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input id={id} aria-invalid={Boolean(error)} placeholder={label} {...props} />
    </span>
  );
}

export default function Connect() {
  const preset = useMemo(readPreset, []);
  const [v, setV] = useState({
    name: '',
    company: '',
    email: '',
    topic: preset.topic,
    when: CONNECT_WHEN[0],
    message: preset.message,
  });
  const [needs, setNeeds] = useState([]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const set = (e) => {
    const { name, value } = e.target;
    setV((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };
  const toggle = (n) => setNeeds((l) => (l.includes(n) ? l.filter((x) => x !== n) : [...l, n]));

  const filled = 3 - Object.keys(validate(v)).length;

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    const subject = `${CONNECT_TOPICS[v.topic].subject} from ${v.name.trim()}`;
    const body = [
      `Name: ${v.name.trim()}`,
      v.company.trim() && `Company: ${v.company.trim()}`,
      `Email: ${v.email.trim()}`,
      `About: ${CONNECT_TOPICS[v.topic].label}`,
      `Looking for: ${needs.length ? needs.join(', ') : 'Not specified'}`,
      `Timing: ${v.when}`,
      '',
      v.message.trim(),
    ]
      .filter((l) => l !== false && l !== '')
      .join('\n');
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main className="page connect" id="main">
      <div className="cn wrap">
        <header className="cn__head">
          <p className="eyebrow">Connect with Welqor</p>
          <h1 className="display">
            Write to us like <em>you would to a friend.</em>
          </h1>
          <div className="cn__meter" aria-hidden="true">
            <span style={{ '--p': filled / 3 }} />
          </div>
          <p className="cn__meter-label">
            {filled === 3 ? 'Ready to send' : `${3 - filled} blank${3 - filled === 1 ? '' : 's'} to go`}
          </p>
        </header>

        <form className="letter" ref={formRef} onSubmit={onSubmit} noValidate>
          <p className="letter__line">
            Hi Welqor, I am{' '}
            <Blank id="c-name" name="name" label="your name" autoComplete="name" width="9ch" value={v.name} onChange={set} error={errors.name} />
            {' '}from{' '}
            <Blank id="c-company" name="company" label="company (optional)" autoComplete="organization" width="12ch" value={v.company} onChange={set} />
            .
          </p>

          <p className="letter__line">
            I would like to talk about{' '}
            <span className="blank blank--select">
              <label className="sr-only" htmlFor="c-topic">
                Topic
              </label>
              <select id="c-topic" name="topic" value={v.topic} onChange={set}>
                {Object.entries(CONNECT_TOPICS).map(([id, t]) => (
                  <option key={id} value={id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </span>
            , and I would like to start{' '}
            <span className="blank blank--select">
              <label className="sr-only" htmlFor="c-when">
                When
              </label>
              <select id="c-when" name="when" value={v.when} onChange={set}>
                {CONNECT_WHEN.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </span>
            .
          </p>

          <fieldset className="letter__needs">
            <legend className="letter__line">It involves</legend>
            {CONNECT_NEEDS.map((n) => (
              <label className="stamp" key={n}>
                <input type="checkbox" checked={needs.includes(n)} onChange={() => toggle(n)} />
                <span>{n}</span>
              </label>
            ))}
          </fieldset>

          <div className={`letter__idea${errors.message ? ' blank--error' : ''}`}>
            <label className="letter__line" htmlFor="c-message">
              Here is the idea:
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={4}
              value={v.message}
              onChange={set}
              aria-invalid={Boolean(errors.message)}
              placeholder="What are you building, who is it for, and what is not working today?"
            />
          </div>

          <p className="letter__line">
            You can reply to{' '}
            <Blank id="c-email" name="email" type="email" inputMode="email" label="your email" autoComplete="email" width="14ch" value={v.email} onChange={set} error={errors.email} />
            .
          </p>

          {Object.keys(errors).some((k) => errors[k]) && (
            <p className="letter__missing" role="alert">
              Still missing: {Object.values(errors).filter(Boolean).join(', ').toLowerCase()}.
            </p>
          )}

          <div className="letter__foot">
            <button type="submit" className="letter__send">
              <span>Send it</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 11.5 21 3l-6.5 18-3.2-7.3L3 11.5Z" />
              </svg>
            </button>
            <p>Opens your email app with everything filled in. Nothing is sent until you press send there.</p>
          </div>

          {sent && (
            <p className="letter__sent" role="status">
              Your email app should be open with the message ready. If nothing happened, write to{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          )}
        </form>
      </div>

      <section className="cn-after">
        <div className="cn-after__grid wrap">
          <div className="cn-after__direct">
            <h2>Rather skip the form?</h2>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <p>{SITE.hours}</p>
            <p>Based in {SITE.location}, working with clients everywhere.</p>
          </div>
          <ol className="cn-after__next">
            {CONNECT_NEXT.map((s, i) => (
              <li key={s.title}>
                <span>{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
