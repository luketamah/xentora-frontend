import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechStart Inc',
    content: 'Xentora transformed our customer support. We\'re now handling 10x more inquiries with the same team size. The ROI is incredible!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    name: 'James Rodriguez',
    role: 'Founder, GrowthHub',
    content: 'The AI chatbot feels so natural that customers don\'t even realize they\'re talking to a bot. Lead conversion is up 45% in just 3 months.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Director, BizScale',
    content: 'Setting up was incredibly easy. Within 2 hours, we had automated responses running on WhatsApp and Instagram. Game changer!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'Operations Manager, RetailPro',
    content: 'The analytics dashboard gives us insights we never had before. We can track every lead and optimize our sales funnel in real-time.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
  {
    name: 'Emily Watson',
    role: 'Co-founder, DigitalWave',
    content: 'Best investment we\'ve made this year. The 24/7 availability means we never miss a lead, even when we\'re sleeping. Worth every penny.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
  },
  {
    name: 'David Park',
    role: 'Sales Lead, CloudVentures',
    content: 'Our response time went from hours to seconds. Customer satisfaction scores have never been higher. Xentora is simply brilliant.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-32 px-6 bg-[#0B0F17]">
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
            Loved by Businesses Worldwide
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Join hundreds of companies that have transformed their customer engagement with Xentora.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
              data-testid={`testimonial-card-${index}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-slate-300 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
