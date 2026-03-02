import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, BarChart3, Shield, Zap, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import ChatWidget from '@/components/ChatWidget';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#02040A]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default LandingPage;
