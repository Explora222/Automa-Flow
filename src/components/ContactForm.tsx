import { useState } from 'react';
import { X, Send, User, Mail, Phone, Building, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'demo' | 'sales';
}

const ContactForm = ({ isOpen, onClose, formType }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  const title = formType === 'demo' ? 'Request a Demo' : 'Contact Sales';
  const subtitle = formType === 'demo' 
    ? 'See AutomaFlow in action. Schedule a personalized demo with our team.'
    : 'Get in touch with our sales team for pricing and custom solutions.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-dark border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
        {/* Header */}
        <div className="relative bg-yellow p-4 sm:p-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors duration-300"
            aria-label="Close form"
          >
            <X size={18} className="text-black" />
          </button>
          
          <h3 className="text-xl sm:text-2xl font-bold text-black pr-10">{title}</h3>
          <p className="text-black/70 text-sm mt-1">{subtitle}</p>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-yellow" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
              <p className="text-white/60">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name */}
              <div className="relative">
                <User size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/10 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-yellow transition-colors min-h-11"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/10 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-yellow transition-colors min-h-11"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-yellow transition-colors min-h-11"
                />
              </div>

              {/* Company */}
              <div className="relative">
                <Building size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-yellow transition-colors min-h-11"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare size={18} className="absolute left-4 top-4 text-white/40" />
                <textarea
                  name="message"
                  placeholder="Your Message (Optional)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow text-black font-semibold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {formType === 'demo' ? 'Request Demo' : 'Send Message'}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
