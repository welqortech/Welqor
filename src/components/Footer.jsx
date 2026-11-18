import { SITE } from '../config';
import Logo from './Logo';
import './Footer.css';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#plans', label: 'Ways to work' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer on-dark">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo tone="light" />
            <p>Websites, apps and custom software, designed and built by one team.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer__links">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer__bottom">
          <p>
            &copy; {year} {SITE.name}. Based in {SITE.location}, working with clients everywhere.
          </p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
    </footer>
  );
}
