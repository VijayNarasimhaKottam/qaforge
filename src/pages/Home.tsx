import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, FormInput, Table, ShieldAlert, Sliders, Move, LogIn, ShoppingBag, Zap, Map, Terminal, CheckCircle2, ArrowRight, Eye
} from 'lucide-react';
import { useCheatSheet } from '../context/CheatSheetContext';

export const Home: React.FC = () => {
  const { cheatSheetActive, toggleCheatSheet } = useCheatSheet();

  const categories = [
    {
      id: 'card-elements',
      path: '/elements',
      title: 'Module 0: Standard Web Elements',
      icon: Box,
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
      badge: 'DemoQA Elements',
      description: 'Text Box, Checkbox trees, Radio buttons, Context clicks (double/right click), API call triggers, broken images (404), file download/upload, and 5s dynamic properties.'
    },
    {
      id: 'card-forms',
      path: '/forms',
      title: 'Module 1: Form Fields',
      icon: FormInput,
      color: 'from-blue-500/20 to-teal-500/20 border-blue-500/30 text-blue-400',
      badge: '10+ Controls',
      description: 'Multi-field registration, custom datepicker, drag & drop file upload, signature pad, character counters, searchable tag select, client-side validation, review & submit JSON view.'
    },
    {
      id: 'card-data-grid',
      path: '/data-grid',
      title: 'Module 2: Data Grid & Tables',
      icon: Table,
      color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400',
      badge: '500 Records',
      description: 'Server-paginated employee directory table, column sorting & filtering, inline row editing, bulk selection action bar, CSV export download, and 2.5s slow network simulator.'
    },
    {
      id: 'card-dialogs',
      path: '/dialogs',
      title: 'Module 3: Dialogs & Frames',
      icon: ShieldAlert,
      color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400',
      badge: 'Native & Modals',
      description: 'Native browser alerts/confirms/prompts, custom delete confirm modals, nested modals, scrollable form modals, popup windows, same-origin & nested iframe counters, auto-dismiss toasts.'
    },
    {
      id: 'card-widgets',
      path: '/widgets',
      title: 'Module 4: Interactive Widgets',
      icon: Sliders,
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      badge: 'Rich Controls',
      description: 'Accordions, tab switchers, collapsible file explorer tree view, debounced search autocomplete, slider, star rating, color picker, 3-step wizard, hover/click tooltips, infinite scroll list.'
    },
    {
      id: 'card-interactions',
      path: '/interactions',
      title: 'Module 5: Drag, Drop & Canvas',
      icon: Move,
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
      badge: 'Kanban & Canvas',
      description: '3-column Drag & Drop Kanban board, resizable panel splitter, resizable modal, sortable list with JSON array output, HTML5 canvas drawing pad with clear and undo history.'
    },
    {
      id: 'card-[#login]',
      path: '/login',
      title: 'Module 6: Auth & Accounts',
      icon: LogIn,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      badge: 'JWT Auth',
      description: 'JWT session login/logout/register, quick-fill credentials, session token inspector, active user profile editing, avatar cropping, and role authorization (User vs. Admin).'
    },
    {
      id: 'card-store',
      path: '/store',
      title: 'Module 7: E-Commerce Mini Store',
      icon: ShoppingBag,
      color: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400',
      badge: 'Store & Checkout',
      description: 'Product catalog grid, search & category filtering, shopping cart drawer with quantity steppers, live price recalculations, payment success/failure simulation toggle, and admin inventory management.'
    },
    {
      id: 'card-challenges',
      path: '/challenges',
      title: 'Module 8: Locator Challenges',
      icon: Zap,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
      badge: 'Advanced QA',
      description: 'Dynamic changing IDs, random 1-4s delayed activation buttons, Web Component Shadow DOM element, 30% flaky click button (testing retry logic), obscured element tooltips.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d1527] to-slate-900 border border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Playwright & Selenium Automation Sandbox</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Master E2E Automation Testing on <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">QAForge</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            QAForge is a purpose-built playground featuring realistic web components, stable <code className="text-teal-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">data-testid</code> attributes, simulated network latency, shadow DOM controls, and locator challenges.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={toggleCheatSheet}
              data-testid="hero-toggle-cheat-sheet"
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/25 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>{cheatSheetActive ? 'Hide Selector Badges' : 'Toggle Selector Cheat Sheet'}</span>
            </button>
            <Link
              to="/sitemap"
              data-testid="hero-view-sitemap"
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Map className="w-4 h-4 text-teal-400" />
              <span>View Full Sitemap & Selectors</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Start Code Snippet Banner */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            Ready for Playwright `page.locator()` practice
          </h3>
          <p className="text-xs text-slate-400">
            Target local URL <code className="text-teal-300 font-mono">http://localhost:3000</code> or run included test suite.
          </p>
        </div>
        <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 flex items-center gap-3">
          <span className="text-slate-500">$</span>
          <span>npx playwright test</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Practice Category Modules</h2>
            <p className="text-xs text-slate-400 mt-1">Select a playground module below to inspect elements and run automation scripts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.path}
                data-testid={cat.id}
                className="group relative bg-[#0f172a] hover:bg-[#131d33] border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-teal-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br border ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Playground</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
};
