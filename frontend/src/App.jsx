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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);

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
    alert(`Added "${name}" (SKU: ${sku}) to your order.`);
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

      {/* Real-time WhatsApp & Direct Calling Floating Concierge */}
      <WhatsAppWidget />
    </div>
  );
}
