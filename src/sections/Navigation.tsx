import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'expo.out' }
      );

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.3, ease: 'expo.out' }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: 'expo.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center min-w-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-yellow/50 rounded-lg transition-transform duration-300 hover:scale-105"
              aria-label="Go to homepage"
            >
              <img
                src="/AutomaFlow Logo - White.png"
                alt="AutomaFlow Logo"
                className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                style={{ maxWidth: '160px' }}
                loading="eager"
                decoding="async"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-xs lg:text-sm font-medium text-white/80 hover:text-yellow transition-colors duration-300 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('#contact')}
            className="hidden md:block btn-primary text-xs lg:text-sm py-2.5 lg:py-3 px-5 lg:px-6 min-h-10 lg:min-h-11\""
          >
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 py-4 px-3">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-white/80 hover:text-yellow transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-white/5 text-sm"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary text-sm py-3 px-6 mt-2 w-full min-h-11\"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
