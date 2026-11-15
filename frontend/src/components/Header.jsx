import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, Settings, Menu, X, ArrowRight, Phone, MessageCircle } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, totalCartItems }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const directPhone = '+234 9068875555';
  const whatsappUrl = `https://wa.me/2349068875555?text=${encodeURIComponent(
    'Hello HC Group, I am interested in your luxury architectural materials and turnkey interior solutions.'
  )}`;

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header>
      {/* Top VIP Concierge Announcement Strip */}
      <div className="top-concierge-bar">
        <div className="top-concierge-inner">
          <div className="top-tagline">
            <span>HC GROUP</span> • Headquarters: Maiduguri, Borno State • Architectural Materials & Fit-Out
          </div>
          <div className="top-contacts">
            <a href="tel:+2349068875555" className="top-contact-link">
              <Phone size={13} color="var(--color-gold)" />
              <span>Call: <strong>{directPhone}</strong></span>
            </a>
            <span className="top-sep">|</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="top-contact-link whatsapp-link">
              <MessageCircle size={13} color="#25D366" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="header-container">
        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Brand Logo */}
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <img src="/assets/logo.jpg" alt="HC Group" style={{ height: '48px', marginRight: '12px', borderRadius: '4px', border: '1px solid var(--color-gold-muted)' }} />
          HC <span>GROUP</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="main-nav">
          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              HOME
            </span>
          </div>
          
          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              ABOUT
            </span>
          </div>

          <div className="nav-item has-dropdown">
            <span 
              className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => handleNavClick('services')}
            >
              ONE-STOP SERVICE <ChevronDown size={14} style={{ marginLeft: '4px' }} />
            </span>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Design & Engineering</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>On-Site Measurement</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Precision Producing</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Delivery & Freight Logistics</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Master Installation</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>10-Year Warranty</a>
            </div>
          </div>

          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => handleNavClick('projects')}
            >
              PROJECT
            </span>
          </div>

          <div className="nav-item has-dropdown">
            <span 
              className={`nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => handleNavClick('catalog')}
            >
              PRODUCT <ChevronDown size={14} style={{ marginLeft: '4px' }} />
            </span>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('catalog'); }}>Doors & Windows</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('catalog'); }}>Luxury Marble & Tiles</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('catalog'); }}>Sanitary Ware & Baths</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('catalog'); }}>Kitchen & Wardrobe Systems</a>
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('shop-look'); }}>Shop The Look (Interactive Mockup)</a>
            </div>
          </div>

          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              CONTACT US
            </span>
          </div>
        </nav>

        {/* Right Header Actions */}
        <div className="header-actions">
          {/* Quick Call Action for Desktop */}
          <a 
            href={`tel:+2349068875555`} 
            className="desktop-header-phone"
            title="Direct Consultation Hotline"
          >
            <Phone size={16} />
            <span>+234 9068875555</span>
          </a>

          <span 
            className="cart-icon"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: activeTab === 'admin' ? 'var(--color-gold)' : '' }}
            onClick={() => handleNavClick('admin')}
            title="Admin Dashboard"
          >
            <Settings size={22} />
          </span>

          <span 
            className="cart-icon"
            style={{ cursor: 'pointer', color: activeTab === 'cart' ? 'var(--color-gold)' : '' }}
            onClick={() => handleNavClick('cart')}
            title="View Order / Project Board"
          >
            <ShoppingBag size={24} />
            {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
          </span>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="logo" style={{ fontSize: '1.2rem' }}>
                HC <span>GROUP</span>
              </div>
              <button 
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Quick Contact Box on Mobile */}
            <div className="mobile-contact-card">
              <span className="mobile-contact-label">DIRECT ARCHITECTURAL HOTLINE</span>
              <a href="tel:+2349068875555" className="mobile-call-btn">
                <Phone size={15} />
                <span>+234 9068875555</span>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mobile-whatsapp-btn">
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <nav className="mobile-nav-list">
              <div 
                className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                HOME
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                ABOUT HC GROUP
              </div>

              <div className="mobile-nav-item-dropdown">
                <div 
                  className="mobile-dropdown-trigger"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <span className={activeTab === 'services' ? 'active' : ''}>ONE-STOP SERVICE</span>
                  <ChevronDown size={16} className={mobileServicesOpen ? 'rotated' : ''} />
                </div>
                {mobileServicesOpen && (
                  <div className="mobile-sub-menu">
                    <span onClick={() => handleNavClick('services')}>All Services Overview</span>
                    <span onClick={() => handleNavClick('services')}>Design & CAD Engineering</span>
                    <span onClick={() => handleNavClick('services')}>3D Laser Measurement</span>
                    <span onClick={() => handleNavClick('services')}>5-Axis CNC Producing</span>
                    <span onClick={() => handleNavClick('services')}>Global Freight & Offloading</span>
                    <span onClick={() => handleNavClick('services')}>White-Glove Installation</span>
                  </div>
                )}
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                GLOBAL PROJECTS
              </div>

              <div className="mobile-nav-item-dropdown">
                <div 
                  className="mobile-dropdown-trigger"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  <span className={activeTab === 'catalog' || activeTab === 'shop-look' ? 'active' : ''}>PRODUCTS & MATERIALS</span>
                  <ChevronDown size={16} className={mobileProductsOpen ? 'rotated' : ''} />
                </div>
                {mobileProductsOpen && (
                  <div className="mobile-sub-menu">
                    <span onClick={() => handleNavClick('catalog')}>Full Material Catalog</span>
                    <span onClick={() => handleNavClick('shop-look')}>Shop The Look (Room Hotspots)</span>
                  </div>
                )}
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                CONTACT & RFQ
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => handleNavClick('admin')}
              >
                ADMIN CONTROL CENTER
              </div>
            </nav>

            <div className="mobile-drawer-footer">
              <button 
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleNavClick('contact')}
              >
                Request Project Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
