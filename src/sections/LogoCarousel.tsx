import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Landmark, Briefcase, GraduationCap, Factory, Store } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LogoCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label entrance
      gsap.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Track fade in
      gsap.fromTo(
        trackRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const partners = [
    { name: 'Enterprise Corp', icon: Building2 },
    { name: 'Public Sector', icon: Landmark },
    { name: 'Finance Group', icon: Briefcase },
    { name: 'Education Plus', icon: GraduationCap },
    { name: 'Industrial Co', icon: Factory },
    { name: 'SME Solutions', icon: Store },
    { name: 'Tech Ventures', icon: Building2 },
    { name: 'Global Systems', icon: Factory },
  ];

  // Duplicate for seamless loop
  const allPartners = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-black border-y border-white/5 overflow-hidden"
    >
      {/* Label */}
      <p
        ref={labelRef}
        className="text-center text-white/40 text-sm font-medium tracking-wider uppercase mb-10"
      >
        Trusted by industry leaders
      </p>

      {/* Logo Track */}
      <div
        ref={trackRef}
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {allPartners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 mx-12 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-yellow/10 transition-colors duration-300">
                  <Icon
                    size={24}
                    className="text-white/40 group-hover:text-yellow transition-colors duration-300"
                  />
                </div>
                <span className="text-white/40 font-medium whitespace-nowrap group-hover:text-white transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
