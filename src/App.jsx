import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import { X, Lock, Unlock, AlertTriangle, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  // Scroll Progress Bar state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Passcode-protected states
  const [phoneUnlocked, setPhoneUnlocked] = useState(false);
  const [gpaUnlocked, setGpaUnlocked] = useState(false);
  const [roadMapUnlocked, setRoadMapUnlocked] = useState(false);
  const [instagramUnlocked, setInstagramUnlocked] = useState(false);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState(null); // 'theme' | 'phone' | 'gpa' | 'roadmap' | 'instagram'
  const [isRoadmapViewerOpen, setIsRoadmapViewerOpen] = useState(false);
  
  // Command Palette state
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Form input states
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll Progress handler
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (window.pageYOffset / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Command Palette global shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleOpenAuthModal = (type) => {
    if (type === 'roadmap' && roadMapUnlocked) {
      setIsRoadmapViewerOpen(true);
      return;
    }
    if (type === 'instagram' && instagramUnlocked) {
      window.open('https://www.instagram.com/_karan_2412?igsi=MXIydGYweTFucm1tZw==', '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveModalType(type);
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const cleanPass = passwordInput.trim().toLowerCase();
    
    // Passcode accepted: 2412 (primary), hireme, karan, admin
    if (['2412', 'hireme', 'karan', 'admin'].includes(cleanPass)) {
      setUnlocked(true);
      setErrorMsg('');
      
      setTimeout(() => {
        // Apply unlock based on active type
        if (activeModalType === 'theme') {
          setTheme(prev => prev === 'dark' ? 'light' : 'dark');
        } else if (activeModalType === 'phone') {
          setPhoneUnlocked(true);
        } else if (activeModalType === 'gpa') {
          setGpaUnlocked(true);
        } else if (activeModalType === 'roadmap') {
          setRoadMapUnlocked(true);
          setIsRoadmapViewerOpen(true);
        } else if (activeModalType === 'instagram') {
          setInstagramUnlocked(true);
          window.open('https://www.instagram.com/_karan_2412?igsi=MXIydGYweTFucm1tZw==', '_blank', 'noopener,noreferrer');
        }

        // Close authorization form
        setIsModalOpen(false);
        setPasswordInput('');
        setUnlocked(false);
        setActiveModalType(null);
      }, 850);
    } else {
      setErrorMsg('Access Denied. Passcode is invalid.');
    }
  };

  // Command Palette Callbacks
  const handleScrollToSection = (sectionId) => {
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDecryptAll = () => {
    setPhoneUnlocked(true);
    setGpaUnlocked(true);
    setRoadMapUnlocked(true);
    setInstagramUnlocked(true);
  };

  const handleLockAll = () => {
    setPhoneUnlocked(false);
    setGpaUnlocked(false);
    setRoadMapUnlocked(false);
    setInstagramUnlocked(false);
  };

  const handleDownloadCv = () => {
    const link = document.createElement('a');
    link.href = '/Karan_Rana_Resume.pdf';
    link.download = 'Karan_Rana_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInstagram = () => {
    window.open('https://www.instagram.com/_karan_2412?igsi=MXIydGYweTFucm1tZw==', '_blank', 'noopener,noreferrer');
  };

  const getModalText = () => {
    switch (activeModalType) {
      case 'theme':
        return {
          title: 'System Theme Clearance',
          desc: 'Toggling system colors (light/dark mode) requires credentials verification.',
          icon: Lock,
        };
      case 'phone':
        return {
          title: 'Developer Phone Decryption',
          desc: 'Decrypting contact phone numbers requires credentials verification.',
          icon: Lock,
        };
      case 'gpa':
        return {
          title: 'Academic Score Clearance',
          desc: 'Decrypting official GPA record transcripts requires credentials verification.',
          icon: Lock,
        };
      case 'roadmap':
        return {
          title: 'Study Guide Clearance',
          desc: 'Unlocking React.js Roadmap & Concept Cheat Sheet records requires credentials verification.',
          icon: BookOpen,
        };
      case 'instagram':
        return {
          title: 'Social Identity Clearance',
          desc: 'Decrypting official developer Instagram link records requires credentials verification.',
          icon: Lock,
        };
      default:
        return {
          title: 'Identity Clearance',
          desc: 'Verification passcode required to clear key data sections.',
          icon: Lock,
        };
    }
  };

  const modalDetails = getModalText();
  const Icon = modalDetails.icon;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 dark:bg-dark-950 dark:text-slate-100 selection:bg-primary-500/30 selection:text-primary-600 dark:selection:text-primary-300 transition-colors duration-300">
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-emerald-500 to-accent-500 z-50 transition-all duration-100 shadow-md shadow-primary-500/30" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Background radial overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-primary-500/3 dark:from-primary-500/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-accent-500/3 dark:from-accent-500/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10">
        <Navbar onOpenPalette={() => setIsPaletteOpen(true)} />
        <Hero 
          phoneUnlocked={phoneUnlocked} 
          onOpenPhoneModal={() => handleOpenAuthModal('phone')} 
          onDecryptAll={handleDecryptAll}
        />
        <About gpaUnlocked={gpaUnlocked} onOpenGpaModal={() => handleOpenAuthModal('gpa')} />
        <Skills />
        <Projects />
        <Experience gpaUnlocked={gpaUnlocked} onOpenGpaModal={() => handleOpenAuthModal('gpa')} />
        <Contact phoneUnlocked={phoneUnlocked} onOpenPhoneModal={() => handleOpenAuthModal('phone')} />
        <Footer 
          onOpenPasswordModal={() => handleOpenAuthModal('theme')} 
          theme={theme}
          phoneUnlocked={phoneUnlocked}
          onOpenPhoneModal={() => handleOpenAuthModal('phone')}
          onOpenRoadmapModal={() => handleOpenAuthModal('roadmap')}
          instagramUnlocked={instagramUnlocked}
          onOpenInstagramModal={() => handleOpenAuthModal('instagram')}
        />
      </div>

      {/* Command Palette Dashboard Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onScrollToSection={handleScrollToSection}
        onToggleTheme={() => handleOpenAuthModal('theme')}
        onDecryptAll={handleDecryptAll}
        onLockAll={handleLockAll}
        onDownloadCv={handleDownloadCv}
        onOpenInstagram={handleOpenInstagram}
      />

      {/* Password Authorization Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-dark-900 border border-slate-205 dark:border-dark-800 max-w-md w-full rounded-2xl overflow-hidden shadow-2xl p-6 relative font-mono text-xs sm:text-sm">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPasswordInput('');
                setErrorMsg('');
                setActiveModalType(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-primary-655 dark:text-primary-400 mb-4">
              {unlocked ? <Unlock className="w-5 h-5 animate-bounce" /> : <Icon className="w-5 h-5" />}
              <span className="font-bold uppercase tracking-wider">DEV_AUTH_VERIFICATION</span>
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {modalDetails.title}
            </h4>
            <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed text-xs">
              {modalDetails.desc}
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Verification Key</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 rounded-xl focus:outline-none focus:border-primary-500 text-slate-900 dark:text-white font-mono"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-955/20 border border-rose-250 dark:border-rose-900 text-rose-600 dark:text-rose-455 flex items-start space-x-2 text-xs">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 animate-pulse" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {unlocked && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 text-emerald-600 dark:text-emerald-555 text-center font-bold text-xs">
                  ACCESS GRANTED! Processing...
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setPasswordInput('');
                    setErrorMsg('');
                    setActiveModalType(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-250 dark:bg-dark-850 dark:hover:bg-dark-800 border border-slate-200 dark:border-dark-750 text-slate-700 dark:text-slate-300 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={unlocked}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white dark:text-dark-950 rounded-lg font-bold hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  Clear Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* React JS Roadmap & Cheat Sheet Viewer Modal */}
      {isRoadmapViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-dark-900 border border-slate-205 dark:border-dark-800 max-w-4xl w-full rounded-2xl shadow-2xl p-6 relative flex flex-col max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setIsRoadmapViewerOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-655 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-primary-655 dark:text-primary-400 mb-4 border-b border-slate-100 dark:border-dark-850 pb-4">
              <Terminal className="w-5 h-5" />
              <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm">REACT_DEV_DASHBOARD_ROADMAP.TXT</span>
            </div>

            {/* Modal Scrollable Contents */}
            <div className="flex-1 overflow-y-auto space-y-8 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">React JS Complete Dev Sheet & Concepts</h4>
                <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-450 leading-relaxed font-mono">
                  Clear reference roadmap explaining components lifecycle, functional state mutations, hook triggers, and performance layers.
                </p>
              </div>

              {/* Grid 1: The Concept Roadmap */}
              <div>
                <h5 className="text-sm font-bold font-mono text-primary-605 dark:text-primary-400 mb-4 border-l-2 border-primary-500 pl-2">// STUDY_ROADMAP_FLOW</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  
                  <div className="bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-850 p-4 rounded-xl">
                    <span className="block text-primary-600 dark:text-primary-400 font-bold mb-2">LEVEL_01: FUNDAMENTALS</span>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-400">
                      <li>&bull; ES6 Scope (const, let)</li>
                      <li>&bull; Arrow function variables</li>
                      <li>&bull; Destructuring objects</li>
                      <li>&bull; Promises & async / await</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-850 p-4 rounded-xl">
                    <span className="block text-accent-500 dark:text-accent-400 font-bold mb-2">LEVEL_02: COMPONENT CORE</span>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-400">
                      <li>&bull; JSX rendering rules</li>
                      <li>&bull; Props vs State</li>
                      <li>&bull; Unidirectional data flow</li>
                      <li>&bull; Virtual DOM Reconciliation</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-dark-955 border border-slate-200 dark:border-dark-850 p-4 rounded-xl">
                    <span className="block text-emerald-550 dark:text-emerald-455 font-bold mb-2">LEVEL_03: HOOKS ENGINE</span>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-400">
                      <li>&bull; useState: values update</li>
                      <li>&bull; useEffect: side effects</li>
                      <li>&bull; useContext: global values</li>
                      <li>&bull; useRef: direct DOM ref</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Grid 2: Concept Cheat Sheet */}
              <div>
                <h5 className="text-sm font-bold font-mono text-primary-655 dark:text-primary-400 mb-4 border-l-2 border-primary-500 pl-2">// REACT_SYNTAX_CHEAT_SHEET</h5>
                <div className="space-y-4">
                  {/* Item 1: useState */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-400 font-mono text-xs space-y-2">
                    <div className="flex justify-between items-center text-slate-500 text-[10px]">
                      <span>HOOK: USE_STATE</span>
                      <span>CODE_SNIPPET</span>
                    </div>
                    <pre className="overflow-x-auto text-left py-1 text-slate-200">
{`const [state, setState] = useState(initialValue);

// Example: Click Counter
const [count, setCount] = useState(0);
const increment = () => setCount(prev => prev + 1);`}
                    </pre>
                  </div>

                  {/* Item 2: useEffect */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-400 font-mono text-xs space-y-2">
                    <div className="flex justify-between items-center text-slate-505 text-[10px]">
                      <span>HOOK: USE_EFFECT</span>
                      <span>CODE_SNIPPET</span>
                    </div>
                    <pre className="overflow-x-auto text-left py-1 text-slate-205">
{`useEffect(() => {
  // Subscription or fetch operations on mount
  console.log("Mounted / Updated");

  return () => {
    // Cleanup operations (clear timeouts, unsubscribes)
    console.log("Cleanup / Unmount");
  };
}, [dependencies]);`}
                    </pre>
                  </div>

                  {/* Item 3: Custom Hook */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-400 font-mono text-xs space-y-2">
                    <div className="flex justify-between items-center text-slate-505 text-[10px]">
                      <span>CUSTOM_HOOK: USE_FETCH</span>
                      <span>CODE_SNIPPET</span>
                    </div>
                    <pre className="overflow-x-auto text-left py-1 text-slate-205">
{`function useFetch(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setData(json));
  }, [url]);

  return data;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Verification Call to action */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 rounded-xl flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="text-emerald-700 dark:text-emerald-400 leading-relaxed font-sans">
                  <strong>Clear Concepts, High Efficiency:</strong> By structuring application states around modular hooks and custom providers, we keep component rendering paths optimized, avoiding unnecessary re-renders.
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-105 dark:border-dark-850 pt-4 mt-6 flex justify-end">
              <button
                onClick={() => setIsRoadmapViewerOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-dark-850 dark:hover:bg-dark-800 text-white rounded-xl font-bold font-mono text-xs cursor-pointer shadow-md"
              >
                close_viewer();
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
