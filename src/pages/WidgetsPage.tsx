import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  Sliders, ChevronDown, ChevronRight, Folder, File, Search, Star, Info, Check, ArrowRight, ArrowLeft, HelpCircle
} from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../data/mockData';

export const WidgetsPage: React.FC = () => {
  // Accordion State
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  // Tabs State
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security'>('profile');

  // Tree View State
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({
    'src': true,
    'src/components': true,
  });

  const toggleTreeNode = (path: string) => {
    setExpandedNodes((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  // Autocomplete State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(() => {
      const filtered = MOCK_PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Range Slider, Star Rating, Color Picker State
  const [sliderValue, setSliderValue] = useState<number>(75);
  const [starRating, setStarRating] = useState<number>(4);
  const [pickedColor, setPickedColor] = useState<string>('#14b8a6');

  // Wizard Stepper State
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardName, setWizardName] = useState('');
  const [wizardPlan, setWizardPlan] = useState('pro');

  // Tooltip & Popover States
  const [hoverTooltipVisible, setHoverTooltipVisible] = useState(false);
  const [clickPopoverVisible, setClickPopoverVisible] = useState(false);

  // Infinite Scroll & Load More State
  const [visibleProductCount, setVisibleProductCount] = useState(3);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      if (visibleProductCount < MOCK_PRODUCTS.length) {
        setVisibleProductCount((prev) => Math.min(prev + 2, MOCK_PRODUCTS.length));
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl space-y-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Sliders className="w-3.5 h-3.5" />
            <span>Module 4 — Interactive Controls & Components</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Interactive UI Widgets</h1>
          <p className="text-xs text-slate-400">
            Practice tree navigation, debounced autocomplete, slider dragging, rating selection, wizard step validation, hover vs. click popovers, and infinite scrolling.
          </p>
        </div>

        {/* Grid Layout 1: Accordion & Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Custom Accordion */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
              1. Custom Accordion Component
            </h3>

            <div className="space-y-2 font-mono text-xs">
              {/* Accordion Item 1 */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
                <button
                  data-testid="accordion-header-1"
                  onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                  className="w-full px-4 py-3 text-left font-bold text-slate-200 flex items-center justify-between hover:bg-slate-800/50"
                >
                  <span>Playwright Selector Engine Docs</span>
                  <ChevronDown className={`w-4 h-4 text-teal-400 transition-transform ${openAccordion === 1 ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 1 && (
                  <div data-testid="accordion-content-1" className="p-4 bg-slate-950 text-slate-400 text-[11px] leading-relaxed border-t border-slate-800">
                    Playwright recommends using user-facing attributes like <code className="text-teal-300">getByRole()</code> or explicit <code className="text-teal-300">data-testid</code> locators for resilience.
                  </div>
                )}
              </div>

              {/* Accordion Item 2 */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
                <button
                  data-testid="accordion-header-2"
                  onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                  className="w-full px-4 py-3 text-left font-bold text-slate-200 flex items-center justify-between hover:bg-slate-800/50"
                >
                  <span>Auto-Waiting & Retry Logic</span>
                  <ChevronDown className={`w-4 h-4 text-teal-400 transition-transform ${openAccordion === 2 ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 2 && (
                  <div data-testid="accordion-content-2" className="p-4 bg-slate-950 text-slate-400 text-[11px] leading-relaxed border-t border-slate-800">
                    Playwright automatically waits for elements to become visible, enabled, and stable before performing actions.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Custom Tabs */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
              2. Custom Tab Switcher
            </h3>

            <div className="flex border-b border-slate-800 gap-2 font-mono text-xs">
              <button
                data-testid="tab-button-profile"
                onClick={() => setActiveTab('profile')}
                className={`pb-2 px-3 border-b-2 font-bold transition-colors ${
                  activeTab === 'profile'
                    ? 'border-teal-400 text-teal-300'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                Profile Tab
              </button>
              <button
                data-testid="tab-button-settings"
                onClick={() => setActiveTab('settings')}
                className={`pb-2 px-3 border-b-2 font-bold transition-colors ${
                  activeTab === 'settings'
                    ? 'border-teal-400 text-teal-300'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                Settings Tab
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 min-h-[80px]">
              {activeTab === 'profile' && (
                <div data-testid="tab-content-profile">
                  <p className="font-bold text-teal-300">Profile Tab Active</p>
                  <p className="text-[11px] text-slate-400 mt-1">User ID: QF-9921 • Role: Automation Lead</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div data-testid="tab-content-settings">
                  <p className="font-bold text-teal-300">Settings Tab Active</p>
                  <p className="text-[11px] text-slate-400 mt-1">Environment: Local Headless Chromium</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Grid Layout 2: Tree View & Debounced Autocomplete */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Collapsible Tree View */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
              3. Collapsible File Explorer Tree View
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
              {/* Folder src */}
              <div>
                <button
                  data-testid="tree-node-src"
                  onClick={() => toggleTreeNode('src')}
                  className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold"
                >
                  {expandedNodes['src'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <Folder className="w-4 h-4 text-amber-400" />
                  <span>src</span>
                </button>

                {expandedNodes['src'] && (
                  <div className="pl-5 space-y-1 border-l border-slate-800 ml-2 mt-1">
                    {/* Folder components */}
                    <div>
                      <button
                        data-testid="tree-node-src-components"
                        onClick={() => toggleTreeNode('src/components')}
                        className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold"
                      >
                        {expandedNodes['src/components'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        <Folder className="w-4 h-4 text-amber-400" />
                        <span>components</span>
                      </button>

                      {expandedNodes['src/components'] && (
                        <div className="pl-5 space-y-1 border-l border-slate-800 ml-2 mt-1">
                          <div data-testid="tree-file-Navbar-tsx" className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer">
                            <File className="w-3.5 h-3.5 text-teal-400" />
                            <span>Navbar.tsx</span>
                          </div>
                          <div data-testid="tree-file-Sidebar-tsx" className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer">
                            <File className="w-3.5 h-3.5 text-teal-400" />
                            <span>Sidebar.tsx</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div data-testid="tree-file-App-tsx" className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer">
                      <File className="w-3.5 h-3.5 text-teal-400" />
                      <span>App.tsx</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Debounced Autocomplete */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl relative">
            <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
              4. Debounced Search Autocomplete
            </h3>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                data-testid="input-autocomplete"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g. Playwright, Keyboard)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 font-mono focus:outline-none"
              />
            </div>

            {/* Results Dropdown */}
            {searchQuery && (
              <div
                data-testid="autocomplete-dropdown"
                className="bg-[#111827] border border-slate-700 rounded-2xl p-2 font-mono text-xs shadow-2xl space-y-1 max-h-48 overflow-y-auto"
              >
                {isSearching ? (
                  <div className="p-3 text-slate-500 text-center animate-pulse">Searching simulated API (300ms delay)...</div>
                ) : searchResults.length === 0 ? (
                  <div data-testid="autocomplete-no-results" className="p-3 text-slate-500 text-center">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      data-testid={`autocomplete-item-${item.id}`}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-200 cursor-pointer flex justify-between items-center"
                    >
                      <span>{item.title}</span>
                      <span className="text-teal-400 font-bold">${item.price}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>

        {/* Grid Layout 3: Range Slider, Star Rating, Color Picker */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
            5. Sliders, Ratings & Color Picker
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Range Slider</span>
                <span data-testid="slider-value-display" className="text-teal-400 font-bold">{sliderValue}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                data-testid="range-slider"
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Star Rating */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Star Rating Widget</span>
                <span data-testid="star-rating-display" className="text-amber-400 font-bold">{starRating}/5</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    data-testid={`star-rating-${val}`}
                    onClick={() => setStarRating(val)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        val <= starRating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Color Picker</span>
                <span className="font-mono font-bold text-slate-400">{pickedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={pickedColor}
                  data-testid="input-color-picker"
                  onChange={(e) => setPickedColor(e.target.value)}
                  className="w-10 h-8 bg-transparent cursor-pointer rounded overflow-hidden"
                />
                <div
                  className="h-8 flex-1 rounded-lg border border-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-950"
                  style={{ backgroundColor: pickedColor }}
                >
                  Preview Color
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Stepper Wizard (3 steps) */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
            6. Stepper Progress Wizard (3 Steps)
          </h3>

          {/* Progress indicators */}
          <div className="flex items-center justify-between font-mono text-xs max-w-md mx-auto">
            <div data-testid="wizard-step-indicator-1" className={`flex items-center gap-2 ${wizardStep >= 1 ? 'text-teal-400 font-bold' : 'text-slate-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${wizardStep >= 1 ? 'bg-teal-500 text-slate-950' : 'bg-slate-800'}`}>1</div>
              <span>Details</span>
            </div>
            <div className="h-0.5 flex-1 bg-slate-800 mx-3" />
            <div data-testid="wizard-step-indicator-2" className={`flex items-center gap-2 ${wizardStep >= 2 ? 'text-teal-400 font-bold' : 'text-slate-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${wizardStep >= 2 ? 'bg-teal-500 text-slate-950' : 'bg-slate-800'}`}>2</div>
              <span>Plan</span>
            </div>
            <div className="h-0.5 flex-1 bg-slate-800 mx-3" />
            <div data-testid="wizard-step-indicator-3" className={`flex items-center gap-2 ${wizardStep >= 3 ? 'text-teal-400 font-bold' : 'text-slate-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${wizardStep >= 3 ? 'bg-teal-500 text-slate-950' : 'bg-slate-800'}`}>3</div>
              <span>Confirm</span>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto font-mono text-xs">
            {wizardStep === 1 && (
              <div className="space-y-3">
                <label className="block text-slate-300 font-bold">Step 1: Enter Account Name</label>
                <input
                  type="text"
                  data-testid="wizard-input-name"
                  value={wizardName}
                  onChange={(e) => setWizardName(e.target.value)}
                  placeholder="e.g. Acme Corp QA"
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:border-teal-500 focus:outline-none"
                />
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-3">
                <label className="block text-slate-300 font-bold">Step 2: Choose Automation Tier</label>
                <select
                  data-testid="wizard-select-plan"
                  value={wizardPlan}
                  onChange={(e) => setWizardPlan(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:border-teal-500 focus:outline-none"
                >
                  <option value="starter">Starter (10 Parallel Workers)</option>
                  <option value="pro">Pro (50 Parallel Workers)</option>
                  <option value="enterprise">Enterprise (Unlimited Workers)</option>
                </select>
              </div>
            )}

            {wizardStep === 3 && (
              <div data-testid="wizard-summary" className="space-y-2 text-slate-300">
                <p className="font-bold text-emerald-400">Step 3: Ready to Finish</p>
                <p>Account: <span className="text-slate-100">{wizardName || 'Not specified'}</span></p>
                <p>Selected Tier: <span className="text-teal-300 uppercase">{wizardPlan}</span></p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-800">
              <button
                type="button"
                data-testid="wizard-back-btn"
                disabled={wizardStep === 1}
                onClick={() => setWizardStep((s) => s - 1)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg disabled:opacity-40 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <button
                type="button"
                data-testid="wizard-next-btn"
                onClick={() => {
                  if (wizardStep < 3) setWizardStep((s) => s + 1);
                  else alert('Wizard completed successfully!');
                }}
                className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 shadow-md shadow-teal-500/20"
              >
                <span>{wizardStep === 3 ? 'Finish Wizard' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tooltip (Hover) vs Popover (Click) */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
            7. Hover Tooltip vs. Click Popover
          </h3>

          <div className="flex flex-wrap items-center gap-8 font-mono text-xs">
            
            {/* Hover Tooltip */}
            <div className="relative">
              <button
                data-testid="tooltip-hover-trigger"
                onMouseEnter={() => setHoverTooltipVisible(true)}
                onMouseLeave={() => setHoverTooltipVisible(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl border border-slate-700 font-bold flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-teal-400" />
                <span>Hover Over Me (page.hover())</span>
              </button>
              {hoverTooltipVisible && (
                <div data-testid="hover-tooltip-content" className="absolute left-0 bottom-full mb-2 p-2.5 bg-slate-900 border border-teal-500 text-teal-200 text-[11px] rounded-lg shadow-xl whitespace-nowrap z-20">
                  ★ Tooltip triggered by mouseover / hover!
                </div>
              )}
            </div>

            {/* Click Popover */}
            <div className="relative">
              <button
                data-testid="popover-click-trigger"
                onClick={() => setClickPopoverVisible(!clickPopoverVisible)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl border border-slate-700 font-bold flex items-center gap-2"
              >
                <Info className="w-4 h-4 text-purple-400" />
                <span>Click Me (page.click())</span>
              </button>
              {clickPopoverVisible && (
                <div data-testid="click-popover-content" className="absolute left-0 bottom-full mb-2 p-3 bg-slate-900 border border-purple-500 text-purple-200 text-[11px] rounded-lg shadow-xl w-48 z-20">
                  ★ Popover card opened by user click event.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Infinite Scroll List & Load More Variant */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
              8. Infinite Scroll Container & Load More Button
            </h3>
            <button
              data-testid="btn-load-more"
              onClick={() => setVisibleProductCount((prev) => Math.min(prev + 3, MOCK_PRODUCTS.length))}
              className="px-3.5 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
            >
              Load More Products ({visibleProductCount} / {MOCK_PRODUCTS.length})
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            data-testid="infinite-scroll-container"
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 max-h-56 overflow-y-auto space-y-3 font-mono text-xs"
          >
            {MOCK_PRODUCTS.slice(0, visibleProductCount).map((p) => (
              <div
                key={p.id}
                data-testid={`infinite-item-${p.id}`}
                className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-200">{p.title}</h4>
                  <p className="text-[11px] text-slate-500">{p.category} • Rating: {p.rating}★</p>
                </div>
                <span className="text-teal-400 font-bold">${p.price}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
