import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, CheckSquare, Square, Award, Terminal } from 'lucide-react';

const SKILLS_CHECKLIST = [
  { id: 'react', label: 'React.js Components', group: 'frontend' },
  { id: 'tailwind', label: 'Tailwind CSS Layouts', group: 'frontend' },
  { id: 'htmlcss', label: 'HTML5 & Responsive CSS', group: 'frontend' },
  { id: 'sql', label: 'SQL Relational Queries', group: 'data' },
  { id: 'qa', label: 'QA Manual Testing & Audits', group: 'qa' },
  { id: 'logs', label: 'System Diagnostics & Logs', group: 'support' },
  { id: 'troubleshoot', label: 'Remote Troubleshooting', group: 'support' },
];

export default function Contact({ phoneUnlocked, onOpenPhoneModal }) {
  // Calculator state
  const [selectedSkills, setSelectedSkills] = useState({});

  // API Console state
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleActive, setIsConsoleActive] = useState(false);

  // HMR Cooldown Tracker
  const lastHmrTriggered = useRef(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    message: '',
    isKeyError: false,
  });

  const ACCESS_KEY = '3b1e402a-4ced-4cf5-95cd-37657c5f4223';

  const appendLog = (text, delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, text]);
        resolve();
      }, delay);
    });
  };

  const toggleSkill = (id) => {
    setSelectedSkills(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeSkillsCount = Object.values(selectedSkills).filter(Boolean).length;

  const getCompatibilityFeedback = () => {
    if (activeSkillsCount === 0) return 'Select requirements above to run compatibility query...';
    
    const selectedLabels = SKILLS_CHECKLIST
      .filter(s => selectedSkills[s.id])
      .map(s => s.label.replace(' Components', '').replace(' Layouts', ''));
    
    return `Karan has verified hands-on experience in ${selectedLabels.join(', ')}. Clear match for your opening — ready for immediate onboarding!`;
  };

  const handleAutoFillMessage = () => {
    const selectedLabels = SKILLS_CHECKLIST
      .filter(s => selectedSkills[s.id])
      .map(s => s.label);
    
    setFormData(prev => ({
      ...prev,
      subject: 'Interview Waiver / Offer Details',
      message: `Hi Karan, we reviewed your compatibility score. We are looking for expertise in: ${selectedLabels.join(', ')}.\n\nWe would love to fast-track your application!`
    }));
    
    const formInput = document.querySelector('#name');
    formInput?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => formInput?.focus(), 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Emit debounced custom HMR update event to trigger mockup logs
    const now = Date.now();
    if (now - lastHmrTriggered.current > 4000) {
      lastHmrTriggered.current = now;
      window.dispatchEvent(new CustomEvent('vite-hmr-update', { detail: 'Contact.jsx' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConsoleActive(true);
    setConsoleLogs([]);
    setStatus({ submitting: true, success: null, message: '', isKeyError: false });

    // Step-by-step diagnostic logging
    await appendLog('>> [1/4] INITIALIZING SECURE CLIENT HANDSHAKE...', 150);
    await appendLog('>> [2/4] AUDITING PAYLOAD STRUCTURAL INTEGRITY...', 250);
    
    if (!formData.name || !formData.email || !formData.message) {
      await appendLog('>> [ERROR] VALIDATION ERROR: Required inputs are missing.', 150);
      setStatus({ submitting: false, success: false, message: 'Please complete all required fields.', isKeyError: false });
      return;
    }
    
    await appendLog('>> [3/4] RESOLVING TARGET ENDPOINT DNS: api.web3forms.com...', 250);
    await appendLog('>> [4/4] TRANSMITTING FORM TRANSACTION ENVELOPE...', 250);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          from_name: 'Karan Rana Portfolio',
        }),
      });

      const result = await response.json();

      if (response.status === 200 || result.success) {
        await appendLog('>> [SUCCESS] HTTP TRANSACTION COMPLETED: 200 OK.', 200);
        await appendLog('>> [SUCCESS] ROUTED MESSAGE INBOX TO: yr892024@gmail.com.', 200);
        await appendLog('>> [SUCCESS] WIPING FORM CACHE REGISTERS... COMPLETED.', 200);
        
        setStatus({
          submitting: false,
          success: true,
          message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
          isKeyError: false,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const isInvalidKey = result.message && (
          result.message.toLowerCase().includes('form id') || 
          result.message.toLowerCase().includes('access key') || 
          result.message.toLowerCase().includes('invalid')
        );
        
        await appendLog(`>> [ERROR] API ERROR STATUS RESOLVED: ${result.message || 'Submission failed'}`, 200);
        if (isInvalidKey) {
          await appendLog('>> [WARN] CLEARANCE REVOKED: Web3Forms Access Key is invalid.', 200);
        }

        setStatus({
          submitting: false,
          success: false,
          message: isInvalidKey 
            ? 'Access Key is invalid. To activate this form, please request a free key at web3forms.com for yr892024@gmail.com and update the ACCESS_KEY variable in src/components/Contact.jsx.'
            : result.message || 'Something went wrong. Please check your network and try again.',
          isKeyError: isInvalidKey,
        });
      }
    } catch (error) {
      await appendLog('>> [ERROR] TIMEOUT: Connection handshake aborted by client socket.', 200);
      setStatus({
        submitting: false,
        success: false,
        message: 'Failed to send message. Please check your connection or email directly at yr892024@gmail.com.',
        isKeyError: false,
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-dark-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400 font-bold mb-2 font-mono">// PORT: MESSAGE_SINK</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Let's Discuss Opportunities</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Compatibility Match Calculator */}
        <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 p-6 sm:p-8 rounded-2xl shadow-sm mb-12 backdrop-blur">
          <div className="flex items-center space-x-2 text-primary-655 dark:text-primary-400 mb-4">
            <Award className="w-5 h-5 text-accent-500" />
            <h4 className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm">
              ROLE_COMPATIBILITY_MATRICES_QUERY
            </h4>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Select the required stack skills for your position to test Karan's hiring eligibility.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 select-none">
            {SKILLS_CHECKLIST.map((skill) => {
              const isChecked = !!selectedSkills[skill.id];
              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                    isChecked
                      ? 'bg-primary-500/5 dark:bg-primary-500/10 border-primary-500/30 text-slate-900 dark:text-white font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-dark-950 dark:hover:bg-dark-900 border-slate-200 dark:border-dark-850 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span className="text-xs font-mono">{skill.label}</span>
                </div>
              );
            })}
          </div>

          {/* Calculator Output */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-dark-855 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left flex-1 font-sans">
              <span className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">Diagnostics Result</span>
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                {getCompatibilityFeedback()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">Match Score</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-500">
                  {activeSkillsCount > 0 ? '100% MATCH' : '0%'}
                </span>
              </div>
              
              {activeSkillsCount > 0 && (
                <button
                  onClick={handleAutoFillMessage}
                  className="px-4 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white dark:text-dark-950 rounded-xl font-bold font-mono text-xs hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  git commit -m "Auto Fill Info"
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h4>
              <p className="text-sm text-slate-655 dark:text-slate-400 leading-relaxed">
                If you have a frontend engineering project, a permanent opening, want to discuss E-Commerce storefronts, reach out using the form or direct channels.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-850 rounded-xl text-primary-600 dark:text-primary-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-semibold font-mono">EMAIL ME DIRECTLY</span>
                    <a href="mailto:yr892024@gmail.com" className="text-sm font-semibold hover:text-primary-500 transition-colors">
                      yr892024@gmail.com
                    </a>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    if (!phoneUnlocked) {
                      onOpenPhoneModal();
                    }
                  }}
                  className={`flex items-center space-x-3 text-slate-700 dark:text-slate-305 ${!phoneUnlocked ? 'cursor-pointer hover:opacity-85' : ''}`}
                >
                  <div className="p-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-850 rounded-xl text-accent-600 dark:text-accent-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-semibold font-mono">CALL DIRECTLY</span>
                    <span className="text-sm font-semibold hover:text-accent-500 transition-colors">
                      {phoneUnlocked ? '+91 7434987924' : '+91 XXXXX XXXXX (🔒 Click to Unlock)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-305">
                  <div className="p-2.5 bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-850 rounded-xl text-primary-600 dark:text-primary-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-semibold font-mono">WORK LOCATION</span>
                    <span className="text-sm font-semibold">Surat, Gujarat, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-dark-800/80">
              <div className="bg-slate-50 dark:bg-dark-950/60 border border-slate-200 dark:border-dark-800 p-4 rounded-xl text-center">
                <span className="block text-xs font-mono font-bold tracking-widest text-slate-500 mb-1">IMMEDIATE START</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Open to relocation and remote positions.</span>
              </div>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 p-6 sm:p-8 rounded-2xl shadow-sm backdrop-blur relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 rounded-xl focus:outline-none focus:border-primary-500 text-slate-800 dark:text-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 rounded-xl focus:outline-none focus:border-primary-500 text-slate-800 dark:text-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 rounded-xl focus:outline-none focus:border-primary-500 text-slate-800 dark:text-white transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Karan, we would love to schedule a talk for a Frontend role..."
                  className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 rounded-xl focus:outline-none focus:border-primary-500 text-slate-800 dark:text-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full flex items-center justify-center py-4 font-bold text-white dark:text-dark-950 bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 hover:from-primary-400 hover:to-accent-400 dark:hover:from-primary-300 dark:hover:to-accent-300 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group text-center cursor-pointer"
              >
                {status.submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Transmitting API Packet...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              {/* Live API Console Log Box */}
              {isConsoleActive && (
                <div className="mt-4 bg-dark-950 border border-dark-800 rounded-xl p-4 text-[11px] font-mono text-left space-y-1 relative shadow-inner">
                  <div className="flex justify-between items-center text-[9px] text-slate-600 font-bold tracking-widest pb-1 border-b border-dark-900/60 mb-2">
                    <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-primary-500" /> TRANSMISSION_LOG.SH</span>
                    <span>LIVE LOGS</span>
                  </div>
                  
                  <div className="space-y-1 h-28 overflow-y-auto pr-1">
                    {consoleLogs.map((log, lIdx) => (
                      <div 
                        key={lIdx} 
                        className={
                          log.includes('SUCCESS') 
                            ? 'text-emerald-400' 
                            : log.includes('ERROR') 
                            ? 'text-rose-500 font-bold'
                            : log.includes('WARN')
                            ? 'text-amber-500'
                            : 'text-slate-400'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>

                  {status.success === false && (
                    <div className="pt-2 border-t border-dark-900/65 mt-2 flex flex-col items-stretch gap-2.5">
                      <div className="flex items-start space-x-2 text-rose-500 text-xs">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{status.message}</span>
                      </div>
                      {status.isKeyError && (
                        <a
                          href="mailto:yr892024@gmail.com?subject=Contact Form Fallback"
                          className="inline-flex items-center justify-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-mono font-bold text-[10px] rounded-lg transition-colors cursor-pointer text-center"
                        >
                          ✉️ Click to Mail Directly Instead
                        </a>
                      )}
                    </div>
                  )}

                  {status.success === true && (
                    <div className="pt-2 border-t border-dark-900/65 mt-2 flex items-start space-x-2 text-emerald-400 text-xs font-sans">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{status.message}</span>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
