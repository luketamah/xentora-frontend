import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>
      
      {/* Radial gradient spotlight */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/20 via-transparent to-transparent blur-3xl"></div>
      
      {/* Abstract background image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1771793231925-25b44b91a469?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content (60%) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Sales Automation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            Automate Your Sales,
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Amplify Your Growth
            </span>
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed text-slate-300 max-w-xl">
            Xentora Solutions brings intelligent automation to your customer interactions. 
            Respond instantly on WhatsApp, Instagram, and your website—24/7, with zero manual effort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={scrollToContact}
              className="bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] transition-all duration-300 font-bold tracking-wide px-8 py-6 text-lg"
              data-testid="hero-cta-btn"
            >
              Book a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 px-8 py-6 text-lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="hero-learn-more-btn"
            >
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-sm text-slate-400 mt-1">Availability</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">10x</div>
              <div className="text-sm text-slate-400 mt-1">Faster Response</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">95%</div>
              <div className="text-sm text-slate-400 mt-1">Accuracy</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Abstract Visual (40%) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative w-full h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl rotate-6 blur-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1762278804923-37f066f5e834?q=80&w=2000&auto=format&fit=crop"
              alt="AI Automation"
              className="relative z-10 w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
