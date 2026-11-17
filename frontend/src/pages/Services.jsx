import React, { useState } from 'react';
import { 
  PenTool, Ruler, Factory, Truck, Wrench, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronRight, Layers, FileCheck, Sparkles, Building 
} from 'lucide-react';

export default function Services({ setActiveTab }) {
  const [activeServiceId, setActiveServiceId] = useState(1);

  const services = [
    {
      id: 1,
      name: 'Design & Engineering',
      icon: <PenTool size={26} />,
      tagline: 'Architectural blueprints & photorealistic spatial rendering',
      heroImage: '/assets/products/interior_1.jpeg',
      description: 'Our in-house design engineering team collaborates directly with architectural firms and interior designers. We convert rough spatial concepts into fully documented production shop drawings, CAD blueprints, and photorealistic 3D renders that simulate lighting, materiality, and tactile textures.',
      deliverables: [
        'Complete 2D CAD shop drawings & BIM models',
        'Photorealistic 4K interior room visualizations',
        'Physical material swatch & sample finish kits',
        'Mechanical & electrical clash detection review'
      ],
      leadTime: '7 - 14 Business Days',
      bestFor: 'Luxury Villas, Boutique Hotels, Penthouse Renovations'
    },
    {
      id: 2,
      name: 'Precision Measurement',
      icon: <Ruler size={26} />,
      tagline: 'Millimeter-perfect 3D laser spatial surveying',
      heroImage: '/assets/products/interior_3.jpeg',
      description: 'There is no margin for error in bespoke luxury architecture. We deploy trained measurement engineers to your construction site equipped with 3D LiDAR laser scanners. Every ceiling alcove, door opening, and wall angle is mapped to zero-tolerance specifications before cutting starts in our factory.',
      deliverables: [
        'Sub-millimeter 3D point cloud spatial audit',
        'Structural plumb and level verification report',
        'Custom aperture sizing for oversized pivot doors',
        'Subfloor moisture and structural load testing'
      ],
      leadTime: 'On-demand schedule coordination',
      bestFor: 'Custom Joinery, Oversized Entrance Doors, Book-matched Marble'
    },
    {
      id: 3,
      name: 'Precision Manufacturing',
      icon: <Factory size={26} />,
      tagline: '5-Axis CNC milling, handcrafted joinery & stone craftsmanship',
      heroImage: '/assets/products/door_1.jpeg',
      description: 'Our automated 50,000 m² factory pairs German computerized precision machinery with multi-generational master craftsmen. Whether carving solid European oak doors, book-matching Italian marble slabs, or fabricating thermal-break minimalist aluminum windows, we maintain rigorous QA checkpoints at every step.',
      deliverables: [
        'Batch-matched timber veneers & solid hardwoods',
        'Precision automated 5-axis CNC router millwork',
        'Class B1 fire-rated and acoustic damping treatments',
        'Multi-stage UV lacquering and hand-applied patinas'
      ],
      leadTime: '25 - 45 Days depending on custom scope',
      bestFor: 'Whole-house millwork, Pivot Doors, Sanitary Stone Baths'
    },
    {
      id: 4,
      name: 'Dedicated Freight & Logistics',
      icon: <Truck size={26} />,
      tagline: 'Direct delivery, Borno depot staging & specialized crane offloading',
      heroImage: '/assets/products/interior_4.jpeg',
      description: 'Moving oversized doors, solid marble bathtubs, and multi-ton consignments of luxury carpets and glass requires bespoke logistical execution. Our freight engine coordinates dedicated heavy flatbeds, customs clearance, and specialized crane-lift offloading direct to your job site in Maiduguri, Borno State, and nationwide.',
      deliverables: [
        'Custom ISPM-15 certified timber shock crating',
        'Direct milestone tracking through our Project Tracker (#tracking)',
        'Maiduguri central logistics depot staging (Sir Kashim Ibrahim Way)',
        'Coordinated hydraulic crane-lift offload at project site'
      ],
      leadTime: 'Dedicated flatbed express transit (Scheduled with contractor)',
      bestFor: 'Heavy architectural deliveries, multi-ton marble, oversized doors & luxury carpets'
    },
    {
      id: 5,
      name: 'Master Installation',
      icon: <Wrench size={26} />,
      tagline: 'White-glove site assembly by certified master technicians',
      heroImage: '/assets/products/door_2.jpeg',
      description: 'The finest materials mean nothing without flawless assembly. HC Group provides factory-certified master technicians who supervise and execute every installation. From concealed hinges and smart electronic locking systems to flush-recessed baseboards, we guarantee razor-sharp alignment.',
      deliverables: [
        'Dedicated bilingual on-site installation director',
        'Laser-calibrated leveling and alignment verification',
        'Integration of smart locking and motorized drapery tracks',
        'Post-installation debris removal and surface polishing'
      ],
      leadTime: 'Scheduled with general contractor milestones',
      bestFor: 'Zero-tolerance concealed doors, modular wardrobes, heavy stone'
    },
    {
      id: 6,
      name: 'Warranty & Lifecycle Care',
      icon: <ShieldCheck size={26} />,
      tagline: '10-Year structural guarantee & continuous concierge care',
      heroImage: '/assets/products/interior_2.jpeg',
      description: 'Our commitment extends long past handover. Every HC Group installation is backed by an ironclad 10-year structural warranty covering materials, hardware, and joint integrity. We maintain permanent archival records of your project finishes for effortless future matching or replacement.',
      deliverables: [
        'Formal 10-Year Certificate of Structural Warranty',
        'Comprehensive maintenance and cleaning care guide',
        'Archived batch records for exact future material reorders',
        'Priority 48-hour response for warranty claims'
      ],
      leadTime: 'Immediate coverage upon sign-off',
      bestFor: 'All residential, hospitality, and commercial projects'
    }
  ];

  const currentService = services.find(s => s.id === activeServiceId) || services[0];

  return (
    <div className="services-page">
      {/* Hero Header */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <img src="/assets/products/interior_5.jpeg" alt="One-Stop Services" />
        </div>
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <span className="badge-luxury">INTEGRATED ARCHITECTURAL SOLUTIONS</span>
          <h1 className="services-hero-title">
            The One-Stop <span>Turnkey Service</span>
          </h1>
          <p className="services-hero-desc">
            From preliminary CAD sketches and laser measurement to factory production, sovereign logistics, 
            and white-glove site installation — HC Group delivers end-to-end perfection.
          </p>
        </div>
      </section>

      {/* Interactive Service Navigator */}
      <section className="section-container" style={{ paddingTop: '3rem' }}>
        <div className="services-pill-selector">
          {services.map(s => (
            <button
              key={s.id}
              className={`service-pill-btn ${activeServiceId === s.id ? 'active' : ''}`}
              onClick={() => setActiveServiceId(s.id)}
            >
              <span className="pill-icon">{s.icon}</span>
              <span className="pill-text">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Detailed Service Showcase Card */}
        <div className="service-detail-card">
          <div className="service-detail-grid">
            <div className="service-detail-text">
              <div className="service-step-label">
                <span className="step-num">PILLAR 0{currentService.id}</span>
                <span className="step-sep">•</span>
                <span className="step-tagline">{currentService.tagline}</span>
              </div>
              <h2 className="service-detail-title">{currentService.name}</h2>
              <p className="service-detail-desc">{currentService.description}</p>

              <div className="service-deliverables-box">
                <h4 className="deliverables-heading">
                  <FileCheck size={18} color="var(--color-gold)" style={{ marginRight: '8px' }} />
                  Guaranteed Scope & Deliverables:
                </h4>
                <div className="deliverables-list">
                  {currentService.deliverables.map((item, i) => (
                    <div key={i} className="deliverable-item">
                      <CheckCircle2 size={16} color="var(--color-gold)" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-metadata-grid">
                <div className="meta-box">
                  <span className="meta-label">Standard Lead Time</span>
                  <strong className="meta-value">{currentService.leadTime}</strong>
                </div>
                <div className="meta-box">
                  <span className="meta-label">Recommended Applications</span>
                  <strong className="meta-value">{currentService.bestFor}</strong>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn-gold"
                  onClick={() => setActiveTab('contact')}
                >
                  Commission This Service <ArrowRight size={18} />
                </button>
                <button 
                  className="btn-outline"
                  onClick={() => setActiveTab('catalog')}
                >
                  Browse Associated Products
                </button>
              </div>
            </div>

            <div className="service-detail-visual">
              <div className="service-image-wrapper">
                <img src={currentService.heroImage} alt={currentService.name} />
                <div className="service-image-caption">
                  <span>HC Engineering Protocol • Verified Architectural Grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Step Interactive Process Grid */}
      <section className="section-container dark">
        <div className="section-header">
          <span className="section-eyebrow" style={{ color: 'var(--color-gold)' }}>SEAMLESS ORCHESTRATION</span>
          <h2 className="section-title">The Turnkey Execution Process</h2>
          <p className="section-subtitle" style={{ color: '#cbd5e1' }}>
            Six integrated phases that eliminate coordination risks between suppliers and subcontractors.
          </p>
        </div>

        <div className="services-grid-six">
          {services.map(s => (
            <div 
              key={s.id} 
              className={`service-mini-card ${activeServiceId === s.id ? 'highlighted' : ''}`}
              onClick={() => {
                setActiveServiceId(s.id);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
            >
              <div className="mini-card-head">
                <div className="mini-card-icon">{s.icon}</div>
                <span className="mini-card-num">0{s.id}</span>
              </div>
              <h3 className="mini-card-title">{s.name}</h3>
              <p className="mini-card-desc">{s.tagline}</p>
              <div className="mini-card-action">
                <span>View Details</span>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Turnkey Assurance CTA */}
      <section className="section-container">
        <div className="turnkey-banner">
          <div className="turnkey-banner-content">
            <Building size={40} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
            <h2>Require a Custom Turnkey Proposal?</h2>
            <p>
              Upload your CAD drawings, spatial plans, or material specification schedule. 
              Our senior engineering team will return a complete line-item proposal and logistics plan within 48 hours.
            </p>
            <button className="btn-gold" onClick={() => setActiveTab('contact')} style={{ marginTop: '1.5rem' }}>
              Request Full Turnkey Proposal <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
