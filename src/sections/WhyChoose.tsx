import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Layers, 
  RefreshCw, 
  Shield, 
  Zap, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChoose = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid items stagger
      if (gridRef.current) {
        const items = gridRef.current.children;
        gsap.fromTo(
          items,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
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
      icon: Globe,
      title: 'Local Presence, Global Standards',
      description: 'Developed and supported in South Africa, trusted by organisations that demand world-class performance with local expertise.',
    },
    {
      number: '02',
      icon: Layers,
      title: 'Any Process. Any Business',
      description: 'From HR onboarding and procurement to claims, compliance, and approvals — automate it all on one platform.',
    },
    {
      number: '03',
      icon: RefreshCw,
      title: 'Seamless Integration',
      description: 'Connect effortlessly with your existing systems — ERP, CRM, HR, or custom apps.',
    },
    {
      number: '04',
      icon: Shield,
      title: 'Stable and Reliable',
      description: 'Built on modern, resilient infrastructure with guaranteed 99.9% uptime and full disaster recovery protection.',
    },
    {
      number: '05',
      icon: Zap,
      title: 'Built for Business Continuity',
      description: 'Redundant architecture ensures your workflows run without interruption, even under peak load.',
    },
    {
      number: '06',
      icon: Clock,
      title: 'Compliance Ready',
      description: 'Designed to meet South African data protection laws and ISO security standards.',
    },
    {
      number: '07',
      icon: TrendingUp,
      title: 'Faster Time to Value',
      description: 'Go from pilot to production in weeks, not months. Low-code design means your teams can automate without heavy IT dependency.',
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
            Why Choose AutomaFlow
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            The AutomaFlow Advantage
          </h2>
          <p className="text-lg text-white/60">
            Seven reasons why organisations trust us with their critical business processes.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = index === 6; // Last item spans full width on mobile
            
            return (
              <div
                key={index}
                className={`group relative bg-black border border-white/10 rounded-xl p-8 hover-lift cursor-pointer transition-all duration-500 ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Number */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-white/5 group-hover:text-yellow/10 transition-colors duration-500">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-yellow/10 flex items-center justify-center mb-6 group-hover:bg-yellow group-hover:scale-110 transition-all duration-500">
                  <Icon size={28} className="text-yellow group-hover:text-black transition-colors duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl bg-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
