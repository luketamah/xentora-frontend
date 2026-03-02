import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isDashboard = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  if (isDashboard) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-cyan-400">
              XENTORA
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button
                  variant="ghost"
                  className={location.pathname === '/admin/dashboard' ? 'text-cyan-400' : 'text-slate-400'}
                  data-testid="nav-dashboard-btn"
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button
                  variant="ghost"
                  className={location.pathname === '/admin/analytics' ? 'text-cyan-400' : 'text-slate-400'}
                  data-testid="nav-analytics-btn"
                >
                  Analytics
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400"
                data-testid="nav-logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-lg border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-cyan-400" data-testid="logo">
            XENTORA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              data-testid="nav-home"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              data-testid="nav-features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              data-testid="nav-how-it-works"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              data-testid="nav-pricing"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] font-bold"
              data-testid="nav-cta-btn"
            >
              Book Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
            data-testid="mobile-menu-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-slate-400 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-slate-400 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-slate-400 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-slate-400 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-cyan-400 text-black hover:bg-cyan-300 font-bold"
              >
                Book Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
