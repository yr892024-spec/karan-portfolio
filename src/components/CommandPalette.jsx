import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Command, ArrowDown, ArrowUp, CornerDownLeft, Sparkles } from 'lucide-react';

const COMMANDS = [
  { id: 'home', label: 'Go to Home', desc: 'Scrolls to intro section', cmd: '/home' },
  { id: 'about', label: 'Go to About', desc: 'Scrolls to education timeline & metrics', cmd: '/about' },
  { id: 'skills', label: 'Go to Skills', desc: 'Scrolls to skills category index', cmd: '/skills' },
  { id: 'projects', label: 'Go to Projects', desc: 'Scrolls to shopx & releases', cmd: '/projects' },
  { id: 'experience', label: 'Go to Experience', desc: 'Scrolls to support & timeline logs', cmd: '/experience' },
  { id: 'contact', label: 'Go to Contact', desc: 'Scrolls to message form', cmd: '/contact' },
  { id: 'decrypt', label: 'Decrypt Secure Records', desc: 'Instantly decrypt GPA, phone, & socials', cmd: '/decrypt' },
  { id: 'clear', label: 'Lock Secure Records', desc: 'Clear permissions & re-lock sensitive variables', cmd: '/clear' },
  { id: 'theme', label: 'Toggle Light/Dark Theme', desc: 'Trigger authorization theme switcher', cmd: '/theme' },
  { id: 'cv', label: 'Download Developer CV', desc: 'Save official Karan_Rana_Resume.pdf', cmd: '/cv' },
  { id: 'instagram', label: 'Open Instagram Profile', desc: 'Launches social profile link', cmd: '/instagram' },
];

export default function CommandPalette({
  isOpen,
  onClose,
  onScrollToSection,
  onToggleTheme,
  onDecryptAll,
  onLockAll,
  onDownloadCv,
  onOpenInstagram
}) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter commands
  const filteredCommands = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.cmd.toLowerCase().includes(search.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  const executeCommand = (id) => {
    switch (id) {
      case 'home':
      case 'about':
      case 'skills':
      case 'projects':
      case 'experience':
      case 'contact':
        onScrollToSection(`#${id}`);
        break;
      case 'decrypt':
        onDecryptAll();
        break;
      case 'clear':
        onLockAll();
        break;
      case 'theme':
        onToggleTheme();
        break;
      case 'cv':
        onDownloadCv();
        break;
      case 'instagram':
        onOpenInstagram();
        break;
      default:
        break;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-sm p-4 pt-[10vh]">
      <div className="bg-white dark:bg-dark-900 border border-slate-205 dark:border-dark-800 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[70vh] font-mono text-xs sm:text-sm">
        
        {/* Input Header */}
        <div className="flex items-center space-x-3 px-4 py-3.5 border-b border-slate-100 dark:border-dark-850">
          <Terminal className="w-5 h-5 text-primary-500 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command (e.g. /decrypt or /projects)..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 font-mono focus:ring-0 focus:outline-none"
          />
          <span className="hidden sm:inline-flex items-center space-x-0.5 px-2 py-0.5 bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-dark-750 text-slate-400 rounded text-[9px] font-bold">
            ESC
          </span>
        </div>

        {/* Commands List */}
        <div 
          ref={listRef} 
          className="flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => executeCommand(cmd.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 border-l-4 border-primary-500 pl-2'
                      : 'hover:bg-slate-50 dark:hover:bg-dark-850 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {cmd.label}
                      {cmd.id === 'decrypt' && <Sparkles className="w-3.5 h-3.5 text-yellow-500" />}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">{cmd.desc}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 font-bold rounded-lg border text-[10px] ${
                      isActive 
                        ? 'bg-primary-500/20 border-primary-500/30 text-primary-600 dark:text-primary-400' 
                        : 'bg-slate-100 dark:bg-dark-950 border-slate-200 dark:border-dark-850 text-slate-400'
                    }`}>
                      {cmd.cmd}
                    </span>
                    {isActive && <CornerDownLeft className="w-3.5 h-3.5 text-primary-500" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500">
              No matching developer commands found.
            </div>
          )}
        </div>

        {/* Footer Help controls */}
        <div className="bg-slate-50 dark:bg-dark-950/60 px-4 py-2.5 border-t border-slate-100 dark:border-dark-850 flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-widest font-bold">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" />
              <ArrowDown className="w-3 h-3 mr-1" />
              Navigate
            </span>
            <span className="flex items-center">
              <CornerDownLeft className="w-3 h-3 mr-1" />
              Execute
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            Spotlight Mode
          </span>
        </div>

      </div>
    </div>
  );
}
