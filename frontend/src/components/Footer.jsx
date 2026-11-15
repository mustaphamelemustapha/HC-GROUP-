import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, ShieldCheck, Factory } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const directPhone = '+234 9068875555';
  const whatsappUrl = `https://wa.me/2349068875555?text=${encodeURIComponent(
    'Hello HC Group, I am interested in your luxury architectural materials and turnkey interior solutions.'
  )}`;

  const handleNav = (tab, e) => {
    if (e) e.preventDefault();
    if (setActiveTab) {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-grid">
        {/* Brand Information */}
        <div className="footer-brand">
          <div className="logo" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo.jpg" alt="HC Group" style={{ height: '42px', marginRight: '10px', borderRadius: '4px', border: '1px solid var(--color-gold-muted)' }} />
            HC <span>GROUP</span>
          </div>
          <p className="footer-desc">
            International Leader in Bespoke Building Materials, Whole-House Architectural Customization, 
            and Turnkey Luxury Interiors. Serving villas, penthouses, hotels, and prestigious commercial landmarks.
          </p>
          <div className="footer-direct-badge">
            <ShieldCheck size={18} color="var(--color-gold)" />
            <span>10-Year Certified Structural Guarantee</span>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => handleNav('home', e)}>Home</a></li>
            <li><a href="#" onClick={(e) => handleNav('about', e)}>About HC Group</a></li>
            <li><a href="#" onClick={(e) => handleNav('services', e)}>One-Stop Turnkey Service</a></li>
            <li><a href="#" onClick={(e) => handleNav('projects', e)}>Global Projects Portfolio</a></li>
            <li><a href="#" onClick={(e) => handleNav('shop-look', e)}>Shop The Look (Room Hotspots)</a></li>
            <li><a href="#" onClick={(e) => handleNav('contact', e)}>Request Formal Quote (RFQ)</a></li>
          </ul>
        </div>

        {/* Product Classes */}
        <div>
          <h4 className="footer-title">Architectural Lines</h4>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => handleNav('catalog', e)}>Luxury Pivot & French Doors</a></li>
            <li><a href="#" onClick={(e) => handleNav('catalog', e)}>Italian Carrara Marble & Slabs</a></li>
            <li><a href="#" onClick={(e) => handleNav('catalog', e)}>Freestanding Solid Stone Baths</a></li>
            <li><a href="#" onClick={(e) => handleNav('catalog', e)}>Modular Custom Wardrobes</a></li>
            <li><a href="#" onClick={(e) => handleNav('catalog', e)}>Acoustic Timber Wall Cladding</a></li>
            <li><a href="#" onClick={(e) => handleNav('catalog', e)}>Thermal-Break Sliding Glass</a></li>
          </ul>
        </div>

        {/* Real Contact & Office Details */}
        <div>
          <h4 className="footer-title">Direct Inquiries</h4>
          <ul className="footer-links footer-contact">
            <li>
              <Phone size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <a href="tel:+2349068875555" style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '1rem' }}>
                  {directPhone}
                </a>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Call / WhatsApp Direct Hotline
                </span>
              </div>
            </li>
            <li>
              <MessageCircle size={18} color="#25D366" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: '600' }}>
                  Open WhatsApp Chat
                </a>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Instant response from our team
                </span>
              </div>
            </li>
            <li>
              <Mail size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <a href="mailto:info@hcgroup-trade.com" style={{ color: '#ffffff' }}>
                  info@hcgroup-trade.com
                </a>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Architectural CAD & Inquiries
                </span>
              </div>
            </li>
            <li>
              <MapPin size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#ffffff' }}>Corporate Headquarters:</strong>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  HC Group House, Sir Kashim Ibrahim Way / GRA, Maiduguri, Borno State, Nigeria
                </span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gold-muted)', marginTop: '2px' }}>
                  Liaison Desks: Maitama, Abuja & Lekki Phase 1, Lagos
                </span>
              </div>
            </li>
            <li>
              <Factory size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#ffffff' }}>Manufacturing Base:</strong>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  HC Industrial Park, Foshan, Guangdong Province
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HC Group (H-C COMPANY LTD). All rights reserved.</p>
        <p>Bespoke Whole-House Customization • International Logistics • Precision Engineering</p>
      </div>
    </footer>
  );
}
