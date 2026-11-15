import React, { useState } from 'react';
import { MapPin, Calendar, Layers, ArrowRight, Eye, CheckCircle2, X } from 'lucide-react';

export default function Projects({ setActiveTab }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = ['All', 'Private Villas', 'Luxury Hospitality', 'Penthouse Living', 'Commercial Landmarks'];

  const projects = [
    {
      id: 1,
      title: 'The Royal Palm Villa',
      category: 'Private Villas',
      location: 'Palm Jumeirah, Dubai, UAE',
      year: '2025',
      area: '2,400 m²',
      image: '/assets/products/interior_1.jpeg',
      description: 'An ultra-luxurious private beachfront estate requiring floor-to-ceiling custom walnut joinery, monolithic bathroom stones, and bespoke 3.4m copper-clad pivot entrance doors.',
      materials: [
        'Minimalist Floor-to-Ceiling Wardrobes',
        'Grande Copper-Clad Pivot Entrance Doors',
        'Book-matched Italian Carrara Marble Slabs',
        'Acoustic Walnut Living Room Cladding'
      ],
      freightMode: 'Ocean Container + Crane-Lift On-Site'
    },
    {
      id: 2,
      title: 'Azure Shore Ocean Resort',
      category: 'Luxury Hospitality',
      location: 'Baa Atoll, Maldives',
      year: '2025',
      area: '8,500 m²',
      image: '/assets/products/interior_2.jpeg',
      description: 'Overwater luxury villas and private pavilions outfitted with salt-mist resistant minimalist glass sliding doors, freestanding composite stone bathtubs, and custom teak cabinetry.',
      materials: [
        'Freestanding Solid Composite Resin Bathtubs',
        'Marine-Grade Aluminum Sliding Pocket Doors',
        'Moisture-Sealed Solid Teak Vanities',
        'Custom Brushed Gold Sanitary Fixtures'
      ],
      freightMode: 'Direct Maritime Freight to Island Jetty'
    },
    {
      id: 3,
      title: 'Skyline Grand Penthouse',
      category: 'Penthouse Living',
      location: 'Manhattan, New York, USA',
      year: '2024',
      area: '720 m²',
      image: '/assets/products/interior_3.jpeg',
      description: 'A duplex penthouse crowning a 65-story skyscraper in Midtown. Features seamless flush-invisible doors, architectural matte black steel French partitions, and European oak planks.',
      materials: [
        'European White Oak Matte Flooring',
        'Aurelia Architectural Steel French Doors',
        'Concealed Aluminum Frame Wall-Flush Doors',
        'Integrated Smart Motorized Joinery'
      ],
      freightMode: 'Air Freight + High-Rise Crane Rigging'
    },
    {
      id: 4,
      title: 'The Luminary Private Clinic & Spa',
      category: 'Commercial Landmarks',
      location: 'Mayfair, London, UK',
      year: '2024',
      area: '1,800 m²',
      image: '/assets/products/interior_4.jpeg',
      description: 'A high-end private wellness facility requiring Class B1 fire-rated acoustic wall paneling, sound-damped frosted glass privacy doors, and seamless stone reception counters.',
      materials: [
        'Class B1 Fire-Safe Acoustic Wall Panels',
        'Frosted Glass Privacy Doors with Brushed Gold Trim',
        'Custom Monolithic Reception Desks',
        'Hygienic Anti-Microbial Wall Cladding'
      ],
      freightMode: 'Dedicated Flatbed Express Transit'
    },
    {
      id: 5,
      title: 'Villa Côte d’Azur',
      category: 'Private Villas',
      location: 'Cannes, France',
      year: '2025',
      area: '1,650 m²',
      image: '/assets/products/interior_5.jpeg',
      description: 'A cliffside contemporary villa designed to merge interior luxury with panoramic Mediterranean vistas. Equipped with oversized thermal-break minimal frames and custom wardrobes.',
      materials: [
        'Thermal-Break Aluminum Minimalist Sliding Systems',
        'Custom Italian Walnut Walk-in Dressing Suites',
        'Polished Carrara Marble Bath Suites',
        'Concealed Integrated Baseboards'
      ],
      freightMode: 'Bonded European Freight & Master Installation'
    },
    {
      id: 6,
      title: 'Bel Air Heritage Estate',
      category: 'Private Villas',
      location: 'Los Angeles, California, USA',
      year: '2024',
      area: '3,100 m²',
      image: '/assets/products/door_1.jpeg',
      description: 'A sprawling neo-classical estate that pairs old-world European oak craftsmanship with smart multi-point biometric locking pivot doors and bespoke coffered ceilings.',
      materials: [
        'Hand-Carved Imperial European Oak Doors',
        'Grande Architectural Pivot Entrance Doors',
        'Bespoke Library Bookshelves & Millwork',
        'Calacatta Gold Marble Fireplace Surrounds'
      ],
      freightMode: 'Sealed Maritime Timber Crating'
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
          <span className="badge-luxury">GLOBAL ARCHITECTURAL PORTFOLIO</span>
          <h1 className="projects-hero-title">
            Featured <span>International Projects</span>
          </h1>
          <p className="projects-hero-desc">
            Explore our curated portfolio of completed private estates, luxury resorts, and high-profile commercial landmarks worldwide.
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
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
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
