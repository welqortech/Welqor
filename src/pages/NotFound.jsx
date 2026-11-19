import { Link } from '../router';
import { PAGES } from '../components/Nav';

export default function NotFound() {
  return (
    <main className="page" id="main">
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gap: 24 }}>
          <p className="eyebrow">Error 404</p>
          <h1 className="display">
            This page <em>does not exist.</em>
          </h1>
          <p className="section-lede">Try one of these instead.</p>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
            <li>
              <Link className="more-link" to="/">
                Home
              </Link>
            </li>
            {PAGES.map((p) => (
              <li key={p.to}>
                <Link className="more-link" to={p.to}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
