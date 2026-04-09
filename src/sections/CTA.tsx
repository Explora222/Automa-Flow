import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import ContactForm from '../components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background wipe
      gsap.fromTo(
        bgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Decorative elements
      if (decorRef.current) {
        gsap.fromTo(
          decorRef.current.children,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
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
      id="cta"
      className="relative py-24 overflow-hidden"
    >
      {/* Yellow Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-yellow"
        style={{ willChange: 'clip-path' }}
      />

      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-black/10 rounded-full animate-rotate-slow" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-black/10 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 right-20 w-4 h-4 bg-black/20 rounded-full animate-float" />
        <div className="absolute bottom-1/3 left-20 w-6 h-6 bg-black/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef}>
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center mx-auto mb-8">
            <Sparkles size={28} className="text-black" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black tracking-tight mb-6">
            Ready to transform your workflows?
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-black/70 mb-10 max-w-2xl mx-auto">
            Join 500+ organizations already saving time and reducing costs with AutomaFlow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-black text-white font-semibold px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-black/80 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Request a Demo
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setShowContactForm(true)}
              className="border-2 border-black text-black font-semibold px-8 py-4 rounded-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowContactForm(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg z-10">
            {/* Close Button */}
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors"
            >
              <X size={28} />
            </button>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default CTA;
