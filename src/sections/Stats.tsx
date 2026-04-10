import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { value: 500, suffix: '+', label: 'Organizations Automated' },
    { value: 99.9, suffix: '%', label: 'Uptime Guarantee', isDecimal: true },
    { value: 10, suffix: 'M+', label: 'Processes Completed' },
    { value: 24, suffix: '/7', label: 'Local Support' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container fade in
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation with counter
      if (statsRef.current) {
        const statElements = statsRef.current.children;
        
        gsap.fromTo(
          statElements,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
              onEnter: () => {
                // Animate counters
                stats.forEach((stat, index) => {
                  const duration = 2000;
                  const startTime = Date.now();
                  const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    
                    setCounts(prev => {
                      const newCounts = [...prev];
                      newCounts[index] = stat.isDecimal 
                        ? Math.round(easeProgress * stat.value * 10) / 10
                        : Math.floor(easeProgress * stat.value);
                      return newCounts;
                    });

                    if (progress < 1) {
                      requestAnimationFrame(animate);
                    }
                  };
                  setTimeout(() => animate(), index * 150);
                });
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-yellow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-2 animate-pulse-glow">
                {stat.isDecimal ? counts[index].toFixed(1) : counts[index]}
                <span className="text-3xl sm:text-4xl">{stat.suffix}</span>
              </div>
              <p className="text-black/70 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
