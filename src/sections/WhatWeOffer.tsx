import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatWeOffer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const offerings = [
    {
      number: '01',
      image: '/offer-01.jpg',
      title: 'Workflow Automation',
      description: 'Automate any process using a visual, drag-and-drop workflow designer — from simple approvals to complex multi-departmental workflows.',
      features: [
        'Drag-and-drop builder',
        'Conditional logic & branching',
        'Multi-step approvals',
        'SLA tracking',
        'Reusable templates',
        'Notifications & escalations',
      ],
    },
    {
      number: '02',
      image: '/offer-02.jpg',
      title: 'Digital Forms & Data Capture',
      description: 'Transform manual forms into dynamic, intelligent mobile-friendly forms accessible anywhere.',
      features: [
        'Custom field types & validation',
        'File uploads & digital signatures',
        'Real-time submissions',
        'Progress tracking',
        'Mobile-responsive design',
        'Data validation rules',
      ],
    },
    {
      number: '03',
      image: '/offer-03.jpg',
      title: 'Integrations & Extensibility',
      description: 'AutomaFlow connects to the tools your business already uses for seamless data flow.',
      features: [
        'Microsoft Entra & Google Auth',
        'SAP, Sage, NetSuite',
        'Salesforce & Dynamics',
        'SQL Server & PostgreSQL',
        'Power BI & Tableau',
        'Teams, Slack, Outlook',
      ],
    },
    {
      number: '04',
      image: '/offer-04.jpg',
      title: 'Monitoring & Analytics',
      description: 'Gain real-time visibility across your operations with powerful dashboards and insights.',
      features: [
        'Custom real-time dashboards',
        'KPI tracking & metrics',
        'Automated reports',
        'Exportable data',
        'Predictive insights',
        'Bottleneck identification',
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-yellow text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            What We Offer
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">
            Everything you need to automate
          </h2>
          <p className="text-lg text-white/60">
            Design, automate, and manage business processes from one powerful platform.
          </p>
        </div>

        {/* Offerings Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-8"
        >
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="group relative bg-black border border-white/10 rounded-xl overflow-hidden hover-lift cursor-pointer"
            >
              {/* Yellow accent bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={offering.image}
                  alt={offering.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Number */}
                <span className="absolute top-4 right-4 text-5xl font-bold text-white/10 group-hover:text-yellow/20 transition-colors duration-500">
                  {offering.number}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-yellow transition-colors duration-300">
                  {offering.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  {offering.description}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-2">
                  {offering.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300"
                      style={{
                        transitionDelay: `${fIndex * 50}ms`,
                      }}
                    >
                      <Check size={14} className="text-yellow flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
