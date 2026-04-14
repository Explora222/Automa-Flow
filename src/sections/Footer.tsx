import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      if (contentRef.current) {
        const columns = contentRef.current.children;
        gsap.fromTo(
          columns,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Bottom bar animation
      gsap.fromTo(
        bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const productLinks = [
    { name: 'Features', href: '#services' },
    { name: 'Integrations', href: '#services' },
    { name: 'Pricing', href: '#contact' },
    { name: 'Security', href: '#about' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Column 1: About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <button
                onClick={() => scrollToSection('#home')}
                className="focus:outline-none focus:ring-2 focus:ring-yellow/50 rounded-lg transition-transform duration-300 hover:scale-105"
                aria-label="Go to homepage"
              >
                <img
                  src="/AutomaFlow Logo - White.png"
                  alt="AutomaFlow Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                  style={{ maxWidth: '180px' }}
                />
              </button>
            </div>
            <p className="text-white/50 text-sm mb-4">
              A Product of Bluevine Data (Pty) Ltd
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Enterprise workflow automation platform built in South Africa for the world.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 hover:text-yellow transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 hover:text-yellow transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+27723264945"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-yellow/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow/20 transition-colors duration-300">
                    <Phone size={14} className="text-yellow" />
                  </div>
                  <span className="text-white/50 text-sm group-hover:text-yellow transition-colors duration-300">+27 (0)72 326 4945</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@automaflow.co.za"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-yellow/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow/20 transition-colors duration-300">
                    <Mail size={14} className="text-yellow" />
                  </div>
                  <span className="text-white/50 text-sm group-hover:text-yellow transition-colors duration-300">sales@automaflow.co.za</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.automaflow.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-yellow/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow/20 transition-colors duration-300">
                    <Globe size={14} className="text-yellow" />
                  </div>
                  <span className="text-white/50 text-sm group-hover:text-yellow transition-colors duration-300">www.automaflow.co.za</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-yellow" />
                </div>
                <span className="text-white/50 text-sm">South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-white/40 text-sm">
              © 2026 AutomaFlow. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-yellow text-sm font-medium">
              Designed By Bluevine Group
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-yellow hover:scale-110 transition-all duration-300 group"
            >
              <Linkedin size={18} className="text-white/50 group-hover:text-black transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-yellow hover:scale-110 transition-all duration-300 group"
            >
              <Twitter size={18} className="text-white/50 group-hover:text-black transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-yellow hover:scale-110 transition-all duration-300 group"
            >
              <Facebook size={18} className="text-white/50 group-hover:text-black transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
