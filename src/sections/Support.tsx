import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BookOpen, 
  Users, 
  RefreshCw, 
  Activity, 
  Headphones 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Support = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Quote animation
      gsap.fromTo(
        quoteRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const supportFeatures = [
    {
      icon: BookOpen,
      title: 'Comprehensive Onboarding',
      description: 'User training for all user levels to get your team up to speed quickly.',
    },
    {
      icon: Users,
      title: 'Certified Implementation Partners',
      description: 'Customised deployments and advanced integrations by experts.',
    },
    {
      icon: RefreshCw,
      title: 'Continuous Updates',
      description: 'New integrations and capabilities released regularly.',
    },
    {
      icon: Activity,
      title: '24/7 System Monitoring',
      description: 'Optimal uptime and performance with proactive monitoring.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Local Support',
      description: 'Guaranteed SLA response times from our South African team.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Support & Partnership
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            We go beyond software
          </h2>
          <p className="text-lg text-white/60">
            We partner in your digital transformation journey with dedicated local support 
            and success teams.
          </p>
        </div>

        {/* Support Features */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16"
        >
          {supportFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-black border border-white/10 rounded-xl p-6 hover-lift cursor-pointer text-center"
              >
                <div className="w-14 h-14 rounded-full bg-yellow/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow group-hover:scale-110 transition-all duration-500">
                  <Icon size={24} className="text-yellow group-hover:text-black transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="relative bg-black border border-white/10 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto"
        >
          {/* Quote marks */}
          <div className="absolute top-6 left-6 text-6xl text-yellow/20 font-serif">"</div>
          <div className="absolute bottom-6 right-6 text-6xl text-yellow/20 font-serif rotate-180">"</div>
          
          <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-6 relative z-10">
            We build long-term partnerships, ensuring our clients achieve{' '}
            <span className="text-yellow">measurable process improvement</span> and{' '}
            <span className="text-yellow">ROI</span> — not just software adoption.
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow/20 flex items-center justify-center">
              <span className="text-yellow font-semibold">A</span>
            </div>
            <div className="text-left">
              <p className="font-semibold">AutomaFlow Team</p>
              <p className="text-white/50 text-sm">Customer Success</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
