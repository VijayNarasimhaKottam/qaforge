import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CheatSheetProvider } from './context/CheatSheetContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { ElementsPage } from './pages/ElementsPage';
import { FormsPage } from './pages/FormsPage';
import { DataGridPage } from './pages/DataGridPage';
import { DialogsPage } from './pages/DialogsPage';
import { WidgetsPage } from './pages/WidgetsPage';
import { InteractionsPage } from './pages/InteractionsPage';
import { LoginPage } from './pages/LoginPage';
import { StorePage } from './pages/StorePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { SitemapPage } from './pages/SitemapPage';
import { ApiDocsPage } from './pages/ApiDocsPage';

export const App: React.FC = () => {
  return (
    <Router>
      <CheatSheetProvider>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/elements" element={<ElementsPage />} />
                  <Route path="/forms" element={<FormsPage />} />
                  <Route path="/data-grid" element={<DataGridPage />} />
                  <Route path="/dialogs" element={<DialogsPage />} />
                  <Route path="/widgets" element={<WidgetsPage />} />
                  <Route path="/interactions" element={<InteractionsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/store" element={<StorePage />} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                  <Route path="/api-docs" element={<ApiDocsPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </CheatSheetProvider>
    </Router>
  );
};
