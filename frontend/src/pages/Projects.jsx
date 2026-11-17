import React, { useState } from 'react';
import { MapPin, Calendar, Layers, ArrowRight, Eye, CheckCircle2, X } from 'lucide-react';

export default function Projects({ setActiveTab }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = ['All', 'Private Villas', 'Luxury Hospitality', 'Penthouse Living', 'Commercial Landmarks'];

  const projects = [
    {
      id: 1,
      title: 'The Al-Barka Executive Estate',
      category: 'Private Villas',
      location: 'GRA, Maiduguri, Borno State',
      year: '2025',
      area: '2,800 m²',
      image: '/assets/products/interior_1.jpeg',
      description: 'An executive private estate featuring custom 3.2m motorized copper pivot doors, book-matched Italian Carrara marble floorings, Royal Isfahan hand-knotted silk carpets, and bespoke walk-in walnut dressing suites.',
      materials: [
        'Grande Copper-Clad Architectural Pivot Doors',
        'Royal Isfahan Hand-Knotted Silk & Wool Rugs',
        'Book-matched Italian Carrara Marble Slabs',
        'Minimalist Floor-to-Ceiling Walnut Wardrobes',
        'Acoustic Timber Cladding & Security Glazing'
      ],
      freightMode: 'Dedicated Heavy Hydraulic Flatbed Direct to Maiduguri Site'
    },
    {
      id: 2,
      title: 'Kyarimi Presidential Residence & VIP Pavilion',
      category: 'Luxury Hospitality',
      location: 'Old GRA, Maiduguri, Borno State',
      year: '2025',
      area: '4,500 m²',
      image: '/assets/products/interior_2.jpeg',
      description: 'VIP presidential reception and private pavilions outfitted with freestanding solid resin stone bathtubs, Imperial Kashan medallion wool carpets, moisture-sealed vanity millwork, and concealed wall-flush doors.',
      materials: [
        'Imperial Kashan Medallion Luxury Wool Carpets',
        'Freestanding Solid Composite Resin Stone Bathtubs',
        'Concealed Aluminum Frame Wall-Flush Doors',
        'Custom Brushed Gold Sanitary Fixtures & Vanities',
        'Italian Carrara Polished Marble Flooring'
      ],
      freightMode: 'Dedicated Escorted Heavy Flatbed to Maiduguri GRA'
    },
    {
      id: 3,
      title: 'Borno State Commercial Complex & Executive Suites',
      category: 'Commercial Landmarks',
      location: 'Sir Kashim Ibrahim Way, Maiduguri, Borno State',
      year: '2024',
      area: '6,200 m²',
      image: '/assets/products/interior_3.jpeg',
      description: 'A multi-story commercial complex and executive suites overlooking central Maiduguri. Features seamless flush doors, architectural steel French partitions, Tabriz heritage gold weft rugs, and acoustic walnut wall systems.',
      materials: [
        'Tabriz Mahi Heritage Silk & Gold Weft Rugs',
        'Aurelia Architectural Steel French Partition Doors',
        'Class B1 Fire-Safe Acoustic Natural Walnut Panels',
        'Concealed Magnetic Wall-Integrated Interior Doors',
        'Heavy-Duty High-Traffic Commercial Marble Tiles'
      ],
      freightMode: 'Direct Logistics Fleet Delivery to Sir Kashim Ibrahim Way'
    },
    {
      id: 4,
      title: 'Lake Chad Executive Lodges & Wellness Retreat',
      category: 'Luxury Hospitality',
      location: 'Bama Road Corridor, Maiduguri, Borno State',
      year: '2024',
      area: '3,800 m²',
      image: '/assets/products/interior_4.jpeg',
      description: 'An executive sanctuary and wellness facility outfitted with Class B1 fire-rated acoustic wall paneling, frosted glass privacy doors, Anatolian Oushak soft-tone living rugs, and seamless stone counters.',
      materials: [
        'Anatolian Oushak Hand-Spun Living Rugs',
        'Class B1 Fire-Safe Acoustic Wall Panels',
        'Frosted Glass Privacy Doors with Brushed Gold Trim',
        'Freestanding Matte White Resin Stone Soaking Tubs',
        'Custom Monolithic Carrara Reception & Vanity Slabs'
      ],
      freightMode: 'Dedicated Flatbed Express Transit from Maiduguri Logistics Depot'
    },
    {
      id: 5,
      title: 'Indimi Royal Residence & Private Wing',
      category: 'Private Villas',
      location: 'Damboa Road, Maiduguri, Borno State',
      year: '2025',
      area: '3,400 m²',
      image: '/assets/products/interior_5.jpeg',
      description: 'A monumental private villa designed to merge classical Kanem-Borno grandeur with contemporary interior architecture. Equipped with thermal-break minimal sliding systems, Qom pure mulberry silk carpets, and custom walnut dressing suites.',
      materials: [
        'Qom Pure Mulberry Silk Masterpiece Carpets',
        'Thermal-Break Aluminum Minimalist Sliding Systems',
        'Custom Italian Walnut Walk-in Dressing Suites',
        'Polished Carrara Marble Bath Suites & Fireplaces',
        'Concealed Integrated LED Baseboards'
      ],
      freightMode: 'White-Glove Enclosed Transport & Master Installation'
    },
    {
      id: 6,
      title: 'Kanem Diplomatic Chambers & Penthouse Pavilion',
      category: 'Penthouse Living',
      location: 'Shehu Laminu Way, Maiduguri, Borno State',
      year: '2024',
      area: '2,100 m²',
      image: '/assets/products/door_1.jpeg',
      description: 'An executive penthouse pavilion pairing hand-carved Imperial European oak doors with smart multi-point biometric locking pivot doors, Heriz royal palace carpets, and bespoke coffered ceilings.',
      materials: [
        'Heriz Geometric Royal Palace Wool Carpets',
        'Hand-Carved Imperial European Oak Doors',
        'Grande Architectural Motorized Copper Pivot Doors',
        'Bespoke Library Bookshelves & Architectural Millwork',
        'Book-Matched Calacatta Gold Marble Wall Slabs'
      ],
      freightMode: 'Crane-Lift Hoist & Certified Master Installation Team'
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="projects-page">
      {/* Hero Header */}
      <section className="projects-hero">
        <div className="projects-hero-bg">
          <img src="/assets/products/interior_3.jpeg" alt="Global Portfolio" />
        </div>
        <div className="projects-hero-overlay"></div>
        <div className="projects-hero-content">
          <span className="badge-luxury">MAIDUGURI HQ & REGIONAL ARCHITECTURAL PORTFOLIO</span>
          <h1 className="projects-hero-title">
            Featured <span>Signature Projects</span>
          </h1>
          <p className="projects-hero-desc">
            Explore our curated portfolio of completed private estates, presidential suites, and high-profile commercial landmarks across Maiduguri, Borno State and Nigeria.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="section-container" style={{ paddingTop: '2.5rem' }}>
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

        {/* Projects Grid */}
        <div className="projects-portfolio-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-badge">{project.category}</div>
                <button 
                  className="portfolio-quick-view-btn"
                  onClick={() => setActiveProjectModal(project)}
                >
                  <Eye size={16} /> View Specifications
                </button>
              </div>

              <div className="portfolio-content">
                <div className="portfolio-meta">
                  <span><MapPin size={14} color="var(--color-gold)" /> {project.location}</span>
                  <span><Calendar size={14} color="var(--color-gold)" /> {project.year}</span>
                </div>

                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-desc">{project.description}</p>

                <div className="portfolio-materials">
                  <div className="materials-header">
                    <Layers size={14} color="var(--color-gold)" />
                    <span>Key Material Scope:</span>
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
                    onClick={() => setActiveProjectModal(project)}
                  >
                    Explore Case Study <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Case Study Modal */}
      {activeProjectModal && (
        <div className="modal-backdrop" onClick={() => setActiveProjectModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveProjectModal(null)}>
              <X size={22} />
            </button>

            <div className="modal-grid">
              <div className="modal-image-col">
                <img src={activeProjectModal.image} alt={activeProjectModal.title} />
                <div className="modal-image-info">
                  <span className="badge-luxury">{activeProjectModal.category}</span>
                  <h3>{activeProjectModal.title}</h3>
                  <p><MapPin size={14} /> {activeProjectModal.location}</p>
                </div>
              </div>

              <div className="modal-content-col">
                <div className="modal-stats-row">
                  <div className="modal-stat">
                    <span>Year Completed</span>
                    <strong>{activeProjectModal.year}</strong>
                  </div>
                  <div className="modal-stat">
                    <span>Spatial Footprint</span>
                    <strong>{activeProjectModal.area}</strong>
                  </div>
                  <div className="modal-stat">
                    <span>Freight Mode</span>
                    <strong>{activeProjectModal.freightMode}</strong>
                  </div>
                </div>

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-bg-navy)' }}>
                  Architectural Scope & Challenge
                </h4>
                <p style={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  {activeProjectModal.description}
                </p>

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-bg-navy)' }}>
                  Specified HC Group Materials:
                </h4>
                <div className="modal-materials-grid">
                  {activeProjectModal.materials.map((m, idx) => (
                    <div key={idx} className="modal-material-item">
                      <CheckCircle2 size={16} color="var(--color-gold)" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    className="btn-gold" 
                    onClick={() => {
                      setActiveProjectModal(null);
                      setActiveTab('contact');
                    }}
                  >
                    Inquire About a Project Like This <ArrowRight size={16} />
                  </button>
                  <button 
                    className="btn-outline"
                    onClick={() => {
                      setActiveProjectModal(null);
                      setActiveTab('catalog');
                    }}
                  >
                    View Products
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
          <h2>Have an Upcoming Architectural Project?</h2>
          <p>
            Join the hundreds of architects, developers, and private estate owners who rely on HC Group for precision material sourcing.
          </p>
          <button className="btn-gold" onClick={() => setActiveTab('contact')} style={{ marginTop: '1.5rem' }}>
            Schedule an Architectural Consultation <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
