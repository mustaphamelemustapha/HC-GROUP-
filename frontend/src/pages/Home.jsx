import React, { useState, useEffect, useRef } from 'react';
import { 
  PenTool, 
  Ruler, 
  Factory, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    type: 'video',
    src: '/assets/products/carpets/carpet_showcase.mp4',
    badge: '4K ARCHITECTURAL REEL: LUXURY CARPET WEAVING',
    eyebrow: 'WHOLE-HOUSE BESPOKE ARCHITECTURE',
    title: 'Premium Building Materials & Hand-Knotted Textiles',
    subtitle: 'One-stop luxury sourcing for private villas, five-star resorts, and elite estates. Factory-direct manufacturing with certified zero-tolerance site installation.'
  },
  {
    id: 2,
    type: 'image',
    src: '/assets/products/interior_1.jpeg',
    badge: 'PRESIDENTIAL FOYER & COPPER PIVOT DOOR',
    eyebrow: 'ZERO-TOLERANCE JOINERY',
    title: 'Architectural Entries & Executive Millwork',
    subtitle: 'From oversized pivot entrances to continuous bookmatched stone panels, tailored for luxury living in Maiduguri and across Nigeria.'
  },
  {
    id: 3,
    type: 'image',
    src: '/assets/products/carpets/carpet_1.jpeg',
    badge: 'ROYAL ISFAHAN EMBOSSED SILK & WOOL',
    eyebrow: 'HERITAGE ARCHITECTURAL FLOORINGS',
    title: 'Museum-Grade Architectural Carpets & Rugs',
    subtitle: 'Hand-knotted silk and New Zealand virgin wool crafted with organic botanical motifs for presidential suites and private estates.'
  },
  {
    id: 4,
    type: 'image',
    src: '/assets/products/interior_3.jpeg',
    badge: 'EXECUTIVE MASTER DRESSING SUITE & MARBLE',
    eyebrow: 'ITALIAN CARRARA & BESPOKE WARDROBES',
    title: 'Whole-Villa Interior Craftsmanship',
    subtitle: 'Integrated acoustic fluted timber, back-lit translucent quartz, and flush-mounted architectural millwork manufactured to millimeter precision.'
  },
  {
    id: 5,
    type: 'image',
    src: '/assets/products/interior_4.jpeg',
    badge: 'MINIMALIST CULINARY STUDIO & ACOUSTIC TIMBER',
    eyebrow: 'PRECISION GERMAN & ITALIAN KITCHENS',
    title: 'Executive Kitchen & Living Suites',
    subtitle: 'Monolithic quartz waterfall islands with hidden Blum hardware, built-in ambient lighting, and bespoke architectural finishes.'
  },
  {
    id: 6,
    type: 'image',
    src: '/assets/products/door_1.jpeg',
    badge: 'HIGH-SECURITY OVERSIZED COPPER PIVOT DOOR',
    eyebrow: 'ARCHITECTURAL EXTERIOR ENTRANCES',
    title: 'Engineered Pivot Entries & Hardware',
    subtitle: 'Thermally broken German steel frames with biometric multi-point locking and hand-hammered patinated architectural copper.'
  }
];

export default function Home({ setActiveTab }) {
  const directPhone = '+234 9068875555';
  const whatsappUrl = `https://wa.me/2349068875555?text=${encodeURIComponent(
    'Hello HC Group, I am interested in your luxury architectural materials and turnkey interior solutions.'
  )}`;

  // Hero Background Reel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef(null);

  // Auto-advance slides every 6.5s unless hovered or manually paused
  useEffect(() => {
    if (isPaused) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPaused]);

  const handlePrevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const services = [
    { id: 1, title: 'Design & CAD', icon: <PenTool />, desc: 'Bespoke architectural drawings and 4K spatial rendering.' },
    { id: 2, title: 'Laser Measurement', icon: <Ruler />, desc: '3D LiDAR on-site surveying for zero-tolerance fitting.' },
    { id: 3, title: 'Precision Producing', icon: <Factory />, desc: '5-Axis automated CNC fabrication and book-matched stone.' },
    { id: 4, title: 'Delivery & Logistics', icon: <Truck />, desc: 'Direct flatbed and crane-lift offload to your building site.' },
    { id: 5, title: 'Master Installation', icon: <Wrench />, desc: 'White-glove assembly by certified master technicians.' },
    { id: 6, title: '10-Year Warranty', icon: <ShieldCheck />, desc: 'Complete structural guarantee and continuous lifecycle care.' },
  ];

  const categories = [
    { id: 1, name: 'Luxury Doors & Entries', image: '/assets/products/door_1.jpeg', catId: 'cat_doors' },
    { id: 2, name: 'Luxury Carpets & Rugs', image: '/assets/products/carpets/carpet_1.jpeg', catId: 'cat_carpets' },
    { id: 3, name: 'Carrara Marble & Flooring', image: '/assets/products/interior_3.jpeg', catId: 'cat_flooring' },
    { id: 4, name: 'Kitchen & Custom Wardrobe', image: '/assets/products/interior_1.jpeg', catId: 'cat_kitchen' },
    { id: 5, name: 'Sanitary Ware & Baths', image: '/assets/products/interior_2.jpeg', catId: 'cat_sanitary' },
  ];

  const projects = [
    { id: 1, title: 'The Al-Barka Executive Estate', location: 'GRA, Maiduguri, Borno State', image: '/assets/products/interior_1.jpeg' },
    { id: 2, title: 'Kyarimi Presidential Residence & VIP Pavilion', location: 'Old GRA, Maiduguri, Borno State', image: '/assets/products/interior_2.jpeg' },
    { id: 3, title: 'Borno State Commercial Complex', location: 'Sir Kashim Ibrahim Way, Maiduguri', image: '/assets/products/interior_3.jpeg' },
    { id: 4, title: 'Lake Chad Executive Lodges & Suites', location: 'Bama Road Corridor, Maiduguri', image: '/assets/products/interior_4.jpeg' },
  ];

  const activeMedia = HERO_SLIDES[currentSlide];

  return (
    <div className="home-page">
      {/* Dynamic Cinematic Hero Section (Changing Photos & Videos) */}
      <section 
        className="hero-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="HC Group Architectural Showcase"
      >
        {/* Layered Changing Media Reel */}
        <div className="hero-background">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div 
                key={slide.id} 
                className={`hero-slide ${isActive ? 'active' : ''}`}
                aria-hidden={!isActive}
              >
                {slide.type === 'video' ? (
                  <video
                    src={slide.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="hero-media hero-video"
                  />
                ) : (
                  <img 
                    src={slide.src} 
                    alt={slide.badge} 
                    className="hero-media hero-image"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Ambient Luxury Dark Radial Overlay */}
        <div className="hero-overlay"></div>

        {/* Previous / Next Arrow Controls */}
        <button 
          className="hero-arrow hero-arrow-prev"
          onClick={handlePrevSlide}
          aria-label="Previous showcase media"
          title="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          className="hero-arrow hero-arrow-next"
          onClick={handleNextSlide}
          aria-label="Next showcase media"
          title="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Hero Content Overlay */}
        <div className="hero-content">
          {/* Live Media Tag Badge */}
          <div className="hero-badge-reel">
            <span className="hero-badge-pulse"></span>
            <span>{activeMedia.badge}</span>
          </div>

          <h1 className="hero-title">
            Premium Building <span>Materials</span>
          </h1>

          <p className="hero-subtitle">
            {activeMedia.subtitle}
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

        {/* Bottom Slide Indicator Pills & Pause Indicator */}
        <div className="hero-controls-bar">
          <div className="hero-indicators">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                className={`hero-indicator-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}: ${slide.badge}`}
                title={slide.badge}
              />
            ))}
          </div>
          <button 
            className="hero-pause-toggle"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            <span>{isPaused ? 'Paused' : 'Auto-Reel'}</span>
          </button>
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

      {/* Interactive 3D Virtual Showroom Featured Section */}
      <section className="section-container dark" style={{ padding: '2rem 2rem 4rem' }}>
        <div style={{
          backgroundColor: '#0c1630',
          border: '1px solid var(--color-border-gold)',
          borderRadius: '16px',
          padding: '3rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge-luxury">IMMERSIVE SPATIAL STUDIO</span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>• WEBGL 3D</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#ffffff', marginBottom: '1rem', lineHeight: '1.2' }}>
              Inspect Whole-House Materials in <span style={{ color: 'var(--color-gold)' }}>Interactive 3D</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Experience millimeter-precision CAD models of our oversized copper pivot doors, hand-knotted silk carpets, and bookmatched Carrara marble slabs. Orbit 360°, test real-world architectural daylighting, and customize luxury finishes before fabrication.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="btn-gold" 
                style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}
                onClick={() => setActiveTab('3d-show')}
              >
                Launch 3D Virtual Showroom <ArrowRight size={16} />
              </button>
              <button 
                className="btn-outline" 
                style={{ padding: '0.9rem 1.75rem', color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.4)' }}
                onClick={() => setActiveTab('shop-look')}
              >
                Shop The Look (Room Hotspots)
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
            }}>
              <img 
                src="/assets/products/door_1.jpeg" 
                alt="3D Architectural Material Preview" 
                style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(12, 22, 48, 0.92)',
              border: '1px solid var(--color-gold)',
              borderRadius: '9999px',
              padding: '0.45rem 1.4rem',
              color: 'var(--color-gold)',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
            }}>
              360° ORBITAL VIEWER • REAL-TIME DAYLIGHTING
            </div>
          </div>
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
          <span className="section-eyebrow">SIGNATURE FABRICATION PORTFOLIO</span>
          <h2 className="section-title">Featured Developments (Maiduguri & Regional Hubs)</h2>
          <p className="section-subtitle">Take a look at prestigious presidential estates, VIP suites, and commercial landmarks outfitted by HC Group.</p>
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
