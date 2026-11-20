import { SHEETS_URL } from './config';

// Talks to the Google Sheets web app (google-apps-script/Code.gs).
// Both calls are "simple" requests (no preflight), and the web app's reply
// is readable, so the site can show whether a submission was saved.

// Adds one row to the tab named `sheet`. Resolves to { ok, error }.
// error is "slot-taken" when that call slot was just booked by someone else,
// "off" when no web app URL is configured, "network" when it could not reach it.
export async function saveToSheet(sheet, fields) {
  if (!SHEETS_URL) return { ok: false, error: 'off' };
  const body = new URLSearchParams({
    ...Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v == null ? '' : String(v)])),
    sheet,
    page: window.location.pathname,
    website: '', // honeypot: real visitors never fill this in
  });
  try {
    const res = await fetch(SHEETS_URL, { method: 'POST', body, keepalive: true });
    const data = await res.json();
    return { ok: Boolean(data.ok), error: data.error || (data.ok ? null : 'rejected') };
  } catch {
    return { ok: false, error: 'network' };
  }
}

// The call slots already booked, as a Set of "YYYY-MM-DD HH:MM" (IST).
// Resolves to an empty Set if the sheet cannot be reached.
export async function loadBookedSlots() {
  if (!SHEETS_URL) return new Set();
  try {
    const res = await fetch(`${SHEETS_URL}?action=slots&t=${Date.now()}`);
    const data = await res.json();
    return new Set(Array.isArray(data.booked) ? data.booked : []);
  } catch {
    return new Set();
  }
}
