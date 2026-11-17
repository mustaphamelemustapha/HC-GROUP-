import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  X, 
  Building, 
  Home, 
  Hotel, 
  ShieldCheck, 
  Award, 
  Truck, 
  Sparkles,
  MessageCircle,
  FileText,
  Compass,
  Maximize2
} from 'lucide-react';

export default function Projects({ setActiveTab }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [activeModalImageIdx, setActiveModalImageIdx] = useState(0);

  const categories = [
    'All', 
    'Private Luxury Villas', 
    'Penthouse & Diplomatic Residences', 
    'Commercial Landmarks', 
    'Luxury Hospitality'
  ];

  const regions = [
    'All',
    'Abuja (FCT)',
    'Lagos',
    'Maiduguri (HQ)',
    'Kano',
    'Port Harcourt'
  ];

  const projects = [
    {
      id: 1,
      title: 'The Maitama Diplomatic Villa & Executive Pavilion',
      category: 'Private Luxury Villas',
      region: 'Abuja (FCT)',
      location: 'Maitama District, Abuja FCT',
      year: '2025',
      area: '3,500 m²',
      style: 'Modernist Neoclassical',
      image: '/assets/products/interior_3.jpeg',
      gallery: [
        '/assets/products/interior_3.jpeg',
        '/assets/products/door_1.jpeg',
        '/assets/products/carpets/carpet_1.jpeg',
        '/assets/products/interior_1.jpeg',
        '/assets/products/interior_2.jpeg'
      ],
      description: 'A landmark diplomatic estate in Maitama featuring 3.4m high ceiling apertures, motorized textured copper architectural pivot doors, book-matched Italian Carrara marble floorings, Royal Isfahan hand-knotted silk carpets, and bespoke walk-in walnut dressing suites.',
      materials: [
        'Grande Copper-Clad Motorized Architectural Pivot Doors (DR-PVT-01)',
        'Royal Isfahan Hand-Knotted Silk & Wool Rugs (HC-CRPT)',
        'Book-Matched Italian Carrara Polished Marble Slabs (FS-MARB)',
        'Floor-to-Ceiling Custom Italian Walnut Wardrobe Joinery (WH-WARD)',
        'Freestanding Matte White Resin Stone Soaking Tubs (SW-BATHT)',
        'Class A Fire-Safe Acoustic Timber Cladding & Security Glazing'
      ],
      freightMode: 'Dedicated Hydraulic Heavy Flatbed Direct to Maitama Site with Crane Lift Offloading',
      clientQuote: 'HC Group delivered 48 custom-engineered pivot doors and book-matched Carrara marble on schedule with zero transit breakage. Truly international standard.',
      architectName: 'Arc. Babatunde Adeleke, FNIA (Principal Architect)'
    },
    {
      id: 2,
      title: 'Banana Island Waterfront Mansion & VIP Residence',
      category: 'Private Luxury Villas',
      region: 'Lagos',
      location: 'Banana Island, Ikoyi, Lagos',
      year: '2025',
      area: '4,200 m²',
      style: 'Contemporary Marine Luxury',
      image: '/assets/products/interior_1.jpeg',
      gallery: [
        '/assets/products/interior_1.jpeg',
        '/assets/products/door_2.jpeg',
        '/assets/products/carpets/carpet_3.jpeg',
        '/assets/products/interior_4.jpeg',
        '/assets/products/door_3.jpeg'
      ],
      description: 'An ultra-luxury waterfront estate on Banana Island featuring moisture-resistant coastal joinery, Aurelia slim-profile carbon steel & glass French partitions, Tabriz Mahi heritage gold weft carpets, acoustic walnut media suites, and hidden pocket sliding glass systems.',
      materials: [
        'Aurelia Architectural Carbon Steel French Partition Doors',
        'Tabriz Mahi Heritage Silk & Metallic Gold Weft Rugs',
        'Marine-Grade Moisture Sealed Walnut Wardrobe Systems',
        'Acoustic Natural Walnut Wall Cladding with Felt Backing',
        'Minimalist Pocket Sliding Glass Systems with Concealed Tracks'
      ],
      freightMode: 'Dedicated Escorted Logistics Fleet to Banana Island Gated Enclave',
      clientQuote: 'The moisture-sealed custom joinery and slim steel doors withstand coastal humidity flawlessly. Flawless execution across all 4 levels.',
      architectName: 'Arc. Folashade Williams (Lead Interior Architect)'
    },
    {
      id: 3,
      title: 'The Al-Barka Royal Estate & Private Pavilion',
      category: 'Private Luxury Villas',
      region: 'Maiduguri (HQ)',
      location: 'Old GRA, Maiduguri, Borno State',
      year: '2025',
      area: '3,800 m²',
      style: 'Neo-Classical Grandeur',
      image: '/assets/products/interior_5.jpeg',
      gallery: [
        '/assets/products/interior_5.jpeg',
        '/assets/products/door_4.jpeg',
        '/assets/products/carpets/carpet_2.jpeg',
        '/assets/products/interior_2.jpeg',
        '/assets/products/door_5.jpeg'
      ],
      description: 'A monumental private villa in Maiduguri Old GRA designed to merge classical Kanem-Borno grandeur with contemporary interior architecture. Equipped with hand-carved Imperial European oak doors, Imperial Kashan medallion wool carpets, solid composite resin bathtubs, and concealed flush doors.',
      materials: [
        'Imperial Carved European Oak Doors with Gold Trim Accents',
        'Imperial Kashan Medallion Luxury Wool Carpets',
        'Freestanding Solid Composite Resin Stone Soaking Tubs',
        'Concealed Aluminum Frame Wall-Flush Interior Doors',
        'Italian Carrara Polished Marble Flooring & Fireplace Slabs'
      ],
      freightMode: 'White-Glove Local Transport & Certified Master Installation from Maiduguri HQ Base',
      clientQuote: 'The local availability of the Maiduguri fabrication center and showroom made precision adjustments instant. Exceptional craftsmanship.',
      architectName: 'Arc. Mohammed K. Kyari (Managing Partner)'
    },
    {
      id: 4,
      title: 'Guzape Presidential Hills Villa & Penthouse',
      category: 'Penthouse & Diplomatic Residences',
      region: 'Abuja (FCT)',
      location: 'Guzape District, Abuja FCT',
      year: '2025',
      area: '2,900 m²',
      style: 'Modernist Minimalist',
      image: '/assets/products/interior_4.jpeg',
      gallery: [
        '/assets/products/interior_4.jpeg',
        '/assets/products/door_6.jpeg',
        '/assets/products/carpets/carpet_4.jpeg',
        '/assets/products/interior_3.jpeg',
        '/assets/products/door_1.jpeg'
      ],
      description: 'Perched atop the Guzape hills, this modern penthouse features panoramic floor-to-ceiling vistas, frosted glass privacy doors, Aura modernist abstract silk rugs, Class A fire-rated acoustic walnut panels, and motorized textured copper pivot portals.',
      materials: [
        'Aura Minimalist Abstract Architectural Silk Carpets',
        'Class A Fire-Safe Acoustic Natural Walnut Wall Panels',
        'Frosted Glass Privacy Doors with Brushed Gold Hinges',
        'Grande Motorized Textured Copper Pivot Entrance Doors',
        'Large-Format Seamless Carrara Slabs & Vanities'
      ],
      freightMode: 'Hydraulic Tail-Lift Transport Direct to Guzape Hills High-Altitude Site',
      clientQuote: 'Acoustic isolation in the cinema hall and the bespoke silk carpets elevated this penthouse into an international-grade residence.',
      architectName: 'Engr. Tariq Danjuma (Project Director)'
    },
    {
      id: 5,
      title: 'Nassarawa Executive Commercial Headquarters',
      category: 'Commercial Landmarks',
      region: 'Kano',
      location: 'Nassarawa GRA, Kano State',
      year: '2024',
      area: '5,400 m²',
      style: 'Executive Landmark',
      image: '/assets/products/door_2.jpeg',
      gallery: [
        '/assets/products/door_2.jpeg',
        '/assets/products/interior_4.jpeg',
        '/assets/products/carpets/carpet_5.jpeg',
        '/assets/products/door_5.jpeg',
        '/assets/products/interior_1.jpeg'
      ],
      description: 'A premier multi-level commercial and executive headquarters in Kano Nassarawa GRA. Fitted with slim-profile steel glass partitions, Heriz royal palace carpets in presidential boardrooms, and magnetic concealed interior flush doors.',
      materials: [
        'Aurelia Architectural Carbon Steel French Glass Partitions',
        'Heriz Geometric Royal Palace Wool Carpets (High-Traffic Grade)',
        'Concealed Magnetic Wall-Integrated Interior Flush Doors',
        'Executive Modular Boardroom Credenzas & Cabinetry',
        'Commercial-Grade Polished Granite & Marble Tiles'
      ],
      freightMode: 'Heavy Flatbed Direct Freight from Maiduguri Logistics Depot to Kano Site',
      clientQuote: 'The acoustic performance in the executive boardrooms is world-class. Delivery from Maiduguri was seamless and rapid.',
      architectName: 'Arc. Sani Usman, MNIA'
    },
    {
      id: 6,
      title: 'Old GRA Presidential Haven & Private Residence',
      category: 'Private Luxury Villas',
      region: 'Port Harcourt',
      location: 'Old GRA, Port Harcourt, Rivers State',
      year: '2024',
      area: '3,200 m²',
      style: 'Tropical Contemporary',
      image: '/assets/products/interior_2.jpeg',
      gallery: [
        '/assets/products/interior_2.jpeg',
        '/assets/products/door_3.jpeg',
        '/assets/products/carpets/carpet_8.jpeg',
        '/assets/products/interior_3.jpeg',
        '/assets/products/door_1.jpeg'
      ],
      description: 'A tropical contemporary residence in Port Harcourt Old GRA outfitted with pure silk Qom rugs, moisture-sealed bathroom vanities, freestanding solid stone bathtubs, minimalist sliding pocket doors, and copper pivot portals.',
      materials: [
        'Qom Pure Mulberry Silk Masterpiece Rugs (1.6M knots/m²)',
        'Freestanding Matte White Solid Resin Stone Bathtubs',
        'Minimalist Pocket Sliding Glass Systems with Concealed Tracks',
        'Grande Textured Copper Clad Entrance Pivot Doors',
        'Anti-Bacterial Non-Porous Solid Stone Vanity Surfaces'
      ],
      freightMode: 'Dedicated South-South Logistics Escort to Port Harcourt Old GRA',
      clientQuote: 'Every piece arrived in custom timber crates with zero damage. The stone bathtubs and pure silk rugs are breathtaking.',
      architectName: 'Arc. Kenneth Briggs (Design Principal)'
    },
    {
      id: 7,
      title: 'Sir Kashim Ibrahim Commercial Plaza & VIP Suites',
      category: 'Commercial Landmarks',
      region: 'Maiduguri (HQ)',
      location: 'Sir Kashim Ibrahim Way, Maiduguri, Borno State',
      year: '2024',
      area: '6,800 m²',
      style: 'Commercial Landmark',
      image: '/assets/products/door_1.jpeg',
      gallery: [
        '/assets/products/door_1.jpeg',
        '/assets/products/carpets/carpet_10.jpeg',
        '/assets/products/interior_1.jpeg',
        '/assets/products/door_6.jpeg',
        '/assets/products/interior_3.jpeg'
      ],
      description: 'A flagship multi-story commercial complex and executive office tower along central Sir Kashim Ibrahim Way. Outfitted with high-traffic commercial marble flooring, grand pivot entrance portals, Nain arabesque silk rugs, and modular office joinery.',
      materials: [
        'Heavy-Duty Polished Architectural Marble Floor Slabs',
        'Grande Motorized Copper-Clad Architectural Pivot Portal',
        'Nain Habibian Arabesque Silk & Wool Rugs for VIP Suites',
        'Modular Executive Reception Millwork & Cabinetry',
        'Frosted Glass Acoustic Office Dividers'
      ],
      freightMode: 'Local Factory Direct Transit from Maiduguri HQ Industrial Base',
      clientQuote: 'The centerpiece of Central Maiduguri\'s modern business district. Outfitted entirely by HC Group with certified warranties.',
      architectName: 'Arc. Ahmed Shettima (Lead Consultant)'
    },
    {
      id: 8,
      title: 'Asokoro Crest Diplomatic Enclave & Manor',
      category: 'Penthouse & Diplomatic Residences',
      region: 'Abuja (FCT)',
      location: 'Asokoro District, Abuja FCT',
      year: '2025',
      area: '4,600 m²',
      style: 'Classical European Heritage',
      image: '/assets/products/interior_1.jpeg',
      gallery: [
        '/assets/products/interior_1.jpeg',
        '/assets/products/door_4.jpeg',
        '/assets/products/carpets/carpet_7.jpeg',
        '/assets/products/interior_2.jpeg',
        '/assets/products/interior_4.jpeg'
      ],
      description: 'A private diplomatic manor in Asokoro featuring bespoke coffered ceilings, hand-carved oak entryways, Sultanabad botanical silk rugs, acoustic library paneling, and Italian composite spa suites.',
      materials: [
        'Hand-Carved Imperial European Oak Entryway Doors',
        'Sultanabad Classical Botanical Hand-Spun Silk Rugs',
        'Floor-to-Ceiling Dressing Room Joinery with Velvet Drawer Liners',
        'Composite Resin Stone Spa Soaking Tubs & Basins',
        'Class A Fire-Safe Acoustic Walnut Library Cladding'
      ],
      freightMode: 'Specialized Air-Ride Suspended Transport to Asokoro Enclave',
      clientQuote: 'HC Group delivered the highest tier of bespoke millwork and silk carpets seen in Abuja. Uncompromising quality.',
      architectName: 'Arc. David Okafor, FNIA'
    }
  ];

  const filteredProjects = projects.filter(p => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchRegion = selectedRegion === 'All' || p.region === selectedRegion;
    return matchCategory && matchRegion;
  });

  const openModal = (project) => {
    setActiveProjectModal(project);
    setActiveModalImageIdx(0);
  };

  return (
    <div className="projects-page">
      {/* Hero Header */}
      <section className="projects-hero">
        <div className="projects-hero-bg">
          <img src="/assets/products/interior_3.jpeg" alt="Global Architectural Portfolio" />
        </div>
        <div className="projects-hero-overlay"></div>
        <div className="projects-hero-content">
          <span className="badge-luxury">MAIDUGURI HQ • ABUJA • LAGOS • NATIONWIDE</span>
          <h1 className="projects-hero-title">
            Signature <span>Architectural Case Studies</span>
          </h1>
          <p className="projects-hero-desc">
            Explore our curated portfolio of completed luxury villas, diplomatic residences, and landmark commercial fit-outs across Nigeria—engineered to the highest international standards.
          </p>
        </div>
      </section>

      {/* Enterprise Project Metrics Strip (George Build Benchmark) */}
      <section className="section-container" style={{ paddingBottom: 0 }}>
        <div className="projects-metrics-strip">
          <div className="project-metric-card">
            <div className="project-metric-number">140+</div>
            <div className="project-metric-label">Landmark Estates Outfitted</div>
          </div>
          <div className="project-metric-card">
            <div className="project-metric-number">₦12.8B+</div>
            <div className="project-metric-label">Materials Sourced & Handed Over</div>
          </div>
          <div className="project-metric-card">
            <div className="project-metric-number">36</div>
            <div className="project-metric-label">Nigerian States Logistics Fleet</div>
          </div>
          <div className="project-metric-card">
            <div className="project-metric-number">100%</div>
            <div className="project-metric-label">On-Time Handover Guarantee</div>
          </div>
        </div>
      </section>

      {/* Dual-Axis Filter System (Category & Nigerian Region) */}
      <section className="section-container" style={{ paddingTop: '1rem' }}>
        <div className="projects-dual-filters">
          {/* Sector / Category Pills */}
          <div className="project-category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Region / Geographic Filter */}
          <div className="project-region-filters">
            <span className="region-filter-label">Filter by Nigerian Region:</span>
            {regions.map(r => (
              <button
                key={r}
                className={`region-filter-pill ${selectedRegion === r ? 'active' : ''}`}
                onClick={() => setSelectedRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-portfolio-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-badge">{project.category}</div>
                <button 
                  className="portfolio-quick-view-btn"
                  onClick={() => openModal(project)}
                >
                  <Eye size={16} /> View Case Study
                </button>
              </div>

              <div className="portfolio-content">
                <div className="portfolio-style-tag">
                  {project.style} • {project.area}
                </div>

                <div className="portfolio-meta">
                  <span><MapPin size={14} color="var(--color-gold)" /> {project.location}</span>
                  <span><Calendar size={14} color="var(--color-gold)" /> Handover: {project.year}</span>
                </div>

                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-desc">{project.description}</p>

                <div className="portfolio-materials">
                  <div className="materials-header">
                    <Layers size={14} color="var(--color-gold)" />
                    <span>Key Architectural Scope:</span>
                  </div>
                  <ul className="materials-list">
                    {project.materials.slice(0, 3).map((m, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={13} color="var(--color-gold)" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="portfolio-card-footer">
                  <button 
                    className="portfolio-detail-link"
                    onClick={() => openModal(project)}
                  >
                    Inspect Full Blueprint & BoM <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Case Study Modal (Multi-Photo Interactive Gallery) */}
      {activeProjectModal && (
        <div className="modal-backdrop" onClick={() => setActiveProjectModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1150px' }}>
            <button className="modal-close-btn" onClick={() => setActiveProjectModal(null)}>
              <X size={22} />
            </button>

            <div className="modal-grid">
              {/* Left Column: Interactive Multi-Photo Gallery */}
              <div className="modal-image-col">
                <img 
                  src={activeProjectModal.gallery[activeModalImageIdx] || activeProjectModal.image} 
                  alt={activeProjectModal.title} 
                />

                {/* Thumbnail Switcher */}
                {activeProjectModal.gallery && activeProjectModal.gallery.length > 1 && (
                  <div className="modal-gallery-thumbs">
                    {activeProjectModal.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        className={`modal-gallery-thumb-btn ${activeModalImageIdx === idx ? 'active' : ''}`}
                        onClick={() => setActiveModalImageIdx(idx)}
                        title={`Angle ${idx + 1}`}
                      >
                        <img src={img} alt={`Angle ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="modal-image-info">
                  <span className="badge-luxury">{activeProjectModal.category}</span>
                  <h3>{activeProjectModal.title}</h3>
                  <p><MapPin size={14} /> {activeProjectModal.location}</p>
                </div>
              </div>

              {/* Right Column: Architectural Specifications & Actions */}
              <div className="modal-content-col">
                <div className="modal-stats-row">
                  <div className="modal-stat">
                    <span>Year Completed</span>
                    <strong>{activeProjectModal.year}</strong>
                  </div>
                  <div className="modal-stat">
                    <span>Footprint Area</span>
                    <strong>{activeProjectModal.area}</strong>
                  </div>
                  <div className="modal-stat">
                    <span>Architectural Style</span>
                    <strong>{activeProjectModal.style}</strong>
                  </div>
                </div>

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.65rem', color: 'var(--color-bg-navy)' }}>
                  Architectural Narrative & Engineering Scope
                </h4>
                <p style={{ color: '#334155', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                  {activeProjectModal.description}
                </p>

                {/* Lead Architect Verification Quote */}
                {activeProjectModal.clientQuote && (
                  <div className="modal-architect-quote">
                    <p className="modal-quote-text">"{activeProjectModal.clientQuote}"</p>
                    <div className="modal-quote-author">
                      <ShieldCheck size={14} color="var(--color-gold)" />
                      <span>{activeProjectModal.architectName}</span>
                    </div>
                  </div>
                )}

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--color-bg-navy)' }}>
                  Specified HC Group Bill of Materials (BoM):
                </h4>
                <div className="modal-materials-grid">
                  {activeProjectModal.materials.map((m, idx) => (
                    <div key={idx} className="modal-material-item">
                      <CheckCircle2 size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#475569' }}>
                  <strong style={{ color: 'var(--color-bg-navy)', display: 'block', marginBottom: '0.2rem' }}>
                    Logistics & Site Offloading Protocol:
                  </strong>
                  <span>{activeProjectModal.freightMode}</span>
                </div>

                {/* Direct 1-Click Action Buttons */}
                <div style={{ marginTop: '1.75rem', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/2349068875555?text=${encodeURIComponent(
                      `Hello HC Group, I am reviewing your signature project: "${activeProjectModal.title}" (${activeProjectModal.location}, ${activeProjectModal.area}). I would like to request a turnkey Bill of Quantities (BoQ) and material package consultation for a similar architectural build.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <MessageCircle size={16} /> Source Similar Project on WhatsApp
                  </a>

                  <button 
                    className="btn-outline"
                    onClick={() => {
                      setActiveProjectModal(null);
                      setActiveTab('contact');
                    }}
                  >
                    Upload My Project Blueprints <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Banner */}
      <section className="section-container">
        <div className="projects-bottom-cta">
          <h2>Have an Upcoming Architectural Build in Nigeria?</h2>
          <p>
            From private luxury villas in Maitama and Banana Island to commercial developments in central Maiduguri, rely on HC Group for precision factory-direct sourcing, CAD analysis, and guaranteed on-site delivery.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button className="btn-gold" onClick={() => setActiveTab('contact')}>
              Schedule Architectural Consultation <ArrowRight size={18} />
            </button>
            <a 
              href="https://wa.me/2349068875555?text=Hello%20HC%20Group%2C%20I%20have%20an%20upcoming%20architectural%20project%20and%20would%20like%20to%20consult%20with%20your%20engineering%20team."
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff' }}
            >
              <MessageCircle size={16} color="#25D366" /> Chat Direct (+234 9068875555)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
