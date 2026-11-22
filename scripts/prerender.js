// Runs after `webpack --mode production` (see package.json).
// 1. Renders every page into its HTML file in dist/, so the content is
//    readable by people and crawlers without JavaScript.
// 2. Copies public/robots.txt and public/sitemap.xml into dist/.

const fs = require('fs');
const path = require('path');
const { render } = require('../build-ssr/prerender.js');
const SEO = require('../src/seo.json');
const SITE = require('../src/site.json');
const { fileFor } = require('../webpack.config.js');

const DIST = path.resolve(__dirname, '..', 'dist');
const ROOT = /<div id="?root"?><\/div>/; // the minifier may drop the quotes

const pages = [...Object.keys(SEO).map((route) => [route, fileFor(route)]), ['/__not-found', '404.html']];

for (const [route, file] of pages) {
  const target = path.join(DIST, file);
  const html = fs.readFileSync(target, 'utf8');
  if (!ROOT.test(html)) throw new Error(`No empty root in ${file}`);
  const markup = render(route);
  fs.writeFileSync(target, html.replace(ROOT, () => `<div id="root">${markup}</div>`));
  console.log(`prerendered ${route} -> ${file} (${Math.round(markup.length / 1024)} KB)`);
}

// robots.txt and sitemap.xml are real files in public/, copied as they are.
// The build stops if the sitemap is missing a page or lists one that is gone,
// so the file stays in step with src/seo.json.
const PUBLIC = path.resolve(__dirname, '..', 'public');
const sitemap = fs.readFileSync(path.join(PUBLIC, 'sitemap.xml'), 'utf8');
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const expected = new Set(Object.keys(SEO).map((route) => SITE.url + route));
const missing = [...expected].filter((u) => !listed.has(u));
const extra = [...listed].filter((u) => !expected.has(u));
if (missing.length || extra.length) {
  throw new Error(
    `public/sitemap.xml is out of date.${missing.length ? ` Missing: ${missing.join(', ')}.` : ''}${
      extra.length ? ` Not a page: ${extra.join(', ')}.` : ''
    }`
  );
}
for (const file of ['robots.txt', 'sitemap.xml']) {
  fs.copyFileSync(path.join(PUBLIC, file), path.join(DIST, file));
}
console.log(`copied robots.txt and sitemap.xml (${listed.size} pages)`);
