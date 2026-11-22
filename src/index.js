import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted font, so no visitor IPs go to Google Fonts.
import '@fontsource-variable/bricolage-grotesque/standard.css';
import './styles/base.css';
import { inject } from '@vercel/analytics';
import App from './App';

// Vercel Web Analytics: cookie-free page views (turn it on in the Vercel
// project under Analytics). Route changes are picked up automatically.
inject();

// The page arrives pre-rendered (scripts/prerender.js). React renders it
// again on top, so live parts such as clocks and the booking calendar
// start from the visitor's real time rather than the build's.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
