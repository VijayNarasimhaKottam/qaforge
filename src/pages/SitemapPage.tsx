import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  MapPin, Search, Copy, Check, Filter, ExternalLink, Code
} from 'lucide-react';
import { SITEMAP_SELECTORS, SelectorEntry } from '../data/sitemapData';
import { Link } from 'react-router-dom';

export const SitemapPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const modulesList = ['All', 'Global', 'Module 1: Forms', 'Module 2: Data Grid', 'Module 3: Dialogs', 'Module 4: Widgets', 'Module 5: Interactions', 'Module 6: Store', 'Module 7: Challenges'];

  const filteredSelectors = useMemo(() => {
    return SITEMAP_SELECTORS.filter((item) => {
      const matchesSearch =
        item.testId.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.route.toLowerCase().includes(search.toLowerCase());
      const matchesModule = moduleFilter === 'All' || item.module === moduleFilter;
      return matchesSearch && matchesModule;
    });
  }, [search, moduleFilter]);

  const copyPlaywrightCode = (testId: string) => {
    const code = `page.getByTestId('${testId}')`;
    navigator.clipboard.writeText(code);
    setCopiedId(testId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-7xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Selector Directory & Answer Key</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">QAForge Locator Sitemap</h1>
          <p className="text-xs text-slate-400">
            Complete index of all <code className="text-teal-300 font-mono">data-testid</code> attributes across all 7 practice modules. Click any item to copy Playwright locator code.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                data-testid="sitemap-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search selector, description..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono"
              />
            </div>

            <select
              data-testid="sitemap-module-filter"
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 font-mono focus:border-teal-500 focus:outline-none"
            >
              {modulesList.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-teal-400 font-bold">{filteredSelectors.length}</span> of {SITEMAP_SELECTORS.length} locators
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#111827] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Module</th>
                  <th className="p-3">Route</th>
                  <th className="p-3">data-testid Locator</th>
                  <th className="p-3">Control Type</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Stability</th>
                  <th className="p-3 text-right">Copy Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredSelectors.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-slate-300 text-[11px]">{entry.module}</td>
                    <td className="p-3">
                      <Link to={entry.route} className="text-teal-400 hover:underline inline-flex items-center gap-1">
                        <span>{entry.route}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                    <td className="p-3">
                      <code className="text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-slate-800 font-bold">
                        {entry.testId}
                      </code>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                        {entry.elementType}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px] max-w-xs">{entry.description}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          entry.stable
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {entry.stable ? 'Stable' : 'Dynamic/Quirk'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => copyPlaywrightCode(entry.testId)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-teal-300 rounded-lg text-[11px] transition-colors inline-flex items-center gap-1"
                        title="Copy Playwright code snippet"
                      >
                        {copiedId === entry.testId ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};
