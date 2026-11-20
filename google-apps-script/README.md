# Website forms → Google Sheets

The website has no backend. Form submissions are sent to a small Google Apps
Script attached to the spreadsheet, which adds one row per submission:

| Website form | Spreadsheet tab |
| --- | --- |
| Connect → Book a free call | `Book a free call` |
| Connect → Write to us | `Write to us` |

The tab names must match exactly.

## Set it up (about 3 minutes)

1. Open the spreadsheet, then **Extensions → Apps Script**.
2. Delete anything in `Code.gs`, paste in the contents of
   [`Code.gs`](./Code.gs) from this folder, and click **Save**.
3. Click **Deploy → New deployment**.
   - Click the gear next to "Select type" and choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, then **Authorize access** and allow it with your
     Google account (Google warns because the script is yours and unverified:
     choose *Advanced → Go to project*).
4. Copy the **Web app URL** (it ends in `/exec`).
5. Put it in `src/config.js`:

   ```js
   export const SHEETS_URL = 'https://script.google.com/macros/s/…/exec';
   ```

6. Rebuild and deploy the site.

Open the `/exec` URL in a browser to check it is live: it shows
`{"ok":true,"service":"Welqor website forms"}`.

## Columns

If a tab is empty, the script writes the header row on the first submission.
If you already have headers, values are matched to them **by name**, so you
can reorder columns or add your own (for example "Status" or "Notes"); the
script leaves unknown columns blank.

**Book a free call:** Received, Name, Email, Topic, Company, Date, Time (IST),
Visitor time, Visitor time zone, Confirmed via, Page, Slot

**Write to us:** Received, Name, Email, Company, Topic, Looking for, Timing,
Message, Page

## Booked slots

Each booking stores a **Slot** column (for example `2026-11-24 14:30`, India
time). The script adds this column automatically if it is missing.

- The booking page reads the booked slots and greys them out, so a slot can
  only be booked once.
- If two people submit the same slot at the same moment, only the first is
  saved; the second is told to pick another time.
- **To free a slot**, add a column called **Status** and type `Cancelled` in
  that booking's row. The slot becomes available again on the website.

## Changing the script later

After editing `Code.gs`, use **Deploy → Manage deployments → Edit → Version:
New version → Deploy**. This keeps the same URL, so the website does not need
changing.

## Good to know

- The web app URL is public by design (the website needs to reach it). The
  script only writes to the two tabs above, ignores submissions with the
  hidden anti-spam field filled in, caps each value at 5,000 characters, and
  stops values being treated as spreadsheet formulas.
- The website reads the script's reply, so visitors see "booked" or
  "delivered" only once the row is saved, and an error message if it was not.
