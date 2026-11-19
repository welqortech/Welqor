import { Link } from '../router';

const WAYS = [
  { to: '/work', label: 'Overview' },
  { to: '/work/project', label: 'Project' },
  { to: '/work/team', label: 'Dedicated team' },
  { to: '/work/care', label: 'Care plan' },
];

// Segmented control at the top of each ways-to-work page.
export default function WorkSwitcher({ current, tone = 'light' }) {
  return (
    <nav className={`work-switch work-switch--${tone}`} aria-label="Ways to work with us">
      {WAYS.map((w) => (
        <Link key={w.to} to={w.to} aria-current={current === w.to ? 'page' : undefined}>
          {w.label}
        </Link>
      ))}
    </nav>
  );
}
