import React from 'react';
import { ShoppingBag, ChevronDown, Settings } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, totalCartItems }) {
  return (
    <header>
      <div className="header-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
          <img src="/assets/logo.jpg" alt="HC Group" style={{ height: '50px', marginRight: '15px', borderRadius: '4px', border: '1px solid var(--color-gold-muted)' }} />
          HC <span>GROUP</span>
        </a>
        
        <nav className="main-nav">
          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              HOME
            </span>
          </div>
          
          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              ABOUT
            </span>
          </div>

          <div className="nav-item has-dropdown">
            <span 
              className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              ONE-STOP SERVICE <ChevronDown size={14} style={{ marginLeft: '4px' }} />
            </span>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('services'); }}>Design</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('services'); }}>Measurement</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('services'); }}>Producing</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('services'); }}>Delivery Shipment</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('services'); }}>Installation</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('services'); }}>Warranty</a>
            </div>
          </div>

          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              PROJECT
            </span>
          </div>

          <div className="nav-item has-dropdown">
            <span 
              className={`nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              PRODUCT <ChevronDown size={14} style={{ marginLeft: '4px' }} />
            </span>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>Doors & Windows</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>Tile</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>Sanitary</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>Marble & Granite</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>Kitchen & Wardrobe</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>Lighting</a>
            </div>
          </div>

          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              CONTACT US
            </span>
          </div>
        </nav>

        <div className="header-actions">
          <span 
            className="cart-icon"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: activeTab === 'admin' ? 'var(--color-gold)' : '' }}
            onClick={() => setActiveTab('admin')}
            title="Admin Dashboard"
          >
            <Settings size={22} />
          </span>

          <span 
            className="cart-icon"
            style={{ cursor: 'pointer', color: activeTab === 'cart' ? 'var(--color-gold)' : '' }}
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingBag size={24} />
            {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
          </span>
        </div>
      </div>
    </header>
  );
}
