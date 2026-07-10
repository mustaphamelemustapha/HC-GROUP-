import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ShopTheLook from './pages/ShopTheLook.jsx';
import Cart from './pages/Cart.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
            />
          </div>
        )}
        {activeTab === 'admin' && (
          <div style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
            <AdminDashboard />
          </div>
        )}
        
        {/* Placeholders */}
        {activeTab === 'about' && (
          <PlaceholderPage 
            title="About HC Group" 
            description="Discover our heritage of delivering premium building materials and bespoke interior design solutions to the world's most luxurious projects." 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'services' && (
          <PlaceholderPage 
            title="One-Stop Services" 
            description="From initial architectural concepts to final installation and warranty, our turnkey solutions ensure perfection at every stage." 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'projects' && (
          <PlaceholderPage 
            title="Global Projects" 
            description="Explore our portfolio of completed luxury villas, high-end commercial spaces, and premium hospitality venues." 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'contact' && (
          <PlaceholderPage 
            title="Contact Us" 
            description="Get in touch with our global team of design and material experts to discuss your next visionary project." 
            setActiveTab={setActiveTab} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
