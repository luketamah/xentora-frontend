import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { leadApi } from '@/utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await leadApi.create(formData);
      toast.success('Thank you for contacting Xentora Solutions. Our team will get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        business_type: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Get Started Today
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Ready to transform your customer engagement? Contact us for a personalized demo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Email</div>
                    <a href="mailto:xentoraai@gmail.com" className="text-white hover:text-cyan-400 transition-colors" data-testid="contact-email">
                      xentoraai@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Phone</div>
                    <div className="space-y-1">
                      <a href="tel:+254758465125" className="block text-white hover:text-cyan-400 transition-colors" data-testid="contact-phone-1">
                        +254 758 465 125
                      </a>
                      <a href="tel:+254762554667" className="block text-white hover:text-cyan-400 transition-colors" data-testid="contact-phone-2">
                        +254 762 554 667
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1671722294182-ed01cbe66bd1?q=80&w=2000&auto=format&fit=crop"
                alt="Office"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8" data-testid="contact-form">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Name</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-black/20 border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 text-white placeholder:text-slate-600 h-12"
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-black/20 border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 text-white placeholder:text-slate-600 h-12"
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Phone</label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 XXX XXX XXX"
                    className="bg-black/20 border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 text-white placeholder:text-slate-600 h-12"
                    data-testid="contact-phone-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Business Type</label>
                  <Select
                    required
                    value={formData.business_type}
                    onValueChange={(value) => setFormData({ ...formData, business_type: value })}
                  >
                    <SelectTrigger className="bg-black/20 border-white/10 focus:border-cyan-400/50 text-white h-12" data-testid="contact-business-type-select">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0B0F17] border-white/10">
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Message</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your needs..."
                    rows={4}
                    className="bg-black/20 border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 text-white placeholder:text-slate-600 resize-none"
                    data-testid="contact-message-textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] font-bold h-12"
                  data-testid="contact-submit-btn"
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
