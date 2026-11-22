// A tiny client-side router: real URLs (/about, /services ...) without a library.
// Vercel rewrites every unknown path to index.html (see vercel.json), and the
// webpack dev server does the same through historyApiFallback.

import { createElement, useSyncExternalStore } from 'react';

const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

const normalise = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path) || '/';

// While pre-rendering at build time there is no window; the build sets the path.
let serverPath = '/';
export function setServerPath(path) {
  serverPath = path;
}

export function usePath() {
  return useSyncExternalStore(
    subscribe,
    () => normalise(window.location.pathname),
    () => serverPath
  );
}

export function scrollToHash(hash, behavior) {
  if (hash && hash.length > 1) {
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      el.scrollIntoView({ behavior: behavior || 'smooth', block: 'start' });
      return true;
    }
  }
  return false;
}

export function navigate(to) {
  const url = new URL(to, window.location.href);
  const samePage = normalise(url.pathname) === normalise(window.location.pathname);
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  if (samePage) {
    if (!scrollToHash(url.hash)) window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  listeners.forEach((l) => l());
}

// <Link to="/about">: behaves like <a>, but changes page without a reload.
export function Link({ to, onClick, children, ...rest }) {
  const handle = (e) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target
    )
      return;
    e.preventDefault();
    navigate(to);
  };
  return createElement('a', { href: to, onClick: handle, ...rest }, children);
}
