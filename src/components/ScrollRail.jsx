import { useEffect, useRef, useState } from 'react';
import { usePath } from '../router';
import './ScrollRail.css';

/* ------------------------------------------------------------------
   A custom page scrollbar for mouse and trackpad devices.

   - A slim rail floats inside the right edge, below the nav.
   - The thumb is the brand tile (one sharp corner) and shifts from
     teal to gold as you move down the page.
   - While scrolling, a bubble beside the thumb shows how far you are.
   - Drag the thumb, or click the rail to jump there.

   The native scrollbar is hidden only where this rail is shown
   (pointer: fine), so keyboard, wheel and touch scrolling all keep
   working exactly as before. The rail itself is decorative for
   assistive tech; the page still scrolls natively.
------------------------------------------------------------------- */

const MIN_THUMB = 56;

export default function ScrollRail() {
  const path = usePath();
  const railRef = useRef(null);
  const thumbRef = useRef(null);
  const drag = useRef(null);
  const idle = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ visible: false, active: false, pct: 0 });

  // Only on devices with a precise pointer (mouse / trackpad).
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 761px)');
    const apply = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle('has-rail', mq.matches);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      document.documentElement.classList.remove('has-rail');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const rail = railRef.current;
      const thumb = thumbRef.current;
      if (!rail || !thumb) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const railH = rail.clientHeight;
      if (max <= 4) {
        setState((s) => (s.visible ? { ...s, visible: false } : s));
        return;
      }
      const thumbH = Math.max(MIN_THUMB, (window.innerHeight / doc.scrollHeight) * railH);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${p * (railH - thumbH)}px)`;
      rail.style.setProperty('--p', p.toFixed(4));
      const pct = Math.round(p * 100);
      setState((s) => (s.visible && s.pct === pct ? s : { ...s, visible: true, pct }));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
      setState((s) => (s.active ? s : { ...s, active: true }));
      clearTimeout(idle.current);
      idle.current = setTimeout(() => {
        if (!drag.current) setState((s) => ({ ...s, active: false }));
      }, 900);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const ro = new ResizeObserver(() => {
      if (!raf) raf = requestAnimationFrame(measure);
    });
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
    };
  }, [enabled, path]);

  if (!enabled) return null;

  const ratio = () => {
    const rail = railRef.current;
    const thumb = thumbRef.current;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max / Math.max(1, rail.clientHeight - thumb.offsetHeight);
  };

  const onThumbDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, top: window.scrollY, ratio: ratio() };
    setState((s) => ({ ...s, active: true }));
  };
  const onThumbMove = (e) => {
    if (!drag.current) return;
    const { y, top, ratio: r } = drag.current;
    window.scrollTo({ top: top + (e.clientY - y) * r, behavior: 'instant' });
  };
  const onThumbUp = () => {
    drag.current = null;
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setState((s) => ({ ...s, active: false })), 900);
  };

  // Click the rail: centre the thumb on that point.
  const onRailDown = (e) => {
    if (e.target !== railRef.current) return;
    const rail = railRef.current;
    const thumbH = thumbRef.current.offsetHeight;
    const r = rail.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (e.clientY - r.top - thumbH / 2) / (r.height - thumbH)));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: p * max, behavior: 'smooth' });
  };

  return (
    <div
      className={`rail${state.visible ? ' is-visible' : ''}${state.active ? ' is-active' : ''}`}
      ref={railRef}
      onPointerDown={onRailDown}
      aria-hidden="true"
    >
      <div
        className="rail__thumb"
        ref={thumbRef}
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
      >
        <span className="rail__grip">
          <i />
          <i />
          <i />
        </span>
        <span className="rail__bubble">
          <b>{state.pct}</b>%
        </span>
      </div>
    </div>
  );
}
