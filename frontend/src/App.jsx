import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppWidget from './components/WhatsAppWidget.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ShopTheLook from './pages/ShopTheLook.jsx';
import Cart from './pages/Cart.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import { CheckCircle2, ShoppingBag, MessageCircle, X, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartToast, setCartToast] = useState(null);

  const handleAddToCart = (variantId, name, sku, price) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.variantId === variantId);
      if (existing) {
        return prevCart.map(item =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { variantId, name, sku, price, quantity: 1 }];
    });

    // Sleek Luxury Toast Notification (Replaces annoying browser alert)
    setCartToast({ name, sku, price });
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

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} totalCartItems={totalCartItems} />

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
              href={`https://wa.me/2349068875555?text=${encodeURIComponent(`Hello HC Group, I just added "${cartToast.name}" (SKU: ${cartToast.sku}, ₦${cartToast.price?.toLocaleString('en-NG')}) to my order. Please confirm stock and delivery lead time.`)}`}
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
            <AdminDashboard />
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
      </main>

      <Footer setActiveTab={setActiveTab} />

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppWidget />
    </div>
  );
}
