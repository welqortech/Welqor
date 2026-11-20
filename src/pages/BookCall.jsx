import { useEffect, useMemo, useRef, useState } from 'react';
import { SITE, CALL, whatsappLink } from '../config';
import { CONNECT_TOPICS } from '../help-content';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { saveToSheet, loadBookedSlots } from '../sheets';
import './BookCall.css';

/* ------------------------------------------------------------------
   Book a free call.

   1. Pick a day from a ribbon of the next working days.
   2. Pick a time on a clock dial; the hand swings to the slot and the
      centre shows India time plus the visitor's own time.
   3. Add a name and email.

   A boarding pass on the side fills in as they go. They confirm on
   WhatsApp (preferred), by email, or add it to Google Calendar. All
   times are India time (IST, UTC+5:30); slot settings live in config.
------------------------------------------------------------------- */

const IST = 330; // minutes ahead of UTC
const SLOTS = [];
for (let m = CALL.from * 60; m + CALL.length <= CALL.to * 60; m += CALL.step) SLOTS.push(m);

const istDay = (ms) => {
  const d = new Date(ms + IST * 60000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), dow: d.getUTCDay() };
};

function upcomingDays() {
  const out = [];
  for (let i = 1; out.length < CALL.horizon && i < 40; i += 1) {
    const day = istDay(Date.now() + i * 86400000);
    if (CALL.days.includes(day.dow)) out.push(day);
  }
  return out;
}

const dayKey = (day) => `${day.y}-${day.m}-${day.d}`;
const pad2 = (n) => String(n).padStart(2, '0');
// The slot id stored in the sheet: "YYYY-MM-DD HH:MM" in India time.
const slotId = (day, mins) =>
  `${day.y}-${pad2(day.m + 1)}-${pad2(day.d)} ${pad2(Math.floor(mins / 60))}:${pad2(mins % 60)}`;
const asUTC = (day) => new Date(Date.UTC(day.y, day.m, day.d));
const instant = (day, mins) => new Date(Date.UTC(day.y, day.m, day.d, 0, mins) - IST * 60000);

const fmt = (date, opts) => date.toLocaleString('en-IN', { timeZone: 'UTC', ...opts });
const dayLabel = (day, opts) => fmt(asUTC(day), opts);

const istTime = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return { clock: `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}`, ampm: h < 12 ? 'AM' : 'PM' };
};

const localTime = (date) =>
  date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?([ap])\.?m\.?/i, (_, x) => ` ${x.toUpperCase()}M`);

const sameZone = () => new Date().getTimezoneOffset() === -IST;

const gcalStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/* ---------- Clock dial geometry ---------- */
const SIZE = 300;
const C = SIZE / 2;
const R = 116;
// angle on a 12-hour face, clockwise from 12 o'clock
const angleOf = (mins) => ((mins / 60) % 12) * 30;
const startAngle = angleOf(SLOTS[0]);
// unwrap so angles increase through the day (avoids the hand spinning backwards)
const unwrapped = (mins) => startAngle + (mins - SLOTS[0]) / 2;
const point = (deg, r = R) => {
  const rad = (deg * Math.PI) / 180;
  return [C + r * Math.sin(rad), C - r * Math.cos(rad)];
};
const arc = (from, to, r = R) => {
  const [x1, y1] = point(from, r);
  const [x2, y2] = point(to, r);
  return `M${x1} ${y1} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

function Dial({ value, onPick, taken }) {
  const end = unwrapped(SLOTS[SLOTS.length - 1]);
  const hand = value == null ? startAngle - 20 : unwrapped(value);
  const t = value == null ? null : istTime(value);

  return (
    <div className="bk-dial" role="radiogroup" aria-label="Pick a time (India time)">
      <svg className="bk-dial__face" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle cx={C} cy={C} r={R + 26} className="bk-dial__rim" />
        {Array.from({ length: 60 }, (_, i) => {
          const [x1, y1] = point(i * 6, R + 22);
          const [x2, y2] = point(i * 6, R + (i % 5 ? 17 : 12));
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={i % 5 ? 'bk-tick' : 'bk-tick bk-tick--hour'} />;
        })}
        <path d={arc(startAngle, end)} className="bk-dial__open" />
        {value != null && <path d={arc(startAngle, Math.max(startAngle + 0.1, hand))} className="bk-dial__done" />}
        <g className="bk-dial__hand" style={{ transform: `rotate(${hand}deg)` }}>
          <line x1={C} y1={C} x2={C} y2={C - R + 16} />
          <circle cx={C} cy={C - R + 16} r="4" />
        </g>
        <circle cx={C} cy={C} r="7" className="bk-dial__pin" />
      </svg>

      {SLOTS.map((mins) => {
        const [x, y] = point(unwrapped(mins));
        const full = mins % 60 === 0;
        const label = istTime(mins);
        return (
          <button
            key={mins}
            type="button"
            role="radio"
            aria-checked={value === mins}
            aria-label={`${label.clock} ${label.ampm} India time${taken.has(mins) ? ', already booked' : ''}`}
            disabled={taken.has(mins)}
            className={`bk-slot${full ? ' is-hour' : ''}${value === mins ? ' is-on' : ''}${taken.has(mins) ? ' is-taken' : ''}`}
            style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
            onClick={() => onPick(mins)}
          >
            {full ? label.clock.split(':')[0] : ''}
          </button>
        );
      })}

      <div className="bk-dial__centre" aria-live="polite">
        {t ? (
          <>
            <strong key={value}>{t.clock}</strong>
            <span>{t.ampm} · India</span>
          </>
        ) : (
          <span className="bk-dial__hint">Tap a time on the dial</span>
        )}
      </div>
    </div>
  );
}

function Pass({ name, day, mins, topic, booked }) {
  const start = day && mins != null ? instant(day, mins) : null;
  const t = mins != null ? istTime(mins) : null;
  const local = start && !sameZone() ? localTime(start) : null;
  return (
    <div className={`bk-pass${booked ? ' is-booked' : ''}`} aria-label="Your booking so far">
      {booked && (
        <span className="bk-pass__stamp" aria-hidden="true">
          Booked
        </span>
      )}
      <div className="bk-pass__main">
        <div className="bk-pass__top">
          <span>Boarding pass</span>
          <span>WLQ · 30</span>
        </div>
        <div className="bk-pass__route">
          <div>
            <small>From</small>
            <strong>You</strong>
          </div>
          <span className="bk-pass__plane" aria-hidden="true">
            <i />
          </span>
          <div className="is-right">
            <small>To</small>
            <strong>Welqor</strong>
          </div>
        </div>
        <dl className="bk-pass__grid">
          <div className="is-wide">
            <dt>Passenger</dt>
            <dd className={name ? '' : 'is-empty'}>{name || 'Your name'}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd className={day ? '' : 'is-empty'} key={day ? dayKey(day) : 'd'}>
              {day ? dayLabel(day, { weekday: 'short', day: 'numeric', month: 'short' }) : '— — —'}
            </dd>
          </div>
          <div>
            <dt>Time (IST)</dt>
            <dd className={t ? '' : 'is-empty'} key={mins ?? 't'}>
              {t ? `${t.clock} ${t.ampm}` : '--:--'}
            </dd>
          </div>
          <div>
            <dt>Your time</dt>
            <dd className={start ? '' : 'is-empty'}>{start ? local || 'Same as IST' : '--:--'}</dd>
          </div>
          <div>
            <dt>Gate</dt>
            <dd>Google Meet</dd>
          </div>
          <div className="is-wide">
            <dt>About</dt>
            <dd>{CONNECT_TOPICS[topic].label.replace(/^a /, '')}</dd>
          </div>
        </dl>
      </div>
      <div className="bk-pass__stub">
        <span className="bk-pass__len">30</span>
        <span className="bk-pass__min">min</span>
        <span className="bk-pass__free">Free</span>
        <span className="bk-pass__code" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function BookCall({ initialTopic = 'project' }) {
  const days = useMemo(upcomingDays, []);
  const [day, setDay] = useState(null);
  const [mins, setMins] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', topic: initialTopic, company: '' });
  const [tried, setTried] = useState(false);

  const [booked, setBooked] = useState(() => new Set()); // slot ids taken in the sheet
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [status, setStatus] = useState('idle'); // idle | saving | done | taken | error
  const savedKey = useRef('');

  const refreshSlots = () =>
    loadBookedSlots().then((ids) => {
      setBooked(ids);
      setLoadingSlots(false);
      return ids;
    });

  useEffect(() => {
    refreshSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takenFor = (d) => new Set(d ? SLOTS.filter((m) => booked.has(slotId(d, m))) : []);
  const taken = takenFor(day);

  // If the chosen time is (or becomes) booked for the chosen day, clear it.
  useEffect(() => {
    if (day && mins != null && booked.has(slotId(day, mins)) && status !== 'done') setMins(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, booked]);

  const set = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === 'error' || status === 'taken') setStatus('idle');
  };
  const pickDay = (d) => {
    setDay(d);
    if (status !== 'done') setStatus('idle');
  };
  const pickTime = (m) => {
    setMins(m);
    if (status !== 'done') setStatus('idle');
  };

  const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
  const missing = [
    !day && 'a day',
    mins == null && 'a time',
    !form.name.trim() && 'your name',
    !emailOk && 'an email for the Meet link',
  ].filter(Boolean);
  const ready = missing.length === 0;

  const start = day && mins != null ? instant(day, mins) : null;
  const t = mins != null ? istTime(mins) : null;
  const longDay = day ? dayLabel(day, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const when = day && t ? `${longDay}, ${t.clock} ${t.ampm} IST` : '';
  const yours = start && !sameZone() ? ` (${localTime(start)} your time)` : '';
  const summary = [
    `Hi Welqor, I would like to book a free 30-minute call.`,
    '',
    `When: ${when}${yours}`,
    `About: ${CONNECT_TOPICS[form.topic].label}`,
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    form.company.trim() && `Company: ${form.company.trim()}`,
  ]
    .filter((l) => l !== false && l !== '')
    .join('\n');

  const waHref = whatsappLink(summary);
  // The calendar event's description: everything the visitor needs on the day.
  const end = mins != null ? istTime(mins + CALL.length) : null;
  const endLocal = start ? localTime(new Date(start.getTime() + CALL.length * 60000)) : '';
  const calendarDetails = start
    ? [
        'Free 30-minute discovery call with Welqor',
        '',
        `When: ${longDay}, ${t.clock} ${t.ampm} to ${end.clock} ${end.ampm} (India time, IST)`,
        !sameZone() && `Your time: ${localTime(start)} to ${endLocal}`,
        `Where: Google Meet. We will email the link to ${form.email.trim()} within one working day.`,
        `About: ${CONNECT_TOPICS[form.topic].label}`,
        `Booked by: ${form.name.trim()}${form.company.trim() ? `, ${form.company.trim()}` : ''}`,
        '',
        'Before the call:',
        '• Write a few lines about the idea',
        '• Gather examples you like, or links to what you have today',
        '• Note any deadline we should know about',
        '',
        'Need to reschedule?',
        `WhatsApp: ${SITE.whatsappLabel}`,
        `Email: ${SITE.email}`,
        '',
        'Welqor · https://www.welqor.in',
      ]
        .filter((l) => l !== false)
        .join('\n')
    : '';
  const gcalHref = start
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Discovery call with Welqor')}&dates=${gcalStamp(start)}/${gcalStamp(new Date(start.getTime() + CALL.length * 60000))}&details=${encodeURIComponent(calendarDetails)}&location=${encodeURIComponent('Google Meet (link sent by email)')}`
    : '#';

  // Save the booking to the sheet. The same booking is never saved twice.
  const book = async (via) => {
    const id = slotId(day, mins);
    const key = [id, form.name.trim(), form.email.trim()].join('|');
    if (savedKey.current === key) return;
    savedKey.current = key;
    setStatus('saving');
    const result = await saveToSheet('Book a free call', {
      name: form.name.trim(),
      email: form.email.trim(),
      topic: CONNECT_TOPICS[form.topic].label,
      company: form.company.trim(),
      date: longDay,
      time: `${t.clock} ${t.ampm}`,
      localTime: start.toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      via,
      slot: id,
    });
    if (result.ok) {
      setStatus('done');
      setBooked((b) => new Set(b).add(id));
      return;
    }
    savedKey.current = '';
    if (result.error === 'slot-taken') {
      setStatus('taken');
      setMins(null);
      refreshSlots();
    } else {
      setStatus('error');
    }
  };

  const onSubmit = () => {
    if (!ready) {
      setTried(true);
      return;
    }
    book('Website');
  };

  // WhatsApp opens straight away (browsers block it after a wait);
  // the booking is saved alongside.
  const onWhatsApp = (e) => {
    if (!ready) {
      e.preventDefault();
      setTried(true);
      return;
    }
    book('WhatsApp');
  };

  const reset = () => {
    savedKey.current = '';
    setMins(null);
    setStatus('idle');
    setTried(false);
  };

  const weekOf = (d) => dayLabel(d, { month: 'long' });

  return (
    <div className="bk">
      <div className="bk__main">
        {/* 1. Day */}
        <section className="bk-step">
          <h2 className="bk-step__title">
            <span>1</span> Pick a day
          </h2>
          <div className="bk-days" role="radiogroup" aria-label="Pick a day">
            {days.map((d, i) => {
              const on = day && dayKey(day) === dayKey(d);
              const newMonth = i === 0 || days[i - 1].m !== d.m;
              const full = takenFor(d).size === SLOTS.length;
              return (
                <button
                  key={dayKey(d)}
                  type="button"
                  role="radio"
                  aria-checked={Boolean(on)}
                  disabled={full}
                  className={`bk-day${on ? ' is-on' : ''}${d.dow === 1 && i > 0 ? ' is-week' : ''}${full ? ' is-full' : ''}`}
                  onClick={() => pickDay(d)}
                  style={{ '--i': i }}
                >
                  {newMonth && <span className="bk-day__month">{weekOf(d)}</span>}
                  <span className="bk-day__dow">{dayLabel(d, { weekday: 'short' })}</span>
                  <span className="bk-day__num">{d.d}</span>
                  {full && <span className="bk-day__full">Full</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Time */}
        <section className={`bk-step bk-step--time${day ? '' : ' is-waiting'}`}>
          <h2 className="bk-step__title">
            <span>2</span> Pick a time <small>India time · 30 minutes</small>
            {loadingSlots && <small className="bk-loading">Checking availability…</small>}
          </h2>
          <div className="bk-time">
            <Dial value={mins} onPick={pickTime} taken={taken} />
            <div className="bk-time__side">
              {start && !sameZone() ? (
                <p className="bk-time__local">
                  That is <strong>{localTime(start)}</strong> where you are.
                </p>
              ) : (
                <p className="bk-time__local">Slots every half hour, {istTime(SLOTS[0]).clock} AM to 6 PM.</p>
              )}
              {day && taken.size > 0 && (
                <p className="bk-time__legend">
                  <span aria-hidden="true" /> {taken.size} {taken.size === 1 ? 'slot is' : 'slots are'} already booked on this day.
                </p>
              )}
              <ul className="bk-time__list" aria-label="Times as a list">
                {SLOTS.map((m) => {
                  const lt = istTime(m);
                  return (
                    <li key={m}>
                      <button type="button" aria-pressed={mins === m} disabled={taken.has(m)} onClick={() => pickTime(m)}>
                        {lt.clock} {lt.ampm}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Details */}
        <section className="bk-step">
          <h2 className="bk-step__title">
            <span>3</span> Who are we meeting?
          </h2>
          <div className="bk-fields">
            <label className="bk-field">
              <span>Your name</span>
              <input name="name" autoComplete="name" value={form.name} onChange={set} aria-invalid={tried && !form.name.trim()} />
            </label>
            <label className="bk-field">
              <span>Email for the Meet link</span>
              <input name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set} aria-invalid={tried && !emailOk} />
            </label>
            <label className="bk-field">
              <span>We will talk about</span>
              <select name="topic" value={form.topic} onChange={set}>
                {Object.entries(CONNECT_TOPICS).map(([id, x]) => (
                  <option key={id} value={id}>
                    {x.label.replace(/^a /, '').replace(/^./, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </label>
            <label className="bk-field">
              <span>Company or website (optional)</span>
              <input name="company" autoComplete="organization" value={form.company} onChange={set} />
            </label>
          </div>
        </section>
      </div>

      <aside className="bk__side">
        <Pass name={form.name.trim()} day={day} mins={mins} topic={form.topic} booked={status === 'done'} />

        {status === 'done' ? (
          <div className="bk-done" role="status">
            <p className="bk-done__title">You are booked in.</p>
            <p>
              {when}. We will send the Google Meet link to <strong>{form.email.trim()}</strong> within one
              working day.
            </p>
            <div className="bk-done__row">
              <a className="bk-alt" href={gcalHref} target="_blank" rel="noopener noreferrer">
                Add to Google Calendar
              </a>
              <button type="button" className="bk-alt" onClick={reset}>
                Book another time
              </button>
            </div>
          </div>
        ) : (
          <div className="bk-actions">
            <a className={`bk-wa${ready ? ' is-ready' : ''}`} href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWhatsApp}>
              <WhatsAppIcon className="bk-wa__icon" />
              <span>
                Confirm on WhatsApp
                <small>Preferred · {SITE.whatsappLabel}</small>
              </span>
            </a>
            <button
              type="button"
              className={`bk-submit${ready ? ' is-ready' : ''}`}
              onClick={onSubmit}
              disabled={status === 'saving'}
            >
              {status === 'saving' ? 'Booking your slot…' : 'Submit booking'}
              <span aria-hidden="true">&rarr;</span>
            </button>
            <p
              className={`bk-actions__note${(tried && !ready) || status === 'taken' || status === 'error' ? ' is-warn' : ''}`}
              aria-live="polite"
            >
              {status === 'taken'
                ? 'Someone just booked that time. Please pick another slot.'
                : status === 'error'
                  ? `We could not save your booking. Please try again, or message us on WhatsApp at ${SITE.whatsappLabel}.`
                  : ready
                    ? 'We confirm the slot and send the Google Meet link within one working day.'
                    : `Still needed: ${missing.join(', ')}.`}
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
