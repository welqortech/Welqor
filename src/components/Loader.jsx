import './Loader.css';

/* ------------------------------------------------------------------
   Entry loader: a web page gets designed and built in front of you.

   1. Sketch  - thin ink lines draw a wireframe page
   2. Build   - the wireframe fills with colour and becomes a design
   3. Launch  - a cursor clicks the button, and the little page zooms
                toward you and becomes the real site

   Shown on the first visit and when returning to the home page only.
   App.jsx drives the phases ("in", "play", "out").
------------------------------------------------------------------- */

const WORDS = ['Sketch.', 'Build.', 'Launch.'];

export default function Loader({ phase }) {
  if (phase === 'idle') return null;

  return (
    <div className={`ld is-${phase}`} aria-hidden="true">
      {phase !== 'in' && (
        <div className="ld__stage">
          <svg className="ld__page" viewBox="0 0 320 210">
            {/* fills (step 2) sit under the lines */}
            <g className="ld-fill">
              <rect className="ld-fill__frame" x="4" y="4" width="312" height="202" rx="16" />
              <rect className="ld-fill__bar" x="4" y="4" width="312" height="26" rx="16" />
              <rect className="ld-fill__logo" x="20" y="44" width="16" height="16" rx="4" />
              <rect className="ld-fill__h1" x="20" y="84" width="128" height="14" rx="5" />
              <rect className="ld-fill__h1" x="20" y="104" width="96" height="14" rx="5" />
              <rect className="ld-fill__btn" x="20" y="154" width="74" height="24" rx="12" />
              <rect className="ld-fill__img" x="176" y="74" width="124" height="108" rx="14" />
              <circle className="ld-fill__sun" cx="270" cy="102" r="10" />
              <path className="ld-fill__hill" d="M176 160l34-34 26 24 18-16 46 34a14 14 0 0 1-14 14H190a14 14 0 0 1-14-14z" />
            </g>

            {/* sketch lines (step 1) */}
            <g className="ld-lines" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect style={{ '--i': 0 }} x="4" y="4" width="312" height="202" rx="16" pathLength="1" />
              <path style={{ '--i': 1 }} d="M4 30h312" pathLength="1" />
              <circle style={{ '--i': 1 }} cx="18" cy="17" r="3.5" pathLength="1" />
              <circle style={{ '--i': 1 }} cx="30" cy="17" r="3.5" pathLength="1" />
              <rect style={{ '--i': 2 }} x="20" y="44" width="16" height="16" rx="4" pathLength="1" />
              <path style={{ '--i': 2 }} d="M200 52h22M234 52h22M268 52h32" pathLength="1" />
              <path style={{ '--i': 3 }} d="M20 91h128M20 111h96" pathLength="1" />
              <path style={{ '--i': 4 }} d="M20 134h116" pathLength="1" />
              <rect style={{ '--i': 4 }} x="20" y="154" width="74" height="24" rx="12" pathLength="1" />
              <rect style={{ '--i': 3 }} x="176" y="74" width="124" height="108" rx="14" pathLength="1" />
              <path style={{ '--i': 5 }} d="M176 160l34-34 26 24 18-16 46 34" pathLength="1" />
              <circle style={{ '--i': 5 }} cx="270" cy="102" r="10" pathLength="1" />
            </g>

            {/* button label appears once it is built */}
            <text className="ld-btn-text" x="57" y="170" textAnchor="middle">
              Launch
            </text>

            {/* the cursor (step 3) */}
            <g className="ld-cursor">
              <path d="M0 0l0 17 4.6-4.4 3.3 7.4 3-1.4-3.2-7.2h6.3z" />
            </g>
          </svg>

          <p className="ld__words">
            {WORDS.map((w, i) => (
              <span key={w} style={{ '--i': i }}>
                {w}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
