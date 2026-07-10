import React, { useState } from 'react';
import Catalog from './pages/Catalog.jsx';
import ShopTheLook from './pages/ShopTheLook.jsx';
import Cart from './pages/Cart.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { ShoppingBag, Layout, Compass, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
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
    // Trigger feedback or redirect
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
    <div>
      <header>
        <div className="header-container">
          <a href="#" className="logo" onClick={() => setActiveTab('catalog')} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo.jpg" alt="HC Group" style={{ height: '45px', marginRight: '12px', borderRadius: '4px', border: '1px solid var(--color-gold-muted)' }} />
            HC <span>GROUP</span>
          </a>
          <nav>
            <span 
              className={`nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <Layout size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Catalog
            </span>
            <span 
              className={`nav-link ${activeTab === 'shop-look' ? 'active' : ''}`}
              onClick={() => setActiveTab('shop-look')}
            >
              <Compass size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Shop the Look
            </span>
            <span 
              className={`nav-link cart-badge-container ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              <ShoppingBag size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Order Bag
              {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
            </span>
            <span 
              className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <Settings size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Admin
            </span>
          </nav>
        </div>
      </header>

      <main>
        {activeTab === 'catalog' && <Catalog onAddToCart={handleAddToCart} />}
        {activeTab === 'shop-look' && <ShopTheLook onAddToCart={handleAddToCart} />}
        {activeTab === 'cart' && (
          <Cart 
            cartItems={cart} 
            onUpdateQty={handleUpdateQty} 
            onRemove={handleRemove} 
            onClearCart={handleClearCart}
          />
        )}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
}
