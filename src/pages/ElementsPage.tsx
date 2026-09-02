import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  Box, CheckSquare, Circle, MousePointerClick, ExternalLink, ImageOff, Download, Upload, Clock, Check, RefreshCw,
  ChevronRight, ChevronDown, PlusSquare, MinusSquare, Folder, FileText, HelpCircle
} from 'lucide-react';

const ALL_TREE_KEYS = [
  'home', 'desktop', 'notes', 'commands',
  'documents', 'workspace', 'react', 'angular', 'veu', 'office', 'public', 'private', 'classified', 'general',
  'downloads', 'wordFile', 'excelFile'
];

const TREE_CHILDREN: { [key: string]: string[] } = {
  home: ALL_TREE_KEYS,
  desktop: ['desktop', 'notes', 'commands'],
  documents: ['documents', 'workspace', 'react', 'angular', 'veu', 'office', 'public', 'private', 'classified', 'general'],
  workspace: ['workspace', 'react', 'angular', 'veu'],
  office: ['office', 'public', 'private', 'classified', 'general'],
  downloads: ['downloads', 'wordFile', 'excelFile'],
};

export const ElementsPage: React.FC = () => {
  // Active Sub-tab in Elements
  const [activeSubTab, setActiveSubTab] = useState<
    'textbox' | 'checkbox' | 'radio' | 'buttons' | 'tooltips' | 'links' | 'broken' | 'upload-download' | 'dynamic'
  >('textbox');

  // 1. Text Box State
  const [tbFullName, setTbFullName] = useState('');
  const [tbEmail, setTbEmail] = useState('');
  const [tbCurrentAddr, setTbCurrentAddr] = useState('');
  const [tbPermAddr, setTbPermAddr] = useState('');
  const [tbSubmittedData, setTbSubmittedData] = useState<any | null>(null);

  const handleTbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTbSubmittedData({
      fullName: tbFullName,
      email: tbEmail,
      currentAddress: tbCurrentAddr,
      permanentAddress: tbPermAddr,
    });
  };

  // Hover Tooltip States
  const [btnHoverTooltipVisible, setBtnHoverTooltipVisible] = useState(false);
  const [inputHoverTooltipVisible, setInputHoverTooltipVisible] = useState(false);
  const [linkHoverTooltipVisible, setLinkHoverTooltipVisible] = useState(false);

  // 2. Check Box State
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({
    home: true,
    desktop: true,
    documents: false,
    workspace: false,
    office: false,
    downloads: false,
  });

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    home: false,
    desktop: true,
    notes: true,
    commands: true,
    documents: false,
    workspace: false,
    react: false,
    angular: false,
    veu: false,
    office: false,
    public: false,
    private: false,
    classified: false,
    general: false,
    downloads: true,
    wordFile: true,
    excelFile: false,
  });

  const toggleExpand = (node: string) => {
    setExpandedNodes((prev) => ({ ...prev, [node]: !prev[node] }));
  };

  const expandAllTree = () => {
    setExpandedNodes({
      home: true,
      desktop: true,
      documents: true,
      workspace: true,
      office: true,
      downloads: true,
    });
  };

  const collapseAllTree = () => {
    setExpandedNodes({
      home: false,
      desktop: false,
      documents: false,
      workspace: false,
      office: false,
      downloads: false,
    });
  };

  const handleTreeCheckboxChange = (key: string, checked: boolean) => {
    setCheckedItems((prev) => {
      const next = { ...prev };

      // If item has children, update all children
      if (TREE_CHILDREN[key]) {
        TREE_CHILDREN[key].forEach((child) => {
          next[child] = checked;
        });
      } else {
        next[key] = checked;
      }

      // Re-evaluate parent states
      Object.keys(TREE_CHILDREN).forEach((parentKey) => {
        const children = TREE_CHILDREN[parentKey].filter((c) => c !== parentKey);
        const allChecked = children.every((c) => next[c]);
        next[parentKey] = allChecked;
      });

      return next;
    });
  };

  const getSelectedTreeNames = () => {
    return ALL_TREE_KEYS.filter((k) => checkedItems[k]);
  };

  // 3. Radio Button State
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

  // 4. Buttons (Double Click, Right Click, Dynamic Click) State
  const [doubleClickMsg, setDoubleClickMsg] = useState<string | null>(null);
  const [rightClickMsg, setRightClickMsg] = useState<string | null>(null);
  const [dynamicClickMsg, setDynamicClickMsg] = useState<string | null>(null);

  const handleDoubleClick = () => {
    setDoubleClickMsg('You have done a double click');
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRightClickMsg('You have done a right click');
  };

  const handleDynamicClick = () => {
    setDynamicClickMsg('You have done a dynamic click');
  };

  // 5. Links & API Response State
  const [linkResponseMsg, setLinkResponseMsg] = useState<string | null>(null);

  const triggerApiLink = (status: number, text: string) => {
    setLinkResponseMsg(`Link has responded with status ${status} and status text ${text}`);
  };

  // 6. Upload & Download State
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleDownloadSample = () => {
    const content = 'QAForge Sample Download File\nGenerated for Playwright download testing.';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sampleFile.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 7. Dynamic Properties State
  const [enableAfter5s, setEnableAfter5s] = useState(false);
  const [visibleAfter5s, setVisibleAfter5s] = useState(false);
  const [colorChanged, setColorChanged] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableAfter5s(true);
      setVisibleAfter5s(true);
      setColorChanged(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
            <Box className="w-3.5 h-3.5" />
            <span>Module 0 — Core Web Elements Playground (DemoQA Elements)</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Standard Web Elements</h1>
          <p className="text-xs text-slate-400">
            Practice basic and advanced HTML web elements inspired by DemoQA: Text Box, Checkboxes, Radio Buttons, Web Tables, Context Clicks, API Links, Broken Images, Downloads, and Dynamic 5s Properties.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
          {[
            { id: 'textbox', label: 'Text Box', icon: Box },
            { id: 'checkbox', label: 'Check Box', icon: CheckSquare },
            { id: 'radio', label: 'Radio Button', icon: Circle },
            { id: 'buttons', label: 'Buttons (Clicks)', icon: MousePointerClick },
            { id: 'tooltips', label: 'Tool Tips (Hover)', icon: HelpCircle },
            { id: 'links', label: 'Links & API Calls', icon: ExternalLink },
            { id: 'broken', label: 'Broken Links & Images', icon: ImageOff },
            { id: 'upload-download', label: 'Upload & Download', icon: Download },
            { id: 'dynamic', label: 'Dynamic Properties', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                data-testid={`subtab-${tab.id}`}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors font-bold ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- Sub-tab 1: Text Box --- */}
        {activeSubTab === 'textbox' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl max-w-2xl font-mono text-xs">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Text Box Form</h2>

            <form onSubmit={handleTbSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  data-testid="input-textbox-name"
                  value={tbFullName}
                  onChange={(e) => setTbFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  data-testid="input-textbox-email"
                  value={tbEmail}
                  onChange={(e) => setTbEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Current Address</label>
                <textarea
                  data-testid="input-textbox-current-address"
                  rows={2}
                  value={tbCurrentAddr}
                  onChange={(e) => setTbCurrentAddr(e.target.value)}
                  placeholder="123 Tech Boulevard..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-2.5 text-slate-100 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Permanent Address</label>
                <textarea
                  data-testid="input-textbox-permanent-address"
                  rows={2}
                  value={tbPermAddr}
                  onChange={(e) => setTbPermAddr(e.target.value)}
                  placeholder="456 Permanent Way..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-2.5 text-slate-100 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                data-testid="btn-submit-textbox"
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20"
              >
                Submit Text Box
              </button>
            </form>

            {tbSubmittedData && (
              <div data-testid="output-text-box" className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 space-y-1">
                <p><strong>Name:</strong> {tbSubmittedData.fullName}</p>
                <p><strong>Email:</strong> {tbSubmittedData.email}</p>
                <p><strong>Current Address:</strong> {tbSubmittedData.currentAddress}</p>
                <p><strong>Permanent Address:</strong> {tbSubmittedData.permanentAddress}</p>
              </div>
            )}
          </div>
        )}

        {/* --- Sub-tab 2: Check Box --- */}
        {activeSubTab === 'checkbox' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-200 uppercase">Tree Checkbox Directory</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid="btn-expand-all"
                  onClick={expandAllTree}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg border border-slate-700 font-bold flex items-center gap-1 text-[11px]"
                  title="Expand All Nodes"
                >
                  <PlusSquare className="w-3.5 h-3.5" />
                  <span>Expand All</span>
                </button>
                <button
                  type="button"
                  data-testid="btn-collapse-all"
                  onClick={collapseAllTree}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 font-bold flex items-center gap-1 text-[11px]"
                  title="Collapse All Nodes"
                >
                  <MinusSquare className="w-3.5 h-3.5" />
                  <span>Collapse All</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
              {/* Home Node */}
              <div>
                <div className="flex items-center gap-1.5 py-1">
                  <button
                    type="button"
                    data-testid="btn-toggle-expand-home"
                    onClick={() => toggleExpand('home')}
                    className="p-1 hover:bg-slate-800 rounded text-teal-400"
                  >
                    {expandedNodes.home ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-teal-300">
                    <input
                      type="checkbox"
                      data-testid="checkbox-home"
                      checked={checkedItems.home}
                      onChange={(e) => handleTreeCheckboxChange('home', e.target.checked)}
                      className="rounded accent-teal-500 cursor-pointer"
                    />
                    <Folder className="w-4 h-4 text-amber-400" />
                    <span>Home</span>
                  </label>
                </div>

                {/* Level 1: Home Children */}
                {expandedNodes.home && (
                  <div className="pl-6 space-y-2 border-l border-slate-800 ml-3.5 mt-1">
                    
                    {/* Desktop Node */}
                    <div>
                      <div className="flex items-center gap-1.5 py-1">
                        <button
                          type="button"
                          data-testid="btn-toggle-expand-desktop"
                          onClick={() => toggleExpand('desktop')}
                          className="p-1 hover:bg-slate-800 rounded text-teal-400"
                        >
                          {expandedNodes.desktop ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                          <input
                            type="checkbox"
                            data-testid="checkbox-desktop"
                            checked={checkedItems.desktop}
                            onChange={(e) => handleTreeCheckboxChange('desktop', e.target.checked)}
                            className="rounded accent-teal-500 cursor-pointer"
                          />
                          <Folder className="w-4 h-4 text-amber-400" />
                          <span>Desktop</span>
                        </label>
                      </div>

                      {/* Desktop Children */}
                      {expandedNodes.desktop && (
                        <div className="pl-6 space-y-1.5 border-l border-slate-800 ml-3.5 mt-1 text-slate-400">
                          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                            <input
                              type="checkbox"
                              data-testid="checkbox-notes"
                              checked={checkedItems.notes}
                              onChange={(e) => handleTreeCheckboxChange('notes', e.target.checked)}
                              className="rounded accent-teal-500 cursor-pointer"
                            />
                            <FileText className="w-3.5 h-3.5 text-teal-400" />
                            <span>Notes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                            <input
                              type="checkbox"
                              data-testid="checkbox-commands"
                              checked={checkedItems.commands}
                              onChange={(e) => handleTreeCheckboxChange('commands', e.target.checked)}
                              className="rounded accent-teal-500 cursor-pointer"
                            />
                            <FileText className="w-3.5 h-3.5 text-teal-400" />
                            <span>Commands</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Documents Node */}
                    <div>
                      <div className="flex items-center gap-1.5 py-1">
                        <button
                          type="button"
                          data-testid="btn-toggle-expand-documents"
                          onClick={() => toggleExpand('documents')}
                          className="p-1 hover:bg-slate-800 rounded text-teal-400"
                        >
                          {expandedNodes.documents ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                          <input
                            type="checkbox"
                            data-testid="checkbox-documents"
                            checked={checkedItems.documents}
                            onChange={(e) => handleTreeCheckboxChange('documents', e.target.checked)}
                            className="rounded accent-teal-500 cursor-pointer"
                          />
                          <Folder className="w-4 h-4 text-amber-400" />
                          <span>Documents</span>
                        </label>
                      </div>

                      {/* Documents Children */}
                      {expandedNodes.documents && (
                        <div className="pl-6 space-y-2 border-l border-slate-800 ml-3.5 mt-1">
                          
                          {/* WorkSpace Sub-node */}
                          <div>
                            <div className="flex items-center gap-1.5 py-0.5">
                              <button
                                type="button"
                                data-testid="btn-toggle-expand-workspace"
                                onClick={() => toggleExpand('workspace')}
                                className="p-1 hover:bg-slate-800 rounded text-teal-400"
                              >
                                {expandedNodes.workspace ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </button>
                              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-300">
                                <input
                                  type="checkbox"
                                  data-testid="checkbox-workspace"
                                  checked={checkedItems.workspace}
                                  onChange={(e) => handleTreeCheckboxChange('workspace', e.target.checked)}
                                  className="rounded accent-teal-500 cursor-pointer"
                                />
                                <Folder className="w-4 h-4 text-amber-400" />
                                <span>WorkSpace</span>
                              </label>
                            </div>

                            {expandedNodes.workspace && (
                              <div className="pl-6 space-y-1.5 border-l border-slate-800 ml-3.5 mt-1 text-slate-400">
                                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                                  <input
                                    type="checkbox"
                                    data-testid="checkbox-react"
                                    checked={checkedItems.react}
                                    onChange={(e) => handleTreeCheckboxChange('react', e.target.checked)}
                                    className="rounded accent-teal-500 cursor-pointer"
                                  />
                                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                                  <span>React</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                                  <input
                                    type="checkbox"
                                    data-testid="checkbox-angular"
                                    checked={checkedItems.angular}
                                    onChange={(e) => handleTreeCheckboxChange('angular', e.target.checked)}
                                    className="rounded accent-teal-500 cursor-pointer"
                                  />
                                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                                  <span>Angular</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                                  <input
                                    type="checkbox"
                                    data-testid="checkbox-veu"
                                    checked={checkedItems.veu}
                                    onChange={(e) => handleTreeCheckboxChange('veu', e.target.checked)}
                                    className="rounded accent-teal-500 cursor-pointer"
                                  />
                                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                                  <span>Veu</span>
                                </label>
                              </div>
                            )}
                          </div>

                          {/* Office Sub-node */}
                          <div>
                            <div className="flex items-center gap-1.5 py-0.5">
                              <button
                                type="button"
                                data-testid="btn-toggle-expand-office"
                                onClick={() => toggleExpand('office')}
                                className="p-1 hover:bg-slate-800 rounded text-teal-400"
                              >
                                {expandedNodes.office ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </button>
                              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-300">
                                <input
                                  type="checkbox"
                                  data-testid="checkbox-office"
                                  checked={checkedItems.office}
                                  onChange={(e) => handleTreeCheckboxChange('office', e.target.checked)}
                                  className="rounded accent-teal-500 cursor-pointer"
                                />
                                <Folder className="w-4 h-4 text-amber-400" />
                                <span>Office</span>
                              </label>
                            </div>

                            {expandedNodes.office && (
                              <div className="pl-6 space-y-1.5 border-l border-slate-800 ml-3.5 mt-1 text-slate-400">
                                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                                  <input
                                    type="checkbox"
                                    data-testid="checkbox-public"
                                    checked={checkedItems.public}
                                    onChange={(e) => handleTreeCheckboxChange('public', e.target.checked)}
                                    className="rounded accent-teal-500 cursor-pointer"
                                  />
                                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                                  <span>Public</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                                  <input
                                    type="checkbox"
                                    data-testid="checkbox-private"
                                    checked={checkedItems.private}
                                    onChange={(e) => handleTreeCheckboxChange('private', e.target.checked)}
                                    className="rounded accent-teal-500 cursor-pointer"
                                  />
                                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                                  <span>Private</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                                  <input
                                    type="checkbox"
                                    data-testid="checkbox-classified"
                                    checked={checkedItems.classified}
                                    onChange={(e) => handleTreeCheckboxChange('classified', e.target.checked)}
                                    className="rounded accent-teal-500 cursor-pointer"
                                  />
                                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                                  <span>Classified</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                                  <input
                                    type="checkbox"
                                    data-testid="checkbox-general"
                                    checked={checkedItems.general}
                                    onChange={(e) => handleTreeCheckboxChange('general', e.target.checked)}
                                    className="rounded accent-teal-500 cursor-pointer"
                                  />
                                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                                  <span>General</span>
                                </label>
                              </div>
                            )}
                          </div>

                        </div>
                      )}
                    </div>

                    {/* Downloads Node */}
                    <div>
                      <div className="flex items-center gap-1.5 py-1">
                        <button
                          type="button"
                          data-testid="btn-toggle-expand-downloads"
                          onClick={() => toggleExpand('downloads')}
                          className="p-1 hover:bg-slate-800 rounded text-teal-400"
                        >
                          {expandedNodes.downloads ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                          <input
                            type="checkbox"
                            data-testid="checkbox-downloads"
                            checked={checkedItems.downloads}
                            onChange={(e) => handleTreeCheckboxChange('downloads', e.target.checked)}
                            className="rounded accent-teal-500 cursor-pointer"
                          />
                          <Folder className="w-4 h-4 text-amber-400" />
                          <span>Downloads</span>
                        </label>
                      </div>

                      {/* Downloads Children */}
                      {expandedNodes.downloads && (
                        <div className="pl-6 space-y-1.5 border-l border-slate-800 ml-3.5 mt-1 text-slate-400">
                          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                            <input
                              type="checkbox"
                              data-testid="checkbox-wordFile"
                              checked={checkedItems.wordFile}
                              onChange={(e) => handleTreeCheckboxChange('wordFile', e.target.checked)}
                              className="rounded accent-teal-500 cursor-pointer"
                            />
                            <FileText className="w-3.5 h-3.5 text-teal-400" />
                            <span>Word File.doc</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
                            <input
                              type="checkbox"
                              data-testid="checkbox-excelFile"
                              checked={checkedItems.excelFile}
                              onChange={(e) => handleTreeCheckboxChange('excelFile', e.target.checked)}
                              className="rounded accent-teal-500 cursor-pointer"
                            />
                            <FileText className="w-3.5 h-3.5 text-teal-400" />
                            <span>Excel File.xlsx</span>
                          </label>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            </div>

            <div data-testid="checkbox-result-output" className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-teal-300 font-bold space-y-1">
              <span>You have selected:</span>
              <div className="text-emerald-400 font-mono text-[11px] font-normal leading-relaxed">
                {getSelectedTreeNames().join(', ') || 'None'}
              </div>
            </div>
          </div>
        )}

        {/* --- Sub-tab 3: Radio Button --- */}
        {activeSubTab === 'radio' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-md">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Radio Options</h2>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                <input
                  type="radio"
                  name="demoqa-radio"
                  value="Yes"
                  data-testid="radio-yes"
                  checked={selectedRadio === 'Yes'}
                  onChange={() => setSelectedRadio('Yes')}
                  className="accent-teal-500"
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                <input
                  type="radio"
                  name="demoqa-radio"
                  value="Impressive"
                  data-testid="radio-impressive"
                  checked={selectedRadio === 'Impressive'}
                  onChange={() => setSelectedRadio('Impressive')}
                  className="accent-teal-500"
                />
                <span>Impressive</span>
              </label>

              <label className="flex items-center gap-2 text-slate-600 cursor-not-allowed opacity-50">
                <input
                  type="radio"
                  name="demoqa-radio"
                  value="No"
                  disabled
                  data-testid="radio-no"
                  className="accent-teal-500 cursor-not-allowed"
                />
                <span>No (Disabled)</span>
              </label>
            </div>

            <div data-testid="radio-result-output" className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              You have selected: <span className="text-emerald-400 font-bold">{selectedRadio || 'Nothing'}</span>
            </div>
          </div>
        )}

        {/* --- Sub-tab 4: Buttons (Double, Right, Dynamic Click) --- */}
        {activeSubTab === 'buttons' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Context Click Triggers</h2>

            <div className="space-y-4">
              {/* Double Click */}
              <div>
                <button
                  data-testid="btn-double-click"
                  onDoubleClick={handleDoubleClick}
                  className="px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl font-bold transition-colors"
                >
                  Double Click Me
                </button>
                {doubleClickMsg && (
                  <p data-testid="double-click-msg" className="mt-2 text-emerald-400 font-bold">{doubleClickMsg}</p>
                )}
              </div>

              {/* Right Click */}
              <div>
                <button
                  data-testid="btn-right-click"
                  onContextMenu={handleRightClick}
                  className="px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-xl font-bold transition-colors"
                >
                  Right Click Me (Context Menu)
                </button>
                {rightClickMsg && (
                  <p data-testid="right-click-msg" className="mt-2 text-emerald-400 font-bold">{rightClickMsg}</p>
                )}
              </div>

              {/* Dynamic Click */}
              <div>
                <button
                  data-testid="btn-dynamic-click"
                  onClick={handleDynamicClick}
                  className="px-4 py-2.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 rounded-xl font-bold transition-colors"
                >
                  Click Me (Standard Click)
                </button>
                {dynamicClickMsg && (
                  <p data-testid="dynamic-click-msg" className="mt-2 text-emerald-400 font-bold">{dynamicClickMsg}</p>
                )}
              </div>

              {/* Hover Button */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="relative inline-block">
                  <button
                    data-testid="btn-hover-me"
                    onMouseEnter={() => setBtnHoverTooltipVisible(true)}
                    onMouseLeave={() => setBtnHoverTooltipVisible(false)}
                    className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl font-bold transition-colors flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Hover Over Me (page.hover())</span>
                  </button>
                  {btnHoverTooltipVisible && (
                    <div
                      data-testid="hover-button-tooltip"
                      className="absolute left-0 bottom-full mb-2 px-3 py-1.5 bg-slate-900 border border-amber-400 text-amber-200 text-[11px] font-mono font-bold rounded-xl shadow-2xl z-30 whitespace-nowrap flex items-center gap-1.5"
                    >
                      <span>You hovered over the Button</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Sub-tab: Tool Tips (Hover) --- */}
        {activeSubTab === 'tooltips' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Tool Tips & Hover Triggers</h2>
            <p className="text-slate-400 text-[11px]">
              Practice Playwright <code className="text-teal-300 font-mono">page.hover()</code> assertions on buttons, input text fields, and links.
            </p>

            <div className="space-y-6">
              {/* Button Tooltip */}
              <div>
                <label className="block text-slate-400 font-bold mb-2">1. Button Tooltip</label>
                <div className="relative inline-block">
                  <button
                    data-testid="btn-hover-tooltip"
                    onMouseEnter={() => setBtnHoverTooltipVisible(true)}
                    onMouseLeave={() => setBtnHoverTooltipVisible(false)}
                    className="px-5 py-3 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 rounded-xl font-bold transition-all shadow-md shadow-teal-500/10 flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-teal-400" />
                    <span>Hover me to see Button Tooltip</span>
                  </button>
                  {btnHoverTooltipVisible && (
                    <div
                      data-testid="hover-button-tooltip-card"
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 px-3 py-1.5 bg-slate-900 border border-teal-400 text-teal-200 text-[11px] font-mono font-bold rounded-xl shadow-2xl z-30 whitespace-nowrap flex items-center gap-1.5"
                    >
                      <span>You hovered over the Button</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Input Tooltip */}
              <div className="border-t border-slate-800/80 pt-4">
                <label className="block text-slate-400 font-bold mb-2">2. Text Field Tooltip</label>
                <div className="relative max-w-sm">
                  <input
                    type="text"
                    data-testid="input-hover-tooltip"
                    onMouseEnter={() => setInputHoverTooltipVisible(true)}
                    onMouseLeave={() => setInputHoverTooltipVisible(false)}
                    placeholder="Hover over this text field..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono"
                  />
                  {inputHoverTooltipVisible && (
                    <div
                      data-testid="hover-input-tooltip"
                      className="absolute left-4 bottom-full mb-2.5 px-3 py-1.5 bg-slate-900 border border-purple-400 text-purple-200 text-[11px] font-mono font-bold rounded-xl shadow-2xl z-30 whitespace-nowrap"
                    >
                      You hovered over the text field
                    </div>
                  )}
                </div>
              </div>

              {/* Link Tooltip */}
              <div className="border-t border-slate-800/80 pt-4">
                <label className="block text-slate-400 font-bold mb-2">3. Hoverable Text Link Tooltip</label>
                <div className="relative inline-block">
                  <span
                    data-testid="link-hover-tooltip"
                    onMouseEnter={() => setLinkHoverTooltipVisible(true)}
                    onMouseLeave={() => setLinkHoverTooltipVisible(false)}
                    className="text-teal-400 hover:text-teal-300 underline font-bold cursor-pointer transition-colors"
                  >
                    Hover over Contrary link
                  </span>
                  {linkHoverTooltipVisible && (
                    <div
                      data-testid="hover-link-tooltip"
                      className="absolute left-0 bottom-full mb-2.5 px-3 py-1.5 bg-slate-900 border border-amber-400 text-amber-200 text-[11px] font-mono font-bold rounded-xl shadow-2xl z-30 whitespace-nowrap"
                    >
                      You hovered over the Contrary link
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- Sub-tab 5: Links & API Call Triggers --- */}
        {activeSubTab === 'links' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-2xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Links & API Call Triggers</h2>

            <div className="space-y-4">
              <div>
                <h4 className="text-slate-400 font-bold mb-2">Simple Page Navigation Links</h4>
                <div className="flex gap-4">
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-simple"
                    className="text-teal-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Home (Simple Link)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-slate-400 font-bold mb-2">API Call Simulation Triggers</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    data-testid="btn-api-created"
                    onClick={() => triggerApiLink(201, 'Created')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg border border-slate-700 font-bold"
                  >
                    201 Created
                  </button>
                  <button
                    data-testid="btn-api-no-content"
                    onClick={() => triggerApiLink(204, 'No Content')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg border border-slate-700 font-bold"
                  >
                    204 No Content
                  </button>
                  <button
                    data-testid="btn-api-moved"
                    onClick={() => triggerApiLink(301, 'Moved Permanently')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg border border-slate-700 font-bold"
                  >
                    301 Moved
                  </button>
                  <button
                    data-testid="btn-api-bad-request"
                    onClick={() => triggerApiLink(400, 'Bad Request')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg border border-slate-700 font-bold"
                  >
                    400 Bad Request
                  </button>
                  <button
                    data-testid="btn-api-unauthorized"
                    onClick={() => triggerApiLink(401, 'Unauthorized')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg border border-slate-700 font-bold"
                  >
                    401 Unauthorized
                  </button>
                  <button
                    data-testid="btn-api-forbidden"
                    onClick={() => triggerApiLink(403, 'Forbidden')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg border border-slate-700 font-bold"
                  >
                    403 Forbidden
                  </button>
                  <button
                    data-testid="btn-api-not-found"
                    onClick={() => triggerApiLink(404, 'Not Found')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg border border-slate-700 font-bold"
                  >
                    404 Not Found
                  </button>
                </div>
              </div>

              {linkResponseMsg && (
                <div data-testid="link-response-msg" className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 font-bold">
                  {linkResponseMsg}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- Sub-tab 6: Broken Links & Images --- */}
        {activeSubTab === 'broken' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Broken Images & Links</h2>

            <div className="space-y-6">
              <div>
                <h4 className="text-slate-400 font-bold mb-2">Valid Image vs. Broken Image</h4>
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <img
                      data-testid="img-valid"
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&q=80"
                      alt="Valid QA Image"
                      className="w-24 h-24 object-cover rounded-xl border border-slate-700"
                    />
                    <span className="text-[10px] text-emerald-400 mt-1 block">Valid Image</span>
                  </div>

                  <div className="text-center">
                    <img
                      data-testid="img-broken"
                      src="/invalid-broken-image-path-404.jpg"
                      alt="Broken Image"
                      className="w-24 h-24 object-cover rounded-xl border border-red-500/50 bg-slate-950 p-2"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23ef4444" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
                      }}
                    />
                    <span className="text-[10px] text-red-400 mt-1 block">Broken Image (404)</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-slate-400 font-bold mb-2">Valid Link vs. Broken Link</h4>
                <div className="space-y-2">
                  <a href="/" data-testid="link-valid" className="text-teal-400 hover:underline font-bold block">
                    Click Here for Valid Link (200 OK)
                  </a>
                  <a
                    href="#broken"
                    data-testid="link-broken"
                    onClick={(e) => { e.preventDefault(); alert('Broken link clicked (HTTP 404 response simulated).'); }}
                    className="text-red-400 hover:underline font-bold block"
                  >
                    Click Here for Broken Link (404 Not Found)
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Sub-tab 7: Upload & Download --- */}
        {activeSubTab === 'upload-download' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Download & Upload Files</h2>

            <div className="space-y-6">
              <div>
                <h4 className="text-slate-400 font-bold mb-2">1. Download File</h4>
                <button
                  data-testid="btn-download-sample"
                  onClick={handleDownloadSample}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download sampleFile.txt</span>
                </button>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-slate-400 font-bold mb-2">2. Upload File Input</h4>
                <input
                  type="file"
                  data-testid="input-upload-file"
                  onChange={(e) => e.target.files && setUploadedFileName(e.target.files[0].name)}
                  className="text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-mono file:font-bold file:bg-slate-800 file:text-teal-300 hover:file:bg-slate-700 cursor-pointer"
                />
                {uploadedFileName && (
                  <p data-testid="upload-filepath-display" className="mt-3 text-emerald-400 font-bold">
                    Uploaded file path: C:\fakepath\{uploadedFileName}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- Sub-tab 8: Dynamic Properties (5s delays) --- */}
        {activeSubTab === 'dynamic' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs max-w-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase">Dynamic 5-Second Properties</h2>

            <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block mb-1">Button enables after 5 seconds:</span>
                <button
                  disabled={!enableAfter5s}
                  data-testid="btn-enable-5s"
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl disabled:opacity-30"
                >
                  {enableAfter5s ? 'Enabled Button' : 'Will enable in 5s...'}
                </button>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Button color changes after 5 seconds:</span>
                <button
                  data-testid="btn-color-change"
                  className={`px-4 py-2 font-bold rounded-xl transition-colors ${
                    colorChanged ? 'bg-red-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {colorChanged ? 'Color Changed to Red' : 'Original Slate Color'}
                </button>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Button becomes visible after 5 seconds:</span>
                {visibleAfter5s ? (
                  <button data-testid="btn-visible-5s" className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl">
                    Visible Button
                  </button>
                ) : (
                  <span className="text-slate-600 font-italic">// Hidden until 5s timer completes</span>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
