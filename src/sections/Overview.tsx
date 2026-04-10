import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Shield, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Overview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word-by-word reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 40, opacity: 0, rotateY: -20 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Subtext
      gsap.fromTo(
        subtextRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body paragraphs
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards 3D flip
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { rotateY: -90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            delay: 0.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featureCards = [
    {
      icon: Globe,
      title: 'Local Presence, Global Standards',
      description: 'Developed and supported in South Africa, trusted by organisations worldwide.',
    },
    {
      icon: Clock,
      title: '99.9% Uptime Guarantee',
      description: 'Redundant architecture ensures your workflows run without interruption.',
    },
    {
      icon: Shield,
      title: 'POPIA Compliant',
      description: 'Designed to meet South African data protection laws and ISO security standards.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column */}
          <div>
            <h2
              ref={headlineRef}
              className="text-4xl sm:text-5xl font-medium leading-tight tracking-tight mb-4"
              style={{ perspective: '1000px' }}
            >
              <span className="word inline-block">Workflow</span>{' '}
              <span className="word inline-block">automation</span>{' '}
              <span className="word inline-block">that</span>{' '}
              <span className="word inline-block">adapts</span>{' '}
              <span className="word inline-block">to</span>{' '}
              <span className="word inline-block">your</span>{' '}
              <span className="word inline-block text-yellow">business</span>
            </h2>
            <p
              ref={subtextRef}
              className="text-xl text-white/60 font-light"
            >
              Not the other way around.
            </p>
          </div>

          {/* Right Column */}
          <div ref={bodyRef} className="space-y-6">
            <p className="text-lg text-white/80 leading-relaxed">
              AutomaFlow is a powerful, South African built business process automation 
              platform that empowers organisations to digitise, automate, and scale their 
              operations with confidence.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Built with enterprise grade security, reliability, and performance, 
              AutomaFlow transforms paper based or manual processes into intelligent 
              digital workflows fast.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 mt-20"
          style={{ perspective: '1000px' }}
        >
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative bg-dark border border-white/10 rounded-xl p-8 hover-lift cursor-pointer overflow-hidden"
                style={{
                  marginLeft: index === 1 ? '20px' : index === 2 ? '40px' : '0',
                }}
              >
                {/* Yellow accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

                <div className="w-14 h-14 rounded-lg bg-yellow/10 flex items-center justify-center mb-6 group-hover:bg-yellow/20 transition-colors duration-300">
                  <Icon size={28} className="text-yellow" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Overview;
