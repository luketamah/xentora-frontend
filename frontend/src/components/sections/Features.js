import { motion } from 'framer-motion';
import { Bot, MessageSquare, BarChart3, Shield, Zap, Clock } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Chatbot',
    description: 'Intelligent conversations that understand context and provide accurate responses instantly.',
    color: 'cyan',
    span: 'col-span-1 row-span-2',
  },
  {
    icon: MessageSquare,
    title: 'Multi-Channel Support',
    description: 'WhatsApp, Instagram DM, and website chat—all managed from one place.',
    color: 'blue',
    span: 'col-span-1',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Never miss a customer inquiry, even outside business hours.',
    color: 'purple',
    span: 'col-span-1',
  },
  {
    icon: BarChart3,
    title: 'Lead Analytics',
    description: 'Track, manage, and convert leads with powerful insights and dashboards.',
    color: 'cyan',
    span: 'col-span-1',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption to keep your business data safe and secure.',
    color: 'blue',
    span: 'col-span-1',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second response times that keep your customers engaged.',
    color: 'cyan',
    span: 'col-span-1 row-span-2',
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-32 px-6">
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
            Powerful Features for
            <span className="block mt-2 text-cyan-400">Modern Businesses</span>
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Everything you need to automate customer interactions and grow your business faster.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${feature.span} group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden`}
                data-testid={`feature-card-${index}`}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-400/10 border border-cyan-400/30 rounded-xl mb-4">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
