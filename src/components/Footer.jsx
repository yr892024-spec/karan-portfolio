import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer({ 
  onOpenPasswordModal, 
  theme, 
  phoneUnlocked, 
  onOpenPhoneModal, 
  onOpenRoadmapModal,
  instagramUnlocked,
  onOpenInstagramModal
}) {
  const currentYear = new Date().getFullYear();
  const [istTime, setIstTime] = useState('');

  // IST Live clock effect
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      try {
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setIstTime(formatter.format(new Date()) + ' IST');
      } catch (e) {
        setIstTime(new Date().toLocaleTimeString() + ' IST');
      }
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yr892024@gmail.com');
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { message: 'Copied email "yr892024@gmail.com" to clipboard.', type: 'success' } 
    }));
  };

  const handleCopyPhone = () => {
    if (phoneUnlocked) {
      navigator.clipboard.writeText('+917434987924');
      window.dispatchEvent(new CustomEvent('show-toast', { 
        detail: { message: 'Copied phone number "+91 7434987924" to clipboard.', type: 'success' } 
      }));
    } else {
      onOpenPhoneModal();
    }
  };

  return (
    <footer className="bg-slate-50 dark:bg-dark-950 border-t border-slate-200 dark:border-dark-900 py-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center pb-8 border-b border-slate-200 dark:border-dark-900">
          
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text">
              KARAN RANA
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-500 font-mono mt-1 uppercase">Frontend Engineer & Tech Analyst</span>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center space-x-6 text-sm text-slate-700 dark:text-slate-400 font-semibold">
            <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:text-primary-500 transition-colors">
              About
            </a>
            <a href="#skills" onClick={(e) => handleScroll(e, '#skills')} className="hover:text-primary-500 transition-colors">
              Skills
            </a>
            <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="hover:text-primary-500 transition-colors">
              Projects
            </a>
            <a href="#experience" onClick={(e) => handleScroll(e, '#experience')} className="hover:text-primary-500 transition-colors">
              Experience
            </a>
          </div>

          {/* Location & Quick Contact */}
          <div className="flex flex-col items-center md:items-end text-xs text-slate-700 dark:text-slate-405 space-y-1 font-mono">
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-primary-500" />
              Surat, Gujarat, India
            </span>
            {/* Live IST clock */}
            <span className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider flex items-center">
              🕒 {istTime}
            </span>
            <span 
              onClick={handleCopyEmail}
              className="flex items-center cursor-pointer hover:text-primary-500"
            >
              <Mail className="w-3.5 h-3.5 mr-1 text-accent-500" />
              yr892024@gmail.com
            </span>
            <span 
              onClick={handleCopyPhone}
              className="flex items-center cursor-pointer hover:text-primary-500"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-primary-500" />
              {phoneUnlocked ? '+91 7434987924' : '+91 XXXXX XXXXX (🔒)'}
            </span>
          </div>

          {/* Actions Column */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            {/* Theme Toggle Trigger */}
            <button
              onClick={onOpenPasswordModal}
              className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-dark-900 dark:hover:bg-dark-800 border border-slate-800 dark:border-dark-800 rounded-lg text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer w-full justify-center md:w-auto"
            >
              <span>🔑 Toggle Theme: {theme.toUpperCase()}</span>
            </button>

            {/* React Roadmap Switcher */}
            <button
              onClick={onOpenRoadmapModal}
              title="React JS Roadmap & Cheat Sheet"
              className="inline-flex items-center justify-center p-2 bg-slate-900 hover:bg-slate-800 dark:bg-dark-900 dark:hover:bg-dark-800 border border-slate-800 dark:border-dark-800 rounded-lg text-white transition-all shadow-md cursor-pointer w-full md:w-auto"
            >
              <svg className="w-6 h-6 text-sky-400" style={{ animation: 'spin 15s linear infinite' }} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="60" cy="60" rx="15" ry="50" transform="rotate(30 60 60)" stroke="currentColor" strokeWidth="4"/>
                <ellipse cx="60" cy="60" rx="15" ry="50" transform="rotate(90 60 60)" stroke="currentColor" strokeWidth="4"/>
                <ellipse cx="60" cy="60" rx="15" ry="50" transform="rotate(150 60 60)" stroke="currentColor" strokeWidth="4"/>
                <circle cx="60" cy="60" r="7" fill="currentColor"/>
              </svg>
            </button>

            {/* Instagram Button */}
            {instagramUnlocked ? (
              <a
                href="https://www.instagram.com/_karan_2412?igsi=MXIydGYweTFucm1tZw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-dark-900 dark:hover:bg-dark-800 border border-slate-800 dark:border-dark-800 rounded-lg text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer w-full justify-center md:w-auto"
              >
                <svg className="w-3.5 h-3.5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>
            ) : (
              <button
                onClick={onOpenInstagramModal}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-dark-900 dark:hover:bg-dark-800 border border-slate-800 dark:border-dark-800 rounded-lg text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer w-full justify-center md:w-auto"
              >
                <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram (🔒)</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-505 pt-8 gap-4">
          <p>&copy; {currentYear} Karan Rana. All rights reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-600 transition-colors cursor-default">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-600 transition-colors cursor-default">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
