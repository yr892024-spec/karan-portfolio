import React from 'react';
import { Calendar, Briefcase, Award, Terminal } from 'lucide-react';
import GithubHeatmap from './GithubHeatmap';
import TestSuiteSimulator from './TestSuiteSimulator';

export default function Experience({ gpaUnlocked, onOpenGpaModal }) {
  const experienceData = [
    {
      type: 'work',
      role: 'Technical Support Engineer',
      company: 'Tech EHS',
      location: 'Surat, Gujarat, India',
      period: '01/2026 - Present',
      description: 'Providing advanced application support and remote system diagnostics. Collaborating with cross-functional development teams to debug customer issues, run database checkups, and optimize software platforms.',
      bullets: [
        'Delivered technical support for software and hardware issues, achieving fast resolution times.',
        'Engaged with clients to clarify requirements and implemented tailored integration configurations.',
        'Documented issues and solutions in central ticket databases to improve support response times.',
        'Diagnosed Web application support queries, optimizing web environments for client environments.',
      ],
    },
    {
      type: 'education',
      role: 'BCA (Bachelor of Computer Applications)',
      company: 'Veer Narmad South Gujarat University',
      location: 'Surat, India',
      period: '01/2024 Graduated',
      description: 'Gained solid foundation in software systems, database management systems (DBMS), OOP design, and web development fundamentals.',
      bullets: [
        gpaUnlocked ? 'Graduated with cumulative GPA of 61.15%' : 'Graduated with cumulative GPA of XX% (🔒 Click to Unlock)',
        'Focused projects around relational SQL databases and responsive HTML/CSS/JS frontend structures.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-100/30 dark:bg-dark-900/40 border-y border-slate-200/60 dark:border-dark-900/20">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400 font-bold mb-2 font-mono">// TIMELINE: LOG_FLOW</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Experience & Milestones</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative border-l border-slate-205 dark:border-dark-800 ml-4 md:ml-6 space-y-12">
          {experienceData.map((item, idx) => {
            const Icon = item.type === 'work' ? Briefcase : Award;
            return (
              <div key={idx} className="relative pl-8 md:pl-10 group">
                <span className="absolute -left-[17px] top-1.5 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white dark:bg-dark-950 border border-slate-305 dark:border-dark-700 text-primary-605 dark:text-primary-400 group-hover:border-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-4 h-4" />
                </span>

                <div className="bg-white dark:bg-dark-900/60 border border-slate-200 dark:border-dark-805 hover:border-slate-350 dark:hover:border-dark-700 p-6 md:p-8 rounded-2xl shadow-sm backdrop-blur transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="inline-flex items-center space-x-1.5 text-xs text-accent-600 dark:text-accent-400 font-semibold uppercase tracking-wider mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{item.role}</h4>
                      <p className="text-sm font-semibold text-slate-705 dark:text-slate-305 mt-0.5">
                        {item.company} <span className="text-slate-500 font-normal">| {item.location}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-650 dark:text-slate-300 leading-relaxed mb-4">{item.description}</p>

                  <div className="space-y-2 border-t border-slate-200 dark:border-dark-800/60 pt-4">
                    <h5 className="text-xs uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400 flex items-center">
                      <Terminal className="w-3.5 h-3.5 text-primary-500 mr-2" />
                      Key Responsibilities & Highlights
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 list-inside">
                      {item.bullets.map((bullet, bIdx) => {
                        const isGpaBullet = item.type === 'education' && bIdx === 0;
                        return (
                          <li 
                            key={bIdx} 
                            onClick={() => {
                              if (isGpaBullet && !gpaUnlocked) {
                                onOpenGpaModal();
                              }
                            }}
                            className={`leading-relaxed hover:text-slate-800 dark:hover:text-slate-200 transition-colors ${
                              isGpaBullet && !gpaUnlocked ? 'cursor-pointer text-primary-650 hover:underline' : 'list-disc'
                            }`}
                          >
                            {bullet}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive GitHub Commit Heatmap */}
        <GithubHeatmap />

        {/* vitest Automated Test Suite Simulator */}
        <TestSuiteSimulator />
      </div>
    </section>
  );
}
