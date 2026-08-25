import React, { useState } from 'react';
import { ShoppingBag, ArrowUpRight, CheckCircle2, GitBranch, Activity, Layout, X, Terminal } from 'lucide-react';

export default function Projects() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const featuredProject = {
    title: 'ShopX Storefront',
    subtitle: 'Modern React E-Commerce Platform',
    desc: 'ShopX is a modern e-commerce storefront designed for seamless shopping experiences. Built from the ground up using React.js and Tailwind CSS, it features a fluid grid layout, interactive product cards, a dynamic shopping cart state management system, and custom animations.',
    liveLink: 'https://shopx-hw9h-g7ns5z7l7-a-de03.vercel.app/',
    gitLink: 'https://github.com/yr892024-spec/shopx',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    highlights: [
      'Interactive shopping cart management with live item count updates.',
      'Responsive design adapting from mobile displays up to ultra-wide desktop monitors.',
      'Clean components organization utilizing modern React hooks state architecture.',
    ],
  };

  const upcomingProjects = [
    {
      title: 'ShopX Admin Dashboard',
      status: 'UNDER PROCESS',
      desc: 'An administrative control panel to manage inventories, view live order transactions metrics charts, and control client support tickets.',
      tech: ['React.js', 'Tailwind CSS', 'Chart.js', 'Context API'],
      icon: Layout,
      color: 'border-amber-500/30 text-amber-500 bg-amber-500/5',
    },
    {
      title: 'Geospatial String Profiler',
      status: 'COMING SOON',
      desc: 'A coordinate mapping tool to parse XML surveyor string coordinate datasets (XYZ alignment variables) and graph cross-section paths.',
      tech: ['React.js', 'SVG Engine', 'Node.js', 'REST Client'],
      icon: Activity,
      color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5',
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white dark:bg-dark-950 border-b border-slate-205 dark:border-dark-900/20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-grid-pattern opacity-40 pointer-events-none"></div>
      
      {/* Radial glow background */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary-500/5 blur-[120px] pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400 font-bold mb-2 font-mono">// PORTFOLIO: RELEASES</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Featured Projects</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Flagship Featured Project */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-slate-900 border border-slate-800 dark:border-dark-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Window Bar */}
              <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-850 dark:border-dark-850">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider font-bold">shopx-storefront</span>
                <a 
                  href={featuredProject.liveLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Shop Mock Screen */}
              <div className="p-6 bg-slate-950 font-sans text-slate-205 h-80 flex flex-col justify-between select-none">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-black bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">ShopX</span>
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400">
                      <span>Products</span>
                      <span>About</span>
                      <span className="relative">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="absolute -top-1.5 -right-1.5 bg-primary-500 text-dark-950 font-bold rounded-full w-3 h-3 flex items-center justify-center text-[7px]">2</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 font-bold">New Collection 2026</span>
                    <h4 className="text-2xl font-black text-white leading-tight">Everything you need.<br/>All in one place.</h4>
                    <p className="text-[10px] text-slate-400 max-w-xs">Discover premium products, exclusive deals and everyday essentials. Enjoy simple, secure checkout.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 dark:border-dark-900 pt-4 mt-4">
                  <div className="flex space-x-2 text-[9px]">
                    <span className="px-3 py-1.5 bg-primary-500 text-dark-950 font-bold rounded-md">Shop Now</span>
                    <span className="px-3 py-1.5 bg-dark-900 border border-dark-800 rounded-md">Explore</span>
                  </div>
                  <div className="text-right text-[10px] text-slate-500">
                    Deployed at Vercel
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-primary-605 dark:text-primary-400 uppercase">
                <ShoppingBag className="w-4 h-4 mr-1 text-primary-500" />
                Featured E-Commerce App
              </span>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {featuredProject.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-xs">{featuredProject.subtitle}</p>
            </div>

            <p className="text-slate-650 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {featuredProject.desc}
            </p>

            <ul className="space-y-3">
              {featuredProject.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-655 dark:text-slate-350">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2">
              {featuredProject.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-lg text-slate-700 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={featuredProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-white dark:text-dark-950 bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 hover:from-primary-450 hover:to-accent-450 dark:hover:from-primary-300 dark:hover:to-accent-300 rounded-xl transition-all shadow-sm cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Launch Live Storefront
                <ArrowUpRight className="ml-1.5 w-4 h-4" />
              </a>

              <a
                href={featuredProject.gitLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-205 bg-slate-200 hover:bg-slate-250 dark:bg-dark-900 dark:hover:bg-dark-850 border border-slate-300 dark:border-dark-800 rounded-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Browse Code
              </a>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-205 bg-slate-200 hover:bg-slate-250 dark:bg-dark-900 dark:hover:bg-dark-805 border border-slate-300 dark:border-dark-800 rounded-xl transition-all cursor-pointer transform hover:-translate-y-0.5 font-mono"
              >
                <Terminal className="mr-1.5 w-4 h-4 text-primary-500" />
                view_schema();
              </button>
            </div>
          </div>
        </div>

        {/* Pipeline / Under Construction Projects */}
        <div>
          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-105 mb-6 font-mono flex items-center">
            <GitBranch className="w-5 h-5 text-primary-500 mr-2" />
            // DEVELOPER_PIPELINE
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingProjects.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-dark-900/60 border border-slate-200 dark:border-dark-800 rounded-2xl p-6 shadow-sm backdrop-blur hover:border-primary-500/40 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-dark-850 rounded-xl text-primary-600 dark:text-primary-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${item.color}`}>
                      {item.status}
                    </span>
                  </div>

                  <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h5>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{item.desc}</p>

                  <div className="flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-dark-900/60 pt-4">
                    {item.tech.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[9px] font-mono font-bold px-2 py-0.5 bg-slate-50 dark:bg-dark-950 border border-slate-150 dark:border-dark-850 rounded text-slate-500 dark:text-slate-455"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Project Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-dark-900 border border-slate-205 dark:border-dark-800 max-w-3xl w-full rounded-2xl shadow-2xl p-6 relative flex flex-col max-h-[90vh]">
            
            {/* Close Trigger */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-primary-655 dark:text-primary-400 mb-4 border-b border-slate-100 dark:border-dark-850 pb-4">
              <Terminal className="w-5 h-5 text-accent-500" />
              <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm">PROJECT_ARCH_LOGS: SHOPX_STOREFRONT.MD</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {/* Section 1: Overview */}
              <div>
                <h5 className="text-xs font-bold font-mono text-primary-600 dark:text-primary-400 mb-2 border-l-2 border-primary-500 pl-2 uppercase tracking-wider">// System Overview</h5>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  ShopX is structured with modular component scopes. State logic utilizes standard React Context wrappers to maintain consistent indices across catalogs, item counters, details viewports, and checkout panels.
                </p>
              </div>

              {/* Section 2: Mock Database Schema */}
              <div>
                <h5 className="text-xs font-bold font-mono text-primary-600 dark:text-primary-400 mb-2.5 border-l-2 border-primary-500 pl-2 uppercase tracking-wider">// Database Schema Mockup</h5>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-450 font-mono text-xs overflow-x-auto select-text">
                  <pre className="text-left text-slate-200 leading-relaxed">
{`Table: products
  - id          : SERIAL PRIMARY KEY
  - title       : VARCHAR(255) NOT NULL
  - price       : NUMERIC(10, 2) NOT NULL
  - category    : VARCHAR(100)
  - image_url   : TEXT
  - stock_qty   : INTEGER DEFAULT 50

Table: order_items
  - order_id    : INTEGER REFERENCES orders(id)
  - product_id  : INTEGER REFERENCES products(id)
  - quantity    : INTEGER NOT NULL
  - unit_price  : NUMERIC(10, 2)`}
                  </pre>
                </div>
              </div>

              {/* Section 3: Router Endpoints */}
              <div>
                <h5 className="text-xs font-bold font-mono text-primary-600 dark:text-primary-400 mb-2.5 border-l-2 border-primary-500 pl-2 uppercase tracking-wider">// API Router Mapping</h5>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-450 font-mono text-xs overflow-x-auto select-text">
                  <pre className="text-left text-slate-200 leading-relaxed">
{`[GET]     /api/products             # Retrieve complete inventory catalog
[GET]     /api/products/:id         # Query single item specs by serial ID
[POST]    /api/cart/checkout        # Post checkout token values & process orders
[GET]     /api/admin/metrics        # Audit sales metrics indices (Under Process)`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-105 dark:border-dark-850 pt-4 mt-6 flex justify-end">
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-dark-850 dark:hover:bg-dark-800 text-white rounded-xl font-bold font-mono text-xs cursor-pointer shadow-md"
              >
                close_viewer();
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
