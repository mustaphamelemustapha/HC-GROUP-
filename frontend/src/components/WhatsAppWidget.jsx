import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '2349068875555';
  const displayPhone = '+234 9068875555';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Hello HC Group, I am interested in your luxury building materials and turnkey interior solutions.'
  )}`;

  return (
    <div className="whatsapp-floating-widget">
      {isOpen && (
        <div className="whatsapp-popup-card">
          <div className="whatsapp-popup-header">
            <div className="whatsapp-header-info">
              <div className="online-indicator"></div>
              <div>
                <strong>HC Group Concierge</strong>
                <span>Typically replies instantly</span>
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
            <p>
              Good day! Looking for architectural doors, bespoke joinery, marble slabs, or turnkey luxury fit-out for your project?
            </p>
            <div className="whatsapp-direct-number">
              <Phone size={14} color="#10b981" />
              <span>Direct Line: <strong>{displayPhone}</strong></span>
            </div>
          </div>

          <div className="whatsapp-popup-footer">
            <a 
              href={whatsappUrl}
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
        <span className="whatsapp-pulse"></span>
        <MessageCircle size={28} />
        <span className="whatsapp-label">WhatsApp</span>
      </button>
    </div>
  );
}
