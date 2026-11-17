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
  Pause,
  Layers,
  Sparkles,
  Box,
  Building,
  Check,
  Compass,
  FileText
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
    'Hello HC Group, I am interested in your luxury architectural materials, whole-house procurement and turnkey fit-out solutions.'
  )}`;

  // Hero Background Reel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef(null);

  // 5-Stage Procurement Workflow State (George Build Standard)
  const [activeWorkflowStage, setActiveWorkflowStage] = useState(0);

  // Auto-advance hero slides every 6.5s unless hovered or manually paused
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

  // 5-Stage One-Stop Sourcing Workflow (George Build Benchmark)
  const workflowStages = [
    {
      stageNum: '01',
      tabTitle: 'CAD Floor Plans & 3D Audit',
      tabSub: 'Aperture Take-Off & Structural Analysis',
      badge: 'PHASE 01 • ARCHITECTURAL CONSULTATION & TAKE-OFF',
      title: 'CAD Blueprint Analysis & Precision Aperture Audit',
      desc: 'Our senior architectural engineers convert your raw architectural DWG, PDF, or IFC BIM plans into production shop drawings. We audit structural ceiling heights, aperture tolerances, and mechanical clearances to eliminate costly site errors before factory cutting begins.',
      deliverables: [
        'Sub-millimeter aperture schedule take-off',
        '2D CAD production shop drawings & BIM clash check',
        'Structural weight & volumetric load calculations',
        'Pre-fabrication on-site 3D LiDAR laser coordination'
      ],
      metrics: [
        { label: 'Turnaround', val: '24 – 48 Hours' },
        { label: 'Audit Accuracy', val: '±0.5mm 3D Point Cloud' },
        { label: 'Input Formats', val: 'DWG, PDF, RVT, IFC' }
      ],
      image: '/assets/products/interior_1.jpeg',
      tag: 'Engineering Phase'
    },
    {
      stageNum: '02',
      tabTitle: '3D Spatial & Material Matrix',
      tabSub: 'WebGL Real-Time Finish Commissioning',
      badge: 'PHASE 02 • VISUALIZATION & MATERIAL PAIRING',
      title: 'Interactive 3D Spatial Rendering & Physical Swatches',
      desc: 'Experience your project before a single cut is made. Through our proprietary WebGL 3D Atelier, architects and estate owners inspect millimeter-accurate 3D models, test real-time daylight reflections across Carrara marble and walnut joinery, and match silk carpet palettes.',
      deliverables: [
        'Real-time 360° WebGL 3D model inspection',
        'Natural daylight & ambient lighting simulation',
        'Physical luxury material swatch sample kit to site',
        'Harmonized cross-category finish palette'
      ],
      metrics: [
        { label: 'Visualization', val: 'WebGL 360° Real-Time' },
        { label: 'Swatch Delivery', val: 'Express Courier to Site' },
        { label: 'Material Library', val: '120+ Verified Specs' }
      ],
      image: '/assets/products/carpets/carpet_1.jpeg',
      tag: 'Interactive 3D Atelier'
    },
    {
      stageNum: '03',
      tabTitle: 'Factory Direct Fabrication',
      tabSub: '5-Axis CNC & Hand-Crafted Artistry',
      badge: 'PHASE 03 • FACTORY FABRICATION & WEAVING',
      title: '5-Axis Computerized CNC & Hand-Crafted Artistry',
      desc: 'Our manufacturing ecosystem pairs automated German 5-axis CNC joinery and high-pressure stone waterjets with generational master weavers. Every oversized pivot door, composite resin bathtub, and silk rug is manufactured directly at factory cost with zero middleman broker markups.',
      deliverables: [
        '5-Axis automated CNC joinery & zero-tolerance tenons',
        'Computerized waterjet Carrara marble bookmatching',
        '1.6M knots/m² pure mulberry silk rug weaving',
        'Class A fire-safe & moisture retardant sealings'
      ],
      metrics: [
        { label: 'Precision Machinery', val: '5-Axis Automated CNC' },
        { label: 'Pricing Currency', val: 'Direct Factory in ₦' },
        { label: 'Quality Checkpoints', val: '4-Tier Verification' }
      ],
      image: '/assets/products/door_1.jpeg',
      tag: 'Direct Factory Supply'
    },
    {
      stageNum: '04',
      tabTitle: '100% Quality Assurance',
      tabSub: 'Pre-Shipment Audit & Timber Crating',
      badge: 'PHASE 04 • QUALITY ASSURANCE & PACKAGING',
      title: '100% Pre-Shipment Inspection & Timber Crating',
      desc: 'Every consignment undergoes rigorous pre-shipment trial assembly, acoustic testing, and structural balance verification. Items are vacuum-sealed in multi-layer protective membranes and enclosed in ISPM-15 certified timber shock-crates designed for West African transport resilience.',
      deliverables: [
        'Complete dry-fit trial assembly and balance check',
        'Pre-shipment photographic & video audit reports',
        'Anti-scratch multi-layer foam & vacuum sealing',
        'Heavy-duty custom reinforced timber shock crates'
      ],
      metrics: [
        { label: 'Defect Protocol', val: 'Zero-Defect Protocol' },
        { label: 'Crating Standard', val: 'ISPM-15 Certified Timber' },
        { label: 'Audit Record', val: 'Pre-Dispatch Video Proof' }
      ],
      image: '/assets/products/interior_4.jpeg',
      tag: 'Pre-Shipment Inspection'
    },
    {
      stageNum: '05',
      tabTitle: 'Freight & Site Crane Handover',
      tabSub: 'Nationwide Delivery & 10-Yr Warranty',
      badge: 'PHASE 05 • LOGISTICS & CERTIFIED HANDOVER',
      title: 'Nationwide Freight Logistics & Crane Lift Offloading',
      desc: 'From our Maiduguri Central Logistics Depot and regional staging hubs in Abuja and Lagos, our dedicated freight fleet transports materials directly to your site across all 36 Nigerian states. Specialized hydraulic flatbeds and mobile cranes offload heavy marble slabs and oversized pivot doors under certified engineer supervision.',
      deliverables: [
        'Direct flatbed freight transit with GPS milestone tracking',
        'Specialized site crane-lift offload supervision',
        'White-glove assembly by certified master technicians',
        'Certified 10-Year Structural Handover Warranty'
      ],
      metrics: [
        { label: 'Geographic Reach', val: 'All 36 Nigerian States' },
        { label: 'Fleet Equipment', val: 'Hydraulic Flatbed & Crane' },
        { label: 'Structural Care', val: '10-Year Certified Care' }
      ],
      image: '/assets/products/interior_3.jpeg',
      tag: 'White-Glove Site Handover'
    }
  ];

  const currentStage = workflowStages[activeWorkflowStage];

  const categories = [
    { id: 1, name: 'Luxury Doors & Entries', image: '/assets/products/door_1.jpeg', catId: 'cat_doors' },
    { id: 2, name: 'Luxury Carpets & Rugs (HC Carpets)', image: '/assets/products/carpets/carpet_1.jpeg', catId: 'cat_carpets' },
    { id: 3, name: 'Carrara Marble & Flooring', image: '/assets/products/interior_3.jpeg', catId: 'cat_flooring' },
    { id: 4, name: 'Kitchen & Custom Wardrobe', image: '/assets/products/interior_1.jpeg', catId: 'cat_kitchen' },
    { id: 5, name: 'Sanitary Ware & Baths', image: '/assets/products/interior_2.jpeg', catId: 'cat_sanitary' },
    { id: 6, name: 'Whole-House Acoustic Cladding', image: '/assets/products/interior_4.jpeg', catId: 'cat_whole_house' },
  ];

  const projects = [
    { id: 1, title: 'The Maitama Diplomatic Villa & Executive Pavilion', location: 'Maitama, Abuja FCT', area: '3,500 m²', image: '/assets/products/interior_3.jpeg' },
    { id: 2, title: 'Banana Island Waterfront Mansion & VIP Residence', location: 'Banana Island, Ikoyi, Lagos', area: '4,200 m²', image: '/assets/products/interior_1.jpeg' },
    { id: 3, title: 'The Al-Barka Royal Estate & Private Pavilion', location: 'Old GRA, Maiduguri, Borno State', area: '3,800 m²', image: '/assets/products/interior_5.jpeg' },
    { id: 4, title: 'Guzape Presidential Hills Villa & Penthouse', location: 'Guzape Hills, Abuja FCT', area: '2,900 m²', image: '/assets/products/interior_4.jpeg' },
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
          <div className="hero-badge-reel">
            <span>{activeMedia.badge}</span>
          </div>

          <h1 className="hero-title">
            Bespoke Architectural <span>Materials</span>
          </h1>

          <p className="hero-subtitle">
            {activeMedia.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.25rem' }}>
            <a href="#" className="hero-cta" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>
              Explore Materials Catalog
            </a>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-cta whatsapp-cta"
            >
              <MessageCircle size={17} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              WhatsApp Concierge
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

      {/* 1. THE 5-STAGE ONE-STOP PROCUREMENT WORKFLOW (George Build Benchmark) */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">INTEGRATED ARCHITECTURAL SOURCING</span>
          <h2 className="section-title">The One-Stop Procurement Journey</h2>
          <p className="section-subtitle">
            How HC Group eliminates coordination risks and broker markups—from raw CAD floor plans to certified on-site handover.
          </p>
        </div>

        <div className="procurement-workflow-container">
          {/* Horizontal Stage Selector Tabs */}
          <div className="workflow-stage-tabs">
            {workflowStages.map((stage, idx) => (
              <button
                key={stage.stageNum}
                className={`workflow-tab-btn ${activeWorkflowStage === idx ? 'active' : ''}`}
                onClick={() => setActiveWorkflowStage(idx)}
              >
                <span className="workflow-tab-num">{stage.stageNum}</span>
                <span className="workflow-tab-title">{stage.tabTitle}</span>
                <span className="workflow-tab-sub">{stage.tabSub}</span>
              </button>
            ))}
          </div>

          {/* Interactive Active Stage Showcase Card */}
          <div className="workflow-stage-card">
            <div className="workflow-stage-text">
              <div className="workflow-stage-badge">
                <Compass size={16} color="var(--color-gold)" />
                <span>{currentStage.badge}</span>
              </div>

              <h3 className="workflow-stage-title">{currentStage.title}</h3>
              <p className="workflow-stage-desc">{currentStage.desc}</p>

              <div className="workflow-deliverables-list">
                {currentStage.deliverables.map((item, i) => (
                  <div key={i} className="workflow-deliverable-item">
                    <CheckCircle2 size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="workflow-metrics-row">
                {currentStage.metrics.map((m, i) => (
                  <div key={i} className="workflow-metric-item">
                    <span className="workflow-metric-label">{m.label}</span>
                    <strong className="workflow-metric-val">{m.val}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn-gold"
                  onClick={() => setActiveTab('contact')}
                >
                  Submit Floor Plans for Review <ArrowRight size={16} />
                </button>
                <a
                  href={`https://wa.me/2349068875555?text=${encodeURIComponent(
                    `Hello HC Group, I am reviewing your One-Stop Sourcing Workflow (Stage ${currentStage.stageNum}: ${currentStage.title}) and would like to coordinate with your project engineering team.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <MessageCircle size={16} color="#25D366" /> Consult Project Director
                </a>
              </div>
            </div>

            <div className="workflow-stage-visual">
              <img src={currentStage.image} alt={currentStage.title} />
              <div className="workflow-visual-overlay">
                <span className="workflow-visual-tag">{currentStage.tag}</span>
                <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  HC Group Engineering Protocol &bull; Zero-Tolerance Specification
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BEHIND HC GROUP: SOURCING SCALE & INFRASTRUCTURE */}
      <section className="section-container" style={{ paddingTop: 0 }}>
        <div className="factory-scale-container">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <span className="badge-luxury">BEHIND HC GROUP &bull; MANUFACTURING SCALE & DIRECT SUPPLY CHAIN</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#ffffff', margin: '1rem 0 1rem', lineHeight: '1.2' }}>
              The Sourcing Power Behind Nigeria's <span style={{ color: 'var(--color-gold)' }}>Architectural Landmarks</span>
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.75' }}>
              By integrating precision manufacturing, Italian stone fabrication, and hand-knotted textiles into a unified direct-supply ecosystem, HC Group provides developers and estate owners with certified luxury at factory cost—free from middleman broker markups.
            </p>
          </div>

          <div className="factory-scale-grid">
            <div className="factory-scale-card">
              <div className="factory-scale-icon">
                <Building size={22} color="var(--color-gold)" />
              </div>
              <div className="factory-scale-num">30,000 m²</div>
              <div className="factory-scale-title">Showroom & Warehousing</div>
              <p className="factory-scale-desc">
                Central Maiduguri HQ Industrial Base (Sir Kashim Ibrahim Way / GRA) with regional staging depots in Abuja and Lagos.
              </p>
            </div>

            <div className="factory-scale-card">
              <div className="factory-scale-icon">
                <Factory size={22} color="var(--color-gold)" />
              </div>
              <div className="factory-scale-num">7 Lines</div>
              <div className="factory-scale-title">Integrated Production</div>
              <p className="factory-scale-desc">
                Automated 5-axis German CNC joinery, computerized marble waterjets, and pure silk weaving lofts under strict QA.
              </p>
            </div>

            <div className="factory-scale-card">
              <div className="factory-scale-icon">
                <ShieldCheck size={22} color="var(--color-gold)" />
              </div>
              <div className="factory-scale-num">100%</div>
              <div className="factory-scale-title">Direct Factory Sourcing</div>
              <p className="factory-scale-desc">
                Priced strictly in Nigerian Naira (₦) for complete budget certainty, eliminating currency conversion delays.
              </p>
            </div>

            <div className="factory-scale-card">
              <div className="factory-scale-icon">
                <Truck size={22} color="var(--color-gold)" />
              </div>
              <div className="factory-scale-num">36 States</div>
              <div className="factory-scale-title">Domestic Logistics Fleet</div>
              <p className="factory-scale-desc">
                Dedicated hydraulic heavy flatbeds and certified crane offloading to building sites nationwide with a 10-year warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES SECTION (Interactive Filters to Catalog) */}
      <section className="section-container dark">
        <div className="section-header">
          <span className="section-eyebrow" style={{ color: 'var(--color-gold)' }}>CURATED ARCHITECTURAL LINES</span>
          <h2 className="section-title">Core Material Classifications</h2>
          <p className="section-subtitle" style={{ color: '#cbd5e1' }}>
            Discover our comprehensive portfolio of oversized pivot doors, hand-knotted silk carpets, Italian Carrara marble, and modular millwork.
          </p>
        </div>
        <div className="categories-masonry">
          {categories.map(category => (
            <a 
              href="#" 
              key={category.id} 
              className="category-tile" 
              onClick={(e) => { 
                e.preventDefault(); 
                setActiveTab('catalog', category.catId); 
              }}
            >
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: '700', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Explore Specifications <ArrowRight size={13} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE 3D VIRTUAL SHOWROOM FEATURE */}
      <section className="section-container dark home-3d-feature-section">
        <div className="home-3d-feature-banner">
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span className="badge-luxury">THE HC ATELIER &bull; ARCHITECTURAL COMMISSIONING</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.3rem', color: '#ffffff', marginBottom: '1.25rem', lineHeight: '1.25', letterSpacing: '0.04em' }}>
              Experience Bespoke Finishes in <span style={{ color: 'var(--color-gold)' }}>Three Dimensions</span>
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '2.25rem' }}>
              Inspect millimeter-precision CAD models of our oversized copper pivot doors, hand-knotted silk carpets, and bookmatched Carrara marble slabs. Orbit 360°, examine natural daylight reflection across organic textures, and tailor individual bespoke finishes prior to factory fabrication.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="btn-gold" 
                style={{ padding: '0.95rem 2.2rem', fontSize: '0.85rem' }}
                onClick={() => setActiveTab('3d-show')}
              >
                Enter Digital Atelier <ArrowRight size={16} />
              </button>
              <button 
                className="btn-outline" 
                style={{ padding: '0.95rem 1.85rem', color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.45)', fontSize: '0.85rem' }}
                onClick={() => setActiveTab('shop-look')}
              >
                Shop The Look (Room Hotspots)
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
            }}>
              <img 
                src="/assets/products/door_1.jpeg" 
                alt="3D Architectural Material Preview" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(12, 22, 48, 0.95)',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              borderRadius: '2px',
              padding: '0.5rem 1.4rem',
              color: 'var(--color-gold)',
              fontSize: '0.74rem',
              fontWeight: '600',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
            }}>
              360° Material Commissioning &bull; Natural Daylighting
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE CASE STUDIES TEASER */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">SIGNATURE FABRICATION PORTFOLIO</span>
          <h2 className="section-title">Featured Landmark Projects (Nigeria)</h2>
          <p className="section-subtitle">A glimpse of prestigious presidential estates, diplomatic villas, and commercial landmarks outfitted by HC Group.</p>
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
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: '700', textTransform: 'uppercase' }}>
                  {project.area} &bull; Verified Build
                </span>
                <h3 className="project-title" style={{ marginTop: '0.25rem' }}>{project.title}</h3>
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
            Explore Complete 8-Project Portfolio <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
          </a>
        </div>
      </section>

      {/* 6. VIP CONSULTATION CALLOUT BANNER */}
      <section className="section-container home-vip-section">
        <div className="vip-consultation-banner">
          <div className="vip-banner-grid">
            <div className="vip-banner-text">
              <span className="badge-luxury">DIRECT PROJECT HOTLINE • MAIDUGURI HQ</span>
              <h2>Ready to Specify Materials for Your Next Build?</h2>
              <p>
                Speak directly with our senior project directors for immediate bill-of-quantities review, 
                CAD blueprint audits, and on-site 3D laser measurement scheduling.
              </p>
              <div className="vip-checks">
                <span><CheckCircle2 size={16} color="var(--color-gold)" /> Rapid BoQ Take-Off (24-48 Hours)</span>
                <span><CheckCircle2 size={16} color="var(--color-gold)" /> Physical Material Sample Swatches to Site</span>
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
    </div>
  );
}
