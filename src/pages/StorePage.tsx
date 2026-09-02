import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  ShoppingBag, ShoppingCart, Plus, Minus, Trash2, CheckCircle2, ShieldCheck, CreditCard, Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS, Product } from '../data/mockData';
import { Link } from 'react-router-dom';

export const StorePage: React.FC = () => {
  const { user } = useAuth();
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();

  // Cart Drawer & Checkout State
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentShouldSucceed, setPaymentShouldSucceed] = useState(true);
  const [checkoutResult, setCheckoutResult] = useState<{ success: boolean; text: string } | null>(null);

  // Tab State: Catalog vs Admin Inventory
  const [activeTab, setActiveTab] = useState<'catalog' | 'inventory'>('catalog');
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);

  // New Product Form for Admin
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (paymentShouldSucceed) {
      setCheckoutResult({
        success: true,
        text: `Payment of $${totalAmount.toFixed(2)} processed successfully! Order #QF-${Math.floor(Math.random()*90000+10000)} confirmed.`
      });
      clearCart();
    } else {
      setCheckoutResult({
        success: false,
        text: 'Payment Failed: Simulated card decline error (Error Code 402).'
      });
    }
  };

  const handleAddProductAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      price: parseFloat(newPrice),
      category: 'Software',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
      stock: 25,
      description: 'Newly added admin inventory item.'
    };
    setProductsList([newProd, ...productsList]);
    setNewTitle('');
    setNewPrice('');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Module 7 — E-Commerce Mini Store Playground</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Mini Store & Checkout Flow</h1>
          <p className="text-xs text-slate-400">
            Practice product catalog assertions, shopping cart quantity steppers, price recalculations, payment path toggles, and role-based inventory management.
          </p>
        </div>

        {/* Store Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0f172a] p-4 rounded-2xl border border-slate-800 shadow-xl font-mono text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-xl transition-colors font-bold ${
                activeTab === 'catalog'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Product Catalog ({productsList.length})
            </button>

            <button
              data-testid="tab-manage-inventory"
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl transition-colors font-bold flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-amber-300 hover:text-amber-200 border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Manage Inventory (Admin)</span>
            </button>
          </div>

          <button
            data-testid="cart-drawer-toggle"
            onClick={() => setCartOpen(!cartOpen)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>View Shopping Cart (${totalAmount.toFixed(2)})</span>
          </button>
        </div>

        {/* Tab 1: Catalog */}
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            {productsList.map((prod) => (
              <div key={prod.id} className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between">
                <img src={prod.image} alt={prod.title} className="h-36 w-full object-cover" />
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-xs">
                  <div>
                    <span className="text-[10px] bg-slate-800 text-teal-300 px-2 py-0.5 rounded font-bold">{prod.category}</span>
                    <h3 className="font-bold text-slate-100 mt-2 text-xs">{prod.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-400">${prod.price}</span>
                    <button
                      data-testid={`btn-add-to-cart-${prod.id}`}
                      onClick={() => addToCart(prod)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-teal-300 font-bold text-xs rounded-xl transition-colors"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Admin Manage Inventory */}
        {activeTab === 'inventory' && (
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-amber-300 uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Admin Inventory Management
              </h2>
              {user ? (
                <span className="text-emerald-400 font-bold">Logged in as {user.name} ({user.role})</span>
              ) : (
                <Link to="/login" className="text-amber-400 underline font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Login as Admin
                </Link>
              )}
            </div>

            {user?.role === 'admin' ? (
              <form onSubmit={handleAddProductAdmin} className="space-y-4 max-w-md bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-slate-200">Add New Store Product</h4>
                <input
                  type="text"
                  placeholder="Product Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-100 focus:outline-none"
                />
                <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20">
                  + Create Inventory Item
                </button>
              </form>
            ) : (
              <div className="p-6 bg-slate-950 rounded-2xl border border-amber-500/40 text-amber-300 space-y-2">
                <p className="font-bold">⚠️ Role Authorization Warning:</p>
                <p className="text-slate-400 text-[11px]">
                  Only users logged in with the <strong>Admin Account</strong> (`admin@qaforge.com`) can add/modify inventory.
                </p>
                <Link to="/login" className="inline-block mt-2 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl">
                  Go to Login Page
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Shopping Cart Drawer */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in font-mono text-xs">
            <div className="bg-[#111827] border-l border-slate-800 w-full max-w-md p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <h3 className="font-bold text-slate-100 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-teal-400" /> Shopping Cart
                  </h3>
                  <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-slate-200">Close</button>
                </div>

                {items.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">Your cart is currently empty.</p>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-200">{item.product.title}</h4>
                          <p className="text-teal-400">${item.product.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            data-testid={`cart-item-qty-dec-${item.product.id}`}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold">{item.quantity}</span>
                          <button
                            data-testid={`cart-item-qty-inc-${item.product.id}`}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Controls */}
              <div className="border-t border-slate-800 pt-4 space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400">${totalAmount.toFixed(2)}</span>
                </div>

                {/* Success vs Failure Simulation Toggle */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Simulate Payment Path:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className={paymentShouldSucceed ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {paymentShouldSucceed ? 'Success' : 'Failure (Error 402)'}
                    </span>
                    <input
                      type="checkbox"
                      data-testid="toggle-payment-outcome"
                      checked={paymentShouldSucceed}
                      onChange={(e) => setPaymentShouldSucceed(e.target.checked)}
                      className="rounded accent-teal-500"
                    />
                  </label>
                </div>

                {checkoutResult && (
                  <div
                    data-testid="checkout-status-msg"
                    className={`p-3 rounded-xl border ${checkoutResult.success ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300' : 'bg-red-950 border-red-500/50 text-red-300'}`}
                  >
                    {checkoutResult.text}
                  </div>
                )}

                <button
                  data-testid="btn-checkout"
                  disabled={items.length === 0}
                  onClick={handleCheckout}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl disabled:opacity-40"
                >
                  Pay & Submit Order (${totalAmount.toFixed(2)})
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};
