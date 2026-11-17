import React, { useState } from 'react';
import { 
  Search, ShieldCheck, Truck, Factory, PenTool, CheckCircle2, 
  Clock, MapPin, Phone, MessageCircle, FileText, ArrowRight, 
  ExternalLink, Sparkles, Building, Printer
} from 'lucide-react';

const SAMPLE_PROJECTS = {
  'HC-2026-GRA-001': {
    orderId: 'HC-2026-GRA-001',
    projectName: 'The Al-Barka Executive Estate',
    client: 'Al-Barka Royal Holdings Ltd',
    location: 'Plot 18, GRA, Maiduguri, Borno State',
    engineer: 'Engr. Mustapha M. (Lead Architectural Director)',
    engineerPhone: '+234 9068875555',
    totalValue: 9350000.00,
    carrier: 'HC Dedicated Hydraulic Flatbed (Fleet #BOR-08-TRK)',
    driverContact: 'M. Babagana (+234 9068875555)',
    currentPhase: 3, // 1 to 4
    statusLabel: 'Staged at Maiduguri Logistics Depot',
    estDelivery: 'November 22, 2026',
    milestones: [
      {
        phase: 1,
        title: 'Architectural CAD Blueprint Sign-off & 3D LiDAR Survey',
        date: 'Oct 28, 2026',
        completed: true,
        details: 'On-site laser aperture measurement verified in GRA Maiduguri. Millimeter zero-tolerance cutting ticket approved.'
      },
      {
        phase: 2,
        title: '5-Axis CNC Milling, Stone Cutting & Silk Carpet Weaving',
        date: 'Nov 08, 2026',
        completed: true,
        details: 'Solid walnut core timber acclimated, 3.2m copper pivot cladding completed, Royal Isfahan silk rug weft inspected (1.2M knots/m²).'
      },
      {
        phase: 3,
        title: 'Maiduguri Quality Assurance & Borno Staging Facility',
        date: 'Nov 16, 2026',
        completed: true,
        details: 'Consignment arrived at Central Logistics Depot (Sir Kashim Ibrahim Way, Maiduguri). Passed 48-point seal and structural QA audit.'
      },
      {
        phase: 4,
        title: 'Direct Heavy Flatbed Dispatch & Certified Crane Installation',
        date: 'Nov 22, 2026 (Scheduled)',
        completed: false,
        details: 'Hydraulic crane lift scheduled for site hoisting and master technician assembly at GRA villa.'
      }
    ],
    items: [
      { name: '3.2m Monolithic Copper Pivot Entrance Door', sku: 'DR-PVT-STD', qty: 1, status: 'Staged & Inspected', specs: '2600x1500x100mm • Smart Lock' },
      { name: 'Royal Isfahan Hand-Knotted Silk & Wool Rug', sku: 'HC-CRPT-ISF-3020', qty: 1, status: 'QA Certified', specs: '3000x2000mm • 1.2M Knots/m²' },
      { name: 'Book-Matched Italian Carrara Marble Slabs', sku: 'FS-MARB-SLB60', qty: 25, status: 'Crated & Numbered', specs: '600x600x20mm Mirror Gloss' },
      { name: 'Modular Custom American Walnut Wardrobe', sku: 'WH-WARD-WLN', qty: 1, status: 'Staged in Clean Bay', specs: '3200x2400x650mm • Sensor LED' }
    ]
  },
  'HC-BORNO-8821': {
    orderId: 'HC-BORNO-8821',
    projectName: 'Kyarimi Presidential Residence & VIP Salon',
    client: 'Kyarimi Executive Trust',
    location: 'Old GRA, Maiduguri, Borno State',
    engineer: 'Engr. A. Shehu (Director of Turnkey Fit-Out)',
    engineerPhone: '+234 9068875555',
    totalValue: 7150000.00,
    carrier: 'HC Logistics Express Flatbed #BOR-04-TRK',
    driverContact: 'Logistics Control Center (+234 9068875555)',
    currentPhase: 4,
    statusLabel: 'En Route to Site for Crane Hoisting',
    estDelivery: 'November 18, 2026',
    milestones: [
      {
        phase: 1,
        title: 'Architectural Blueprint & Laser Measurement',
        date: 'Nov 02, 2026',
        completed: true,
        details: 'Aperture scanning verified for Old GRA VIP Pavilion.'
      },
      {
        phase: 2,
        title: 'Precision Manufacturing & Stone Sculpting',
        date: 'Nov 11, 2026',
        completed: true,
        details: 'Freestanding solid resin stone bath cured; Imperial Kashan wool carpet hand-finished.'
      },
      {
        phase: 3,
        title: 'Maiduguri Depot Inspection & Staging',
        date: 'Nov 15, 2026',
        completed: true,
        details: 'Inspected at Sir Kashim Ibrahim Way Depot; white-glove shock crating certified.'
      },
      {
        phase: 4,
        title: 'Direct Flatbed Dispatch & Certified Installation',
        date: 'Nov 18, 2026 (In Transit)',
        completed: true,
        details: 'Flatbed in transit with escort. Site installation team deployed to Old GRA.'
      }
    ],
    items: [
      { name: 'Imperial Kashan Medallion Wool Carpet', sku: 'HC-CRPT-KSH-3020', qty: 1, status: 'In Transit', specs: '3000x2000mm • Ghazni Wool' },
      { name: 'Freestanding Solid Resin Stone Bathtub', sku: 'SW-BATHT-STD', qty: 1, status: 'In Transit', specs: '1700x800x600mm • Matte White' },
      { name: 'Concealed Aluminum Wall-Flush Interior Door', sku: 'DR-FLS-STD', qty: 2, status: 'In Transit', specs: '2100x800x40mm • Primed' }
    ]
  },
  'HC-MAID-409': {
    orderId: 'HC-MAID-409',
    projectName: 'Borno State Commercial Complex',
    client: 'Kanem-Borno Commercial Dev. Authority',
    location: 'Sir Kashim Ibrahim Way, Maiduguri, Borno State',
    engineer: 'Engr. Bello K. (Commercial Systems Specialist)',
    engineerPhone: '+234 9068875555',
    totalValue: 14850000.00,
    carrier: 'HC Multi-Axle Fleet #BOR-12-TRK',
    driverContact: 'Fleet Dispatch (+234 9068875555)',
    currentPhase: 2,
    statusLabel: 'Active Precision CNC Millwork & Silk Weaving',
    estDelivery: 'December 05, 2026',
    milestones: [
      {
        phase: 1,
        title: 'Architectural CAD Blueprint Verification',
        date: 'Nov 06, 2026',
        completed: true,
        details: 'Commercial glass partition elevations and Tabriz gold-thread rug specs approved.'
      },
      {
        phase: 2,
        title: 'CNC Millwork, Steel Framing & Silk Carpet Weaving',
        date: 'Nov 17, 2026 (Active)',
        completed: true,
        details: 'Aurelia carbon steel French double doors in powder coating; acoustic panels in CNC slotting.'
      },
      {
        phase: 3,
        title: 'Maiduguri Depot Staging & Inspection',
        date: 'Nov 28, 2026 (Upcoming)',
        completed: false,
        details: 'Scheduled arrival at Sir Kashim Ibrahim Way Depot for commercial batch check.'
      },
      {
        phase: 4,
        title: 'Direct Flatbed Dispatch & Crane Installation',
        date: 'Dec 05, 2026 (Upcoming)',
        completed: false,
        details: 'Commercial facade & interior installation by certified master team.'
      }
    ],
    items: [
      { name: 'Tabriz Mahi Heritage Silk & Gold Weft Rug', sku: 'HC-CRPT-TAB-3222', qty: 2, status: 'Weaving In Progress', specs: '3200x2200mm • 1.4M Knots' },
      { name: 'Aurelia Carbon Steel French Double Doors', sku: 'DR-FRN-STD', qty: 3, status: 'Frame Fabrication', specs: '2400x1800mm Tempered' },
      { name: 'Acoustic Natural Walnut Wall Panels', sku: 'WH-WOOD-WAL', qty: 80, status: 'CNC Precision Slotted', specs: '2400x600x21mm Class B1' }
    ]
  }
};

export default function Tracker({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('HC-2026-GRA-001');
  const [activeProject, setActiveProject] = useState(SAMPLE_PROJECTS['HC-2026-GRA-001']);
  const [searched, setSearched] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim().toUpperCase();
    if (!q) return;

    if (SAMPLE_PROJECTS[q]) {
      setActiveProject(SAMPLE_PROJECTS[q]);
      setErrorMsg(null);
      setSearched(true);
    } else {
      setErrorMsg(`No active fabrication ticket found matching reference "${q}". Please verify the code or check with your project director.`);
      setActiveProject(null);
      setSearched(true);
    }
  };

  const handleSelectDemo = (code) => {
    setSearchQuery(code);
    setActiveProject(SAMPLE_PROJECTS[code]);
    setErrorMsg(null);
    setSearched(true);
  };

  const getWhatsAppEngineerLink = () => {
    if (!activeProject) return '';
    const msg = `Hello HC Group Technical Team, I am inquiring regarding Project Fabrication Ticket:\n*Order Ref: ${activeProject.orderId}*\n*Project: ${activeProject.projectName}*\n*Site: ${activeProject.location}*\n\nPlease provide an update on current milestone progress and scheduled flatbed offload date. Thank you.`;
    return `https://wa.me/2349068875555?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="tracker-page" style={{ maxWidth: '1400px', margin: '3.5rem auto', padding: '0 2rem' }}>
      
      {/* Page Title & Breadcrumb */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <span className="badge-luxury">
          <ShieldCheck size={13} color="var(--color-gold)" style={{ marginRight: '6px' }} />
          EXECUTIVE FABRICATION & LOGISTICS CONCIERGE
        </span>
        <h1 className="section-title" style={{ display: 'block', margin: '0.75rem 0' }}>
          Client Project Fabrication Tracker
        </h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Monitor your architectural order in real-time. Track timber acclimation, CNC cutting, hand-knotted silk carpet weaving, 
          Maiduguri central depot staging, and certified on-site crane offloading.
        </p>
      </div>

      {/* Search Bar & Demo Pills */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--color-border-gold)',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: 'var(--shadow-md)',
        maxWidth: '850px',
        margin: '0 auto 3rem auto'
      }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Enter BoQ / Fabrication Ticket # (e.g. HC-2026-GRA-001)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.8rem',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.95rem',
                fontFamily: 'monospace',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-gold"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.9rem', fontWeight: '700' }}
          >
            Track Project
          </button>
        </form>

        {/* Quick Test Demo Tickets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: '#334155', fontWeight: '600' }}>
            Instant Sample Commissions:
          </span>
          {Object.keys(SAMPLE_PROJECTS).map((code) => {
            const isSelected = activeProject && activeProject.orderId === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelectDemo(code)}
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  fontWeight: '700',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--color-gold)' : '1px solid #cbd5e1',
                  backgroundColor: isSelected ? 'var(--color-bg-navy)' : '#f8fafc',
                  color: isSelected ? 'var(--color-gold)' : '#334155',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error state */}
      {errorMsg && (
        <div style={{
          backgroundColor: '#fff1f2',
          border: '1px solid #fecdd3',
          color: '#e11d48',
          padding: '1.5rem',
          borderRadius: '10px',
          maxWidth: '850px',
          margin: '0 auto 3rem auto',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>{errorMsg}</p>
        </div>
      )}

      {/* Active Project Dashboard */}
      {activeProject && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Executive Overview Card */}
          <div style={{
            backgroundColor: 'var(--color-bg-navy)',
            color: '#ffffff',
            borderRadius: '14px',
            border: '1.5px solid var(--color-border-gold)',
            boxShadow: 'var(--shadow-xl)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span className="badge-luxury" style={{ margin: 0, padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                  <Building size={12} style={{ marginRight: '5px' }} /> OFFICIAL WORK TICKET
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', margin: '0.6rem 0 0.35rem 0' }}>
                  {activeProject.projectName}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <MapPin size={16} color="var(--color-gold)" />
                  <span>{activeProject.location}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Procurement Value (₦)
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: 'var(--color-gold)', fontWeight: '700' }}>
                  ₦{activeProject.totalValue.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#34d399',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  marginTop: '0.4rem'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  {activeProject.statusLabel}
                </div>
              </div>
            </div>

            {/* Logistics & Lead Details Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              backgroundColor: 'rgba(7, 13, 30, 0.65)',
              borderRadius: '10px',
              padding: '1.5rem',
              border: '1px solid rgba(212, 175, 55, 0.25)'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Client Entity</span>
                <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{activeProject.client}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Supervising Engineer</span>
                <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{activeProject.engineer}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Dispatch Fleet Unit</span>
                <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{activeProject.carrier}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Estimated Handover</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--color-gold)' }}>{activeProject.estDelivery}</strong>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              <a
                href={getWhatsAppEngineerLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-action-btn"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              >
                <MessageCircle size={16} /> Contact Lead Site Engineer (+234 9068875555)
              </a>
              <button
                type="button"
                className="btn-gold"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                onClick={() => window.print()}
              >
                <Printer size={16} /> Print Fabrication Certificate
              </button>
            </div>
          </div>

          {/* 4-Stage Visual Milestone Progression */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid var(--color-border-light)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <span className="section-eyebrow">STAGE-GATE CERTIFICATION</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-bg-navy)', margin: '0.25rem 0' }}>
                Fabrication & Logistics Milestones
              </h3>
              <p style={{ color: '#334155', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
                Every milestone requires photographic sign-off by a certified HC Group technical director.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
              {activeProject.milestones.map((m, idx) => {
                const isCurrent = activeProject.currentPhase === m.phase;
                const isPassed = activeProject.currentPhase > m.phase;

                return (
                  <div 
                    key={m.phase}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      alignItems: 'flex-start',
                      position: 'relative'
                    }}
                  >
                    {/* Circle Node */}
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: m.completed ? '#10b981' : isCurrent ? 'var(--color-bg-navy)' : '#f1f5f9',
                      border: isCurrent ? '2.5px solid var(--color-gold)' : m.completed ? '2.5px solid #10b981' : '2px solid #cbd5e1',
                      color: m.completed || isCurrent ? '#ffffff' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1rem',
                      flexShrink: 0,
                      boxShadow: isCurrent ? '0 0 16px rgba(212, 175, 55, 0.6)' : 'none'
                    }}>
                      {m.completed ? <CheckCircle2 size={20} /> : m.phase}
                    </div>

                    {/* Milestone Details Box */}
                    <div style={{
                      flex: 1,
                      backgroundColor: isCurrent ? '#fcfbf7' : '#ffffff',
                      border: isCurrent ? '1.5px solid var(--color-border-gold)' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: isCurrent ? 'var(--shadow-sm)' : 'none'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: isCurrent ? 'var(--color-gold-muted)' : '#64748b' }}>
                          Phase {m.phase} • {m.date}
                        </span>
                        {isCurrent && (
                          <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-bg-navy)', color: 'var(--color-gold)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: '700' }}>
                            ACTIVE MILESTONE
                          </span>
                        )}
                        {m.completed && !isCurrent && (
                          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: '700' }}>
                            ✓ VERIFIED & SIGNED OFF
                          </span>
                        )}
                      </div>

                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-bg-navy)', margin: '0 0 0.35rem 0' }}>
                        {m.title}
                      </h4>
                      <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                        {m.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Itemized Fabrication Bill of Materials (BoM) */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid var(--color-border-light)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-eyebrow">ARCHITECTURAL BILL OF MATERIALS</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-bg-navy)', margin: '0.25rem 0' }}>
                Itemized Fabrication & Supply Schedule
              </h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '0.75rem 1rem', color: 'var(--color-bg-navy)' }}>Item & Specification</th>
                    <th style={{ padding: '0.75rem 1rem', color: 'var(--color-bg-navy)' }}>SKU</th>
                    <th style={{ padding: '0.75rem 1rem', color: 'var(--color-bg-navy)', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '0.75rem 1rem', color: 'var(--color-bg-navy)' }}>Fabrication Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeProject.items.map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ display: 'block', color: 'var(--color-bg-navy)', fontSize: '0.95rem' }}>{it.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{it.specs}</span>
                      </td>
                      <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#475569', fontWeight: '600' }}>
                        {it.sku}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700', color: 'var(--color-bg-navy)' }}>
                        {it.qty}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          border: '1px solid #a7f3d0',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '16px',
                          fontSize: '0.78rem',
                          fontWeight: '600'
                        }}>
                          {it.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
