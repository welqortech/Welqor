// Small, animated product previews for the Projects bento on the home page.
// Pure HTML and CSS (styles in HomeProjects.css); decorative only.

function Vault() {
  const files = [
    { name: 'GA-drawing_rev4.pdf', tag: 'Engineering', locked: true },
    { name: 'Supplier-contract.pdf', tag: 'Legal', locked: true },
    { name: 'Assembly-spec.pdf', tag: 'Production', locked: false },
    { name: 'QC-report_Q3.pdf', tag: 'Quality', locked: true },
  ];
  const log = [
    ['R. Kumar', 'viewed', 'GA-drawing'],
    ['Admin', 'changed access', 'Contract'],
    ['S. Devi', 'downloaded', 'Spec'],
  ];
  return (
    <div className="pa pa--vault">
      <div className="pa-win">
        <div className="pa-win__bar">
          <i />
          <i />
          <i />
          <span>docvault / drawings</span>
        </div>
        <ul className="pa-files">
          {files.map((f, i) => (
            <li key={f.name} style={{ '--i': i }}>
              <span className="pa-files__icon">PDF</span>
              <span className="pa-files__name">{f.name}</span>
              <span className="pa-files__tag">{f.tag}</span>
              <span className={`pa-files__lock${f.locked ? ' is-locked' : ''}`}>
                <svg viewBox="0 0 24 24">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d={f.locked ? 'M8 11V8a4 4 0 0 1 8 0v3' : 'M8 11V8a4 4 0 0 1 7.5-2'} />
                </svg>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pa-log">
        <p>Audit trail</p>
        <ul>
          {log.map(([who, what, file], i) => (
            <li key={who + what} style={{ '--i': i }}>
              <b>{who}</b> {what} <em>{file}</em>
            </li>
          ))}
        </ul>
      </div>
      <div className="pa-shield">
        <svg viewBox="0 0 24 24">
          <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      </div>
    </div>
  );
}

function Booking() {
  const langs = ['EN', 'த', 'മ', 'हि'];
  const slots = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '2:00', '2:30'];
  const taken = new Set([1, 3, 6]);
  return (
    <div className="pa pa--booking">
      <div className="pa-card">
        <div className="pa-card__top">
          <span className="pa-card__doc">
            <i />
            Cardiology · Dr. A
          </span>
          <span className="pa-langs">
            {langs.map((l, i) => (
              <b key={l} style={{ '--i': i }}>
                {l}
              </b>
            ))}
          </span>
        </div>
        <div className="pa-days">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
            <span key={d} className={i === 2 ? 'is-on' : ''}>
              {d}
              <b>{12 + i}</b>
            </span>
          ))}
        </div>
        <div className="pa-slots">
          {slots.map((s, i) => (
            <span key={s} className={taken.has(i) ? 'is-taken' : i === 4 ? 'is-pick' : ''}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="pa-toast">
        <span>✓</span>
        Booked · Wed 11:00
      </div>
    </div>
  );
}

function Board() {
  const cols = [
    { name: 'To do', cards: [70, 50] },
    { name: 'Doing', cards: [60] },
    { name: 'Done', cards: [80, 55] },
  ];
  return (
    <div className="pa pa--board">
      <div className="pa-board">
        {cols.map((c) => (
          <div className="pa-col" key={c.name}>
            <p>
              {c.name} <span>{c.cards.length}</span>
            </p>
            {c.cards.map((w, i) => (
              <span className="pa-task" key={i} style={{ '--w': `${w}%` }}>
                <i />
              </span>
            ))}
          </div>
        ))}
        <span className="pa-task pa-task--fly" style={{ '--w': '62%' }}>
          <i />
        </span>
      </div>
      <div className="pa-ping">
        <span className="pa-ping__dot" />
        Task moved to Done
      </div>
    </div>
  );
}

const ARTS = { vault: Vault, booking: Booking, board: Board };

export default function ProjectArt({ kind }) {
  const Art = ARTS[kind];
  return Art ? <Art /> : null;
}
