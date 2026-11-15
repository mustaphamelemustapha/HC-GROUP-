import React from 'react';
import { PenTool, Ruler, Factory, Truck, Wrench, ShieldCheck, ArrowRight, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function Home({ setActiveTab }) {
  const directPhone = '+234 9068875555';
  const whatsappUrl = `https://wa.me/2349068875555?text=${encodeURIComponent(
    'Hello HC Group, I am interested in your luxury architectural materials and turnkey interior solutions.'
  )}`;

  const services = [
    { id: 1, title: 'Design & CAD', icon: <PenTool />, desc: 'Bespoke architectural drawings and 4K spatial rendering.' },
    { id: 2, title: 'Laser Measurement', icon: <Ruler />, desc: '3D LiDAR on-site surveying for zero-tolerance fitting.' },
    { id: 3, title: 'Precision Producing', icon: <Factory />, desc: '5-Axis automated CNC fabrication and book-matched stone.' },
    { id: 4, title: 'Delivery & Logistics', icon: <Truck />, desc: 'Direct flatbed and crane-lift offload to your building site.' },
    { id: 5, title: 'Master Installation', icon: <Wrench />, desc: 'White-glove assembly by certified master technicians.' },
    { id: 6, title: '10-Year Warranty', icon: <ShieldCheck />, desc: 'Complete structural guarantee and continuous lifecycle care.' },
  ];

  const categories = [
    { id: 1, name: 'Doors & Windows', image: '/assets/products/door_1.jpeg' },
    { id: 2, name: 'Premium Marble & Tiles', image: '/assets/products/door_3.jpeg' },
    { id: 3, name: 'Kitchen & Wardrobe', image: '/assets/products/door_7.jpeg' },
    { id: 4, name: 'Sanitary Wares & Baths', image: '/assets/products/door_9.jpeg' },
  ];

  const projects = [
    { id: 1, title: 'The Royal Villa', location: 'Dubai, UAE', image: '/assets/products/interior_1.jpeg' },
    { id: 2, title: 'Azure Hotel Resort', location: 'Maldives', image: '/assets/products/interior_2.jpeg' },
    { id: 3, title: 'Skyline Penthouse', location: 'New York, USA', image: '/assets/products/interior_3.jpeg' },
    { id: 4, title: 'Grand Medical Center', location: 'London, UK', image: '/assets/products/interior_4.jpeg' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/assets/products/interior_1.jpeg" alt="Luxury Interior" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="badge-luxury" style={{ marginBottom: '1.25rem' }}>WHOLE-HOUSE BESPOKE ARCHITECTURE</span>
          <h1 className="hero-title">Premium Building <span>Materials</span></h1>
          <p className="hero-subtitle">
            One-stop luxury sourcing for private villas, five-star resorts, and elite estates. 
            Factory-direct manufacturing with certified zero-tolerance site installation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <a href="#" className="hero-cta" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>
              Explore Materials
            </a>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-cta whatsapp-cta"
            >
              <MessageCircle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              WhatsApp: {directPhone}
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">INTEGRATED EXCELLENCE</span>
          <h2 className="section-title">The One-Stop Turnkey Service</h2>
          <p className="section-subtitle">
            We handle everything from initial architectural sketches to factory manufacturing, bonded freight, and master installation.
          </p>
        </div>
        <div className="services-grid">
          {services.map(service => (
            <div 
              key={service.id} 
              className="service-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab('services')}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="section-container dark">
        <div className="section-header">
          <span className="section-eyebrow" style={{ color: 'var(--color-gold)' }}>CURATED PORTFOLIO</span>
          <h2 className="section-title">Architectural Product Lines</h2>
          <p className="section-subtitle" style={{ color: 'var(--color-text-muted)' }}>
            Discover our comprehensive range of high-end doors, Italian marble, custom joinery, and sanitary ware.
          </p>
        </div>
        <div className="categories-masonry">
          {categories.map(category => (
            <a href="#" key={category.id} className="category-tile" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Direct VIP Consultation Callout Banner */}
      <section className="section-container" style={{ padding: '0 2rem' }}>
        <div className="vip-consultation-banner">
          <div className="vip-banner-grid">
            <div className="vip-banner-text">
              <span className="badge-luxury">DIRECT PROJECT HOTLINE</span>
              <h2>Ready to Specify Materials for Your Next Build?</h2>
              <p>
                Speak directly with our senior project directors for immediate bill-of-quantities review, 
                CAD blueprint audits, and on-site 3D laser measurement scheduling.
              </p>
              <div className="vip-checks">
                <span><CheckCircle2 size={16} color="var(--color-gold)" /> Rapid Quote Delivery (24-48 Hours)</span>
                <span><CheckCircle2 size={16} color="var(--color-gold)" /> Physical Material Sample Swatches</span>
                <span><CheckCircle2 size={16} color="var(--color-gold)" /> 10-Year Certified Structural Guarantee</span>
              </div>
            </div>

            <div className="vip-banner-actions">
              <div className="vip-phone-box">
                <span className="vip-phone-label">Direct Line / WhatsApp</span>
                <a href="tel:+2349068875555" className="vip-phone-number">
                  <Phone size={22} color="var(--color-gold)" />
                  <strong>{directPhone}</strong>
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="whatsapp-action-btn"
                  style={{ justifyContent: 'center', width: '100%' }}
                >
                  <MessageCircle size={18} /> Chat on WhatsApp Now
                </a>
                <button 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setActiveTab('contact')}
                >
                  Submit Official RFQ Form <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">WORLD-CLASS DEVELOPMENTS</span>
          <h2 className="section-title">Featured International Projects</h2>
          <p className="section-subtitle">Take a look at some of the world-class environments we've helped create.</p>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="project-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab('projects')}
            >
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-location">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a 
            href="#" 
            className="hero-cta" 
            style={{ background: 'transparent', border: '2px solid var(--color-bg-navy)', color: 'var(--color-bg-navy)' }}
            onClick={(e) => { e.preventDefault(); setActiveTab('projects'); }}
          >
            Explore Complete Portfolio <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
          </a>
        </div>
      </section>
    </div>
  );
}
