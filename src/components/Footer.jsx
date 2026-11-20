import { useEffect, useRef, useState } from 'react';
import { SITE, whatsappLink } from '../config';
import WhatsAppIcon from './WhatsAppIcon';
import { Link } from '../router';
import Logo from './Logo';
import './Footer.css';

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { to: '/about', label: 'About' },
      { to: '/services', label: 'Services' },
      { to: '/solutions', label: 'Solutions' },
      { to: '/industries', label: 'Industries' },
      { to: '/technologies', label: 'Technologies' },
    ],
  },
  {
    title: 'Work with us',
    links: [
      { to: '/work', label: 'Overview' },
      { to: '/work/project', label: 'Fixed-scope project' },
      { to: '/work/team', label: 'Dedicated team' },
      { to: '/work/care', label: 'Care plan' },
    ],
  },
  {
    title: 'Help',
    links: [
      { to: '/faq', label: 'FAQs' },
      { to: '/support', label: 'Support Centre' },
      { to: '/contact', label: 'Connect with Welqor' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terms', label: 'Terms & Conditions' },
      { to: '/privacy', label: 'Privacy Policy' },
    ],
  },
];

const WORD = SITE.name.toLowerCase().split(''); // matches the logo wordmark

export default function Footer() {
  const year = new Date().getFullYear();
  const rootRef = useRef(null);
  const wordRef = useRef(null);
  const [seen, setSeen] = useState(false);

  // Letters rise once the footer scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The spotlight follows the pointer across the wordmark.
  const onMove = (e) => {
    const el = wordRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    el.classList.add('is-pointer');
  };
  const onLeave = () => wordRef.current?.classList.remove('is-pointer');

  const letters = (cls) =>
    WORD.map((ch, i) => (
      <span className={cls} key={i} style={{ '--i': i }}>
        {ch}
      </span>
    ));

  return (
    <footer className={`ft${seen ? ' is-in' : ''}`} ref={rootRef}>
      <div className="ft__top wrap">
        <div className="ft-brand">
          <Logo tone="light" />
          <p className="ft-brand__line">
            Websites, apps and AI tools, planned, built and looked after by one small team.
          </p>
        </div>

        <div className="ft-reach">
          <p className="ft-label">Talk to us</p>
          <a className="ft-reach__wa" href={whatsappLink('Hi Welqor, ')} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="ft-reach__wa-icon" />
            <span>
              {SITE.whatsappLabel}
              <small>WhatsApp · preferred</small>
            </span>
          </a>
          <a className="ft-reach__mail" href={`mailto:${SITE.email}`}>
            {SITE.email}
            <span aria-hidden="true">&#8599;</span>
          </a>
          <p className="ft-reach__meta">{SITE.hours}</p>
          <p className="ft-reach__meta">Based in {SITE.location}, working with clients everywhere.</p>
        </div>
      </div>

      <nav className="ft__cols wrap" aria-label="Footer">
        {COLUMNS.map((col, ci) => (
          <div className="ft-col" key={col.title} style={{ '--c': ci }}>
            <p className="ft-label">
              <span>0{ci + 1}</span> {col.title}
            </p>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>
                    <span className="ft-col__text">{l.label}</span>
                    <span className="ft-col__arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div
        className="ft-word"
        ref={wordRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        aria-hidden="true"
      >
        <span className="ft-word__base">{letters('ft-word__ch')}</span>
        <span className="ft-word__lit">{letters('ft-word__ch')}</span>
      </div>

      <div className="ft__bar wrap">
        <p>
          &copy; {year} {SITE.name}. All rights reserved.
        </p>
        <button
          type="button"
          className="ft-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
          <span aria-hidden="true">&uarr;</span>
        </button>
      </div>
    </footer>
  );
}
