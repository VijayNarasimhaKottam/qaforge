import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  ShieldAlert, ExternalLink, Bell, AlertTriangle, CheckCircle, Info, X, Layers, Maximize2, RefreshCw
} from 'lucide-react';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
}

export const DialogsPage: React.FC = () => {
  // Native Dialog Result State
  const [nativeResult, setNativeResult] = useState<string>('No native browser dialog triggered yet.');

  // Modal States
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [parentModalOpen, setParentModalOpen] = useState(false);
  const [childModalOpen, setChildModalOpen] = useState(false);
  const [scrollModalOpen, setScrollModalOpen] = useState(false);

  // iFrame counter state (simulated inside same page for iframe srcdoc)
  const [sameOriginCount, setSameOriginCount] = useState(0);
  const [nestedCount, setNestedCount] = useState(0);

  // Toast System State
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Native Dialog Triggers
  const handleNativeAlert = () => {
    window.alert('QAForge Native Alert: Test execution paused.');
    setNativeResult('Triggered window.alert(). User dismissed alert.');
  };

  const handleNativeConfirm = () => {
    const res = window.confirm('QAForge Native Confirm: Are you sure you want to delete test suite #42?');
    setNativeResult(`Triggered window.confirm(). User selected: ${res ? 'OK (true)' : 'Cancel (false)'}`);
  };

  const handleNativePrompt = () => {
    const res = window.prompt('QAForge Native Prompt: Enter your primary automation language (e.g. TypeScript):', 'TypeScript');
    setNativeResult(`Triggered window.prompt(). Input response: "${res ?? 'Cancelled'}"`);
  };

  // Toast Helper
  const addToast = (type: 'success' | 'error' | 'warning', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastItem = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // iFrame srcdoc html strings
  const sameOriginIframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: monospace; background: #0b0f19; color: #5eead4; padding: 15px; text-align: center; margin: 0; }
          button { background: #14b8a6; color: #042f2e; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; }
          button:hover { background: #2dd4bf; }
        </style>
      </head>
      <body>
        <h4 style="margin: 0 0 10px 0; font-size: 13px;">Frame 1 — Same Origin iFrame</h4>
        <button id="iframe-btn" data-testid="iframe-counter-btn" onclick="let c=document.getElementById('cnt'); c.innerText=parseInt(c.innerText)+1;">
          Click Frame Counter: <span id="cnt">0</span>
        </button>
      </body>
    </html>
  `;

  const nestedIframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: monospace; background: #111827; color: #f59e0b; padding: 10px; margin: 0; }
        </style>
      </head>
      <body>
        <div style="font-size: 11px; margin-bottom: 8px;">Outer iFrame Container</div>
        <iframe srcdoc="
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: monospace; background: #0b0f19; color: #38bdf8; padding: 10px; text-align: center; margin: 0; }
                button { background: #0284c7; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; }
              </style>
            </head>
            <body>
              <div style='font-size:10px; margin-bottom:6px;'>Nested Inner iFrame</div>
              <button data-testid='nested-iframe-counter-btn' onclick='let c=document.getElementById(&quot;ncnt&quot;); c.innerText=parseInt(c.innerText)+1;'>
                Inner Counter: <span id='ncnt'>0</span>
              </button>
            </body>
          </html>
        " style="width: 100%; height: 90px; border: 1px dashed #374151; border-radius: 8px;"></iframe>
      </body>
    </html>
  `;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Module 3 — Dialogs, Windows, iFrames & Toast System</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Dialogs, Popups, Frames & Notifications</h1>
          <p className="text-xs text-slate-400">
            Practice Playwright <code className="text-teal-300 font-mono">page.on('dialog')</code> event handlers, frame context switching (<code className="text-teal-300 font-mono">page.frameLocator()</code>), multi-tab popup contexts, and auto-dismissing toasts.
          </p>
        </div>

        {/* Section 1: Native Browser Dialogs */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            1. Native Browser Dialog Triggers
          </h2>
          <p className="text-xs text-slate-400">
            Test Playwright dialog listeners (<code className="text-teal-300 font-mono">dialog.accept()</code>, <code className="text-teal-300 font-mono">dialog.dismiss()</code>).
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              data-testid="btn-trigger-alert"
              onClick={handleNativeAlert}
              className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Trigger window.alert()
            </button>
            <button
              data-testid="btn-trigger-confirm"
              onClick={handleNativeConfirm}
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Trigger window.confirm()
            </button>
            <button
              data-testid="btn-trigger-prompt"
              onClick={handleNativePrompt}
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Trigger window.prompt()
            </button>
          </div>

          <div data-testid="native-result-text" className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-slate-500">Dialog Output:</span> {nativeResult}
          </div>
        </div>

        {/* Section 2: Custom Modals */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            2. Custom Non-Native React Modals
          </h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              data-testid="btn-open-confirm-modal"
              onClick={() => setConfirmModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Open Confirm-Delete Modal
            </button>
            <button
              data-testid="btn-open-parent-modal"
              onClick={() => setParentModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Open Nested Modal (Parent & Child)
            </button>
            <button
              data-testid="btn-open-scroll-modal"
              onClick={() => setScrollModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Open Scrollable Region Modal
            </button>
          </div>
        </div>

        {/* Section 3: Multi-Tab & Popup Windows */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            3. Multi-Tab & Window Contexts
          </h2>
          <p className="text-xs text-slate-400">
            Practice <code className="text-teal-300 font-mono">context.waitForEvent('page')</code> and popup window handling.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/sitemap"
              target="_blank"
              rel="noreferrer"
              data-testid="link-open-tab"
              className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-mono font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>Open Sitemap in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              data-testid="btn-open-popup-window"
              onClick={() => window.open('/sitemap', 'QAForgePopup', 'width=650,height=550,scrollbars=yes')}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-mono font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>Open Window Popup (650x550)</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section 4: iFrames (Same-origin & Nested) */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            4. iFrames & Frame Context Switching
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-mono font-semibold text-slate-300 mb-2">
                Same-Origin iFrame (<code className="text-teal-400">iframe-same-origin</code>)
              </h4>
              <iframe
                data-testid="iframe-same-origin"
                srcDoc={sameOriginIframeHtml}
                className="w-full h-36 border border-slate-800 rounded-xl bg-slate-950"
                title="Same Origin Frame"
              />
            </div>

            <div>
              <h4 className="text-xs font-mono font-semibold text-slate-300 mb-2">
                Nested iFrame (<code className="text-teal-400">iframe-nested-outer</code>)
              </h4>
              <iframe
                data-testid="iframe-nested-outer"
                srcDoc={nestedIframeHtml}
                className="w-full h-36 border border-slate-800 rounded-xl bg-slate-950"
                title="Nested Outer Frame"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Toast Notification System */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            5. Auto-Dismissing Toast Notification System
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <button
              data-testid="btn-toast-success"
              onClick={() => addToast('success', 'Test Passed', 'Playwright test assertion verified successfully.')}
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Trigger Success Toast (4s)
            </button>
            <button
              data-testid="btn-toast-error"
              onClick={() => addToast('error', 'Assertion Failed', 'Element selector timeout exceeded 5000ms.')}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Trigger Error Toast (4s)
            </button>
            <button
              data-testid="btn-toast-warning"
              onClick={() => addToast('warning', 'Flaky Warning', 'Network latency spikes detected during fetch.')}
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-mono font-bold transition-colors"
            >
              Trigger Warning Toast (4s)
            </button>
          </div>
        </div>

        {/* Toast Stack Floating Container */}
        <div data-testid="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
          {toasts.map((t) => (
            <div
              key={t.id}
              data-testid={`toast-item-${t.id}`}
              className={`p-4 rounded-2xl border shadow-2xl flex items-start justify-between gap-3 animate-fade-in ${
                t.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                  : t.type === 'error'
                  ? 'bg-red-950/90 border-red-500/40 text-red-200'
                  : 'bg-amber-950/90 border-amber-500/40 text-amber-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {t.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />}
                {t.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />}
                {t.type === 'warning' && <Info className="w-5 h-5 text-amber-400 mt-0.5" />}
                <div>
                  <h4 className="font-mono text-xs font-bold">{t.title}</h4>
                  <p className="text-[11px] opacity-90 font-mono mt-0.5">{t.message}</p>
                </div>
              </div>
              <button onClick={() => removeToast(t.id)} className="opacity-70 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* --- Custom Modal Dialog Renderers --- */}

        {/* 1. Confirm Delete Modal */}
        {confirmModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div
              data-testid="modal-confirm-delete"
              className="bg-[#111827] border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-red-400">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-base font-bold font-mono text-slate-100">Confirm Action Deletion</h3>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Are you sure you want to delete this test artifact? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  data-testid="btn-modal-cancel"
                  onClick={() => setConfirmModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  data-testid="btn-modal-confirm-delete"
                  onClick={() => {
                    addToast('success', 'Deleted', 'Artifact removed successfully.');
                    setConfirmModalOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg shadow-red-500/20"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Parent & Nested Child Modal */}
        {parentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div
              data-testid="modal-parent"
              className="bg-[#111827] border border-purple-500/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold font-mono text-purple-300">Parent Modal Dialog</h3>
                <button onClick={() => setParentModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                This is the outer parent modal. Click the button below to launch an inner child modal.
              </p>
              <button
                data-testid="btn-open-child-modal"
                onClick={() => setChildModalOpen(true)}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Open Inner Child Modal
              </button>
            </div>
          </div>
        )}

        {/* Nested Child Modal */}
        {childModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
            <div
              data-testid="modal-child"
              className="bg-[#0b0f19] border border-teal-500 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 ring-2 ring-teal-500/30"
            >
              <h3 className="text-xs font-bold font-mono text-teal-300">★ Inner Child Modal</h3>
              <p className="text-[11px] text-slate-300 font-mono">
                Nested modal dialog rendered on top of parent.
              </p>
              <button
                data-testid="btn-close-child-modal"
                onClick={() => setChildModalOpen(false)}
                className="w-full py-2 bg-teal-500 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Close Child Modal
              </button>
            </div>
          </div>
        )}

        {/* 3. Scrollable Region Modal */}
        {scrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div
              data-testid="modal-scrollable"
              className="bg-[#111827] border border-slate-700 rounded-3xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-sm font-bold font-mono text-blue-300">Scrollable Region Modal with Form</h3>
                <button onClick={() => setScrollModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scroll region */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-mono text-xs text-slate-300">
                <p>Scrollable terms and conditions text region...</p>
                {Array.from({ length: 15 }).map((_, i) => (
                  <p key={i} className="text-slate-400">
                    Paragraph {i + 1}: Automation scripts must handle scrolling element into view before clicking checkbox.
                  </p>
                ))}
                <label className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input type="checkbox" data-testid="checkbox-modal-agree" className="rounded accent-teal-500" />
                  <span>I agree to terms & conditions</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 flex justify-end">
                <button
                  data-testid="btn-close-scroll-modal"
                  onClick={() => setScrollModalOpen(false)}
                  className="px-4 py-2 bg-blue-500 text-slate-950 font-mono font-bold text-xs rounded-xl"
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
