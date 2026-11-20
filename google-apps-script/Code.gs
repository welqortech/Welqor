/**
 * Welqor website forms → Google Sheets.
 *
 * Paste this into the spreadsheet's Apps Script editor
 * (Extensions → Apps Script) and deploy it as a web app.
 * Full steps: google-apps-script/README.md
 *
 * The website POSTs form fields here. Each submission becomes one row in
 * the tab named by the `sheet` field. Only the two tabs below are allowed.
 */

// Tab name → [column header, field name sent by the website]
const SHEETS = {
  'Book a free call': [
    ['Received', 'received'],
    ['Name', 'name'],
    ['Email', 'email'],
    ['Topic', 'topic'],
    ['Company', 'company'],
    ['Date', 'date'],
    ['Time (IST)', 'time'],
    ['Visitor time', 'localTime'],
    ['Visitor time zone', 'timeZone'],
    ['Confirmed via', 'via'],
    ['Page', 'page'],
  ],
  'Write to us': [
    ['Received', 'received'],
    ['Name', 'name'],
    ['Email', 'email'],
    ['Company', 'company'],
    ['Topic', 'topic'],
    ['Looking for', 'needs'],
    ['Timing', 'timing'],
    ['Message', 'message'],
    ['Page', 'page'],
  ],
};

const MAX_LENGTH = 5000; // longest value stored per cell

function doPost(e) {
  const p = (e && e.parameter) || {};
  const columns = SHEETS[p.sheet];

  // Unknown tab, or the hidden "website" field was filled in (a bot): ignore.
  if (!columns || p.website) return reply({ ok: false });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(p.sheet);
    if (!sheet) return reply({ ok: false, error: 'Tab not found: ' + p.sheet });

    // Empty tab: write the header row first.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(columns.map((c) => c[0]));
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, columns.length).setFontWeight('bold');
    }

    // Fill values under whatever headers the tab already has, by name,
    // so columns can be reordered or extra columns added in the sheet.
    const lastCol = Math.max(sheet.getLastColumn(), 1);
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const row = headers.map((header) => {
      const match = columns.find((c) => c[0] === String(header).trim());
      if (!match) return '';
      return match[1] === 'received' ? new Date() : clean(p[match[1]]);
    });

    sheet.appendRow(row);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows this, so you can check it is live.
function doGet() {
  return reply({ ok: true, service: 'Welqor website forms' });
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
