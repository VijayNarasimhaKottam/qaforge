import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  Terminal, Play, CheckCircle2, Copy, Check, Code2, Server
} from 'lucide-react';
import { MOCK_EMPLOYEES, MOCK_PRODUCTS } from '../data/mockData';

export const ApiDocsPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'employees' | 'login' | 'products' | 'orders'>('employees');
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Endpoint runners
  const runApiCall = () => {
    setLoading(true);
    setTimeout(() => {
      if (selectedEndpoint === 'employees') {
        setApiResponse({
          status: 200,
          ok: true,
          data: MOCK_EMPLOYEES.slice(0, 5),
          total: MOCK_EMPLOYEES.length
        });
      } else if (selectedEndpoint === 'login') {
        setApiResponse({
          status: 200,
          ok: true,
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.qaforge.${Date.now()}`,
          user: { email: 'user@qaforge.com', name: 'Alex Rivera', role: 'user' }
        });
      } else if (selectedEndpoint === 'products') {
        setApiResponse({
          status: 200,
          ok: true,
          data: MOCK_PRODUCTS.slice(0, 4)
        });
      } else if (selectedEndpoint === 'orders') {
        setApiResponse({
          status: 201,
          ok: true,
          orderId: `QF-ORDER-${Math.floor(Math.random() * 90000 + 10000)}`,
          statusMessage: 'Order created successfully'
        });
      }
      setLoading(false);
    }, 400);
  };

  const samplePlaywrightCode = `import { test, expect } from '@playwright/test';

test('API Test Example: GET /api/employees', async ({ request }) => {
  const response = await request.get('http://localhost:3000/api/employees');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
});`;

  const copyCode = () => {
    navigator.clipboard.writeText(samplePlaywrightCode);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>Playwright API Testing Endpoints Documentation</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">REST API Testing Sandbox</h1>
          <p className="text-xs text-slate-400">
            Practice Playwright API requests (<code className="text-teal-300 font-mono">request.get()</code>, <code className="text-teal-300 font-mono">request.post()</code>) alongside UI automation scripts.
          </p>
        </div>

        {/* API Tester Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Endpoint selector menu */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl font-mono text-xs">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-teal-400" /> Endpoints
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => { setSelectedEndpoint('employees'); setApiResponse(null); }}
                className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-colors ${
                  selectedEndpoint === 'employees' ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <span>GET /api/employees</span>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded">GET</span>
              </button>

              <button
                onClick={() => { setSelectedEndpoint('login'); setApiResponse(null); }}
                className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-colors ${
                  selectedEndpoint === 'login' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <span>POST /api/auth/login</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">POST</span>
              </button>

              <button
                onClick={() => { setSelectedEndpoint('products'); setApiResponse(null); }}
                className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-colors ${
                  selectedEndpoint === 'products' ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <span>GET /api/products</span>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded">GET</span>
              </button>

              <button
                onClick={() => { setSelectedEndpoint('orders'); setApiResponse(null); }}
                className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-colors ${
                  selectedEndpoint === 'orders' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <span>POST /api/orders</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">POST</span>
              </button>
            </div>
          </div>

          {/* Test Runner & Output */}
          <div className="lg:col-span-2 space-y-6 font-mono text-xs">
            
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="font-bold text-slate-200 uppercase">Interactive REST Client</span>
                <button
                  onClick={runApiCall}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Send API Request</span>
                </button>
              </div>

              {/* Response Display */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[160px] text-emerald-400 overflow-x-auto">
                {loading ? (
                  <div className="text-slate-500 text-center py-6 animate-pulse">// Executing REST request...</div>
                ) : apiResponse ? (
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                ) : (
                  <div className="text-slate-600 text-center py-6">// Click "Send API Request" to preview simulated response.</div>
                )}
              </div>
            </div>

            {/* Playwright API Test Snippet */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200 uppercase flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-teal-400" /> Playwright Test Snippet
                </span>
                <button
                  onClick={copyCode}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-[11px] flex items-center gap-1"
                >
                  {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-teal-300 text-[11px] overflow-x-auto">
                <pre>{samplePlaywrightCode}</pre>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};
