import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Braces, Paintbrush, FileJson, Layers, Database, GitBranch, ShieldAlert, Cpu, Terminal, Bug } from 'lucide-react';

const skillsList = [
  { name: 'React.js', category: 'Frontend', desc: 'Hooks, Context, Custom hooks, Virtual DOM routing', icon: Code2, color: 'text-sky-500 dark:text-sky-400', border: 'hover:border-sky-500/50' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', desc: 'Asynchronous operations, Promises, DOM API, Arrays', icon: Braces, color: 'text-amber-500 dark:text-amber-400', border: 'hover:border-amber-500/50' },
  { name: 'Tailwind CSS', category: 'Frontend', desc: 'Utility classes, JIT compilation, Custom themes, Responsive grid', icon: Paintbrush, color: 'text-teal-500 dark:text-teal-400', border: 'hover:border-teal-500/50' },
  { name: 'HTML5 & CSS3', category: 'Frontend', desc: 'Semantic layouts, Flexbox/Grid, Animations, Form standards', icon: FileJson, color: 'text-orange-500 dark:text-orange-400', border: 'hover:border-orange-500/50' },
  { name: 'Bootstrap', category: 'Frontend', desc: 'Grid systems, Legacy components styling, Helper utilities', icon: Layers, color: 'text-purple-500 dark:text-purple-400', border: 'hover:border-purple-500/50' },
  { name: 'Node.js', category: 'Tools', desc: 'Express endpoints, REST API structure, Package manager integrations', icon: Cpu, color: 'text-emerald-500 dark:text-emerald-400', border: 'hover:border-emerald-500/50' },
  { name: 'SQL Databases', category: 'Tools', desc: 'Query structures, Relational tables schema, Joins, Filtering', icon: Database, color: 'text-blue-500 dark:text-blue-400', border: 'hover:border-blue-500/50' },
  { name: 'Git & GitHub', category: 'Tools', desc: 'Branching strategies, Merging, Resolving conflicts, Commits history', icon: GitBranch, color: 'text-red-500 dark:text-red-400', border: 'hover:border-red-500/50' },
  { name: 'QA Testing & Bug Hunting', category: 'QA', desc: 'Manual test plans, validation protocols, bug lifecycle logs, regression checking', icon: Bug, color: 'text-red-500 dark:text-red-400', border: 'hover:border-red-500/50' },
  { name: 'System Diagnostics', category: 'QA', desc: 'Reviewing application logs, Debugging stack traces, Hardware state', icon: ShieldAlert, color: 'text-rose-500 dark:text-rose-400', border: 'hover:border-rose-500/50' },
  { name: 'App Support & Troubleshooting', category: 'QA', desc: 'Resolving REST API failures, Client side routing bugs, Cache resets', icon: Terminal, color: 'text-slate-500 dark:text-slate-400', border: 'hover:border-slate-500/50' },
];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredSkills = skillsList.filter((skill) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Frontend') return skill.category === 'Frontend';
    if (activeFilter === 'DBMS & Tools') return skill.category === 'Tools';
    if (activeFilter === 'QA & Diagnostics') return skill.category === 'QA';
    return true;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-dark-900/50 border-b border-slate-200 dark:border-dark-900/20">
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-primary-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400 font-bold mb-2 font-mono">// TECHNICAL COMPILER</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Developer Skill Index</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 select-none">
          {['All', 'Frontend', 'DBMS & Tools', 'QA & Diagnostics'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2.5 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white dark:text-dark-950 border-transparent shadow-md'
                  : 'bg-white hover:bg-slate-100 dark:bg-dark-950 dark:hover:bg-dark-900 border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Animated Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-80"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  key={skill.name}
                  className={`bg-white dark:bg-dark-950/85 border border-slate-205 dark:border-dark-850/80 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group shadow-sm flex flex-col justify-between h-40`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-primary-550 dark:group-hover:text-primary-400 transition-colors">
                        {skill.name}
                      </span>
                      <Icon className={`w-5 h-5 ${skill.color} transition-transform group-hover:scale-110 duration-300`} />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-dark-900/60 mt-2">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">
                      {skill.category}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
