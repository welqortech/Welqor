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

const ROUTES = {
  '/': { page: Home, title: 'Websites, apps and custom software' },
  '/about': { page: About, title: 'About' },
  '/services': { page: Services, title: 'Services' },
  '/industries': { page: Industries, title: 'Industries' },
  '/solutions': { page: Solutions, title: 'Solutions' },
  '/technologies': { page: Technologies, title: 'Technologies' },
  '/work': { page: WorkHub, title: 'Work with us' },
  '/work/project': { page: WorkProject, title: 'Fixed-scope projects' },
  '/work/team': { page: WorkTeam, title: 'Dedicated teams' },
  '/work/care': { page: WorkCare, title: 'Care plans' },
  '/faq': { page: FaqPage, title: 'FAQs' },
  '/support': { page: Support, title: 'Support Centre' },
  '/contact': { page: Connect, title: 'Connect with Welqor' },
  '/terms': { page: Terms, title: 'Terms & Conditions' },
  '/privacy': { page: Privacy, title: 'Privacy Policy' },
};

// Entry loader ("Sketch. Build. Launch.") timings, in ms.
// It plays on the first visit, and when returning to the home page.
// Every other page change is instant.
const LOADER_ON = new Set(['/']);
const FADE_IN = 160; // returning home: fade the loader in, then swap the page
const PLAY = 1180; // sketch, build, click
const OUT = 520; // zoom into the site

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const path = usePath(); // where the URL is now
  const [shown, setShown] = useState(path); // the page actually rendered
  const [phase, setPhase] = useState(() => (reduceMotion() ? 'idle' : 'play'));

  const route = ROUTES[shown] || { page: NotFound, title: 'Page not found' };
  const Page = route.page;

  // First visit: play, then zoom out into the site.
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
    if (!LOADER_ON.has(path) || reduceMotion()) {
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

  // New page: set the title, jump to the top (or the #section in the URL).
  useLayoutEffect(() => {
    document.title = `${route.title} | Welqor`;
    if (!scrollToHash(window.location.hash, 'instant')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [shown, route.title]);

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
