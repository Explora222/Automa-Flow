import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      if (sectionRef.current) {
        const header = sectionRef.current.querySelector('[data-header]');
        if (header) {
          gsap.fromTo(
            header.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // Testimonials animation
      if (testimonialsRef.current) {
        const testimonials = testimonialsRef.current.children;
        gsap.fromTo(
          testimonials,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "AutomaFlow has transformed how we handle procurement approvals. What used to take weeks now happens in days. The platform is intuitive and the support team is exceptional.",
      name: "Mandla Nkosi",
      role: "Head of Operations",
      company: "Nelson Mandela Bay Municipality",
      rating: 5,
    },
    {
      quote: "We've automated over 200 workflows across HR and finance. The ROI was visible within the first quarter. AutomaFlow understands the unique needs of South African businesses.",
      name: "Sarah van der Merwe",
      role: "IT Director",
      company: "First National Logistics",
      rating: 5,
    },
    {
      quote: "The compliance automation alone has saved us hundreds of hours annually. POPIA compliance was built-in from day one. It's the best technology investment we've made.",
      name: "Priya Govender",
      role: "Chief Risk Officer",
      company: "Meridian Financial Services",
      rating: 5,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div data-header className="text-center mb-12">
          <p className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Client Testimonials
          </p>
          <h3 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            See how organisations across South Africa are transforming their operations with AutomaFlow.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 hover:border-yellow/30 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote
                size={32}
                className="text-yellow/20 absolute top-6 right-6 group-hover:text-yellow/30 transition-colors duration-300"
              />

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow fill-yellow"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 leading-relaxed mb-6 text-sm">
                {testimonial.quote}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-yellow/20 flex items-center justify-center">
                  <span className="text-yellow font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-white/50 text-xs">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
