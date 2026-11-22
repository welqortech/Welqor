// Site-wide settings. Change these in one place.

// The live address (no trailing slash) and the Google Search Console
// verification token live in site.json, because the build reads them too
// (canonical tags, sitemap.xml, robots.txt).
import SITE_JSON from './site.json';

export const SITE_URL = SITE_JSON.url;

export const SITE = {
  name: 'Welqor',

  // Where the contact form sends enquiries (opens the visitor's email app).
  // Replace with your real address.
  email: 'hello@welqor.in',

  // Preferred contact channel. `whatsapp` is the number in international
  // format without + or spaces (used for wa.me links); `whatsappLabel` is
  // how it is shown on the page.
  whatsapp: '918300083671',
  whatsappLabel: '+91 83000 83671',

  location: 'Coimbatore, India',

  // Shown on the Support Centre and Connect pages.
  hours: 'Monday to Friday, 9:30 AM to 6:30 PM IST',
};

// Free discovery call slots, in India time (IST).
export const CALL = {
  days: [1, 2, 3, 4, 5], // Monday to Friday
  from: 10, // first slot starts at 10:00
  to: 18, // last slot ends by 18:00
  step: 30, // minutes between slots
  length: 30, // call length in minutes
  horizon: 10, // how many bookable days to offer
};

// Google Sheets: the Apps Script web app URL (ends in /exec) that stores
// form submissions. Setup steps: google-apps-script/README.md
// Leave empty to turn saving off.
export const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbyl_P_T4E0lOhJvNtAFCUOp4Szoh3As0sUbURLOwjIDPF9AjPLnGGmQl9GGs0t43DbK/exec';

// A wa.me link with an optional ready-written message.
export const whatsappLink = (text = '') =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
