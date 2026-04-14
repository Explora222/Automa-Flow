import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Lock, Sliders } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Promise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pillars animation
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 50, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.12,
            delay: 0.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    { icon: Lock, label: 'Trust' },
    { icon: Eye, label: 'Visibility' },
    { icon: Sliders, label: 'Control' },
  ];

  const promiseCards = [
    {
      number: '01',
      image: '/promise-01.jpg',
      title: 'Flexibility',
      description: 'Extensible with REST API and SDK - Low-code customization and API-first integrations.',
    },
    {
      number: '02',
      image: '/promise-02.jpg',
      title: 'Reliability',
      description: 'Proven infrastructure with 99.9% uptime resilient architecture, and full disaster recovery.',
    },
    {
      number: '03',
      image: '/promise-03.jpg',
      title: 'Scalability',
      description: 'Cloud or on-premises options supporting any process volume. from 10 users to 10,000.',
    },
    {
      number: '04',
      image: '/promise-04.jpg',
      title: 'Security',
      description: 'Enterprise grade encryption, auditability, access control, and POPIA ready compliance.',
    },
    {
      number: '05',
      image: '/promise-05.jpg',
      title: 'Simplicity',
      description: 'A low code environment that allows any team to build and manage workflows with minimal IT dependency.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Promise
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            We provide more than just automation software
          </h2>
          <p className="text-xl text-white/60">
            We deliver trust, visibility, and control across every process.
          </p>
        </div>

        {/* Pillars */}
        <div
          ref={pillarsRef}
          className="flex justify-center gap-8 sm:gap-16 mb-16"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-yellow/10 flex items-center justify-center">
                  <Icon size={28} className="text-yellow" />
                </div>
                <span className="text-lg font-semibold">{pillar.label}</span>
              </div>
            );
          })}
        </div>

        {/* Promise Cards */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {promiseCards.map((card, index) => (
            <div
              key={index}
              className={`group relative bg-dark border border-white/10 rounded-xl overflow-hidden hover-lift cursor-pointer ${
                index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
                
                {/* Number */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <span className="text-3xl font-bold text-yellow">
                    {card.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-yellow transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-xl">
                <div className="absolute top-0 right-0 w-full h-full bg-yellow/0 group-hover:bg-yellow/10 transition-colors duration-500 transform rotate-45 translate-x-10 -translate-y-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promise;
