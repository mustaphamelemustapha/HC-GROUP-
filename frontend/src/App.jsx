import React, { useState, useEffect, Component } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppWidget from './components/WhatsAppWidget.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ShopTheLook from './pages/ShopTheLook.jsx';
import Cart from './pages/Cart.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import { CheckCircle2, ShoppingBag, MessageCircle, X, ArrowRight, AlertTriangle, RefreshCw } from 'lucide-react';

const VALID_TABS = ['home', 'catalog', 'shop-look', 'cart', 'admin', 'about', 'services', 'projects', 'contact'];

// Robust Error Boundary preventing white blank screen crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          maxWidth: '700px',
          margin: '4rem auto',
          padding: '3rem 2rem',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #fecaca',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <AlertTriangle size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', marginBottom: '0.5rem' }}>
            Section Temporarily Unavailable
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            An unexpected error occurred while loading this section. You can refresh or return to the main catalog.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              className="btn-gold"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.hash = '';
                window.location.reload();
              }}
            >
              <RefreshCw size={15} /> Reload Page
            </button>
            <button
              className="btn-outline"
              onClick={() => {
                this.setState({ hasError: false });
                if (this.props.onReset) this.props.onReset();
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Sync initial tab from URL hash if provided
  const getInitialTab = () => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (VALID_TABS.includes(hash)) {
        return hash;
      }
    } catch {
      // Fallback
    }
    return 'home';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [cart, setCart] = useState([]);
  const [cartToast, setCartToast] = useState(null);

  // Executive Admin authentication session
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hc_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Wrapped tab setter that keeps URL hash in sync
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    if (tab === 'home') {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = `#${tab}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser hash changes (e.g. forward/back button, direct link to #admin)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (VALID_TABS.includes(hash)) {
        setActiveTabState(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Admin login handler
  const handleAdminLoginSuccess = (sessionData) => {
    setAdminUser(sessionData);
    try {
      localStorage.setItem('hc_admin_session', JSON.stringify(sessionData));
    } catch (e) {
      console.error('Failed to save admin session', e);
    }
    setActiveTab('admin');
  };

  // Admin logout handler
  const handleAdminLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('hc_admin_session');
    } catch (e) {
      console.error('Failed to clear admin session', e);
    }
    setActiveTab('home');
  };

  const handleAddToCart = (variantId, name, sku, price) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.variantId === variantId);
      if (existing) {
        return prevCart.map(item =>
          item.variantId === variantId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { variantId, name, sku, price: Number(price || 0), quantity: 1 }];
    });

    // Sleek Luxury Toast Notification (Replaces annoying browser alert)
    setCartToast({ name, sku, price: Number(price || 0) });
    setTimeout(() => {
      setCartToast(null);
    }, 4500);
  };

  const handleUpdateQty = (variantId, newQty) => {
    if (newQty <= 0) {
      handleRemove(variantId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map(item =>
        item.variantId === variantId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (variantId) => {
    setCart((prevCart) => prevCart.filter(item => item.variantId !== variantId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        totalCartItems={totalCartItems}
        adminUser={adminUser}
        onLogout={handleAdminLogout}
      />

      {/* Sharp & Smooth Order Toast Notification */}
      {cartToast && (
        <div className="luxury-cart-toast">
          <div className="toast-content">
            <div className="toast-icon-wrap">
              <CheckCircle2 size={24} color="#10b981" />
            </div>
            <div className="toast-text">
              <strong>Added to Your Order</strong>
              <span>{cartToast.name} (SKU: {cartToast.sku})</span>
            </div>
          </div>

          <div className="toast-actions">
            <button 
              className="toast-view-cart-btn"
              onClick={() => {
                setActiveTab('cart');
                setCartToast(null);
              }}
            >
              <ShoppingBag size={14} /> View Order ({totalCartItems})
            </button>
            <a 
              href={`https://wa.me/2349068875555?text=${encodeURIComponent(`Hello HC Group, I just added "${cartToast.name}" (SKU: ${cartToast.sku}, ₦${Number(cartToast.price || 0).toLocaleString('en-NG')}) to my order. Please confirm stock and delivery lead time.`)}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="toast-whatsapp-btn"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <button 
              className="toast-close-btn"
              onClick={() => setCartToast(null)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <main style={{ flex: 1, padding: 0, margin: 0, maxWidth: '100%' }}>
        <ErrorBoundary key={activeTab} onReset={() => setActiveTab('home')}>
          {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
          
          {activeTab === 'catalog' && (
            <div style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
              <Catalog onAddToCart={handleAddToCart} />
            </div>
          )}
          
          {activeTab === 'shop-look' && (
            <div style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
              <ShopTheLook onAddToCart={handleAddToCart} />
            </div>
          )}
          
          {activeTab === 'cart' && (
            <div style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
              <Cart 
                cartItems={cart} 
                onUpdateQty={handleUpdateQty} 
                onRemove={handleRemove} 
                onClearCart={handleClearCart}
                setActiveTab={setActiveTab}
              />
            </div>
          )}
          
          {activeTab === 'admin' && (
            <div style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
              {adminUser ? (
                <AdminDashboard adminUser={adminUser} onLogout={handleAdminLogout} />
              ) : (
                <AdminLogin 
                  onLoginSuccess={handleAdminLoginSuccess} 
                  onCancel={() => setActiveTab('home')} 
                />
              )}
            </div>
          )}
          
          {activeTab === 'about' && (
            <About setActiveTab={setActiveTab} />
          )}
          
          {activeTab === 'services' && (
            <Services setActiveTab={setActiveTab} />
          )}
          
          {activeTab === 'projects' && (
            <Projects setActiveTab={setActiveTab} />
          )}
          
          {activeTab === 'contact' && (
            <Contact setActiveTab={setActiveTab} />
          )}
        </ErrorBoundary>
      </main>

      <Footer setActiveTab={setActiveTab} />

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppWidget />
    </div>
  );
}
