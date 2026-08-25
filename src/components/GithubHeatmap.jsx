import React, { useState, useMemo } from 'react';
import { GitCommit, Sparkles } from 'lucide-react';

export default function GithubHeatmap() {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 52 weeks of contributions (364 days)
  const heatmapData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    // Seeded random numbers to represent realistic commits distribution
    // High activity during project milestones (BCA exams, ShopX launch, Console Palette release)
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dayOfWeek = date.getDay();
      const monthStr = date.toLocaleString('default', { month: 'short' });
      
      // Determine contribution levels based on milestones
      const month = date.getMonth();
      const day = date.getDate();
      
      let commits = 0;
      // Milestones: ShopX Launch (March/April 2026) or Active support timeline
      if (month === 2 || month === 3) {
        commits = Math.floor(Math.random() * 8); // Peak activity
      } else if (month === 7 && day >= 10 && day <= 26) {
        commits = Math.floor(Math.random() * 10); // Custom console release peak
      } else {
        commits = Math.random() > 0.45 ? Math.floor(Math.random() * 4) : 0; // Standard activity
      }

      // Map commit counts to contribution level colors (0 to 4)
      let level = 0;
      if (commits > 0 && commits <= 2) level = 1;
      else if (commits > 2 && commits <= 4) level = 2;
      else if (commits > 4 && commits <= 6) level = 3;
      else if (commits > 6) level = 4;

      data.push({
        date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        month: monthStr,
        dayOfWeek,
        commits,
        level
      });
    }
    return data;
  }, []);

  // Compute total contributions
  const totalContributions = useMemo(() => {
    return heatmapData.reduce((acc, curr) => acc + curr.commits, 0);
  }, [heatmapData]);

  // Group by week (columns of 7 days)
  const columns = useMemo(() => {
    const cols = [];
    let currentWeek = [];
    
    heatmapData.forEach((day, idx) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || idx === heatmapData.length - 1) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });
    return cols;
  }, [heatmapData]);

  // Months label calculation (detect where month shifts)
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = '';
    
    columns.forEach((week, weekIdx) => {
      const firstDayOfMonth = week[0];
      if (firstDayOfMonth && firstDayOfMonth.month !== lastMonth) {
        labels.push({ text: firstDayOfMonth.month, colIndex: weekIdx });
        lastMonth = firstDayOfMonth.month;
      }
    });
    return labels;
  }, [columns]);

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-emerald-900/20 dark:bg-emerald-950/40 border-emerald-900/10 dark:border-emerald-500/10 text-emerald-500';
      case 2:
        return 'bg-emerald-500/30 dark:bg-emerald-500/20 border-emerald-500/20 dark:border-emerald-500/30 text-emerald-400';
      case 3:
        return 'bg-emerald-500/60 dark:bg-emerald-500/50 border-emerald-500/40 dark:border-emerald-500/50 text-emerald-250';
      case 4:
        return 'bg-emerald-500 dark:bg-emerald-400 border-emerald-500 dark:border-emerald-400 text-white';
      default:
        return 'bg-slate-100 dark:bg-dark-950 border-slate-200 dark:border-dark-850 text-slate-400';
    }
  };

  return (
    <div className="mt-12 bg-white dark:bg-dark-900/60 border border-slate-205 dark:border-dark-800 p-6 rounded-2xl shadow-sm backdrop-blur select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
          <GitCommit className="w-5 h-5 animate-pulse" />
          <h4 className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm">
            CONTRIBUTION_HEATMAP.LOG
          </h4>
        </div>
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 text-[10px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>{totalContributions.toLocaleString()} Commits in Past Year</span>
        </span>
      </div>

      {/* Grid Container (Scrollable horizontally on mobile) */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="min-w-[680px] pr-2">
          {/* Months label row */}
          <div className="flex pl-8 mb-2 h-4 relative">
            {monthLabels.map((lbl, idx) => (
              <span 
                key={idx}
                className="absolute text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest"
                style={{ left: `${lbl.colIndex * 12 + 32}px` }}
              >
                {lbl.text}
              </span>
            ))}
          </div>

          <div className="flex">
            {/* Days of week labels */}
            <div className="flex flex-col justify-between text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 pr-2 h-[84px] py-1 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Heatmap Grid columns */}
            <div className="flex flex-1 gap-[2px]">
              {columns.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[2px]">
                  {week.map((day, rowIdx) => (
                    <div
                      key={rowIdx}
                      onMouseEnter={() => setHoveredCell(day)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-[10px] h-[10px] rounded-[2px] border transition-all duration-100 ${getLevelColor(day.level)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-dark-850 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold">
        <div className="text-left font-sans font-medium capitalize text-slate-500 dark:text-slate-400">
          {hoveredCell ? (
            <span className="flex items-center gap-1.5 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
              <strong>{hoveredCell.commits} commits</strong> on {hoveredCell.date}
            </span>
          ) : (
            <span>Hover over a grid square to view commit details.</span>
          )}
        </div>
        
        {/* Legend */}
        <div className="flex items-center space-x-1">
          <span>Less</span>
          <div className="w-[10px] h-[10px] rounded-[2px] border border-slate-200 dark:border-dark-850 bg-slate-100 dark:bg-dark-950" />
          <div className="w-[10px] h-[10px] rounded-[2px] border border-emerald-500/10 dark:border-emerald-500/10 bg-emerald-500/10 dark:bg-emerald-500/10" />
          <div className="w-[10px] h-[10px] rounded-[2px] border border-emerald-500/20 dark:border-emerald-500/30 bg-emerald-500/30 dark:bg-emerald-500/20" />
          <div className="w-[10px] h-[10px] rounded-[2px] border border-emerald-500/40 dark:border-emerald-500/50 bg-emerald-500/60 dark:bg-emerald-500/50" />
          <div className="w-[10px] h-[10px] rounded-[2px] border border-emerald-500 dark:border-emerald-400 bg-emerald-500 dark:bg-emerald-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
