import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, 
  HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, ArrowRight 
} from 'lucide-react';

export default function Contact({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: 'Private Villa',
    scope: ['Doors & Windows'],
    budget: '$50,000 - $150,000',
    location: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const scopeOptions = [
    'Doors & Windows',
    'Kitchen & Wardrobe',
    'Sanitary Ware & Baths',
    'Marble & Stone Slabs',
    'Acoustic Wall Panels',
    'Whole-House Customization'
  ];

  const handleScopeToggle = (opt) => {
    setFormData(prev => {
      const exists = prev.scope.includes(opt);
      if (exists) {
        return { ...prev, scope: prev.scope.filter(s => s !== opt) };
      } else {
        return { ...prev, scope: [...prev.scope, opt] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccessResult(data);
      setLoading(false);
    } catch (err) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'What is the standard procurement and production lead time?',
      a: 'Bespoke custom items such as architectural pivot doors, laser-cut marble slabs, and custom modular joinery typically require 25 to 45 business days for factory fabrication. Freight logistics range from 5 days (air cargo) to 20-35 days (ocean container freight depending on destination port).'
    },
    {
      q: 'Do you deliver physical material sample kits?',
      a: 'Yes. Once an initial architectural drawing or material schedule is reviewed with our engineering team, we dispatch a curated sample box (hardwood finishes, marble batches, hardware swatches, aluminum profiles) directly via express courier to your office.'
    },
    {
      q: 'How are customs clearance and import duties handled?',
      a: 'We provide full DDP (Delivered Duty Paid) or CIF (Cost, Insurance and Freight) shipping terms. Our sovereign logistics partners manage customs declarations, import documentation, and coordinated offloading at your project site.'
    },
    {
      q: 'Can your team provide on-site measurement and installation abroad?',
      a: 'Absolutely. For whole-house luxury projects, we deploy senior measurement technicians with 3D LiDAR scanners for initial spatial audits, followed by factory-certified master installers for final assembly.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <img src="/assets/products/interior_4.jpeg" alt="Contact HC Group" />
        </div>
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <span className="badge-luxury">DIRECT TECHNICAL CONSULTATION</span>
          <h1 className="contact-hero-title">
            Connect With An <span>Architectural Director</span>
          </h1>
          <p className="contact-hero-desc">
            Submit your project specifications, CAD drawings, or material requirements. 
            Our dedicated project directors will review your scope and respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <section className="section-container" style={{ paddingTop: '3rem' }}>
        <div className="contact-main-grid">
          
          {/* Form Column */}
          <div className="contact-form-card">
            {successResult ? (
              <div className="inquiry-success-panel">
                <CheckCircle2 size={56} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
                <h3>Inquiry Successfully Registered</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your project inquiry has been logged in our system under reference:
                </p>
                <div className="ticket-badge">{successResult.inquiryId}</div>
                <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '1rem' }}>
                  A Senior Technical Director has been assigned to your request and will reach out via <strong>{formData.email}</strong> within 24 hours with preliminary pricing and schedule coordination.
                </p>
                <button 
                  className="btn-gold" 
                  style={{ marginTop: '2rem' }}
                  onClick={() => {
                    setSuccessResult(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      project_type: 'Private Villa',
                      scope: ['Doors & Windows'],
                      budget: '$50,000 - $150,000',
                      location: '',
                      message: ''
                    });
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-head">
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    Request Quotation & Consultation
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                    Please fill out the technical specifications below for your project.
                  </p>
                </div>

                {errorMsg && (
                  <div className="form-error-alert">
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Lord Alistair Vance" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Professional Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. vance@architects.com" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input 
                      type="text" 
                      placeholder="+1 (555) 019-2834" 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Firm / Estate</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Studio Vance Architecture" 
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Project Classification</label>
                    <select 
                      value={formData.project_type}
                      onChange={e => setFormData({ ...formData, project_type: e.target.value })}
                    >
                      <option value="Private Villa">Private Luxury Villa / Estate</option>
                      <option value="Luxury Hotel / Resort">Luxury Hotel / Resort</option>
                      <option value="Penthouse Apartment">Penthouse / High-End Residence</option>
                      <option value="Commercial Development">Commercial Headquarters</option>
                      <option value="General Trade Inquiry">Wholesale / Trade Sourcing</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estimated Material Budget</label>
                    <select 
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000 - $150,000">$50,000 - $150,000</option>
                      <option value="$150,000 - $500,000">$150,000 - $500,000</option>
                      <option value="$500,000+">$500,000+ (Whole-Estate Development)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Location (City, Country)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dubai, UAE or Beverly Hills, CA" 
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.6rem' }}>
                    Required Material Categories:
                  </label>
                  <div className="scope-pills-wrap">
                    {scopeOptions.map(opt => (
                      <button
                        type="button"
                        key={opt}
                        className={`scope-pill-toggle ${formData.scope.includes(opt) ? 'active' : ''}`}
                        onClick={() => handleScopeToggle(opt)}
                      >
                        {formData.scope.includes(opt) && <CheckCircle2 size={14} style={{ marginRight: '6px' }} />}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Scope & Requirements</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your dimensions, preferred woods/stones, hardware specifications, or special acoustic/fire safety requirements..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '1rem' }}
                  disabled={loading}
                >
                  {loading ? 'Submitting Specifications...' : (
                    <>
                      Submit Project RFQ <Send size={18} style={{ marginLeft: '8px' }} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Direct Info Column */}
          <div className="contact-info-col">
            
            {/* Global Offices Card */}
            <div className="info-card">
              <h3 className="info-card-title">Global Headquarters & Facilities</h3>
              
              <div className="info-item">
                <MapPin size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Manufacturing Base & Showroom</strong>
                  <p>HC Industrial Technology Park, Foshan, Guangdong Province</p>
                  <span className="info-sub">50,000 m² Automated CNC & Joinery Facility</span>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Middle East Liaison Office</strong>
                  <p>Emaar Square, Downtown Dubai, United Arab Emirates</p>
                  <span className="info-sub">Architectural Consulting & Project Handover</span>
                </div>
              </div>

              <div className="info-item">
                <Mail size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Executive Concierge & Inquiries</strong>
                  <p>concierge@hcgroup-trade.com</p>
                  <span className="info-sub">Encrypted CAD Blueprint submissions</span>
                </div>
              </div>

              <div className="info-item">
                <Phone size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Direct Engineering Hotline</strong>
                  <p>+86 757 8892 1099 / +971 4 812 9000</p>
                  <span className="info-sub">Monday – Saturday: 08:00 – 20:00 (GMT+8)</span>
                </div>
              </div>
            </div>

            {/* Turnkey Guarantee Callout */}
            <div className="turnkey-callout-card">
              <ShieldCheck size={36} color="var(--color-gold)" />
              <div>
                <h4>Direct Sovereign Support</h4>
                <p>
                  Every approved inquiry is paired with a dedicated project manager who handles quotation, CAD verification, and freight logistics until handover.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container" style={{ borderTop: '1px solid var(--color-border-light)', marginTop: '4rem', paddingTop: '4rem' }}>
        <div className="section-header">
          <span className="section-eyebrow">COMMON PROCUREMENT INQUIRIES</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Key details regarding our manufacturing standards, logistics, and international service.</p>
        </div>

        <div className="faq-accordion-container">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
              <button 
                className="faq-question-btn"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={18} color="var(--color-gold)" /> : <ChevronDown size={18} />}
              </button>
              {openFaq === idx && (
                <div className="faq-answer-panel">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
