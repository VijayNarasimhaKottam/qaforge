import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  LogIn, LogOut, ShieldCheck, UserCheck, Key, Camera, User, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_ACCOUNTS } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const { user, token, login, logout, updateProfile } = useAuth();

  // Login Form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState<{ success: boolean; message: string } | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(loginEmail, loginPassword);
    setLoginMsg(res);
  };

  const fillQuickUser = () => {
    setLoginEmail(DEMO_ACCOUNTS.user.email);
    setLoginPassword(DEMO_ACCOUNTS.user.password);
  };

  const fillQuickAdmin = () => {
    setLoginEmail(DEMO_ACCOUNTS.admin.email);
    setLoginPassword(DEMO_ACCOUNTS.admin.password);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-5xl space-y-8 font-mono text-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            <LogIn className="w-3.5 h-3.5" />
            <span>Module 6 — User Authentication & Accounts</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Auth Sessions & User Profile</h1>
          <p className="text-xs text-slate-400">
            Practice JWT authenticated sessions, protected routes, user profile editing, avatar cropping, and role authorization (User vs. Admin).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Login Form / Session Controller */}
          {!user ? (
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  Account Login Form
                </h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    data-testid="btn-quick-fill-user"
                    onClick={fillQuickUser}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 text-[10px] rounded-lg border border-slate-700"
                  >
                    User Creds
                  </button>
                  <button
                    type="button"
                    data-testid="btn-quick-fill-admin"
                    onClick={fillQuickAdmin}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] rounded-lg border border-slate-700"
                  >
                    Admin Creds
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    data-testid="input-login-email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="user@qaforge.com or admin@qaforge.com"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    data-testid="input-login-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="user123 or admin123"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                  />
                </div>

                {loginMsg && (
                  <div
                    data-testid="login-status-msg"
                    className={`p-3 rounded-xl border ${
                      loginMsg.success ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-red-950/80 border-red-500/40 text-red-300'
                    }`}
                  >
                    {loginMsg.message}
                  </div>
                )}

                <button
                  type="submit"
                  data-testid="btn-submit-login"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Authenticate & Issue JWT Token
                </button>
              </form>
            </div>
          ) : (
            /* Active User Session Panel */
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" /> Active Session Details
                </h2>
                <button
                  data-testid="btn-logout"
                  onClick={logout}
                  className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-xl font-bold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500" />
                    <button
                      type="button"
                      onClick={() => updateProfile({ avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80' })}
                      className="absolute bottom-0 right-0 p-1 bg-teal-500 text-slate-950 rounded-full"
                      title="Crop/Change Avatar"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{user.name}</h3>
                    <p className="text-slate-400">{user.email}</p>
                    <span className={`mt-1 inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold ${user.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'}`}>
                      {user.role} Account
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-300 font-bold">Biography Notes</label>
                  <textarea
                    data-testid="profile-bio-textarea"
                    value={user.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:outline-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Right Column: JWT Token Inspector */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" /> Session JWT Inspection Token
            </h2>
            <p className="text-slate-400 text-[11px]">
              Playwright scripts can inspect the active bearer token stored in localStorage/session.
            </p>

            <div data-testid="session-jwt-display" className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-teal-300 font-mono text-[11px] break-all min-h-[100px]">
              {token ? (
                <div>
                  <span className="text-emerald-400 font-bold">// Active JWT Token:</span>
                  <p className="mt-1 text-slate-300">{token}</p>
                </div>
              ) : (
                <span className="text-slate-600">// No active JWT session token. Please log in above.</span>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
