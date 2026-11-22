/**
 * Welqor website forms → Google Sheets.
 *
 * Paste this into the spreadsheet's Apps Script editor
 * (Extensions → Apps Script) and deploy it as a web app.
 * Full steps: google-apps-script/README.md
 *
 * POST  — the website sends a form; it becomes one row in the tab named by
 *         the `sheet` field. Only the two tabs below are allowed.
 *         Bookings for a slot that is already taken are refused.
 * GET   ?action=slots — returns the booked call slots, so the website can
 *         grey them out. Rows whose Status says "Cancelled" free the slot.
 */

const BOOK = 'Book a free call';
const WRITE = 'Write to us';

// Tab name → [column header, field name sent by the website]
const SHEETS = {
  [BOOK]: [
    ['Received', 'received'],
    ['Name', 'name'],
    ['Email', 'email'],
    ['Topic', 'topic'],
    ['Company', 'company'],
    ['WhatsApp / phone', 'phone'],
    ['Date', 'date'],
    ['Time (IST)', 'time'],
    ['Visitor time', 'localTime'],
    ['Visitor time zone', 'timeZone'],
    ['Confirmed via', 'via'],
    ['Page', 'page'],
    ['Slot', 'slot'], // machine-readable "YYYY-MM-DD HH:MM" in IST; used to block double bookings
  ],
  [WRITE]: [
    ['Received', 'received'],
    ['Name', 'name'],
    ['Email', 'email'],
    ['WhatsApp / phone', 'phone'],
    ['Company', 'company'],
    ['Topic', 'topic'],
    ['Looking for', 'needs'],
    ['Timing', 'timing'],
    ['Budget', 'budget'],
    ['Message', 'message'],
    ['Page', 'page'],
  ],
};

const MAX_LENGTH = 5000; // longest value stored per cell
const SLOT_PATTERN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

function doPost(e) {
  const p = (e && e.parameter) || {};
  const columns = SHEETS[p.sheet];

  // Unknown tab, the hidden "website" field was filled in, or the form was
  // sent less than 3 seconds after the page opened (a bot): ignore.
  if (!columns || p.website || !(Number(p.elapsed) >= 3000)) {
    return reply({ ok: false, error: 'rejected' });
  }
  if (p.sheet === BOOK && !SLOT_PATTERN.test(p.slot || '')) {
    return reply({ ok: false, error: 'missing-slot' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(p.sheet);
    if (!sheet) return reply({ ok: false, error: 'Tab not found: ' + p.sheet });

    const headers = ensureHeaders(sheet, columns);

    // One booking per slot. Checked inside the lock, so two people
    // pressing Submit at the same moment cannot both get it.
    if (p.sheet === BOOK && bookedSlots(sheet, headers).indexOf(p.slot) !== -1) {
      return reply({ ok: false, error: 'slot-taken' });
    }

    const row = headers.map((header) => {
      const match = columns.find((c) => c[0] === String(header).trim());
      if (!match) return '';
      if (match[1] === 'received') return new Date();
      // Store the slot as plain text, so Sheets does not turn it into a date.
      if (match[1] === 'slot') return "'" + p.slot;
      return clean(p[match[1]]);
    });
    sheet.appendRow(row);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action === 'slots') {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BOOK);
    if (!sheet || sheet.getLastRow() < 2) return reply({ ok: true, booked: [] });
    const lastCol = Math.max(sheet.getLastColumn(), 1);
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    return reply({ ok: true, booked: bookedSlots(sheet, headers) });
  }
  // Visiting the web app URL in a browser shows this, so you can check it is live.
  return reply({ ok: true, service: 'Welqor website forms' });
}

// Writes the header row on an empty tab, and adds any missing columns
// (for example "Slot") to the end of an existing header row.
function ensureHeaders(sheet, columns) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(columns.map((c) => c[0]));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, columns.length).setFontWeight('bold');
  }
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map((h) => String(h).trim());
  const missing = columns.map((c) => c[0]).filter((name) => headers.indexOf(name) === -1);
  if (missing.length) {
    sheet.getRange(1, lastCol + 1, 1, missing.length).setValues([missing]).setFontWeight('bold');
    return headers.concat(missing);
  }
  return headers;
}

// Slots taken by bookings that are not cancelled.
function bookedSlots(sheet, headers) {
  const slotCol = headers.indexOf('Slot');
  if (slotCol === -1 || sheet.getLastRow() < 2) return [];
  const statusCol = headers.indexOf('Status'); // optional column you can add
  const tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  return rows
    .filter((r) => statusCol === -1 || !/cancel/i.test(String(r[statusCol])))
    .map((r) => {
      const v = r[slotCol];
      // If a slot was typed in by hand, Sheets may have turned it into a date.
      return v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd HH:mm') : String(v).trim();
    })
    .filter((s) => SLOT_PATTERN.test(s));
}

// Trim, cap the length, and stop values being read as spreadsheet formulas.
function clean(value) {
  const text = String(value == null ? '' : value).trim().slice(0, MAX_LENGTH);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
