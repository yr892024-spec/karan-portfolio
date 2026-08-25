import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenPalette }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[92%] max-w-7xl rounded-2xl border ${
        scrolled
          ? 'top-4 bg-white/70 dark:bg-dark-950/60 backdrop-blur-md border-slate-200/50 dark:border-dark-800/40 shadow-xl shadow-black/5 dark:shadow-black/25 py-3'
          : 'top-6 bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="flex items-center space-x-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text font-black">
              KARAN
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-normal">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`text-sm font-semibold transition-colors hover:text-primary-500 dark:hover:text-primary-400 ${
                    activeSection === item.href.substring(1)
                      ? 'text-primary-500 dark:text-primary-400 border-b-2 border-primary-500 pb-1'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Console Button Launcher */}
            <button
              onClick={onOpenPalette}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-dark-900 dark:hover:bg-dark-800 border border-slate-200 dark:border-dark-800 rounded-xl text-slate-500 dark:text-slate-400 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
              title="Open Command Console (Ctrl+K)"
            >
              <Terminal className="w-3.5 h-3.5 text-primary-500" />
              <span>Console</span>
              <span className="hidden lg:inline-block bg-slate-200 dark:bg-dark-950 px-1 py-0.2 rounded text-[8px] font-sans">Ctrl+K</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-white dark:text-dark-950 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full hover:from-primary-400 hover:to-accent-400 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 transform hover:-translate-y-0.5 group"
            >
              Hire Me
              <ArrowUpRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onOpenPalette}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none cursor-pointer"
              title="Console"
            >
              <Terminal className="h-5.5 w-5.5 text-primary-500" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-750 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 mt-3' : 'max-h-0 opacity-0 overflow-hidden'
        } bg-white/95 dark:bg-dark-950/95 backdrop-blur-lg border border-slate-200/50 dark:border-dark-800/40 rounded-xl mx-4 overflow-hidden`}
      >
        <div className="px-3 pt-2 pb-4 space-y-1.5 sm:px-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                activeSection === item.href.substring(1)
                  ? 'bg-slate-100 dark:bg-dark-900 text-primary-500 dark:text-primary-400 font-bold'
                  : 'text-slate-700 dark:text-slate-305 hover:bg-slate-50 dark:hover:bg-dark-900 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 px-3 space-y-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenPalette();
              }}
              className="flex w-full items-center justify-center space-x-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-slate-705 dark:text-slate-200 bg-slate-100 dark:bg-dark-900 rounded-full border border-slate-200 dark:border-dark-800"
            >
              <Terminal className="w-4 h-4 text-primary-500" />
              <span>Open Developer Console</span>
            </button>
            
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="flex w-full items-center justify-center px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white dark:text-dark-950 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full hover:from-primary-400 hover:to-accent-400 transition-all duration-300 shadow-md"
            >
              Hire Me
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
