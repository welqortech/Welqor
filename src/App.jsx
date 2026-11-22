import { useEffect, useLayoutEffect, useState } from 'react';
import { usePath, scrollToHash } from './router';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollRail from './components/ScrollRail';
import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Solutions from './pages/Solutions';
import Technologies from './pages/Technologies';
import WorkProject from './pages/WorkProject';
import WorkTeam from './pages/WorkTeam';
import WorkCare from './pages/WorkCare';
import WorkHub from './pages/WorkHub';
import FaqPage from './pages/FaqPage';
import Support from './pages/Support';
import Connect from './pages/Connect';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import SEO from './seo.json';
import { SITE_URL } from './config';

// Page titles and descriptions live in seo.json, shared with the build
// (webpack.config.js), which writes them into each page's HTML too.
const PAGES = {
  '/': Home,
  '/about': About,
  '/services': Services,
  '/industries': Industries,
  '/solutions': Solutions,
  '/technologies': Technologies,
  '/work': WorkHub,
  '/work/project': WorkProject,
  '/work/team': WorkTeam,
  '/work/care': WorkCare,
  '/faq': FaqPage,
  '/support': Support,
  '/contact': Connect,
  '/terms': Terms,
  '/privacy': Privacy,
};

const NOT_FOUND = { title: 'Page not found', description: SEO['/'].description };

function setMeta(selector, attr, value) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

// Entry loader ("Sketch. Build. Launch."), about 2 seconds, on the landing
// page only: when the site is opened at / and when going back to /.
// Every other page opens instantly.
const HOME = '/';
const FADE_IN = 160; // going back home: fade the loader in, then swap the page
const PLAY = 1600; // sketch, build, click
const OUT = 420; // zoom into the site

const reduceMotion = () =>
  typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const path = usePath(); // where the URL is now
  const [shown, setShown] = useState(path); // the page actually rendered
  // Not while pre-rendering (no window): the saved HTML must show the page.
  const [phase, setPhase] = useState(() => (path === HOME && !reduceMotion() ? 'play' : 'idle'));

  const Page = PAGES[shown] || NotFound;
  const meta = (PAGES[shown] && SEO[shown]) || NOT_FOUND;

  // The home page's HTML hides the pre-rendered content until the loader is
  // up (see public/index.html), so it does not flash first. Show it now.
  useLayoutEffect(() => {
    document.documentElement.classList.remove('intro');
  }, []);

  // Opened at the home page: play, then zoom into the site.
  useEffect(() => {
    if (phase !== 'play') return undefined;
    const t1 = setTimeout(() => setPhase('out'), PLAY);
    const t2 = setTimeout(() => setPhase('idle'), PLAY + OUT);
    return () => [t1, t2].forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Page change: instant, except when going back to the home page.
  useEffect(() => {
    if (path === shown) return undefined;
    if (path !== HOME || reduceMotion()) {
      setPhase('idle');
      setShown(path);
      return undefined;
    }
    setPhase('in');
    const t1 = setTimeout(() => {
      setShown(path);
      setPhase('play');
    }, FADE_IN);
    const t2 = setTimeout(() => setPhase('out'), FADE_IN + PLAY);
    const t3 = setTimeout(() => setPhase('idle'), FADE_IN + PLAY + OUT);
    return () => [t1, t2, t3].forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // New page: update the head, jump to the top (or the #section in the URL).
  // The first page's head is already right: the build writes it into the HTML.
  useLayoutEffect(() => {
    const title = `${meta.title} | Welqor`;
    const url = SITE_URL + shown;
    document.title = title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
    if (!scrollToHash(window.location.hash, 'instant')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [shown, meta]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Loader phase={phase} />
      <Nav visible />
      <ScrollRail />
      <Page />
      <Footer />
    </>
  );
}
