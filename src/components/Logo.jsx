import './Logo.css';

// Placeholder wordmark. When your logo is ready:
//   1. Put the file in src/assets/ (for example src/assets/welqor-logo.svg)
//   2. Add:  import logoUrl from '../assets/welqor-logo.svg';
//   3. Replace the two <span>s below with:
//        <img className="logo__img" src={logoUrl} alt="Welqor" />
// Use a white version for tone="light" (the blue hero) if you have one.

export default function Logo({ tone = 'dark' }) {
  return (
    <a className={`logo logo--${tone}`} href="#top" aria-label="Welqor, back to top">
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__word">Welqor</span>
    </a>
  );
}
