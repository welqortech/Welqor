import { useEffect, useState } from 'react';

const remaining = (target) => Math.max(0, target - Date.now());

// Counts down to a date. Re-renders once per second, timed to the
// second boundary so the display never skips or lags a tick.
export default function useCountdown(targetISO) {
  const target = new Date(targetISO).getTime();
  const [ms, setMs] = useState(() => remaining(target));

  useEffect(() => {
    let timer;
    const tick = () => {
      const left = remaining(target);
      setMs(left);
      if (left > 0) timer = setTimeout(tick, (left % 1000 || 1000) + 20);
    };
    tick();
    return () => clearTimeout(timer);
  }, [target]);

  const total = Math.ceil(ms / 1000);

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: ms <= 0,
  };
}
