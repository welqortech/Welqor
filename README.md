# Welqor landing page

React 19 + plain CSS, bundled with webpack and Babel (no Vite).

The page opens on a full-screen countdown to **Sunday 22 November 2026, 9:00 AM IST**. Scroll down for the rest of the site: services, process, commitments, ways to work, tools, FAQ and a contact form. When the countdown reaches zero, the hero switches to "We're open for projects" on its own.

## Run it

Needs Node.js 18 or newer.

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build in dist/
```

Upload the contents of `dist/` to any static host (Netlify, Vercel, Hostinger, cPanel, GitHub Pages, S3).

## Where to change things

| What | File |
| --- | --- |
| Launch date and time, email address, location | `src/config.js` |
| All page text (services, steps, FAQ, plans, tools) | `src/content.js` |
| Colours, fonts, spacing | `src/styles/base.css` (the `:root` block) |
| Logo | `src/components/Logo.jsx` (instructions in the file) |
| Section styles | the `.css` file next to each component |

To change the countdown, edit `launchAt` in `src/config.js`, for example `'2026-11-22T09:00:00+05:30'`. Keep the `+05:30` so everyone counts down to Indian time. Update `launchLabel` to match.

## Contact form

There is no backend yet. "Send enquiry" opens the visitor's email app with the message filled in, addressed to `SITE.email`. To collect enquiries without email, replace the `mailto` lines in `src/components/Contact.jsx` with a `fetch()` call to a form service such as Formspree or EmailJS, or to your own API.

## Project structure

```
public/
  index.html          page shell, Google Fonts link
  favicon.svg
src/
  index.js            entry point
  App.jsx             page layout, sticky nav trigger
  config.js           launch time, email
  content.js          all copy
  hooks/
    useCountdown.js   ticks once a second, aligned to the second
    useFitWidth.js    sizes the countdown to fill the width
  components/         one .jsx + one .css per section
  styles/base.css     design tokens, reset, buttons
webpack.config.js
babel.config.json
```
