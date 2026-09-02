import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  Zap, Clock, ShieldAlert, AlertOctagon, HelpCircle, CheckCircle2, RefreshCw
} from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  // 1. Dynamic ID state
  const [dynamicId, setDynamicId] = useState(`btn-id-${Math.floor(Math.random() * 899999 + 100000)}`);
  const [dynamicClickCount, setDynamicClickCount] = useState(0);

  const regenerateDynamicId = () => {
    setDynamicId(`btn-id-${Math.floor(Math.random() * 899999 + 100000)}`);
    setDynamicClickCount((prev) => prev + 1);
  };

  // 2. Random 1-4s Delayed Button
  const [delayedEnabled, setDelayedEnabled] = useState(false);
  const [delaySeconds, setDelaySeconds] = useState(3);
  const [timerText, setTimerText] = useState('Waiting for timer...');

  const startDelayedTimer = () => {
    setDelayedEnabled(false);
    const delay = Math.floor(Math.random() * 3 + 2); // 2-4s
    setDelaySeconds(delay);
    setTimerText(`Enabling in ${delay}s...`);

    const timer = setTimeout(() => {
      setDelayedEnabled(true);
      setTimerText('Button is NOW ENABLED!');
    }, delay * 1000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    startDelayedTimer();
  }, []);

  // 3. Shadow DOM Ref
  const shadowHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = shadowHostRef.current;
    if (!host) return;

    if (!host.shadowRoot) {
      const shadow = host.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          .shadow-container {
            background: #111827;
            border: 1px solid #14b8a6;
            padding: 16px;
            border-radius: 12px;
            font-family: monospace;
            color: #5eead4;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          button {
            background: #14b8a6;
            color: #042f2e;
            border: none;
            padding: 8px 14px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
          }
          input {
            background: #0b0f19;
            border: 1px solid #374151;
            color: #fff;
            padding: 6px 10px;
            border-radius: 6px;
          }
        </style>
        <div class="shadow-container">
          <div style="font-[10px]; text-transform: uppercase;">Encapsulated Shadow DOM Root</div>
          <input type="text" id="shadow-input" placeholder="Type inside Shadow DOM..." />
          <button id="shadow-btn" onclick="let inp=document.getElementById('shadow-input'); alert('Shadow DOM input value: ' + inp.value)">
            Click Inside Shadow DOM
          </button>
        </div>
      `;
    }
  }, []);

  // 4. Flaky Click Button
  const [flakyClickCount, setFlakyClickCount] = useState(0);
  const [flakyError, setFlakyError] = useState<string | null>(null);

  const handleFlakyClick = () => {
    const isFlaky = Math.random() < 0.3; // 30% chance failure
    if (isFlaky) {
      setFlakyError('★ Flaky Click Failed! (30% random simulated failure path). Retry script.');
    } else {
      setFlakyError(null);
      setFlakyClickCount((prev) => prev + 1);
    }
  };

  // 5. Obscured / Overlapping Element
  const [bannerObscuring, setBannerObscuring] = useState(true);
  const [obscuredClickSuccess, setObscuredClickSuccess] = useState(false);

  const startObscuringTimer = () => {
    setBannerObscuring(true);
    setObscuredClickSuccess(false);
    setTimeout(() => {
      setBannerObscuring(false);
    }, 3000);
  };

  useEffect(() => {
    startObscuringTimer();
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl space-y-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Module 7 — Advanced Locator & Race Condition Challenges</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Locator & Timing Challenges</h1>
          <p className="text-xs text-slate-400">
            Advanced practice scenarios including dynamic random HTML IDs, delayed activation (<code className="text-teal-300 font-mono">waitFor</code>), shadow DOM elements, 30% flaky click retries, and obscured pointer-event targets.
          </p>
        </div>

        {/* Challenge 1: Dynamic HTML ID */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                1. Unstable Dynamic Element ID
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                The HTML <code className="text-teal-300 font-mono">id="..."</code> changes randomly on every click. Locate this button by text or role instead!
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Locator Challenge
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <div className="text-slate-400">
              Current HTML ID: <code className="text-amber-400 font-bold">{dynamicId}</code>
            </div>

            <button
              id={dynamicId}
              data-testid="dynamic-id-element"
              onClick={regenerateDynamicId}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-colors"
            >
              Click Me (Dynamic ID: {dynamicId}) — Count: {dynamicClickCount}
            </button>
          </div>
        </div>

        {/* Challenge 2: Random 1-4s Delay Button */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                2. Delayed Activation Button (1-4s Delay)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Practice <code className="text-teal-300 font-mono">page.waitForSelector()</code> or <code className="text-teal-300 font-mono">locator.waitFor()</code>.
              </p>
            </div>
            <button
              onClick={startDelayedTimer}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 font-mono text-xs rounded-lg border border-slate-700"
            >
              Restart Delay Timer
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <div className="text-slate-400">
              Status: <span className={delayedEnabled ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{timerText}</span>
            </div>

            <button
              disabled={!delayedEnabled}
              data-testid="btn-delayed-enable"
              onClick={() => alert('Delayed button clicked successfully!')}
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl disabled:opacity-30 disabled:hover:bg-teal-500 shadow-lg shadow-teal-500/20 transition-all"
            >
              {delayedEnabled ? '★ Active Clickable Button' : 'Disabled (Waiting...)'}
            </button>
          </div>
        </div>

        {/* Challenge 3: Shadow DOM Web Component */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div>
            <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              3. Web Component Shadow DOM Host
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Controls inside Shadow Root require locator piercing (e.g. Playwright automatically pierces shadow DOM roots).
            </p>
          </div>

          <div data-testid="shadow-host-component" ref={shadowHostRef} />
        </div>

        {/* Challenge 4: 30% Flaky Click Button */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div>
            <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-400" />
              4. Flaky Click Button (30% Failure Rate)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              This button intentionally ignores ~30% of clicks. Use Playwright test retry logic or custom retry loops.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <button
              data-testid="btn-flaky-click"
              onClick={handleFlakyClick}
              className="px-4 py-2.5 bg-red-500 hover:bg-red-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-red-500/20 transition-colors"
            >
              Click Flaky Button — Successful Clicks: {flakyClickCount}
            </button>

            {flakyError && (
              <div data-testid="flaky-error-msg" className="p-3 bg-red-950/90 border border-red-500/50 text-red-300 rounded-xl font-bold">
                {flakyError}
              </div>
            )}
          </div>
        </div>

        {/* Challenge 5: Obscured / Overlapping Target */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                5. Obscured / Overlapping Element Target
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                A floating alert overlay covers the target button for 3 seconds before auto-dismissing.
              </p>
            </div>
            <button
              onClick={startObscuringTimer}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs rounded-lg border border-slate-700"
            >
              Reset Obscuring Overlay
            </button>
          </div>

          <div className="relative bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs min-h-[100px] flex items-center justify-center">
            
            {/* Target Button */}
            <button
              data-testid="btn-obscured-target"
              onClick={() => setObscuredClickSuccess(true)}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20"
            >
              {obscuredClickSuccess ? '★ Target Clicked Successfully!' : 'Target Button Below Banner'}
            </button>

            {/* Overlapping Obscuring Banner */}
            {bannerObscuring && (
              <div
                data-testid="obscuring-overlay-banner"
                className="absolute inset-0 bg-amber-950/95 border border-amber-500 rounded-2xl flex items-center justify-center text-amber-200 font-bold z-20 animate-pulse"
              >
                ⚠️ Temporary Obscuring Tooltip Banner (Auto-dismisses in 3s)
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};
