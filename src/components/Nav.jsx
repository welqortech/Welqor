import { useEffect, useState } from 'react';
import { Link, usePath } from '../router';
import Logo from './Logo';
import './Nav.css';

export const PAGES = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/industries', label: 'Industries' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/technologies', label: 'Technologies' },
  { to: '/work', label: 'Work with us', match: '/work' },
];

export default function Nav({ visible }) {
  const path = usePath();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the page changes or Escape is pressed.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${visible ? ' is-visible' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__inner wrap">
        <Logo />
        <nav className="nav__menu" id="nav-menu" aria-label="Main">
          <ul className="nav__links">
            {PAGES.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={path === link.to || (link.match && path.startsWith(link.match)) ? 'page' : undefined}
                  onClick={close}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="btn btn--primary btn--sm nav__cta" to="/contact" onClick={close}>
          Let&rsquo;s talk
        </Link>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__burger" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
