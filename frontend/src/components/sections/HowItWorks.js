import { motion } from 'framer-motion';
import { UserPlus, MessageCircle, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Connect Your Channels',
    description: 'Link your WhatsApp, Instagram, and website in minutes. No technical expertise required.',
    number: '01',
  },
  {
    icon: MessageCircle,
    title: 'AI Learns Your Business',
    description: 'Our AI analyzes your FAQs and business data to provide accurate, personalized responses.',
    number: '02',
  },
  {
    icon: TrendingUp,
    title: 'Watch Your Sales Grow',
    description: 'Track leads, monitor conversations, and convert more customers—all on autopilot.',
    number: '03',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-32 px-6 bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Get started in three simple steps and transform your customer engagement.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
                data-testid={`step-card-${index}`}
              >
                {/* Connecting line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                )}
                
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-6 -right-6 text-8xl font-bold text-cyan-400/10">
                    {step.number}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl mb-6 shadow-[0_0_20px_-5px_rgba(6,182,212,0.7)]">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-medium mb-4">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
