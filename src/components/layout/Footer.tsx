import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, MapPin, ExternalLink, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090d16] border-t border-slate-800/80 mt-auto text-slate-400 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-teal-500 flex items-center justify-center font-mono font-bold text-slate-950 text-xs">
                QF
              </div>
              <span className="font-bold text-slate-200">QAForge Sandbox</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Designed for test automation engineers to practice Playwright, Cypress, & Selenium test automation scripting.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-slate-300 font-bold uppercase text-[11px] mb-3 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              Sitemap & Selectors
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sitemap" data-testid="footer-link-sitemap" className="hover:text-teal-300 transition-colors">
                  Interactive Selector Directory
                </Link>
              </li>
              <li>
                <Link to="/api-docs" data-testid="footer-link-api" className="hover:text-teal-300 transition-colors">
                  Playwright API Testing Endpoints
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-slate-300 font-bold uppercase text-[11px] mb-3 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Practice Modules
            </h4>
            <ul className="space-y-1 text-[11px]">
              <li><Link to="/forms" className="hover:text-slate-200">Forms & Validations</Link></li>
              <li><Link to="/data-grid" className="hover:text-slate-200">Data Grid & Filters</Link></li>
              <li><Link to="/dialogs" className="hover:text-slate-200">Modals & iFrames</Link></li>
              <li><Link to="/challenges" className="hover:text-amber-400">Locator Challenges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-slate-300 font-bold uppercase text-[11px] mb-3 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              Environment Specs
            </h4>
            <p className="text-[11px] text-slate-500 mb-2">
              All UI controls feature stable <code className="text-teal-400 bg-slate-900 px-1 py-0.5 rounded font-mono">data-testid</code> locators unless in Locator Challenges.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
              <Code className="w-3 h-3 text-teal-400" />
              <span>Base URL: http://localhost:3000</span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} QAForge — Sandbox for Automation Testing practice.</p>
          <div className="flex items-center gap-4">
            <span className="text-teal-400 font-mono">playwright.config.ts Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
