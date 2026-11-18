import { useRef } from 'react';
import { SITE } from '../config';
import useCountdown from '../hooks/useCountdown';
import useFitWidth from '../hooks/useFitWidth';
import RollingDigit from './RollingDigit';
import Grain from './Grain';
import Logo from './Logo';
import './Hero.css';

const pad = (n) => String(n).padStart(2, '0');

function Unit({ value, one, many, index }) {
  return (
    <div className="clock__unit" style={{ '--i': index }}>
      <div className="clock__digits">
        {pad(value)
          .split('')
          .map((d, i) => (
            <RollingDigit key={i} value={d} />
          ))}
      </div>
      <span className="clock__label" aria-hidden="true">
        {value === 1 ? one : many}
      </span>
    </div>
  );
}

const Sep = () => (
  <span className="clock__sep" aria-hidden="true">
    :
  </span>
);

export default function Hero({ sectionRef }) {
  const { days, hours, minutes, seconds, done } = useCountdown(SITE.launchAt);
  const clockRef = useRef(null);
  useFitWidth(clockRef, [done, String(days).length]);

  return (
    <section className="hero on-dark" id="top" ref={sectionRef}>
      <Grain className="hero__grain" />

      <div className="hero__bar wrap">
        <Logo tone="light" />
        <a className="btn btn--outline-light btn--sm" href="#contact">
          Start a project
        </a>
      </div>

      <div className="hero__body wrap">
        {done ? (
          <>
            <h1 className="hero__open">We&rsquo;re open for projects.</h1>
            <p className="hero__note">
              Tell us what you want to build and we&rsquo;ll reply within one working day.
            </p>
            <a className="btn btn--light hero__open-cta" href="#contact">
              Start a project
            </a>
          </>
        ) : (
          <>
            <h1 className="hero__title">{SITE.name} opens for projects in</h1>
            <div className="clock" role="timer" ref={clockRef}>
              <span className="sr-only">
                {days} days, {hours} hours and {minutes} minutes
              </span>
              <Unit value={days} one="day" many="days" index={0} />
              <Sep />
              <Unit value={hours} one="hour" many="hours" index={1} />
              <Sep />
              <Unit value={minutes} one="minute" many="minutes" index={2} />
              <Sep />
              <Unit value={seconds} one="second" many="seconds" index={3} />
            </div>
          </>
        )}
      </div>

      <div className="hero__foot wrap">
        <p className="hero__date">
          {done ? `Opened ${SITE.launchLabel}` : SITE.launchLabel}
        </p>
        <a className="hero__scroll" href="#about">
          See what we do
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
