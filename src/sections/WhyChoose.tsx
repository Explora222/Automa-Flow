import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChoose = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.children;
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      number: '01',
      image: '/whychoose-01.jpg',
      title: 'Local Presence, Global Standards',
      description: 'Developed & supported in S.A , trusted by organisations that demand world-class performance with local expertise.',
    },
    {
      number: '02',
      image: '/whychoose-02.jpg',
      title: 'Any Process. Any Business',
      description: 'From HR onboarding and procurement to claims, compliance, and approvals. automate it all on one platform.',
    },
    {
      number: '03',
      image: '/whychoose-03.jpg',
      title: 'Seamless Integration',
      description: 'Connect effortlessly with your existing systems ERP, CRM, HR, or custom apps.',
    },
    {
      number: '04',
      image: '/whychoose-04.jpg',
      title: 'Stable and Reliable',
      description: 'Built on modern, resilient infrastructure with guaranteed 99.9% uptime and full disaster recovery protection.',
    },
    {
      number: '05',
      image: '/whychoose-05.jpg',
      title: 'Built for Business Continuity',
      description: 'Redundant architecture ensures your workflows run without interruption, even under peak load.',
    },
    {
      number: '06',
      image: '/whychoose-06.jpg',
      title: 'Compliance Ready',
      description: 'Designed to meet South African data protection laws and ISO security standards.',
    },
    {
      number: '07',
      image: '/whychoose-07.jpg',
      title: 'Faster Time to Value',
      description: 'Go from pilot to production in weeks, not months. Low-code design means your teams can automate without heavy IT dependency.',
    },
  ];

  const goToCard = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(Math.min(index, getMaxIndex()));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goNext = () => {
    const nextIndex = Math.min(currentIndex + 1, getMaxIndex());
    if (nextIndex !== currentIndex) {
      goToCard(nextIndex);
    }
  };

  const goPrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    if (prevIndex !== currentIndex) {
      goToCard(prevIndex);
    }
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = currentIndex; i < currentIndex + cardsPerView; i++) {
      visible.push(i % features.length);
    }
    return visible;
  };

  const getMaxIndex = () => {
    return Math.max(0, features.length - cardsPerView);
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Why Choose AutomaFlow
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            The AutomaFlow Advantage
          </h2>
          <p className="text-lg text-white/60">
            Seven reasons why organisations trust us with their critical business processes.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-yellow hover:border-yellow hover:text-black transition-all duration-300 group"
            aria-label="Previous card"
          >
            <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {Array.from({ length: getMaxIndex() + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-yellow w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-yellow hover:border-yellow hover:text-black transition-all duration-300 group"
            aria-label="Next card"
          >
            <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Cards Carousel */}
        <div
          ref={cardsContainerRef}
          className="relative overflow-hidden"
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2 sm:px-3"
                style={{ width: cardsPerView === 1 ? '100%' : cardsPerView === 2 ? '50%' : '33.333%' }}
              >
                <div
                  className={`group relative bg-black border border-white/10 rounded-xl overflow-hidden hover-lift cursor-pointer transition-all duration-500 ${
                    getVisibleCards().includes(index)
                      ? 'opacity-100 scale-100'
                      : 'opacity-40 scale-95'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Number */}
                    <span className="absolute top-3 right-3 text-2xl font-bold text-white/20 group-hover:text-yellow/40 transition-colors duration-500">
                      {feature.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold mb-2 group-hover:text-yellow transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl bg-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
