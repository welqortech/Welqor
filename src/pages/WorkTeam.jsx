import { useState } from 'react';
import { TEAM_ROLES, TEAM_PAGE } from '../pages-content';
import useReveal from '../hooks/useReveal';
import { navigate } from '../router';
import Grain from '../components/Grain';
import WorkSwitcher from './WorkSwitcher';
import './Work.css';

const START = { lead: 1, frontend: 1, backend: 1, mobile: 0, designer: 1, qa: 0 };
const MAX = 4;
const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function WorkTeam() {
  useReveal();
  const [team, setTeam] = useState(START);

  const change = (id, delta) =>
    setTeam((t) => ({ ...t, [id]: Math.min(MAX, Math.max(0, t[id] + delta)) }));

  const people = TEAM_ROLES.flatMap((r) =>
    Array.from({ length: team[r.id] }, (_, i) => ({ key: `${r.id}-${i}`, role: r }))
  );
  const summary = TEAM_ROLES.filter((r) => team[r.id] > 0)
    .map((r) => `${team[r.id]} × ${r.name}`)
    .join(', ');

  const askAbout = () => {
    const message = `We would like a dedicated team of ${people.length}: ${summary}.

What we are working on: `;
    navigate(`/contact?topic=team&message=${encodeURIComponent(message)}`);
  };

  return (
    <main className="page work-page" id="main">
      <section className="wt-hero dark-band on-dark">
        <Grain />
        <div className="wrap">
          <WorkSwitcher current="/work/team" tone="dark" />
          <h1 className="display wt-hero__title">
            Your roadmap. <em>Our people.</em> Booked by the month.
          </h1>
          <p className="wt-hero__lede">
            Developers, designers and QA who work only on your product, inside your tools, at your
            pace. Grow or shrink the team as the roadmap changes.
          </p>
        </div>
      </section>

      <section className="wt-builder section" aria-labelledby="builder-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title" id="builder-title">
              Sketch your team
            </h2>
            <p className="section-lede">
              Add the roles you think you need. We will tell you honestly if it is more or less
              than the work calls for.
            </p>
          </div>

          <div className="wt-builder__grid">
            <ul className="wt-roles">
              {TEAM_ROLES.map((r) => (
                <li key={r.id} className={`wt-role${team[r.id] ? ' is-on' : ''}`}>
                  <div className="wt-role__copy">
                    <h3>{r.name}</h3>
                    <p>{r.text}</p>
                  </div>
                  <div className="wt-role__count">
                    <button
                      type="button"
                      onClick={() => change(r.id, -1)}
                      disabled={team[r.id] === 0}
                      aria-label={`Remove a ${r.name}`}
                    >
                      &minus;
                    </button>
                    <output aria-live="polite" aria-label={`${r.name} count`}>
                      {team[r.id]}
                    </output>
                    <button
                      type="button"
                      onClick={() => change(r.id, 1)}
                      disabled={team[r.id] === MAX}
                      aria-label={`Add a ${r.name}`}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="wt-board" aria-label="Your team so far">
              <p className="wt-board__label">Your team</p>
              <p className="wt-board__size">
                <strong>{people.length}</strong> {people.length === 1 ? 'person' : 'people'}
              </p>
              <ul className="wt-board__faces">
                {people.map((p, i) => (
                  <li key={p.key} title={p.role.name} style={{ '--i': i }} className={`is-${p.role.id}`}>
                    {initials(p.role.name)}
                  </li>
                ))}
                {people.length === 0 && <li className="is-empty">Add a role to begin</li>}
              </ul>
              <p className="wt-board__summary">{summary || 'Nobody yet.'}</p>
              <button
                type="button"
                className="btn btn--light"
                onClick={askAbout}
                disabled={people.length === 0}
              >
                Ask about this team
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section className="wt-month section">
        <div className="wt-month__grid wrap">
          <h2 className="section-title">Your first month</h2>
          <ol className="wt-month__list">
            {TEAM_PAGE.firstMonth.map((w, i) => (
              <li key={w.when} className="reveal" style={{ '--d': i }}>
                <span className="wt-month__when">{w.when}</span>
                <p>{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wt-rhythm section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">How the team runs</h2>
          </div>
          <ul className="wt-rhythm__grid">
            {TEAM_PAGE.rhythm.map((r, i) => (
              <li key={r.title} className="reveal" style={{ '--d': i % 3 }}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  );
}
