import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo.jpg" alt="HC Group" style={{ height: '40px', marginRight: '10px', borderRadius: '4px' }} />
            HC <span>GROUP</span>
          </div>
          <p className="footer-desc">
            Premium Full-Stack Interior Design and Material Marketplace. We provide one-stop solutions for villas, apartments, hotels, hospitals, and shopping malls worldwide.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">One-Stop Service</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Products</h4>
          <ul className="footer-links">
            <li><a href="#">Doors & Windows</a></li>
            <li><a href="#">Tile & Flooring</a></li>
            <li><a href="#">Sanitary Wares</a></li>
            <li><a href="#">Kitchen & Wardrobe</a></li>
            <li><a href="#">Marble & Granite</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Contact Us</h4>
          <ul className="footer-links footer-contact">
            <li>
              <MapPin size={18} />
              <span>Global Headquarters<br/>HC Group Building, Premium Dist.</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+1 (800) 123-4567<br/>Mon-Fri 9am-6pm</span>
            </li>
            <li>
              <Mail size={18} />
              <span>sales@hcgroup.com<br/>support@hcgroup.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HC Group Material. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
}
