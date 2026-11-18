import { useLayoutEffect } from 'react';

// Sizes an element's font so it fills its parent's content width exactly,
// whichever font ends up rendering it. CSS can still cap the size (we cap
// the countdown by viewport height) through min(var(--fit), ...).
export default function useFitWidth(ref, deps = []) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const box = el.parentElement;
    let lastWidth = -1;

    const fit = () => {
      const cs = getComputedStyle(box);
      const available =
        box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = '100px';
      const natural = el.getBoundingClientRect().width;
      el.style.fontSize = '';
      if (natural > 0) el.style.setProperty('--fit', `${(available / natural) * 99.5}px`);
    };

    // Run in the next frame so the resize callback never changes layout
    // mid-notification (that triggers "ResizeObserver loop" errors).
    let raf = 0;
    const onResize = () => {
      if (box.clientWidth === lastWidth) return;
      lastWidth = box.clientWidth;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    fit();
    const observer = 'ResizeObserver' in window ? new ResizeObserver(onResize) : null;
    observer?.observe(box);
    const fonts = document.fonts;
    fonts?.ready.then(fit);
    fonts?.addEventListener?.('loadingdone', fit);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      fonts?.removeEventListener?.('loadingdone', fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
