import { SHEETS_URL } from './config';

// Sends one form submission to the Google Sheets web app, which adds a row
// to the tab named `sheet` ("Book a free call" or "Write to us").
//
// Sent as a simple form post with mode "no-cors": Google's Apps Script
// does not allow the browser to read the reply, so this cannot tell
// whether the row was saved; it only reports whether the request left.
// `keepalive` lets it finish even if the page then opens WhatsApp or the
// email app.
export function saveToSheet(sheet, fields) {
  if (!SHEETS_URL) return Promise.resolve(false);

  const body = new URLSearchParams({
    ...Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v == null ? '' : String(v)])),
    sheet,
    page: window.location.pathname,
    website: '', // honeypot: real visitors never fill this in
  });

  return fetch(SHEETS_URL, { method: 'POST', mode: 'no-cors', keepalive: true, body })
    .then(() => true)
    .catch(() => false);
}
