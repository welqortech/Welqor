import { useLayoutEffect } from 'react';
import { usePath, scrollToHash } from './router';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollRail from './components/ScrollRail';
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

export default function App() {
  const path = usePath();
  const route = ROUTES[path] || { page: NotFound, title: 'Page not found' };
  const Page = route.page;

  // New page: set the title, jump to the top (or the #section in the URL).
  useLayoutEffect(() => {
    document.title = `${route.title} | Welqor`;
    if (!scrollToHash(window.location.hash, 'instant')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [path, route.title]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav visible />
      <ScrollRail />
      <Page />
      <Footer />
    </>
  );
}
