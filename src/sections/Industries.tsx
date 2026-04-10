import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Landmark, Briefcase, GraduationCap, HardHat, Factory } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Industries = () => {
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

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax effect on scroll
        Array.from(cards).forEach((card, index) => {
          const speed = index % 2 === 0 ? 1.2 : 0.8;
          gsap.to(card, {
            y: -20 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const industries = [
    {
      icon: Building2,
      title: 'Enterprises & Corporates',
      description: 'Centralised automation and cross-departmental approvals, HR, procurement, and compliance workflows.',
      image: '/industry-enterprise.jpg',
    },
    {
      icon: Landmark,
      title: 'Public Sector & Municipalities',
      description: 'Digitising approvals, claims, and civic services with full transparency and audit trails.',
      image: '/industry-public.jpg',
    },
    {
      icon: Briefcase,
      title: 'Financial & Insurance',
      description: 'Automating underwriting, claims, onboarding, and regulatory compliance processes.',
      image: '/industry-finance.jpg',
    },
    {
      icon: GraduationCap,
      title: 'Education & NPOs',
      description: 'Managing bursaries, funding, scholarships, and application processes efficiently.',
      image: '/industry-education.jpg',
    },
    {
      icon: HardHat,
      title: 'Construction & Mining',
      description: 'Project cost controls, equipment maintenance, supply chain flows, and mobile field workflows.',
      image: '/industry-construction.jpg',
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Production workflows, quality control, maintenance, and inventory management.',
      image: '/industry-manufacturing.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="section-padding bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Who We Serve
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            Built for every industry
          </h2>
          <p className="text-lg text-white/60">
            From enterprises to SMEs, we adapt to your unique challenges.
          </p>
        </div>

        {/* Industries Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-yellow/0 group-hover:bg-yellow/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-yellow/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-yellow group-hover:scale-110 transition-all duration-500">
                    <Icon size={24} className="text-yellow group-hover:text-black transition-colors duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow transition-colors duration-300">
                    {industry.title}
                  </h3>

                  {/* Description - reveals on hover */}
                  <p className="text-white/70 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {industry.description}
                  </p>
                </div>

                {/* Border accent */}
                <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-yellow/30 transition-colors duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
