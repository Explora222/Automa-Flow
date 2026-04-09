import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import LogoCarousel from './sections/LogoCarousel';
import Overview from './sections/Overview';
import WhyChoose from './sections/WhyChoose';
import Promise from './sections/Promise';
import WhatWeOffer from './sections/WhatWeOffer';
import Industries from './sections/Industries';
import Stats from './sections/Stats';
import Support from './sections/Support';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();
    
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <LogoCarousel />
      <Overview />
      <WhyChoose />
      <Promise />
      <WhatWeOffer />
      <Industries />
      <Stats />
      <Support />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
