import Logo from './Logo';
import './Nav.css';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#plans', label: 'Ways to work' },
  { href: '#faq', label: 'FAQ' },
];

export default function Nav({ visible }) {
  return (
    <header className={`nav${visible ? ' is-visible' : ''}`}>
      <div className="nav__inner wrap">
        <Logo />
        <nav className="nav__menu" aria-label="Main">
          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--primary btn--sm nav__cta" href="#contact">
          Start a project
        </a>
      </div>
    </header>
  );
}
