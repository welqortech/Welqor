import { useMemo, useRef, useState } from 'react';
import { SITE, whatsappLink } from '../config';
import BookCall from './BookCall';
import ReplyClock from './ReplyClock';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { saveToSheet } from '../sheets';
import { CONNECT_TOPICS, CONNECT_NEEDS, CONNECT_WHEN, CONNECT_NEXT } from '../help-content';
import './Connect.css';

// The site's one form. It reads like a letter: visitors fill in the blanks.
// Links can preset it, e.g. /contact?topic=team&message=...

function readPreset() {
  const params = new URLSearchParams(window.location.search);
  const topic = CONNECT_TOPICS[params.get('topic')] ? params.get('topic') : 'project';
  const message = params.get('message') || '';
  // A pre-written message (e.g. from the team builder) opens the letter;
  // otherwise the page opens on booking a call. ?mode=call|write overrides.
  const asked = params.get('mode');
  const mode = asked === 'call' || asked === 'write' ? asked : message ? 'write' : 'call';
  return { topic, message, mode };
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
  const [sendState, setSendState] = useState('idle'); // idle | sending | sent | error
  const [mode, setMode] = useState(preset.mode);
  const formRef = useRef(null);

  const set = (e) => {
    const { name, value } = e.target;
    setV((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };
  const toggle = (n) => setNeeds((l) => (l.includes(n) ? l.filter((x) => x !== n) : [...l, n]));

  const filled = 3 - Object.keys(validate(v)).length;

  // Send = save the message to the "Write to us" tab of the Google Sheet.
  const onSubmit = async (e) => {
    e.preventDefault();
    if (sendState === 'sending') return;
    const found = validate(v);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setSendState('sending');
    const result = await saveToSheet('Write to us', {
      name: v.name.trim(),
      email: v.email.trim(),
      company: v.company.trim(),
      topic: CONNECT_TOPICS[v.topic].label,
      needs: needs.join(', '),
      timing: v.when,
      message: v.message.trim(),
    });
    setSendState(result.ok ? 'sent' : 'error');
  };

  const writeAnother = () => {
    setV((s) => ({ ...s, message: '' }));
    setNeeds([]);
    setSendState('idle');
  };

  return (
    <main className="page connect" id="main">
      <div className="cn-switch wrap">
        <div className={`cn-tabs is-${mode}`} role="tablist" aria-label="How would you like to reach us?">
          <span className="cn-tabs__pill" aria-hidden="true" />
          <button type="button" role="tab" aria-selected={mode === 'call'} onClick={() => setMode('call')}>
            Book a free call
          </button>
          <button type="button" role="tab" aria-selected={mode === 'write'} onClick={() => setMode('write')}>
            Write to us
          </button>
        </div>
        <a className="cn-wa" href={whatsappLink('Hi Welqor, ')} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="cn-wa__icon" />
          <span>
            Chat on WhatsApp <small>{SITE.whatsappLabel}</small>
          </span>
        </a>
      </div>

      {mode === 'call' && (
        <section className="cn-call wrap">
          <header className="cn-call__head">
            <p className="eyebrow">Connect with Welqor</p>
            <h1 className="display">
              Book a free call. <em>Thirty minutes, no pitch.</em>
            </h1>
            <p className="cn-call__lede">
              Pick a slot that suits you. One of the founders joins on Google Meet to talk through
              your idea, your users and your deadline.
            </p>
          </header>
          <BookCall initialTopic={preset.topic} />
        </section>
      )}

      {mode === 'write' && (
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
            <button type="submit" className="letter__send" disabled={sendState === 'sending'}>
              <span>{sendState === 'sending' ? 'Sending…' : 'Send it'}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 11.5 21 3l-6.5 18-3.2-7.3L3 11.5Z" />
              </svg>
            </button>
            <p>Goes straight to our team. We reply within one working day.</p>
          </div>

          {sendState === 'error' && (
            <p className="letter__missing" role="alert">
              We could not send your message just now. Please try again, or reach us on WhatsApp at{' '}
              {SITE.whatsappLabel}.
            </p>
          )}

          {sendState === 'sent' && (
            <div className="letter__done" role="status">
              <span className="letter__seal" aria-hidden="true">
                ✓
              </span>
              <p className="letter__done-title">Delivered. Thank you, {v.name.trim().split(' ')[0]}.</p>
              <p>
                Your message is with our team. We will reply to <strong>{v.email.trim()}</strong> within
                one working day.
              </p>
              <button type="button" className="letter__again" onClick={writeAnother}>
                Write another message
              </button>
            </div>
          )}
        </form>
      </div>

      )}

      <section className="cn-after">
        <div className="cn-after__grid wrap">
          <ReplyClock />
          <div className="cn-after__journey">
            <h2>What happens after you hit send</h2>
            <ol className="cn-after__next">
              {CONNECT_NEXT.map((s, i) => (
                <li key={s.title} style={{ '--i': i }}>
                  <span className="cn-after__dot" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="cn-after__when">{s.when}</p>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
