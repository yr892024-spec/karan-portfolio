import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';

const TEST_CASES = [
  { suite: 'src/tests/App.test.jsx', label: 'Verify light/dark system theme toggles', time: '14ms' },
  { suite: 'src/tests/Navbar.test.jsx', label: 'Validate floating capsule navigation offsets', time: '8ms' },
  { suite: 'src/tests/Hero.test.jsx', label: 'Verify terminal code tab viewport swapping', time: '18ms' },
  { suite: 'src/tests/GpaDecryptor.test.jsx', label: 'Test credential passcode validations for GPA locks', time: '22ms' },
  { suite: 'src/tests/ContactFormSubmit.test.jsx', label: 'Validate Web3Forms API fallback redirects', time: '35ms' },
  { suite: 'src/tests/TailwindLayouts.test.jsx', label: 'Audit responsive container style classes integrity', time: '11ms' },
];

export default function TestSuiteSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTests, setActiveTests] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const startTestRunner = () => {
    setIsRunning(true);
    setProgress(0);
    setActiveTests([]);
    setIsDone(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      // Append test suites sequentially based on progress percentage
      const indexToLoad = Math.floor((currentProgress / 100) * TEST_CASES.length);
      if (indexToLoad > activeTests.length && indexToLoad <= TEST_CASES.length) {
        setActiveTests(TEST_CASES.slice(0, indexToLoad));
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        setIsDone(true);
        setActiveTests(TEST_CASES); // Load all
      }
    }, 45); // Run duration ~2.2s

    return () => clearInterval(interval);
  }, [isRunning, activeTests.length]);

  return (
    <div className="mt-8 bg-slate-950 border border-dark-800 p-6 rounded-2xl shadow-2xl font-mono text-xs text-slate-300 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-dark-900 pb-4">
        <div className="flex items-center space-x-2 text-primary-400">
          <Terminal className="w-5 h-5" />
          <h4 className="font-bold uppercase tracking-wider text-xs sm:text-sm">
            VITEST_AUTOMATED_TEST_RUNNER
          </h4>
        </div>
        
        <button
          onClick={startTestRunner}
          disabled={isRunning}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-450 hover:to-accent-450 text-dark-950 font-bold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isDone ? 'Re-Run Test Suite' : 'Run Vitest Suite'}</span>
        </button>
      </div>

      {/* Terminal View */}
      <div className="bg-dark-950/80 p-4 rounded-xl min-h-60 border border-dark-900/60 flex flex-col justify-between text-left space-y-4">
        {/* Idle state */}
        {!isRunning && !isDone && (
          <div className="text-slate-500 py-12 text-center">
            $ npm run test --env=production
            <br />
            <span className="block mt-2 text-[10px] uppercase font-bold tracking-widest text-slate-600">
              Click the button above to simulate automated pipeline audits.
            </span>
          </div>
        )}

        {/* Running / Done Terminal log */}
        {(isRunning || isDone) && (
          <div className="space-y-2.5">
            {activeTests.map((t, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-dark-900/40 pb-1.5 gap-1.5">
                <div className="flex items-start sm:items-center gap-2">
                  <span className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[9px]">
                    PASS
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="font-bold text-slate-200">{t.suite}</span>
                    <span className="text-[10px] text-slate-500 font-sans">{t.label}</span>
                  </div>
                </div>
                <span className="text-slate-500 text-[10px] font-bold sm:text-right">{t.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Progress Bar & Summary */}
        {isRunning && (
          <div className="space-y-1.5 pt-2 border-t border-dark-900">
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>EXECUTING TEST SUITES...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Done Summary Log */}
        {isDone && (
          <div className="pt-4 border-t border-dark-900 space-y-2 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="block text-[10px] text-slate-500 font-bold">TEST SUITES</span>
                <span className="font-bold text-emerald-400">6 passed</span>, 6 total
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-bold">TEST CASES</span>
                <span className="font-bold text-emerald-400">24 passed</span>, 24 total
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-bold">SNAPSHOTS</span>
                <span className="text-slate-500">0 total</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-bold">TEST DURATION</span>
                <span className="font-bold text-emerald-400">0.72s</span>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/10 rounded-xl flex items-start space-x-2 text-[11px] text-emerald-400 leading-relaxed font-sans mt-3">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Pipeline Verified:</strong> Vitest suite completed successfully. All components (React Hooks, layout responsiveness, passcode decryptions, Web3Forms endpoints) are fully functional.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
