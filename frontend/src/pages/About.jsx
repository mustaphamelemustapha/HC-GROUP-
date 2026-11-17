import React from 'react';
import { ShieldCheck, Award, Factory, Globe2, Compass, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function About({ setActiveTab }) {
  const stats = [
    { value: '50,000 m²', label: 'State-of-the-Art Production Facility' },
    { value: '500+', label: 'Luxury Estates & Resorts Delivered' },
    { value: '18+', label: 'Global Export Destinations' },
    { value: '100%', label: 'CAD-to-CNC Precision Tolerance' }
  ];

  const pillars = [
    {
      icon: <Factory size={28} />,
      title: 'Factory-Direct Precision',
      desc: 'By owning our manufacturing processes from raw timber drying to automated 5-axis CNC machining, we eliminate intermediary markups and guarantee unmatched structural integrity.'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Bespoke Material Science',
      desc: 'From batch-matched Italian Carrara marble and European white oak to acoustic thermal-break aluminum and smart-locking pivot doors, our materials meet exacting architectural specifications.'
    },
    {
      icon: <Globe2 size={28} />,
      title: 'Sovereign Global Freight',
      desc: 'Our specialized freight logistics engine manages multi-ton flatbed transport, containerized maritime routes, and specialized crane-lift offloading direct to project sites worldwide.'
    },
    {
      icon: <Award size={28} />,
      title: 'International Certification',
      desc: 'Every batch conforms to rigorous standards, holding ISO 9001 quality management, CE mark validation, FSC sustainable forestry compliance, and Class B1/A2 fire resistance ratings.'
    }
  ];

  const milestones = [
    { year: 'Phase 1', title: 'Architectural Consult & Spatial Audit', text: 'Rigorous CAD drawing analysis, 3D photorealistic visualization, and custom material sampling.' },
    { year: 'Phase 2', title: 'Zero-Tolerance CNC Fabrication', text: 'Automated laser cutting, millwork joinery, and multi-stage hand-finished lacquering.' },
    { year: 'Phase 3', title: 'White-Glove Global Logistics', text: 'Custom timber-crate packaging, moisture-sealed containers, and tracked transport routing.' },
    { year: 'Phase 4', title: 'Certified Site Installation & Handover', text: 'Master craftsmanship installation on site with a full 10-year structural warranty.' }
  ];

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/assets/products/interior_1.jpeg" alt="HC Group Luxury Craftsmanship" />
        </div>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="badge-luxury">THE HC GROUP HERITAGE</span>
          <h1 className="about-hero-title">
            Architectural Excellence. <span>Uncompromising Luxury.</span>
          </h1>
          <p className="about-hero-desc">
            We are a premier global manufacturer and turnkey sourcing partner for ultra-high-end private villas, 
            prestigious hospitality landmarks, and visionary residential estates.
          </p>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="stats-strip">
        <div className="stats-container">
          {stats.map((s, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Narrative Section */}
      <section className="section-container">
        <div className="narrative-grid">
          <div className="narrative-content">
            <span className="section-eyebrow">OUR PHILOSOPHY</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Bridging Visionary Design & Industrial Precision
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              At <strong>HC Group (H-C COMPANY LTD)</strong>, we reject standard mass production in favor of bespoke architectural integrity. 
              Headquartered in Maiduguri, Borno State, with liaison offices in Abuja and Lagos and manufacturing facilities in Foshan, 
              our company was founded with a singular ambition: to provide developers, architects, and private estate owners 
              with a single, accountable source for their complete interior envelope.
            </p>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              From magnificent 3.2-meter copper-clad pivot doors and custom modular walk-in wardrobes to monolithic 
              stone bathtubs, museum-grade hand-knotted architectural silk carpets, and acoustic wood cladding, every element is engineered to endure generations.
            </p>

            <div className="narrative-check-list">
              <div className="check-list-item">
                <CheckCircle2 size={20} color="var(--color-gold)" />
                <span>Direct procurement and manufacturing without brokerage markups</span>
              </div>
              <div className="check-list-item">
                <CheckCircle2 size={20} color="var(--color-gold)" />
                <span>Laser-verified tolerances guaranteeing flawless on-site installation</span>
              </div>
              <div className="check-list-item">
                <CheckCircle2 size={20} color="var(--color-gold)" />
                <span>Dedicated project engineers assigned to every commission</span>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="btn-gold"
                onClick={() => setActiveTab('services')}
              >
                Explore Turnkey Services <ArrowRight size={18} />
              </button>
              <button 
                className="btn-outline"
                onClick={() => setActiveTab('contact')}
              >
                Inquire With An Engineer
              </button>
            </div>
          </div>

          <div className="narrative-visual">
            <div className="image-stack">
              <img src="/assets/products/interior_4.jpeg" alt="Luxury Millwork" className="stack-img-main" />
              <img src="/assets/products/door_1.jpeg" alt="Grande Pivot Door" className="stack-img-accent" />
              <div className="craft-badge">
                <ShieldCheck size={32} color="var(--color-gold)" />
                <div>
                  <strong>10-Year Warranty</strong>
                  <p>Certified Structural Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="section-container dark">
        <div className="section-header">
          <span className="section-eyebrow" style={{ color: 'var(--color-gold)' }}>STANDARDS OF DISTINCTION</span>
          <h2 className="section-title">Four Pillars of Architectural Mastery</h2>
          <p className="section-subtitle" style={{ color: '#cbd5e1' }}>
            How we maintain absolute quality control across millions of square feet of luxury developments.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon">{pillar.icon}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Journey */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">THE HC WORKFLOW</span>
          <h2 className="section-title">The Turnkey Execution Journey</h2>
          <p className="section-subtitle">A transparent, engineered path from blueprint to completed installation.</p>
        </div>

        <div className="workflow-timeline">
          {milestones.map((m, idx) => (
            <div key={idx} className="timeline-node">
              <div className="timeline-badge">{idx + 1}</div>
              <div className="timeline-content">
                <span className="timeline-phase">{m.year}</span>
                <h4 className="timeline-title">{m.title}</h4>
                <p className="timeline-text">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-cta-card">
          <div className="about-cta-text">
            <h3>Ready to Specify Materials for Your Next Project?</h3>
            <p>Speak directly with our technical sourcing directors to receive sample kits, CAD blueprints, and pricing.</p>
          </div>
          <div className="about-cta-action">
            <button className="btn-gold" onClick={() => setActiveTab('contact')}>
              Request Consultation <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
