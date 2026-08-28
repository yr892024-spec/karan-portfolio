import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleAddToast = (e) => {
      const { message, type = 'info', duration = 3500 } = e.detail;
      const id = Date.now() + Math.random().toString(36).substr(2, 9);
      
      setToasts(prev => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    };

    window.addEventListener('show-toast', handleAddToast);
    return () => window.removeEventListener('show-toast', handleAddToast);
  }, []);

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle2,
          iconColor: 'text-emerald-500',
          borderColor: 'border-emerald-500/30',
          textColor: 'text-emerald-400',
          prefix: '[SUCCESS]'
        };
      case 'warning':
        return {
          icon: ShieldCheck,
          iconColor: 'text-amber-500',
          borderColor: 'border-amber-500/30',
          textColor: 'text-amber-400',
          prefix: '[SECURITY]'
        };
      case 'error':
        return {
          icon: AlertTriangle,
          iconColor: 'text-rose-500',
          borderColor: 'border-rose-500/30',
          textColor: 'text-rose-400',
          prefix: '[ERROR]'
        };
      case 'vite':
        return {
          icon: Terminal,
          iconColor: 'text-sky-505',
          borderColor: 'border-sky-505/30',
          textColor: 'text-sky-400',
          prefix: '[VITE HMR]'
        };
      default:
        return {
          icon: Terminal,
          iconColor: 'text-slate-400',
          borderColor: 'border-slate-800',
          textColor: 'text-slate-300',
          prefix: '[SYSTEM]'
        };
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const styles = getToastStyles(toast.type);
          const Icon = styles.icon;
          
          return (
            <motion.div
              key={toast.id}
              initial={{ x: 100, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`pointer-events-auto bg-slate-950/95 dark:bg-dark-900/95 backdrop-blur-md border ${styles.borderColor} rounded-xl p-4 shadow-xl shadow-black/40 flex items-start gap-3.5 font-mono text-[11px] select-none`}
            >
              <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${styles.iconColor}`} />
              <div className="flex-1 text-left leading-relaxed">
                <span className={`font-bold mr-1.5 ${styles.iconColor}`}>
                  {styles.prefix}
                </span>
                <span className={styles.textColor}>{toast.message}</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
