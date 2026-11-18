import { useEffect, useState } from 'react';

// One digit of the countdown. When the value changes, the old digit
// drops out of a clipped window while the new one drops in from above.
export default function RollingDigit({ value }) {
  const [state, setState] = useState({ current: value, previous: null, turn: 0 });

  useEffect(() => {
    setState((s) =>
      s.current === value ? s : { current: value, previous: s.current, turn: s.turn + 1 }
    );
  }, [value]);

  const { current, previous, turn } = state;

  return (
    <span className="digit" aria-hidden="true">
      {previous !== null && (
        <span key={`out-${turn}`} className="digit__face digit__face--out">
          {previous}
        </span>
      )}
      <span key={`in-${turn}`} className={`digit__face${turn ? ' digit__face--in' : ''}`}>
        {current}
      </span>
    </span>
  );
}
