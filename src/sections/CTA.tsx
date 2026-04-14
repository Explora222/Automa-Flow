import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import ContactForm from '../components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<'demo' | 'sales'>('demo');

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

  const openDemoForm = () => {
    setFormType('demo');
    setIsFormOpen(true);
  };

  const openSalesForm = () => {
    setFormType('sales');
    setIsFormOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
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
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={openDemoForm}
              className="bg-black text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center xs:justify-start gap-2 hover:bg-black/80 transition-all duration-300 hover:scale-105 hover:shadow-xl group min-h-12 xs:min-h-11 text-sm sm:text-base"
            >
              Request a Demo
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={openSalesForm}
              className="border-2 border-black text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 min-h-12 xs:min-h-11 text-sm sm:text-base"
            >
              Contact Sales
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-black/70">
            <a
              href="mailto:info@automaflow.com"
              className="flex items-center gap-2 hover:text-black transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@automaflow.com
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-black transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +27 (72) 326-4945
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType={formType}
      />
    </section>
  );
};

export default CTA;
