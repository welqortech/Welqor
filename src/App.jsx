import { useEffect, useRef, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import Process from './components/Process';
import Promises from './components/Promises';
import Plans from './components/Plans';
import Stack from './components/Stack';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const heroRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);

  // Show the sticky nav once the full-screen countdown has scrolled away.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: '-68px 0px 0px 0px' }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav visible={pastHero} />
      <Hero sectionRef={heroRef} />
      <main id="main">
        <Intro />
        <Services />
        <Process />
        <Promises />
        <Plans />
        <Stack />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
