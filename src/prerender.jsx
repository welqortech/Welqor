// Build-time entry: renders one page of the app to an HTML string.
// Used by scripts/prerender.js; never shipped to the browser.
import { renderToString } from 'react-dom/server';
import App from './App';
import { setServerPath } from './router';

export function render(path) {
  setServerPath(path);
  return renderToString(<App />);
}
