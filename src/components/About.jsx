import React from 'react';
import { GraduationCap, CheckCircle } from 'lucide-react';

export default function About({ gpaUnlocked, onOpenGpaModal }) {
  const education = [
    {
      degree: 'BCA in Computer Science',
      institution: 'Veer Narmad South Gujarat University, Surat',
      duration: '01/2024 Graduated',
      grade: gpaUnlocked ? 'GPA: 61.15%' : 'GPA: XX% (🔒 Click to Unlock)',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'The Radiant International School, Surat',
      duration: '01/2021 Completed',
      grade: gpaUnlocked ? 'GPA: 56.13%' : 'GPA: XX% (🔒 Click to Unlock)',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'The Radiant International School, Surat',
      duration: '01/2019 Completed',
      grade: gpaUnlocked ? 'GPA: 51.16%' : 'GPA: XX% (🔒 Click to Unlock)',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-100/50 dark:bg-dark-950/40 border-y border-slate-200/60 dark:border-dark-900/20">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400 font-bold mb-2 font-mono">// COMPONENT: ABOUT_ME</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Engineering Visual Solutions</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Main Text and Summary */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Passionate Frontend Developer & Analytical Problem Solver
            </h4>
            <p className="text-slate-650 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              I specialize in creating pixel-perfect, highly responsive interfaces using **React.js** and **Tailwind CSS**. Having a background in **Computer Applications (BCA)** and active experience as a **Technical Support Engineer**, I bring a unique dual-perspective to software development:
            </p>
            <ul className="space-y-3.5">
              {[
                'Translating user requirements into modular, reusable React components.',
                'Leveraging analytical debugging skills learned in system diagnostics to write highly stable, performant code.',
                'Specializing in spatial data engineering and coordinates visualizers.',
                'Ensuring semantic, clean HTML/CSS structures and modular styles configurations.'
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 p-4 rounded-xl text-center shadow-sm">
                <span className="block text-2xl font-extrabold text-slate-900 dark:text-white">BCA</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Graduate</span>
              </div>
              <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 p-4 rounded-xl text-center shadow-sm">
                <span className="block text-2xl font-extrabold text-primary-600 dark:text-primary-400">100%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Responsive UI</span>
              </div>
              <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 p-4 rounded-xl text-center shadow-sm">
                <span className="block text-2xl font-extrabold text-accent-600 dark:text-accent-400">Clean</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Code Focus</span>
              </div>
            </div>

            {/* Download Resume Button */}
            <div className="pt-2">
              <a
                href="/Karan_Rana_Resume.pdf"
                download="Karan_Rana_Resume.pdf"
                className="inline-flex items-center space-x-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-dark-900 dark:hover:bg-dark-850 border border-slate-200 dark:border-dark-800 rounded-xl text-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition-all shadow-sm hover:-translate-y-0.5 duration-200 cursor-pointer"
              >
                <span>📥 Download Resume PDF</span>
              </a>
            </div>
          </div>

          {/* Column 2: Education Track */}
          <div className="lg:col-span-5 space-y-6 bg-white dark:bg-dark-900/60 border border-slate-200 dark:border-dark-800 p-6 sm:p-8 rounded-2xl shadow-sm backdrop-blur">
            <div className="flex items-center space-x-3 mb-6">
              <GraduationCap className="w-6 h-6 text-accent-500" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Education History</h4>
            </div>

            <div className="space-y-6">
              {education.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l border-slate-200 dark:border-dark-700/60 last:border-0 pb-1">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent-500"></div>
                  <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {item.duration}
                  </span>
                  <h5 className="text-md font-bold text-slate-800 dark:text-slate-100 mt-1">{item.degree}</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{item.institution}</p>
                  
                  <span 
                    onClick={() => {
                      if (!gpaUnlocked) {
                        onOpenGpaModal();
                      }
                    }}
                    className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded border transition-colors ${
                      gpaUnlocked 
                        ? 'bg-slate-100 dark:bg-dark-800 text-accent-600 dark:text-accent-400 border-slate-200 dark:border-dark-700' 
                        : 'bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 border-primary-500/30 hover:bg-primary-500/20 dark:hover:bg-primary-500/30 cursor-pointer'
                    }`}
                  >
                    {item.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
