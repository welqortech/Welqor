import { Link } from '../router';
import './Logo.css';

// The Welqor mark: a W built from two strokes that meet in the middle,
// one for each founder (B and P), set in the site's tile shape, which
// has one sharp corner. It draws itself in once on load.

export function LogoMark({ className = '' }) {
  return (
    <svg className={`logo__mark ${className}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path
        className="logo__tile"
        d="M14 2h20a12 12 0 0 1 12 12v20a12 12 0 0 1-12 12H6a4 4 0 0 1-4-4V14A12 12 0 0 1 14 2z"
      />
      <g className="logo__w" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.6">
        <path className="logo__half logo__half--b" d="M10 14l6 20 8-16" pathLength="1" />
        <path className="logo__half logo__half--p" d="M24 18l8 16 6-20" pathLength="1" />
      </g>
    </svg>
  );
}

export default function Logo({ tone = 'dark' }) {
  return (
    <Link className={`logo logo--${tone}`} to="/" aria-label="Welqor, home">
      <LogoMark />
      <span className="logo__word">welqor</span>
    </Link>
  );
}
