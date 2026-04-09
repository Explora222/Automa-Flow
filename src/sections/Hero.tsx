import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background entrance
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'expo.out' }
      );

      // Tagline clip reveal
      gsap.fromTo(
        taglineRef.current,
        { clipPath: 'inset(0 100% 0 0)', x: -20 },
        { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 0.6, delay: 0.3, ease: 'expo.out' }
      );

      // Headline word animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            delay: 0.4,
            ease: 'expo.out',
          }
        );
      }

      // Subheadline
      gsap.fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'expo.out' }
      );

      // CTA buttons
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 1,
            ease: 'elastic.out(1, 0.5)',
          }
        );
      }

      // Trust badges
      if (trustRef.current) {
        gsap.fromTo(
          trustRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 1.2,
            ease: 'power2.out',
          }
        );
      }

      // Scroll-triggered parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.to(bgRef.current, {
              y: self.progress * 100,
              scale: 1 + self.progress * 0.1,
              duration: 0.1,
            });
          }
          if (headlineRef.current) {
            gsap.to(headlineRef.current, {
              y: -self.progress * 50,
              opacity: 1 - self.progress,
              duration: 0.1,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 5 + 10,
  }));

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-yellow animate-pulse-glow"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              bottom: '-20px',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          >
            Workflow Automation Platform
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-8"
            style={{ perspective: '1000px' }}
          >
            <span className="word inline-block">Transform</span>{' '}
            <span className="word inline-block">Your</span>{' '}
            <span className="word inline-block text-yellow">Business</span>{' '}
            <span className="word inline-block">Processes</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl"
          >
            From manual to magical. automate workflows across HR, procurement, finance,
            and compliance with South Africa's trusted automation platform.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Trust Indicators */}
          <div ref={trustRef} className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <Award size={18} className="text-yellow" />
              <span className="text-sm">Trusted by 500+ organizations</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Clock size={18} className="text-yellow" />
              <span className="text-sm">99.9% uptime guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Shield size={18} className="text-yellow" />
              <span className="text-sm">POPIA compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default Hero;
