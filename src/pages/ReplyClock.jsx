import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------
   Reply clock: a live India-time clock, whether the studio is in right
   now, and the real date you will hear back by if you send a message
   now ("within one working day", skipping weekends).
   Studio hours match SITE.hours: Monday to Friday, 9:30 AM to 6:30 PM IST.
------------------------------------------------------------------- */

const OPEN = { days: [1, 2, 3, 4, 5], from: 9.5, to: 18.5 };
const IST = 330;

const istNow = () => {
  const now = new Date();
  return new Date(now.getTime() + (now.getTimezoneOffset() + IST) * 60000);
};

const isWorkday = (d) => OPEN.days.includes(d.getDay());

const nextWorkday = (from) => {
  const d = new Date(from);
  do d.setDate(d.getDate() + 1);
  while (!isWorkday(d));
  return d;
};

const dateLabel = (d) => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });

function read() {
  const ist = istNow();
  const hour = ist.getHours() + ist.getMinutes() / 60;
  const open = isWorkday(ist) && hour >= OPEN.from && hour < OPEN.to;
  // Studio opens again: later today (before 9:30 on a workday) or the next workday.
  const reopens = isWorkday(ist) && hour < OPEN.from ? ist : nextWorkday(ist);
  return {
    hh: String(((ist.getHours() + 11) % 12) + 1),
    mm: String(ist.getMinutes()).padStart(2, '0'),
    ss: String(ist.getSeconds()).padStart(2, '0'),
    ampm: ist.getHours() < 12 ? 'AM' : 'PM',
    open,
    reopens: reopens === ist ? 'today at 9:30 AM' : `${dateLabel(reopens)} at 9:30 AM`,
    replyBy: dateLabel(nextWorkday(ist)),
    // how far through today's studio hours we are, for the day bar
    dayProgress: Math.min(1, Math.max(0, (hour - OPEN.from) / (OPEN.to - OPEN.from))),
  };
}

export default function ReplyClock() {
  const [t, setT] = useState(read);

  useEffect(() => {
    const id = setInterval(() => setT(read()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`rc${t.open ? ' is-open' : ''}`}>
      <p className="rc__label">Right now in our studio</p>

      <p className="rc__time" aria-label={`${t.hh}:${t.mm} ${t.ampm} India time`}>
        <span>{t.hh}</span>
        <span className="rc__colon" aria-hidden="true">
          :
        </span>
        <span>{t.mm}</span>
        <small aria-hidden="true">
          {t.ss}
          <em>{t.ampm}</em>
        </small>
      </p>

      <p className="rc__status">
        <i aria-hidden="true" />
        {t.open ? 'The team is in and reading messages' : `Back ${t.reopens}`}
      </p>

      <div className="rc__day" aria-hidden="true">
        <span style={{ '--p': t.dayProgress }} />
        <em>9:30</em>
        <em>6:30</em>
      </div>

      <div className="rc__promise">
        <p>Send something now and you will hear back by</p>
        <strong>{t.replyBy}</strong>
      </div>
    </div>
  );
}
