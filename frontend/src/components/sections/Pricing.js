import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for small businesses getting started with automation',
    features: [
      '1 Channel Integration',
      '500 AI Responses/month',
      'Basic Analytics',
      'Email Support',
      'Lead Management',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '$249',
    period: '/month',
    description: 'For growing businesses scaling their customer engagement',
    features: [
      '3 Channel Integrations',
      '2,000 AI Responses/month',
      'Advanced Analytics',
      'Priority Support',
      'Lead Management',
      'Custom AI Training',
      'WhatsApp Business API',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations',
    features: [
      'Unlimited Channels',
      'Unlimited AI Responses',
      'Enterprise Analytics',
      'Dedicated Account Manager',
      'Advanced Lead Management',
      'Custom Integrations',
      'SLA Guarantee',
      'White-label Options',
    ],
    popular: false,
  },
];

const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative py-32 px-6">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-black/40 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-cyan-400/50 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] scale-105'
                  : 'border-white/10 hover:border-cyan-500/30'
              }`}
              data-testid={`pricing-card-${index}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-sm font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-cyan-400">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <p className="text-slate-400 mt-3">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-cyan-400" />
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                className={`w-full font-bold ${
                  plan.popular
                    ? 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
                data-testid={`pricing-cta-${index}`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
