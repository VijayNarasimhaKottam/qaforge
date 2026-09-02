import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Terminal, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <Link
            to="/"
            data-testid="brand-logo"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-teal-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-mono text-xl font-black text-slate-950 tracking-tighter">QF</span>
            </div>
            <div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                QAForge
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-teal-950/80 text-teal-300 border border-teal-800/60 rounded">
                v1.0.0
              </span>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/elements"
              data-testid="nav-elements"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/elements'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Elements
            </Link>
            <Link
              to="/forms"
              data-testid="nav-forms"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/forms'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Forms
            </Link>
            <Link
              to="/data-grid"
              data-testid="nav-data-grid"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/data-grid'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Data Grid
            </Link>
            <Link
              to="/dialogs"
              data-testid="nav-dialogs"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/dialogs'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Dialogs & Frames
            </Link>
            <Link
              to="/widgets"
              data-testid="nav-widgets"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/widgets'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Widgets
            </Link>
            <Link
              to="/interactions"
              data-testid="nav-interactions"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/interactions'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Drag & Drop
            </Link>
            <Link
              to="/login"
              data-testid="nav-login"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/login'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Auth
            </Link>
            <Link
              to="/store"
              data-testid="nav-store"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/store'
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Store
            </Link>
            <Link
              to="/challenges"
              data-testid="nav-challenges"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                location.pathname === '/challenges'
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              Challenges
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Sitemap Link */}
            <Link
              to="/sitemap"
              data-testid="nav-sitemap"
              className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800/70 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="View Locator Sitemap"
            >
              <MapPin className="w-4 h-4 text-teal-400" />
              <span className="hidden md:inline">Sitemap</span>
            </Link>

            {/* API Docs Link */}
            <Link
              to="/api-docs"
              data-testid="nav-api-docs"
              className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800/70 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="REST API Docs"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">API</span>
            </Link>

            {/* Cart Icon Link */}
            <Link
              to="/store"
              className="relative p-2 text-slate-400 hover:text-teal-300 hover:bg-slate-800/70 rounded-lg transition-colors"
              title="Store Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span
                  data-testid="cart-icon-count"
                  className="absolute -top-1 -right-1 bg-teal-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </Link>



            {/* Auth status indicator — clickable, navigates to Auth & Accounts page */}
            {user && (
              <Link
                to="/login"
                data-testid="nav-profile"
                className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-80 transition-opacity cursor-pointer"
                title="Go to Auth & Accounts"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full ring-2 ring-teal-500/50 object-cover"
                />
                <span className="text-xs font-medium text-slate-300 max-w-[100px] truncate">
                  {user.name}
                </span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
