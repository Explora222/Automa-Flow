import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatWeOffer = () => {
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

  const offerings = [
    {
      number: '01',
      image: '/offer-01.jpg',
      title: 'Workflow Automation',
      description: 'Automate any process using a visual, drag-and-drop workflow designer — from simple approvals to complex multi-departmental workflows.',
      features: [
        'Drag-and-drop builder',
        'Conditional logic & branching',
        'Multi-step approvals',
        'SLA tracking',
        'Reusable templates',
        'Notifications & escalations',
      ],
    },
    {
      number: '02',
      image: '/offer-02.jpg',
      title: 'Digital Forms & Data Capture',
      description: 'Transform manual forms into dynamic, intelligent mobile-friendly forms accessible anywhere.',
      features: [
        'Custom field types & validation',
        'File uploads & digital signatures',
        'Real-time submissions',
        'Progress tracking',
        'Mobile-responsive design',
        'Data validation rules',
      ],
    },
    {
      number: '03',
      image: '/offer-03.jpg',
      title: 'Integrations & Extensibility',
      description: 'AutomaFlow connects to the tools your business already uses for seamless data flow.',
      features: [
        'Microsoft Entra & Google Auth',
        'SAP, Sage, NetSuite',
        'Salesforce & Dynamics',
        'SQL Server & PostgreSQL',
        'Power BI & Tableau',
        'Teams, Slack, Outlook',
      ],
    },
    {
      number: '04',
      image: '/offer-04.jpg',
      title: 'Monitoring & Analytics',
      description: 'Gain real-time visibility across your operations with powerful dashboards and insights.',
      features: [
        'Custom real-time dashboards',
        'KPI tracking & metrics',
        'Automated reports',
        'Exportable data',
        'Predictive insights',
        'Bottleneck identification',
      ],
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
      visible.push(i % offerings.length);
    }
    return visible;
  };

  const getMaxIndex = () => {
    return Math.max(0, offerings.length - cardsPerView);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            What We Offer
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            Everything you need to automate
          </h2>
          <p className="text-lg text-white/60">
            Design, automate, and manage business processes from one powerful platform.
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
            {offerings.map((offering, index) => (
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
                  {/* Yellow accent bar on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={offering.image}
                      alt={offering.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Number */}
                    <span className="absolute top-3 right-3 text-3xl font-bold text-white/10 group-hover:text-yellow/20 transition-colors duration-500">
                      {offering.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow transition-colors duration-300">
                      {offering.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                      {offering.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-1.5">
                      {offering.features.slice(0, 4).map((feature, fIndex) => (
                        <li
                          key={fIndex}
                          className="flex items-center gap-2 text-xs text-white/50 group-hover:text-white/70 transition-colors duration-300"
                          style={{
                            transitionDelay: `${fIndex * 50}ms`,
                          }}
                        >
                          <Check size={12} className="text-yellow flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {offering.features.length > 4 && (
                        <li className="text-xs text-yellow/60 pl-6">
                          +{offering.features.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
