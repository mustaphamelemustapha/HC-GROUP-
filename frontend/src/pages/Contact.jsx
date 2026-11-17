import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, 
  HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, ArrowRight, MessageCircle 
} from 'lucide-react';

export default function Contact({ setActiveTab }) {
  const directPhone = '+234 9068875555';
  const whatsappUrl = `https://wa.me/2349068875555?text=${encodeURIComponent(
    'Hello HC Group, I am interested in your luxury architectural materials and turnkey interior solutions.'
  )}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: 'Private Villa',
    scope: ['Doors & Windows'],
    budget: '₦50,000,000 - ₦150,000,000 (Luxury Residence)',
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
    'Luxury Architectural Carpets & Rugs',
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
      q: 'How quickly can your team deploy for on-site measurement in Nigeria or internationally?',
      a: 'For projects in Maiduguri, Borno State, Abuja, Lagos, and across Nigeria, our technical surveying team can deploy within 24 to 48 hours with 3D LiDAR laser scanners. For international projects, we schedule spatial audits aligned with your contractor’s construction milestones.'
    },
    {
      q: 'Can I discuss my project directly over phone or WhatsApp right now?',
      a: `Yes! You can call or chat directly with our senior project sourcing director at ${directPhone}. We review blueprints, preliminary schedules, and specification sheets via WhatsApp in real-time.`
    },
    {
      q: 'What is the standard procurement and production lead time?',
      a: 'Bespoke custom items such as architectural pivot doors, laser-cut marble slabs, and custom modular joinery typically require 25 to 45 business days for factory fabrication. Freight logistics range from 5 days (air cargo) to 20-35 days (ocean container freight directly cleared into Nigerian ports and transported safely to your site in Borno or nationwide).'
    },
    {
      q: 'Do you deliver physical material sample kits?',
      a: 'Yes. Once an initial architectural drawing or material schedule is reviewed with our engineering team, we dispatch a curated sample box (hardwood finishes, marble batches, hardware swatches, aluminum profiles) directly via express courier to your office or residence.'
    },
    {
      q: 'How are customs clearance and import duties handled?',
      a: 'We provide full DDP (Delivered Duty Paid) shipping terms. Our dedicated logistics partners manage port customs declarations, tariff documentation, bonded transport, and coordinated hydraulic offloading at your project site.'
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
            Speak directly with our engineering team for immediate quotes and on-site measurements.
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
                  A Senior Technical Director has been assigned to your request and will reach out via <strong>{formData.email}</strong> or phone/WhatsApp within 24 hours with preliminary pricing and schedule coordination.
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="whatsapp-action-btn"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp Now
                  </a>
                  <button 
                    className="btn-outline" 
                    onClick={() => {
                      setSuccessResult(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        project_type: 'Private Villa',
                        scope: ['Doors & Windows'],
                        budget: '₦50,000,000 - ₦150,000,000 (Luxury Residence)',
                        location: '',
                        message: ''
                      });
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-head">
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    Request Quotation & Consultation
                  </h2>
                  <p style={{ color: '#334155', fontSize: '0.95rem' }}>
                    Fill out your project specifications below, or call our direct hotline: <strong style={{ color: 'var(--color-gold-muted)' }}>{directPhone}</strong>
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
                      placeholder="e.g. Chief Adeleke / Arch. Ibrahim" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Professional Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. contact@domain.com" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone / WhatsApp *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +234 906 887 5555" 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Architectural Firm</label>
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
                      <option value="₦25,000,000 - ₦50,000,000 (Medium Scale)">₦25,000,000 - ₦50,000,000 (Medium Scale)</option>
                      <option value="₦50,000,000 - ₦150,000,000 (Luxury Residence)">₦50,000,000 - ₦150,000,000 (Luxury Residence)</option>
                      <option value="₦150,000,000 - ₦500,000,000 (Commercial / Estate)">₦150,000,000 - ₦500,000,000 (Commercial / Estate)</option>
                      <option value="₦500,000,000+ (Turnkey Mega Project)">₦500,000,000+ (Turnkey Mega Project)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Location (City, State / Country)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. GRA, Maiduguri / Sir Kashim Ibrahim Way / Maitama, Abuja" 
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
                  <label>Project Scope & Specifications</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details on ceiling heights, door aperture dimensions, preferred wood species, marble finishes, or site delivery requirements..."
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
            
            {/* VIP Direct Action Card */}
            <div className="vip-hotline-card">
              <span className="badge-luxury" style={{ marginBottom: '0.75rem' }}>DIRECT CONCIERGE HOTLINE</span>
              <h3 style={{ fontSize: '1.7rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                {directPhone}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Speak directly with an architectural director or message us on WhatsApp for rapid material quotes and site surveys.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-action-btn">
                  <MessageCircle size={18} />
                  <span>WhatsApp Chat</span>
                </a>
                <a href="tel:+2349068875555" className="call-action-btn" style={{ flex: 1, justifyContent: 'center' }}>
                  <Phone size={16} />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Global Offices Card */}
            <div className="info-card">
              <h3 className="info-card-title">Corporate Offices & Facilities</h3>
              
              <div className="info-item">
                <MapPin size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Headquarters & Borno Operations</strong>
                  <p>Sir Kashim Ibrahim Way / GRA, Maiduguri, Borno State, Nigeria</p>
                  <span className="info-sub">Direct Line: +234 9068875555 &bull; Executive Consultation</span>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Liaison Offices (Abuja & Lagos)</strong>
                  <p>Maitama District, Abuja &bull; Admiralty Way, Lekki Phase 1, Lagos</p>
                  <span className="info-sub">Project Coordination &bull; In-Person Consultation</span>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Automated CNC Manufacturing Plant</strong>
                  <p>HC Industrial Technology Park, Foshan, Guangdong Province</p>
                  <span className="info-sub">50,000 m² Automated Factory & Stone Cutting Yards</span>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Middle East Liaison Office</strong>
                  <p>Emaar Square, Downtown Dubai, United Arab Emirates</p>
                  <span className="info-sub">High-End Hospitality & Luxury Residential Sourcing</span>
                </div>
              </div>

              <div className="info-item">
                <Mail size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Official Architectural Inquiries</strong>
                  <p>info@hcgroup-trade.com</p>
                  <span className="info-sub">Encrypted CAD Blueprint submissions</span>
                </div>
              </div>

              <div className="info-item">
                <Clock size={22} color="var(--color-gold)" className="info-icon" />
                <div>
                  <strong>Operating Hours</strong>
                  <p>Monday – Saturday: 08:00 – 19:00 (WAT / GMT+1)</p>
                  <span className="info-sub">24/7 Priority Concierge for Active Building Sites</span>
                </div>
              </div>
            </div>

            {/* Turnkey Guarantee Callout */}
            <div className="turnkey-callout-card">
              <ShieldCheck size={36} color="var(--color-gold)" />
              <div>
                <h4>Certified Turnkey Accountability</h4>
                <p>
                  Every order is backed by dedicated project engineers, certified zero-tolerance laser fitting, and our 10-year structural warranty.
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
