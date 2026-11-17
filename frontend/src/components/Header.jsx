import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ChevronDown, 
  ChevronRight,
  Settings, 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  LogOut, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Box, 
  Ruler, 
  Compass, 
  CheckCircle2, 
  ExternalLink,
  Building,
  Home,
  Hotel
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, totalCartItems, adminUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const directPhone = '+234 9068875555';
  const whatsappUrl = `https://wa.me/2349068875555?text=${encodeURIComponent(
    'Hello HC Group, I am interested in your luxury architectural materials, whole-house procurement and turnkey fit-out solutions.'
  )}`;

  const handleNavClick = (tab, category = '') => {
    setActiveTab(tab, category);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top VIP Concierge Announcement Strip */}
      <div className="top-concierge-bar">
        <div className="top-concierge-inner">
          <div className="top-tagline">
            <span>HC GROUP</span> • Headquarters: Sir Kashim Ibrahim Way, Maiduguri • Global Procurement & Architectural Turnkey Fit-Out
          </div>
          <div className="top-contacts">
            <a href="tel:+2349068875555" className="top-contact-link">
              <Phone size={13} color="var(--color-gold)" />
              <span>Direct Desk: <strong>{directPhone}</strong></span>
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
          <img 
            src="/assets/logo.jpg" 
            alt="HC Group" 
            style={{ 
              height: '48px', 
              marginRight: '12px', 
              borderRadius: '4px', 
              border: '1px solid var(--color-gold-muted)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }} 
          />
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

          {/* ONE-STOP SOLUTIONS DROPDOWN (George Build Standard) */}
          <div className="nav-item has-dropdown">
            <span 
              className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => handleNavClick('services')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              ONE-STOP SOLUTIONS <ChevronDown size={14} />
            </span>
            
            <div className="solutions-mega-dropdown">
              {/* Column 1: Turnkey Project Sectors */}
              <div className="solutions-column">
                <div className="solutions-heading">
                  <Building size={16} color="var(--color-gold)" />
                  <span>Turnkey Project Sectors</span>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('services')}
                >
                  <Home size={18} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div className="solutions-item-title">Residential Luxury Villas</div>
                    <div className="solutions-item-desc">Custom estates, duplexes, penthouses & architectural private residences.</div>
                  </div>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('services')}
                >
                  <Building size={18} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div className="solutions-item-title">Commercial & Corporate Fit-Out</div>
                    <div className="solutions-item-desc">Headquarters, executive boardrooms, embassies & commercial spaces.</div>
                  </div>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('services')}
                >
                  <Hotel size={18} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div className="solutions-item-title">Hospitality & Hotel Sourcing</div>
                    <div className="solutions-item-desc">Boutique hotels, luxury serviced apartments & presidential suites.</div>
                  </div>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('shop-look')}
                >
                  <Sparkles size={18} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div className="solutions-item-title">Shop The Look (Room Hotspots)</div>
                    <div className="solutions-item-desc">Explore fully-coordinated interior scenes with clickable material tags.</div>
                  </div>
                </div>
              </div>

              {/* Column 2: 5-Stage Procurement Workflow */}
              <div className="solutions-column">
                <div className="solutions-heading">
                  <Compass size={16} color="var(--color-gold)" />
                  <span>5-Stage Sourcing Workflow</span>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('services')}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-gold)', width: '22px' }}>01</span>
                  <div>
                    <div className="solutions-item-title">CAD Blueprint & 3D Measurement</div>
                    <div className="solutions-item-desc">Precision aperture analysis and structural take-offs from architectural plans.</div>
                  </div>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('3d-show')}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-gold)', width: '22px' }}>02</span>
                  <div>
                    <div className="solutions-item-title">3D Atelier Spatial Rendering</div>
                    <div className="solutions-item-desc">Real-time WebGL material inspection & finish pairing before manufacture.</div>
                  </div>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('services')}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-gold)', width: '22px' }}>03</span>
                  <div>
                    <div className="solutions-item-title">Factory Precision Producing</div>
                    <div className="solutions-item-desc">5-Axis CNC joinery, stone waterjet cutting & hand-knotted silk weaving.</div>
                  </div>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('services')}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-gold)', width: '22px' }}>04</span>
                  <div>
                    <div className="solutions-item-title">Freight Logistics & Site Crane Lift</div>
                    <div className="solutions-item-desc">Secured container transport directly to site across all 36 Nigerian states.</div>
                  </div>
                </div>

                <div 
                  className="solutions-item"
                  onClick={() => handleNavClick('services')}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-gold)', width: '22px' }}>05</span>
                  <div>
                    <div className="solutions-item-title">Master Installation & 10-Yr Guarantee</div>
                    <div className="solutions-item-desc">White-glove engineering handover with certified structural warranty.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT PORTFOLIO ARCHITECTURAL MEGA-MENU */}
          <div className="nav-item has-mega-menu">
            <span 
              className={`nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => handleNavClick('catalog')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              PRODUCT PORTFOLIO <ChevronDown size={14} />
            </span>

            {/* FULL ARCHITECTURAL MEGA-MENU PANEL */}
            <div className="mega-menu-container">
              {/* Top Banner Strip */}
              <div className="mega-menu-top-strip">
                <div className="mega-menu-tagline">
                  <Layers size={16} color="var(--color-gold)" />
                  <span>WHOLE-HOUSE ARCHITECTURAL PORTFOLIO • Direct Factory Specification in Nigerian Naira (₦)</span>
                </div>
                <div className="mega-menu-top-actions">
                  <span 
                    className="mega-menu-action-pill"
                    onClick={() => handleNavClick('catalog')}
                  >
                    <Ruler size={13} /> Open CAD Sizing Matrix
                  </span>
                  <span 
                    className="mega-menu-action-pill"
                    onClick={() => handleNavClick('3d-show')}
                  >
                    <Sparkles size={13} /> Launch 3D Configurator
                  </span>
                  <span 
                    className="mega-menu-action-pill"
                    onClick={() => handleNavClick('contact')}
                  >
                    <Box size={13} /> Order Material Swatches
                  </span>
                </div>
              </div>

              {/* 4 Architectural Columns + 1 Featured Column */}
              <div className="mega-menu-grid">
                {/* Column 1: Doors & Entries */}
                <div className="mega-menu-col">
                  <div className="mega-menu-col-thumb">
                    <img src="/assets/products/door_1.jpeg" alt="Luxury Doors" />
                    <div className="mega-menu-col-thumb-overlay">
                      <span className="mega-menu-col-badge">Series DR-01</span>
                    </div>
                  </div>
                  <div className="mega-menu-col-title">LUXURY DOORS & ENTRIES</div>
                  <div className="mega-menu-col-subtitle">High-Security Structural & Interior Architectural Entryways</div>
                  
                  <ul className="mega-menu-links">
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_doors')}>
                      <span>Grande Pivot Entrance Doors</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_doors')}>
                      <span>Aurelia Steel French Doors</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_doors')}>
                      <span>Concealed Flush Interior Doors</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_doors')}>
                      <span>Minimalist Sliding Pocket Doors</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_doors')}>
                      <span>Imperial Hand-Carved Oak Doors</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_doors')}>
                      <span>Frosted Glass Privacy Doors</span>
                      <ChevronRight size={13} />
                    </li>
                  </ul>

                  <span className="mega-menu-col-cta" onClick={() => handleNavClick('catalog', 'cat_doors')}>
                    View All Door Specifications <ArrowRight size={13} />
                  </span>
                </div>

                {/* Column 2: Luxury Carpets & Rugs */}
                <div className="mega-menu-col">
                  <div className="mega-menu-col-thumb">
                    <img src="/assets/products/carpets/carpet_1.jpeg" alt="Luxury Carpets" />
                    <div className="mega-menu-col-thumb-overlay">
                      <span className="mega-menu-col-badge">HC Carpets • 34 Designs</span>
                    </div>
                  </div>
                  <div className="mega-menu-col-title">ARCHITECTURAL CARPETS & RUGS</div>
                  <div className="mega-menu-col-subtitle">Hand-Knotted Mulberry Silk & Highland Wool Masterpieces</div>

                  <ul className="mega-menu-links">
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_carpets')}>
                      <span>Pure Mulberry Silk Masterpieces</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_carpets')}>
                      <span>Royal Isfahan & Imperial Kashan</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_carpets')}>
                      <span>Tabriz Mahi Heritage Gold Weft</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_carpets')}>
                      <span>Modernist Minimalist Abstract</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_carpets')}>
                      <span>Anatolian Oushak Soft-Tone Rugs</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_carpets')}>
                      <span>Nain Habibian Arabesque Silk</span>
                      <ChevronRight size={13} />
                    </li>
                  </ul>

                  <span className="mega-menu-col-cta" onClick={() => handleNavClick('catalog', 'cat_carpets')}>
                    Explore 34 HC Carpet Specs <ArrowRight size={13} />
                  </span>
                </div>

                {/* Column 3: Whole-House Custom & Joinery */}
                <div className="mega-menu-col">
                  <div className="mega-menu-col-thumb">
                    <img src="/assets/products/interior_1.jpeg" alt="Whole-House Custom" />
                    <div className="mega-menu-col-thumb-overlay">
                      <span className="mega-menu-col-badge">Custom Joinery</span>
                    </div>
                  </div>
                  <div className="mega-menu-col-title">WHOLE-HOUSE CUSTOMIZATION</div>
                  <div className="mega-menu-col-subtitle">Modular Cabinetry, Walk-in Closets & Architectural Cladding</div>

                  <ul className="mega-menu-links">
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_kitchen')}>
                      <span>Floor-to-Ceiling Wardrobe Systems</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_kitchen')}>
                      <span>Walk-in Dressing Suites & Islands</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_whole_house')}>
                      <span>Acoustic Walnut Slat Wall Panels</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_kitchen')}>
                      <span>Minimalist Island Kitchen Joinery</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_whole_house')}>
                      <span>Architectural TV & Media Walls</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('services')}>
                      <span>Turnkey Millwork Packages</span>
                      <ChevronRight size={13} />
                    </li>
                  </ul>

                  <span className="mega-menu-col-cta" onClick={() => handleNavClick('catalog', 'cat_whole_house')}>
                    Explore Whole-House Sourcing <ArrowRight size={13} />
                  </span>
                </div>

                {/* Column 4: Marble, Flooring & Baths */}
                <div className="mega-menu-col">
                  <div className="mega-menu-col-thumb">
                    <img src="/assets/products/interior_3.jpeg" alt="Marble & Sanitary" />
                    <div className="mega-menu-col-thumb-overlay">
                      <span className="mega-menu-col-badge">Natural Stone</span>
                    </div>
                  </div>
                  <div className="mega-menu-col-title">MARBLE, FLOORING & BATHS</div>
                  <div className="mega-menu-col-subtitle">Polished Italian Stone & Monolithic Resin Sanitary Ware</div>

                  <ul className="mega-menu-links">
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_flooring')}>
                      <span>Carrara Polished Marble Slabs</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_sanitary')}>
                      <span>Freestanding Solid Stone Bathtubs</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_sanitary')}>
                      <span>Monolithic Vessel Basin Vanities</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_flooring')}>
                      <span>Hardwood Multi-Ply Engineered Parquet</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_sanitary')}>
                      <span>Thermostatic Concealed Showers</span>
                      <ChevronRight size={13} />
                    </li>
                    <li className="mega-menu-link-item" onClick={() => handleNavClick('catalog', 'cat_flooring')}>
                      <span>Commercial Grade Large Slabs</span>
                      <ChevronRight size={13} />
                    </li>
                  </ul>

                  <span className="mega-menu-col-cta" onClick={() => handleNavClick('catalog', 'cat_flooring')}>
                    Explore Stone & Baths <ArrowRight size={13} />
                  </span>
                </div>

                {/* Column 5: Featured Experience (3D Atelier & VIP Concierge) */}
                <div className="mega-menu-featured-col">
                  <div className="mega-menu-featured-card">
                    <span className="mega-menu-featured-pill">3D Configurator</span>
                    <div className="mega-menu-featured-title">Interactive 3D Atelier</div>
                    <div className="mega-menu-featured-desc">
                      Inspect architectural models in WebGL. Rotate 360°, test finishes, and swap real-world materials before production.
                    </div>
                    <button 
                      className="mega-menu-btn-launch"
                      onClick={() => handleNavClick('3d-show')}
                    >
                      <Sparkles size={13} /> Launch 3D Configurator
                    </button>
                  </div>

                  <div className="mega-menu-featured-card">
                    <span className="mega-menu-featured-pill">Curated Scenes</span>
                    <div className="mega-menu-featured-title">Shop The Look Hotspots</div>
                    <div className="mega-menu-featured-desc">
                      Explore living rooms, master suites & kitchens with clickable material nodes for instant ordering.
                    </div>
                    <button 
                      className="mega-menu-btn-launch"
                      style={{ background: '#ffffff', color: 'var(--color-bg-navy)' }}
                      onClick={() => handleNavClick('shop-look')}
                    >
                      <Layers size={13} /> Explore Room Mockups
                    </button>
                  </div>

                  <div style={{ padding: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                      VIP ARCHITECTURAL CONCIERGE
                    </div>
                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.45rem', 
                        color: '#25D366', 
                        fontSize: '0.8rem', 
                        fontWeight: '700',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageCircle size={15} /> Chat Direct with Engineer
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Assurance Strip */}
              <div className="mega-menu-bottom-bar">
                <div className="mega-menu-bottom-item">
                  <CheckCircle2 size={15} />
                  <span>100% Direct Factory Sourcing (Zero Middleman Markups)</span>
                </div>
                <div className="mega-menu-bottom-item">
                  <Ruler size={15} />
                  <span>Free CAD Blueprint & Dimension Take-Off</span>
                </div>
                <div className="mega-menu-bottom-item">
                  <Box size={15} />
                  <span>Nationwide Freight with Dedicated Crane Offloading</span>
                </div>
                <div className="mega-menu-bottom-item">
                  <ShieldCheck size={15} />
                  <span>Maiduguri HQ Showroom & Certified 10-Yr Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => handleNavClick('projects')}
            >
              PROJECTS
            </span>
          </div>

          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === '3d-show' ? 'active' : ''}`}
              onClick={() => handleNavClick('3d-show')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>3D ATELIER</span>
              <span style={{ 
                fontSize: '0.62rem', 
                backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                color: 'var(--color-gold)', 
                padding: '0.1rem 0.35rem', 
                borderRadius: '4px', 
                border: '1px solid var(--color-gold)', 
                fontWeight: '700' 
              }}>
                LIVE
              </span>
            </span>
          </div>

          <div className="nav-item">
            <span 
              className={`nav-link ${activeTab === 'tracking' ? 'active' : ''}`}
              onClick={() => handleNavClick('tracking')}
            >
              TRACK ORDER
            </span>
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
            <Phone size={15} />
            <span>+234 9068875555</span>
          </a>

          {/* Admin Executive Controls - ONLY visible when authenticated */}
          {adminUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={() => handleNavClick('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: activeTab === 'admin' ? 'var(--color-bg-navy)' : 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid var(--color-gold)',
                  color: activeTab === 'admin' ? 'var(--color-gold)' : 'var(--color-bg-navy)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                title={`Executive Portal: ${adminUser.email}`}
              >
                <Settings size={15} color="var(--color-gold)" />
                <span>Admin</span>
              </button>
              <button
                onClick={onLogout}
                title="Lock Terminal / Sign Out"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={12} style={{ marginRight: '2px' }} /> Out
              </button>
            </div>
          )}

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

              {/* ONE-STOP SOLUTIONS (Mobile Accordion) */}
              <div className="mobile-nav-item-dropdown">
                <div 
                  className="mobile-dropdown-trigger"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <span className={activeTab === 'services' ? 'active' : ''}>ONE-STOP SOLUTIONS</span>
                  <ChevronDown size={16} className={mobileServicesOpen ? 'rotated' : ''} />
                </div>
                {mobileServicesOpen && (
                  <div className="mobile-sub-menu">
                    <span onClick={() => handleNavClick('services')}>Residential Luxury Villas</span>
                    <span onClick={() => handleNavClick('services')}>Commercial & Corporate Fit-Out</span>
                    <span onClick={() => handleNavClick('services')}>Hospitality & Hotel Sourcing</span>
                    <span onClick={() => handleNavClick('services')}>CAD Blueprint Analysis & 3D Measure</span>
                    <span onClick={() => handleNavClick('3d-show')} style={{ color: 'var(--color-gold)' }}>3D Spatial Rendering Atelier</span>
                    <span onClick={() => handleNavClick('services')}>Container Logistics & Crane Lift Offloading</span>
                  </div>
                )}
              </div>

              {/* PRODUCT PORTFOLIO (Mobile Accordion with Direct Category Filters) */}
              <div className="mobile-nav-item-dropdown">
                <div 
                  className="mobile-dropdown-trigger"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  <span className={activeTab === 'catalog' || activeTab === 'shop-look' ? 'active' : ''}>
                    PRODUCT PORTFOLIO
                  </span>
                  <ChevronDown size={16} className={mobileProductsOpen ? 'rotated' : ''} />
                </div>
                {mobileProductsOpen && (
                  <div className="mobile-sub-menu">
                    <span onClick={() => handleNavClick('catalog', '')} style={{ fontWeight: '700' }}>
                      All Architectural Collections
                    </span>
                    <span onClick={() => handleNavClick('catalog', 'cat_doors')}>
                      🚪 Luxury Doors & Entries
                    </span>
                    <span onClick={() => handleNavClick('catalog', 'cat_carpets')} style={{ color: 'var(--color-gold-muted)', fontWeight: '600' }}>
                      🧶 Luxury Architectural Carpets (34 Specs)
                    </span>
                    <span onClick={() => handleNavClick('catalog', 'cat_whole_house')}>
                      🪵 Whole-House Custom Joinery
                    </span>
                    <span onClick={() => handleNavClick('catalog', 'cat_flooring')}>
                      🏛️ Carrara Marble & Hardwood Flooring
                    </span>
                    <span onClick={() => handleNavClick('catalog', 'cat_kitchen')}>
                      🍳 Kitchen & Wardrobe Systems
                    </span>
                    <span onClick={() => handleNavClick('catalog', 'cat_sanitary')}>
                      🛁 Solid Stone Bathtubs & Sanitary Ware
                    </span>
                    <span onClick={() => handleNavClick('shop-look')} style={{ color: 'var(--color-gold)' }}>
                      🛋️ Shop The Look (Room Hotspots)
                    </span>
                    <span onClick={() => handleNavClick('3d-show')} style={{ color: 'var(--color-gold)', fontWeight: '700' }}>
                      🌐 3D Virtual Showroom (Atelier)
                    </span>
                  </div>
                )}
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                SIGNATURE PROJECTS
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === '3d-show' ? 'active' : ''}`}
                onClick={() => handleNavClick('3d-show')}
                style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>3D VIRTUAL SHOWROOM</span>
                <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(212, 175, 55, 0.25)', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid var(--color-gold)' }}>3D</span>
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === 'tracking' ? 'active' : ''}`}
                onClick={() => handleNavClick('tracking')}
              >
                TRACK FABRICATION TICKET
              </div>

              <div 
                className={`mobile-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                CONTACT & RFQ
              </div>

              {/* Admin Menu Item - ONLY visible when authenticated */}
              {adminUser && (
                <>
                  <div 
                    className={`mobile-nav-item ${activeTab === 'admin' ? 'active' : ''}`}
                    onClick={() => handleNavClick('admin')}
                    style={{ color: 'var(--color-gold)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>ADMIN CONTROL CENTER</span>
                    <span style={{ fontSize: '0.68rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-bg-navy)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                      AUTHENTICATED
                    </span>
                  </div>
                  <div
                    className="mobile-nav-item"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    style={{ color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <LogOut size={16} /> Sign Out (Admin)
                  </div>
                </>
              )}
            </nav>

            <div className="mobile-drawer-footer">
              <button 
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleNavClick('contact')}
              >
                Request Architectural Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
