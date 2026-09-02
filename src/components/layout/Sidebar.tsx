import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, FormInput, Table, ShieldAlert, Sliders, Move, LogIn, ShoppingBag, Zap, Map, FileCode2 } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const modules = [
    { path: '/elements', label: 'Web Elements', icon: Box, id: 'sidebar-elements' },
    { path: '/forms', label: 'Form Fields', icon: FormInput, id: 'sidebar-forms' },
    { path: '/data-grid', label: 'Tables & Data Grid', icon: Table, id: 'sidebar-data-grid' },
    { path: '/dialogs', label: 'Dialogs & Frames', icon: ShieldAlert, id: 'sidebar-dialogs' },
    { path: '/widgets', label: 'Interactive Widgets', icon: Sliders, id: 'sidebar-widgets' },
    { path: '/interactions', label: 'Drag, Drop & Canvas', icon: Move, id: 'sidebar-interactions' },
    { path: '/login', label: 'Auth & Accounts', icon: LogIn, id: 'sidebar-login' },
    { path: '/store', label: 'Mini Store App', icon: ShoppingBag, id: 'sidebar-store' },
    { path: '/challenges', label: 'Locator Challenges', icon: Zap, id: 'sidebar-challenges', badge: 'Advanced' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0d1322] border-r border-slate-800/80 min-h-[calc(100vh-4rem)] p-4 hidden md:block">
      <div className="mb-6 px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
          <FileCode2 className="w-3.5 h-3.5 text-teal-400" />
          Test Modules
        </h3>
        <p className="text-[11px] text-slate-500 mt-1">Playground modules for locator practice</p>
      </div>

      <nav className="space-y-1">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <NavLink
              key={m.path}
              to={m.path}
              data-testid={m.id}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-teal-500/5 text-teal-300 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 opacity-80" />
                <span>{m.label}</span>
              </div>
              {m.badge && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {m.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-slate-800/80 px-3">
        <h4 className="text-[11px] font-mono uppercase text-slate-500 font-bold mb-2">Automation Help</h4>
        <NavLink
          to="/sitemap"
          data-testid="sidebar-sitemap"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-teal-400 py-1.5 transition-colors"
        >
          <Map className="w-3.5 h-3.5 text-teal-400" />
          <span>Selector Directory</span>
        </NavLink>
        <NavLink
          to="/api-docs"
          data-testid="sidebar-api-docs"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 py-1.5 transition-colors"
        >
          <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Mock REST API</span>
        </NavLink>
      </div>
    </aside>
  );
};
