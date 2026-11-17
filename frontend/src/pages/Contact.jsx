import React, { useState, useRef } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, 
  ChevronDown, ChevronUp, ShieldCheck, ArrowRight, MessageCircle,
  FileUp, FileText, FileSpreadsheet, FileCode, Trash2, Calculator, 
  Building2, Ruler, UploadCloud, HardHat, Copy, Check, Sparkles
} from 'lucide-react';

export default function Contact({ setActiveTab }) {
  const directPhone = '+234 9068875555';
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: 'Private Luxury Villa',
    construction_stage: 'Structural Shell Complete (Ready for Aperture Measurement)',
    scope: ['Doors & Windows', 'Luxury Architectural Carpets & Rugs'],
    budget: '₦75,000,000 - ₦200,000,000 (Luxury Residence / Whole-Villa)',
    location: '',
    message: '',
    need_onsite_survey: false
  });

  // Attached Blueprint & CAD Files
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // CAD Sizing Quick Calculator Drawer
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcData, setCalcData] = useState({
    entranceDoors: 2,
    interiorDoors: 12,
    carpetArea: 320,
    wardrobeMeters: 16,
    marbleArea: 250
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

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

  const stageOptions = [
    {
      title: 'Concept & Planning',
      sub: 'Need whole-house 3D design & preliminary BoQ cost analysis'
    },
    {
      title: 'Structural Shell Complete',
      sub: 'Apertures ready for ±0.5mm 3D LiDAR laser surveying'
    },
    {
      title: 'Interior Fit-Out Active',
      sub: 'Apertures framed; urgent door & custom joinery production'
    },
    {
      title: 'Renovation & Bespoke Retrofit',
      sub: 'High-end transformation of existing luxury residential property'
    }
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

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFilesAdded = (filesList) => {
    const newFiles = Array.from(filesList).map(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        rawSize: file.size,
        ext: ext
      };
    });
    setAttachedFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (ext) => {
    if (['dwg', 'dxf', 'rvt', 'ifc'].includes(ext)) {
      return <FileCode size={20} color="var(--color-gold)" />;
    }
    if (['xlsx', 'xls', 'csv'].includes(ext)) {
      return <FileSpreadsheet size={20} color="#10b981" />;
    }
    return <FileText size={20} color="#3b82f6" />;
  };

  const applyCalculatorToScope = () => {
    const calcSummary = `\n\n[ESTIMATED ARCHITECTURAL QUANTITIES (CAD TAKEOFF)]:\n• Entrance Pivot Portals: ${calcData.entranceDoors} units\n• Bespoke Interior Doors: ${calcData.interiorDoors} units\n• Luxury Silk/Wool Carpets: ~${calcData.carpetArea} sq.m\n• Whole-House Joinery / Wardrobes: ~${calcData.wardrobeMeters} linear meters\n• Marble / Stone Slabs: ~${calcData.marbleArea} sq.m`;
    
    setFormData(prev => ({
      ...prev,
      message: (prev.message + calcSummary).trim()
    }));
    setShowCalculator(false);
  };

  const generateWhatsAppUrl = () => {
    const filesNote = attachedFiles.length > 0 
      ? attachedFiles.map(f => `${f.name} (${f.size})`).join(', ')
      : 'Blueprints available to send via WhatsApp';
      
    const text = 
`*HC GROUP — ARCHITECTURAL BLUEPRINT & BOQ INQUIRY*
━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${formData.name || 'Architectural Client'}
🏛 *Company / Firm:* ${formData.company || 'Private Developer'}
📍 *Project Location:* ${formData.location || 'Nigeria'}
🏗 *Project Classification:* ${formData.project_type}
📐 *Construction Stage:* ${formData.construction_stage}
💰 *Target Budget Tier:* ${formData.budget}
📦 *Materials Scope:* ${formData.scope.join(', ') || 'Whole-House Procurement'}
📑 *Attached CAD / BoQ Plans:* ${filesNote}
${formData.need_onsite_survey ? '🔍 *Site Survey Request:* YES (Requesting 3D LiDAR Survey Team to Site)\n' : ''}
📝 *Project Notes & Specifications:*
${formData.message || 'Please coordinate technical review and schedule preliminary aperture pricing.'}
━━━━━━━━━━━━━━━━━━━━
Sent from HC Group Architectural Procurement Portal (https://hcgroup.netlify.app)`;

    return `https://wa.me/2349068875555?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg('Please enter your full name and professional email address.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    // Bundle file metadata and stage into message body so it persists completely in backend
    const filesMeta = attachedFiles.length > 0 
      ? `\n\n[ATTACHED BLUEPRINTS & CAD DOCUMENTS]:\n` + attachedFiles.map(f => `• ${f.name} (${f.size})`).join('\n')
      : '';
    const surveyNote = formData.need_onsite_survey ? `\n[ON-SITE 3D LASER MEASUREMENT REQUESTED: YES]` : '';
    const stageNote = `\n[CONSTRUCTION STAGE: ${formData.construction_stage}]`;

    const fullPayload = {
      ...formData,
      message: `${formData.message}${stageNote}${surveyNote}${filesMeta}`
    };

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload)
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

  const copyTicketId = () => {
    if (successResult?.inquiryId) {
      navigator.clipboard.writeText(successResult.inquiryId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2500);
    }
  };

  const faqs = [
    {
      q: 'What CAD and blueprint file formats can I submit for BoQ take-off?',
      a: 'We accept AutoCAD (.DWG, .DXF), Revit BIM (.RVT, .IFC), Architectural PDF blueprints, and Bill of Quantities spreadsheets (.XLSX, .CSV). Our senior engineering department converts raw architectural plans into zero-tolerance production shop drawings within 24 to 48 hours.'
    },
    {
      q: 'How quickly can your 3D LiDAR laser team deploy to our site in Nigeria?',
      a: 'For projects in Maiduguri (Borno State), Abuja (FCT), Lagos, Kano, and Port Harcourt, our mobile surveying engineers deploy within 24 to 48 hours equipped with Leica 3D LiDAR scanners to capture ceiling heights, aperture depths, and mechanical clearances with ±0.5mm accuracy.'
    },
    {
      q: 'Can I discuss my blueprints directly over WhatsApp with an engineer right now?',
      a: `Yes! You can connect immediately with our senior architectural director at ${directPhone}. You can transmit CAD files, PDF plans, or site photos directly via WhatsApp for real-time review.`
    },
    {
      q: 'What is the standard manufacturing and shipping timeline to Nigeria?',
      a: 'Bespoke custom items—including 3.5m pivot doors, laser-cut marble slabs, and custom modular joinery—require 25 to 45 business days for factory CNC fabrication. Ocean freight is cleared through Nigerian ports and delivered via bonded transport directly to your site in Borno or nationwide.'
    },
    {
      q: 'Do you deliver physical material sample swatches before production starts?',
      a: 'Yes. Once an initial architectural drawing or material schedule is audited by our engineering team, we dispatch a curated sample box (hardwood finishes, marble batches, hardware swatches, aluminum profiles) directly via express courier to your office or residence.'
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
          <img src="/assets/products/interior_4.jpeg" alt="HC Group Architectural Procurement" />
        </div>
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <span className="badge-luxury">ONE-STOP ARCHITECTURAL PROCUREMENT & CAD RFQ</span>
          <h1 className="contact-hero-title">
            CAD Blueprint Take-Off & <span>Technical Consultation</span>
          </h1>
          <p className="contact-hero-desc">
            Submit your architectural floor plans, DWG files, or Bill of Quantities (BoQ). 
            Our senior engineering team audits structural tolerances, calculates factory-direct pricing, 
            and schedules on-site 3D LiDAR laser surveys across Nigeria.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <span><ShieldCheck size={16} color="var(--color-gold)" style={{ verticalAlign: 'middle', marginRight: '6px' }} /> ±0.5mm 3D Laser Accuracy</span>
            <span><Clock size={16} color="var(--color-gold)" style={{ verticalAlign: 'middle', marginRight: '6px' }} /> 24–48hr BoQ Turnaround</span>
            <span><Building2 size={16} color="var(--color-gold)" style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Bonded Delivery Across 36 States</span>
          </div>
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
                <h3>Blueprint & RFQ Registered Successfully</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your project specification has been logged in our engineering registry under reference:
                </p>
                
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
                  <div className="ticket-badge">{successResult.inquiryId}</div>
                  <button 
                    onClick={copyTicketId}
                    style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '0.5rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
                  >
                    {copiedTicket ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    {copiedTicket ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.5rem', lineHeight: '1.6' }}>
                  A Senior Technical Director has been assigned to your request and will review your CAD parameters and reach out via <strong>{formData.email}</strong> or phone within 24 to 48 hours with a preliminary Bill of Quantities schedule.
                </p>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a 
                    href={generateWhatsAppUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="rfq-whatsapp-dispatch-btn"
                  >
                    <MessageCircle size={18} /> Open Direct WhatsApp Thread (With Ticket Ref)
                  </a>
                  <button 
                    className="btn-outline" 
                    onClick={() => {
                      setSuccessResult(null);
                      setAttachedFiles([]);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        project_type: 'Private Luxury Villa',
                        construction_stage: 'Structural Shell Complete (Ready for Aperture Measurement)',
                        scope: ['Doors & Windows', 'Luxury Architectural Carpets & Rugs'],
                        budget: '₦75,000,000 - ₦200,000,000 (Luxury Residence / Whole-Villa)',
                        location: '',
                        message: '',
                        need_onsite_survey: false
                      });
                    }}
                  >
                    Submit Another Project
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-head">
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    Architectural Blueprint & RFQ Submission
                  </h2>
                  <p style={{ color: '#334155', fontSize: '0.95rem' }}>
                    Upload your CAD floor plans, DWG drawings, or project brief below. For direct urgent inquiries, call our Maiduguri HQ direct line: <strong style={{ color: 'var(--color-gold-muted)' }}>{directPhone}</strong>
                  </p>
                </div>

                {errorMsg && (
                  <div className="form-error-alert">
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Construction Stage Selector */}
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Current Construction Stage *</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Select best match</span>
                  </label>
                  <div className="cad-stage-grid">
                    {stageOptions.map(stg => (
                      <div 
                        key={stg.title}
                        className={`cad-stage-card ${formData.construction_stage === stg.title ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, construction_stage: stg.title })}
                      >
                        <div className="cad-stage-title">
                          <span>{stg.title}</span>
                          {formData.construction_stage === stg.title && <CheckCircle2 size={16} color="var(--color-gold)" />}
                        </div>
                        <div className="cad-stage-sub">{stg.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CAD / Blueprint Drag & Drop Zone */}
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Attach CAD Floor Plans, DWG, PDF or BoQ Sheets</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-muted)', fontWeight: '600' }}>Up to 50MB</span>
                  </label>
                  
                  <div 
                    className={`cad-uploader-zone ${isDragging ? 'cad-drag-active' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        handleFilesAdded(e.dataTransfer.files);
                      }
                    }}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      multiple
                      accept=".dwg,.dxf,.pdf,.rvt,.ifc,.xlsx,.xls,.csv,.zip,.rar,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFilesAdded(e.target.files);
                        }
                      }}
                    />
                    <div className="cad-uploader-icon-wrap">
                      <UploadCloud size={28} />
                    </div>
                    <h4 style={{ color: 'var(--color-bg-navy)', fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                      Drag & Drop Blueprints, CAD DWG, or BoQ Spreadsheet
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                      Supports DWG, DXF, RVT, IFC, PDF, XLSX, and high-res site photos. Or click to browse.
                    </p>
                  </div>

                  {/* Attached Files List */}
                  {attachedFiles.length > 0 && (
                    <div className="cad-files-grid">
                      {attachedFiles.map(file => (
                        <div key={file.id} className="cad-file-pill">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden' }}>
                            {getFileIcon(file.ext)}
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {file.name}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{file.size}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                            <span className="cad-file-badge">{file.ext}</span>
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); handleRemoveFile(file.id); }}
                              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                              title="Remove file"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* On-Site Survey Checkbox */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', marginTop: '0.65rem', fontSize: '0.88rem', color: '#334155' }}>
                    <input 
                      type="checkbox"
                      checked={formData.need_onsite_survey}
                      onChange={(e) => setFormData({ ...formData, need_onsite_survey: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-bg-navy)' }}
                    />
                    <span><strong>Request 3D LiDAR Laser Survey Team:</strong> Schedule on-site aperture laser take-off in Maiduguri, Abuja, Lagos, or nationwide.</span>
                  </label>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name / Principal Architect *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Arch. Aminu Bello / Chief Adeleke" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Professional Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. director@studio-vance.com" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone / WhatsApp Number *</label>
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
                      placeholder="e.g. Prime Design Studios & Partners" 
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
                      <option value="Private Luxury Villa">Private Luxury Villa / Estate</option>
                      <option value="Diplomatic Residence">Diplomatic / Presidential Residence</option>
                      <option value="Multi-Unit Residential Estate">Multi-Unit Residential Estate</option>
                      <option value="Luxury Hotel & Hospitality">Luxury Hotel & Hospitality</option>
                      <option value="Commercial Corporate HQ">Commercial Corporate HQ</option>
                      <option value="Whole-House Bespoke Retrofit">Whole-House Bespoke Retrofit</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Target Material Budget (Nigerian Naira ₦)</label>
                    <select 
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="₦25,000,000 - ₦75,000,000 (Selective Spaces / Executive Entrance & Carpets)">₦25,000,000 - ₦75,000,000 (Selective Spaces / Entrance)</option>
                      <option value="₦75,000,000 - ₦200,000,000 (Luxury Residence / Whole-Villa)">₦75,000,000 - ₦200,000,000 (Luxury Residence / Whole-Villa)</option>
                      <option value="₦200,000,000 - ₦500,000,000 (Presidential Estate / Diplomatic Villa)">₦200,000,000 - ₦500,000,000 (Presidential Estate / Diplomatic)</option>
                      <option value="₦500,000,000+ (Multi-Unit Residential Estate / Hotel Development)">₦500,000,000+ (Turnkey Mega-Estate / Commercial)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Site Location (City, State / Region)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sir Kashim Ibrahim Way, Maiduguri / Maitama, Abuja / Banana Island, Lagos" 
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.6rem' }}>
                    Required Architectural Lines (Multi-Select):
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

                {/* Collapsible CAD Sizing Quick Calculator */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <button 
                    type="button" 
                    className="cad-calc-trigger"
                    onClick={() => setShowCalculator(!showCalculator)}
                  >
                    <Calculator size={16} />
                    <span>{showCalculator ? 'Close Aperture Quantity Estimator' : 'Open CAD Aperture & Area Estimator Tool'}</span>
                  </button>

                  {showCalculator && (
                    <div className="cad-calc-drawer">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <strong style={{ fontSize: '0.92rem', color: 'var(--color-bg-navy)' }}>
                          Preliminary CAD Quantity Take-Off
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Estimates factory production volume</span>
                      </div>
                      <div className="cad-calc-grid">
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Entrance Pivot Doors</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="20"
                            value={calcData.entranceDoors}
                            onChange={e => setCalcData({ ...calcData, entranceDoors: Number(e.target.value) })}
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Interior Flush Doors</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="100"
                            value={calcData.interiorDoors}
                            onChange={e => setCalcData({ ...calcData, interiorDoors: Number(e.target.value) })}
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Luxury Carpet Area (m²)</label>
                          <input 
                            type="number" 
                            min="10" 
                            max="5000"
                            value={calcData.carpetArea}
                            onChange={e => setCalcData({ ...calcData, carpetArea: Number(e.target.value) })}
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Wardrobe Joinery (Lin. m)</label>
                          <input 
                            type="number" 
                            min="2" 
                            max="100"
                            value={calcData.wardrobeMeters}
                            onChange={e => setCalcData({ ...calcData, wardrobeMeters: Number(e.target.value) })}
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Marble Slabs Area (m²)</label>
                          <input 
                            type="number" 
                            min="10" 
                            max="5000"
                            value={calcData.marbleArea}
                            onChange={e => setCalcData({ ...calcData, marbleArea: Number(e.target.value) })}
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                          <button 
                            type="button" 
                            onClick={applyCalculatorToScope}
                            className="btn-gold"
                            style={{ width: '100%', padding: '0.55rem', fontSize: '0.82rem', justifyContent: 'center' }}
                          >
                            <Sparkles size={14} /> Insert Take-Off
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Project Scope, Ceiling Heights & Aperture Specifications</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details on ceiling heights (e.g. 3.2m), door aperture dimensions (e.g. 1.4m x 2.8m), preferred wood veneer, marble slab vein matching, or site delivery schedule..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Dual Dispatch Action Buttons */}
                <div className="rfq-action-container">
                  <button 
                    type="submit" 
                    className="btn-gold" 
                    style={{ justifyContent: 'center', padding: '1rem', width: '100%' }}
                    disabled={loading}
                  >
                    {loading ? 'Submitting Blueprints...' : (
                      <>
                        <Send size={18} style={{ marginRight: '8px' }} /> Submit Blueprint RFQ
                      </>
                    )}
                  </button>

                  <a 
                    href={generateWhatsAppUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="rfq-whatsapp-dispatch-btn"
                  >
                    <MessageCircle size={18} /> Fast-Track via WhatsApp
                  </a>
                </div>
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
                <a href={generateWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="whatsapp-action-btn">
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
                  <p>hccompanyltd1@gmail.com &bull; info@hcgroup-trade.com</p>
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
