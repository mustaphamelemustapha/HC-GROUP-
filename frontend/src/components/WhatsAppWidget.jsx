import React, { useState } from 'react';
import { MessageCircle, Phone, X, Layers, Ruler, Truck, FileText } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '2349068875555';
  const displayPhone = '+234 9068875555';

  const defaultMsg = 'Hello HC Group, I am interested in your luxury building materials and turnkey interior solutions.';
  
  const QUICK_PROMPTS = [
    {
      label: 'Luxury Carpets & Rugs',
      icon: <Layers size={13} />,
      text: 'Hello HC Group, I would like to inquire about your Luxury Hand-Knotted Silk & Wool Carpets collection.'
    },
    {
      label: '3D Atelier & Custom Doors',
      icon: <FileText size={13} />,
      text: 'Hello HC Group, I am reviewing your 3D Architectural Showroom for custom oversized pivot doors.'
    },
    {
      label: 'Book 3D LiDAR Survey',
      icon: <Ruler size={13} />,
      text: 'Hello HC Group, I would like to book a zero-tolerance 3D LiDAR laser spatial audit for my project site.'
    },
    {
      label: 'Track Order / BoQ Quote',
      icon: <Truck size={13} />,
      text: 'Hello HC Group, I would like to track my fabrication schedule or request an official BoQ quotation.'
    }
  ];

  return (
    <div className="whatsapp-floating-widget">
      {isOpen && (
        <div className="whatsapp-popup-card">
          <div className="whatsapp-popup-header">
            <div className="whatsapp-header-info">
              <div className="online-indicator"></div>
              <div>
                <strong>HC Group VIP Concierge</strong>
                <span>Headquarters: Maiduguri, Borno State</span>
              </div>
            </div>
            <button 
              className="whatsapp-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="whatsapp-popup-body">
            <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.9rem', color: '#334155', lineHeight: '1.5' }}>
              Good day! Connect directly with our Senior Project Directors for immediate quotation and CAD review:
            </p>

            {/* Quick-Prompt Inquiry Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1rem' }}>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(prompt.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '0.45rem 0.75rem',
                    color: 'var(--color-bg-navy)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }}
                >
                  <span style={{ color: 'var(--color-gold)' }}>{prompt.icon}</span>
                  <span>{prompt.label}</span>
                </a>
              ))}
            </div>

            <div className="whatsapp-direct-number">
              <Phone size={14} color="#10b981" />
              <span>Direct Hotline: <strong>{displayPhone}</strong></span>
            </div>
          </div>

          <div className="whatsapp-popup-footer">
            <a 
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-action-btn"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>
            <a 
              href={`tel:+${phoneNumber}`} 
              className="call-action-btn"
            >
              <Phone size={16} />
              <span>Call Direct</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button 
        className="whatsapp-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact via WhatsApp"
        title="Direct Line: +234 9068875555"
      >
        <MessageCircle size={26} />
        <span className="whatsapp-label">Concierge</span>
      </button>
    </div>
  );
}
