import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, MapPin, Mail, Phone, ArrowRight, Code } from 'lucide-react';

export default function Hero({ phoneUnlocked, onOpenPhoneModal, onDecryptAll }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'skills' | 'shell'
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Terminal Quest States
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [cmdInput, setCmdInput] = useState('');
  const [isWaitingForPassword, setIsWaitingForPassword] = useState(false);
  
  // Vite Boot Simulator States
  const [hasBooted, setHasBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);

  const terminalEndRef = useRef(null);

  // Dynamic Visitor Diagnostics
  const diagnostics = useMemo(() => {
    const hrs = new Date().getHours();
    let greeting = 'Good Evening';
    if (hrs < 12) greeting = 'Good Morning';
    else if (hrs < 18) greeting = 'Good Afternoon';

    let osName = 'Unknown OS';
    let browserName = 'Web Browser';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    
    if (typeof window !== 'undefined' && navigator) {
      const ua = navigator.userAgent;
      
      if (ua.includes('Windows')) osName = 'Windows';
      else if (ua.includes('Macintosh')) osName = 'macOS';
      else if (ua.includes('Linux')) osName = 'Linux';
      else if (ua.includes('iPhone') || ua.includes('iPad')) osName = 'iOS';
      else if (ua.includes('Android')) osName = 'Android';
      
      if (ua.includes('Firefox')) browserName = 'Firefox';
      else if (ua.includes('Chrome') && !ua.includes('Edg')) browserName = 'Chrome';
      else if (ua.includes('Safari') && !ua.includes('Chrome')) browserName = 'Safari';
      else if (ua.includes('Edg')) browserName = 'Edge';
    }

    return { greeting, osName, browserName, timeZone };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 35;
    const y = (clientY - window.innerHeight / 2) / 35;
    setMouseOffset({ x, y });
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contact = document.querySelector('#contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to bottom of terminal when history changes
  useEffect(() => {
    if (activeTab === 'shell') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

  // Vite Boot Simulator effect trigger
  useEffect(() => {
    if (activeTab === 'shell' && !hasBooted && !isBooting) {
      const runBootSequence = async () => {
        setIsBooting(true);
        setTerminalHistory([]);

        const logs = [
          { type: 'vite', text: '  vite v8.2.2  ready in 184 ms' },
          { type: 'vite', text: '  ➜  Local:   http://localhost:5173/' },
          { type: 'vite', text: '  ➜  Network: use --host to expose' },
          { type: 'vite', text: '  ➜  press h + enter to show help' },
          { type: 'system', text: ' ' },
          { type: 'system', text: '[vite] hot module replacement enabled.' },
          { type: 'system', text: '[vite] client connection verified.' },
          { type: 'system', text: '// Terminal Quest v1.0' },
          { type: 'system', text: '// Type "help" to view available commands.' }
        ];

        for (let i = 0; i < logs.length; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 4 ? 100 : 150));
          setTerminalHistory(prev => [...prev, logs[i]]);
        }

        setIsBooting(false);
        setHasBooted(true);
      };
      runBootSequence();
    }
  }, [activeTab, hasBooted, isBooting]);

  // HMR updates listener
  useEffect(() => {
    const handleHmrEvent = (e) => {
      if (hasBooted && activeTab === 'shell') {
        setTerminalHistory(prev => [
          ...prev,
          { type: 'vite', text: `[vite] HMR update: src/components/${e.detail}` }
        ]);
      }
    };
    window.addEventListener('vite-hmr-update', handleHmrEvent);
    return () => window.removeEventListener('vite-hmr-update', handleHmrEvent);
  }, [hasBooted, activeTab]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cleanInput = cmdInput.trim();
    if (!cleanInput) return;

    if (isWaitingForPassword) {
      const maskedPass = '*'.repeat(cleanInput.length);
      const newHistory = [...terminalHistory, { type: 'input', text: `password: ${maskedPass}` }];

      if (['2412', 'hireme', 'karan', 'admin'].includes(cleanInput.toLowerCase())) {
        newHistory.push({ type: 'output', text: '🔐 ACCESS GRANTED! System records decrypted & GPA indicators cleared.' });
        if (onDecryptAll) {
          onDecryptAll();
        }
      } else {
        newHistory.push({ type: 'output', text: '❌ ACCESS DENIED! Passcode is invalid.' });
      }

      setIsWaitingForPassword(false);
      setTerminalHistory(newHistory);
      setCmdInput('');
      return;
    }

    const cmd = cleanInput.toLowerCase();
    const newHistory = [...terminalHistory, { type: 'input', text: `karan-shell$ ${cleanInput}` }];

    if (cmd === 'help') {
      newHistory.push({ type: 'output', text: 'Commands: bio, stack, secrets, jokes, clear' });
    } else if (cmd === 'bio') {
      newHistory.push({ type: 'output', text: 'Karan Rana - Frontend Developer based in Surat, Gujarat. Specialized in React.js & Tailwind.' });
    } else if (cmd === 'stack') {
      newHistory.push({ type: 'output', text: 'Core Stack: React.js, Tailwind CSS, HTML5, CSS3, SQL, QA Testing.' });
    } else if (cmd === 'secrets' || cmd === 'secrate') {
      newHistory.push({ type: 'output', text: 'Enter passcode to decrypt secure database records:' });
      setIsWaitingForPassword(true);
      setTerminalHistory(newHistory);
      setCmdInput('');
      return;
    } else if (cmd === 'jokes') {
      const jokes = [
        "Why do programmers wear glasses? Because they can't C#!",
        "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem."
      ];
      newHistory.push({ type: 'output', text: jokes[Math.floor(Math.random() * jokes.length)] });
    } else if (cmd === 'clear') {
      setTerminalHistory([
        { type: 'system', text: '// Terminal Quest v1.0' },
        { type: 'system', text: '// Type "help" to view available commands.' }
      ]);
      setCmdInput('');
      return;
    } else {
      newHistory.push({ type: 'output', text: `shell: command not found: "${cmd}". Type "help" for a list of commands.` });
    }

    setTerminalHistory(newHistory);
    setCmdInput('');
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden bg-grid-pattern"
    >
      {/* Floating 3D Parallax Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { text: '</>', top: '15%', left: '8%', depth: 0.4, size: 'text-3xl', color: 'text-sky-500/20' },
          { text: '{ }', top: '65%', left: '6%', depth: -0.6, size: 'text-4xl', color: 'text-amber-500/15' },
          { text: 'JS', top: '78%', left: '42%', depth: 0.8, size: 'text-xl font-bold', color: 'text-yellow-500/20' },
          { text: 'React', top: '22%', right: '12%', depth: -0.5, size: 'text-3xl font-bold', color: 'text-cyan-500/25 animate-pulse-slow' },
          { text: 'CSS', top: '58%', right: '10%', depth: 0.7, size: 'text-xl font-bold', color: 'text-teal-500/20' },
          { text: 'Vite', top: '42%', left: '52%', depth: -0.3, size: 'text-2xl font-bold', color: 'text-purple-500/20' },
        ].map((pt, idx) => (
          <motion.div
            key={idx}
            className={`absolute font-mono select-none ${pt.size} ${pt.color}`}
            style={{
              top: pt.top,
              left: pt.left,
              right: pt.right,
              x: mouseOffset.x * pt.depth,
              y: mouseOffset.y * pt.depth,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={{
              duration: 5 + idx * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {pt.text}
          </motion.div>
        ))}
      </div>

      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary-500/10 blur-[90px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent-500/10 blur-[90px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Left Column */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Dynamic Handshake Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-col sm:flex-row sm:items-center gap-2.5 bg-slate-200/80 dark:bg-dark-900 border border-slate-300 dark:border-dark-800 px-4 py-2.5 rounded-2xl text-xs font-mono font-semibold text-primary-600 dark:text-primary-400 backdrop-blur w-full sm:w-auto shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-accent-505 animate-pulse" />
                <span>{diagnostics.greeting}! Handshake Secured.</span>
              </div>
              <span className="hidden sm:inline text-slate-355 dark:text-dark-700">|</span>
              <div className="text-[10px] text-slate-500 dark:text-slate-505 font-normal">
                SYS: {diagnostics.osName} ({diagnostics.browserName}) &bull; ZONE: {diagnostics.timeZone}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight"
            >
              Karan Rana <br />
              <span className="bg-gradient-to-r from-primary-500 via-emerald-500 to-accent-500 dark:from-primary-400 dark:via-emerald-400 dark:to-accent-400 text-transparent bg-clip-text">
                Frontend Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-305 leading-relaxed max-w-2xl font-medium"
            >
              I build web applications using <strong className="text-slate-900 dark:text-white">React.js</strong> and <strong className="text-primary-600 dark:text-primary-400 font-semibold">Tailwind CSS</strong>. With a background in Computer Science (BCA) and professional experience in web support and system diagnostics, I write clean, optimized components and solve complex logical bugs quickly.
            </motion.p>

            {/* Quick Contact Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 text-xs font-mono text-slate-655 dark:text-slate-400"
            >
              <div className="flex items-center space-x-1.5 bg-white dark:bg-dark-900 border border-slate-205 dark:border-dark-850 px-3 py-1.5 rounded-lg shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-primary-500" />
                <span>Surat, Gujarat</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white dark:bg-dark-900 border border-slate-205 dark:border-dark-850 px-3 py-1.5 rounded-lg shadow-sm">
                <Mail className="w-3.5 h-3.5 text-accent-500" />
                <span>yr892024@gmail.com</span>
              </div>
              <div 
                onClick={() => {
                  if (!phoneUnlocked) {
                    onOpenPhoneModal();
                  }
                }}
                className={`flex items-center space-x-1.5 bg-white dark:bg-dark-900 border border-slate-205 dark:border-dark-850 px-3 py-1.5 rounded-lg shadow-sm ${!phoneUnlocked ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-dark-850' : ''}`}
              >
                <Phone className="w-3.5 h-3.5 text-primary-500" />
                <span>{phoneUnlocked ? '+91 7434987924' : '+91 XXXXX XXXXX (🔒 Unlock)'}</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="flex items-center justify-center px-6 py-3.5 font-bold text-white dark:text-dark-950 bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 hover:from-primary-455 hover:to-accent-455 dark:hover:from-primary-300 dark:hover:to-accent-300 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/20 group font-mono text-sm"
              >
                git commit -m "Hire Karan"
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="/Karan_Rana_Resume.pdf"
                download="Karan_Rana_Resume.pdf"
                className="flex items-center justify-center px-6 py-3.5 font-bold text-slate-700 dark:text-slate-205 bg-slate-205 hover:bg-slate-300 dark:bg-dark-900 dark:hover:bg-dark-850 border border-slate-300 dark:border-dark-800 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 font-mono text-sm cursor-pointer"
              >
                <Code className="mr-2 w-4 h-4 text-accent-500 dark:text-accent-400" />
                download_cv();
              </a>
            </motion.div>
          </div>

          {/* Terminal Right Column (Interactive Tabs) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full bg-dark-950 border border-dark-800 rounded-xl overflow-hidden shadow-2xl shadow-black/60 font-mono text-xs sm:text-sm text-slate-300"
          >
            {/* Header window control buttons & Tab Bar */}
            <div className="bg-dark-900 px-4 py-3 border-b border-dark-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                </div>
                
                {/* Simulated File tabs */}
                <div className="flex space-x-2 text-[10px] select-none font-bold uppercase tracking-wider">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'profile' ? 'bg-dark-950 text-sky-400 border-b-2 border-sky-400' : 'text-slate-505 hover:text-slate-350 cursor-pointer'}`}
                  >
                    KaranRana.jsx
                  </button>
                  <button 
                    onClick={() => setActiveTab('skills')}
                    className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'skills' ? 'bg-dark-950 text-sky-400 border-b-2 border-sky-400' : 'text-slate-505 hover:text-slate-350 cursor-pointer'}`}
                  >
                    skills.json
                  </button>
                  <button 
                    onClick={() => setActiveTab('shell')}
                    className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'shell' ? 'bg-dark-950 text-sky-400 border-b-2 border-sky-400' : 'text-slate-505 hover:text-slate-355 cursor-pointer'}`}
                  >
                    api_test.sh
                  </button>
                </div>
              </div>
              
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-right">Terminal</span>
            </div>

            {/* Code Body Content toggled by active tab */}
            <div className="p-4 sm:p-6 min-h-68 flex flex-col justify-between select-text">
              {activeTab === 'profile' && (
                <div className="space-y-3.5 leading-relaxed text-left">
                  <div>
                    <span className="text-pink-400">import</span> React, {"{ useState }"} <span className="text-pink-400">from</span> <span className="text-emerald-400">'react'</span>;
                  </div>
                  <div>
                    <span className="text-pink-400">import</span> {"{ TailwindCSS }"} <span className="text-pink-400">from</span> <span className="text-emerald-400">'@tailwindcss/vite'</span>;
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-pink-400">const</span> developer = {"{"}
                    <div className="pl-4 text-slate-300">
                      name: <span className="text-emerald-400">'Karan Rana'</span>,
                      role: <span className="text-emerald-400">'Frontend Developer'</span>,
                      location: <span className="text-emerald-400">'Surat, Gujarat, India'</span>,
                      coreStack: [<span className="text-emerald-400">'React.js'</span>, <span className="text-emerald-400">'Tailwind CSS'</span>],
                      experienceYears: <span className="text-amber-400">1</span>,
                    </div>
                    {"};"}
                  </div>

                  <div className="pt-2 text-slate-505 border-t border-dark-900">
                    // Ready to write robust, scalable components.
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-3 leading-relaxed text-left text-sky-400">
                  <pre className="text-slate-305 whitespace-pre-wrap font-mono leading-relaxed">
{`{
  "techStack": {
    "frontend": ["React.js", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
    "backend": ["Node.js", "SQL Databases"],
    "qualityAssurance": ["Manual Testing", "Bug Hunting"]
  },
  "analyticalSkills": ["System Diagnostics", "Application Troubleshooting"]
}`}
                  </pre>
                </div>
              )}

              {activeTab === 'shell' && (
                <div className="flex flex-col justify-between h-56 text-left font-mono">
                  {/* History Logs */}
                  <div className="flex-1 overflow-y-auto space-y-1.5 text-slate-405 max-h-44 pr-1 scrollbar-thin scrollbar-thumb-dark-800">
                    {terminalHistory.map((line, lIdx) => (
                      <div 
                        key={lIdx} 
                        className={
                          line.type === 'vite'
                            ? 'text-cyan-405'
                            : line.type === 'input' 
                            ? 'text-slate-300 font-bold' 
                            : line.type === 'system' 
                            ? 'text-slate-500' 
                            : line.type === 'output' && line.text.includes('DENIED') 
                            ? 'text-rose-500'
                            : 'text-emerald-400'
                        }
                      >
                        {line.text}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Interactive CLI Input Line */}
                  {!isBooting && (
                    <form onSubmit={handleCommandSubmit} className="flex items-center space-x-1.5 border-t border-dark-900/60 pt-2.5 mt-2">
                      <span className={isWaitingForPassword ? "text-rose-500 font-bold" : "text-primary-505 font-bold"}>
                        {isWaitingForPassword ? 'password:' : 'karan-shell$'}
                      </span>
                      <input
                        type={isWaitingForPassword ? 'password' : 'text'}
                        value={cmdInput}
                        onChange={(e) => setCmdInput(e.target.value)}
                        placeholder={isWaitingForPassword ? 'Enter passcode...' : 'Type help...'}
                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 focus:outline-none font-mono"
                      />
                    </form>
                  )}
                  {isBooting && (
                    <div className="flex items-center space-x-2 text-[10px] text-slate-600 font-mono pt-2.5 mt-2 border-t border-dark-900/60 animate-pulse">
                      <span>➜ BOOTING LOCAL COMPILER INSTANCE...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
