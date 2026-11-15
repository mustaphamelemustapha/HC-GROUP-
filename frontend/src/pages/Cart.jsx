import React, { useState, useEffect } from 'react';
import { 
  Truck, Trash2, MapPin, Loader, Info, FolderArchive, Layers, 
  ShoppingBag, Plus, Minus, ArrowRight, MessageCircle, Send, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function Cart({ cartItems = [], onUpdateQty, onRemove, onClearCart, setActiveTab }) {
  const directPhone = '+234 9068875555';
  
  // Switch between Direct Material Order and Architectural Project Sourcing Boards
  const [viewMode, setViewMode] = useState(cartItems.length > 0 ? 'cart' : 'boards');

  // Project Boards State
  const [projectBoards, setProjectBoards] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState({ state: '', city: '' });
  const [shippingResults, setShippingResults] = useState({});
  const [calculating, setCalculating] = useState({});
  const [errors, setErrors] = useState({});
  const [activeBoardId, setActiveBoardId] = useState(null);

  // RFQ Submission Modal / State
  const [showRfqForm, setShowRfqForm] = useState(false);
  const [rfqName, setRfqName] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('+234 ');
  const [rfqLocation, setRfqLocation] = useState('');
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqSuccessId, setRfqSuccessId] = useState(null);

  const fetchProjectData = async () => {
    try {
      const res = await fetch('/api/v1/projects');
      if (res.ok) {
        const data = await res.json();
        setProjectBoards(data);
        if (data.length > 0 && !activeBoardId) {
          setActiveBoardId(data[0].id);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetch('/api/v1/shipping/zones')
      .then((res) => res.json())
      .then((data) => {
        setZones(data);
        if (data.length > 0) {
          setSelectedZone(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Recalculate shipping whenever zone, items count or active board changes
  useEffect(() => {
    if (!activeBoardId || !selectedZone.state || !selectedZone.city) return;
    const activeBoard = projectBoards.find(b => b.id === activeBoardId);
    if (!activeBoard || !activeBoard.items || activeBoard.items.length === 0) {
      setShippingResults(prev => ({ ...prev, [activeBoardId]: null }));
      return;
    }

    setCalculating(prev => ({ ...prev, [activeBoardId]: true }));
    setErrors(prev => ({ ...prev, [activeBoardId]: null }));

    fetch('/api/v1/shipping/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: activeBoard.items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        })),
        state: selectedZone.state,
        city: selectedZone.city
      })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to compute shipping');
        setShippingResults(prev => ({ ...prev, [activeBoardId]: data }));
        setCalculating(prev => ({ ...prev, [activeBoardId]: false }));
      })
      .catch((err) => {
        setErrors(prev => ({ ...prev, [activeBoardId]: err.message }));
        setShippingResults(prev => ({ ...prev, [activeBoardId]: null }));
        setCalculating(prev => ({ ...prev, [activeBoardId]: false }));
      });

  }, [activeBoardId, selectedZone, projectBoards]);

  const handleDeleteBoard = async (boardId) => {
    if (!confirm('Are you sure you want to delete this Project Board?')) return;
    try {
      const res = await fetch(`/api/v1/projects/${boardId}`, { method: 'DELETE' });
      if (res.ok) {
        setProjectBoards(prev => prev.filter(b => b.id !== boardId));
        if (activeBoardId === boardId) {
          setActiveBoardId(null);
        }
        alert('Project Board deleted successfully.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleZoneChange = (e) => {
    const val = e.target.value;
    if (!val) return;
    const [state, city] = val.split('|');
    setSelectedZone({ state, city });
  };

  // Calculations for Direct Cart
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Generate WhatsApp Order Message
  const generateWhatsAppCartLink = () => {
    let msg = `*HC GROUP — MATERIAL SOURCING ORDER*\n\n`;
    msg += `Hello HC Group, I would like to request an official quote for the following materials:\n\n`;
    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (SKU: ${item.sku})\n`;
      msg += `   Qty: ${item.quantity} × ₦${item.price.toLocaleString('en-NG')} = ₦${(item.price * item.quantity).toLocaleString('en-NG')}\n`;
    });
    msg += `\n*Estimated Supply Total: ₦${cartSubtotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}*\n\n`;
    msg += `Please confirm stock availability and freight delivery schedule. Thank you.`;
    return `https://wa.me/2349068875555?text=${encodeURIComponent(msg)}`;
  };

  // Submit Cart as Official Database RFQ
  const handleDirectCartRfq = async (e) => {
    e.preventDefault();
    if (!rfqName || !rfqEmail) return;

    setRfqSubmitting(true);
    try {
      const lineItemsSummary = cartItems.map(i => `${i.name} (SKU: ${i.sku}, Qty: ${i.quantity}, Unit Price: ₦${i.price})`).join('; ');
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rfqName,
          email: rfqEmail,
          phone: rfqPhone,
          company: 'Direct Cart Order',
          project_type: 'Material Supply Order',
          scope: 'Direct Cart Items',
          budget: `₦${cartSubtotal.toLocaleString('en-NG')}`,
          location: rfqLocation,
          message: `Ordered Items: ${lineItemsSummary}`
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setRfqSuccessId(data.inquiryId);
      setRfqSubmitting(false);
      if (onClearCart) onClearCart();
    } catch (err) {
      alert(err.message);
      setRfqSubmitting(false);
    }
  };

  // Calculations for Active Project Board
  const activeBoard = projectBoards.find(b => b.id === activeBoardId);
  const activeShipping = activeBoardId ? shippingResults[activeBoardId] : null;
  const activeError = activeBoardId ? errors[activeBoardId] : null;
  const isActiveCalculating = activeBoardId ? calculating[activeBoardId] : false;

  const boardItemsSubtotal = activeBoard?.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const boardShippingFee = activeShipping?.calculation?.totalFee || 0;
  const boardFinalTotal = boardItemsSubtotal + boardShippingFee;

  return (
    <div className="cart-page-container">
      {/* Header & Mode Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge-luxury">PROJECT PROCUREMENT & SOURCING</span>
          <h2 className="section-title" style={{ marginBottom: '0.25rem', textAlign: 'left' }}>
            Materials Order & Freight Engine
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Review your selected materials, estimate site delivery freight, and submit orders directly via WhatsApp or official RFQ.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', background: '#e2e8f0', padding: '0.3rem', borderRadius: '8px' }}>
          <button
            onClick={() => setViewMode('cart')}
            style={{
              padding: '0.6rem 1.4rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: viewMode === 'cart' ? 'var(--color-bg-navy)' : 'transparent',
              color: viewMode === 'cart' ? 'var(--color-gold)' : '#475569'
            }}
          >
            <ShoppingBag size={18} />
            Direct Order ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
          </button>
          
          <button
            onClick={() => setViewMode('boards')}
            style={{
              padding: '0.6rem 1.4rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: viewMode === 'boards' ? 'var(--color-bg-navy)' : 'transparent',
              color: viewMode === 'boards' ? 'var(--color-gold)' : '#475569'
            }}
          >
            <Layers size={18} />
            Project Boards ({projectBoards.length})
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW MODE 1: DIRECT CART MATERIALS
         ========================================================================= */}
      {viewMode === 'cart' && (
        <>
          {cartItems.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border-light)', borderRadius: '12px', padding: '4rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <ShoppingBag size={56} color="var(--color-gold-muted)" style={{ marginBottom: '1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', fontSize: '1.6rem', marginBottom: '0.75rem' }}>
                Your Material Cart is Empty
              </h3>
              <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
                Browse our premium architectural doors, Italian marble slabs, freestanding stone bathtubs, or "Shop The Look" interactive room scenes to specify materials.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {setActiveTab && (
                  <button className="btn-gold" onClick={() => setActiveTab('catalog')}>
                    Explore Product Catalog <ArrowRight size={16} />
                  </button>
                )}
                {setActiveTab && (
                  <button className="btn-outline" onClick={() => setActiveTab('shop-look')}>
                    Shop The Look (Room Hotspots)
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Materials List */}
              <div className="cart-items-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-bg-navy)' }}>
                    Selected Architectural Items ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
                  </h3>
                  <button 
                    onClick={onClearCart} 
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: '500' }}
                  >
                    <Trash2 size={15} /> Clear All
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item) => (
                    <div key={item.variantId} className="cart-item">
                      <div className="cart-item-info">
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--color-bg-navy)', marginBottom: '0.25rem' }}>{item.name}</h4>
                        <div className="cart-item-meta" style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          SKU: <strong>{item.sku}</strong>
                        </div>
                        <div style={{ fontWeight: '600', color: 'var(--color-gold-muted)', marginTop: '0.35rem' }}>
                          ₦{item.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })} each
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQty && onUpdateQty(item.variantId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: '700', minWidth: '24px', textAlign: 'center', fontSize: '1rem' }}>
                          {item.quantity}
                        </span>
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQty && onUpdateQty(item.variantId, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Item Subtotal & Delete */}
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-bg-navy)' }}>
                          ₦{(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                        <button 
                          onClick={() => onRemove && onRemove(item.variantId)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary & Direct Actions */}
              <div className="summary-card">
                <h3 className="summary-title" style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>
                  Procurement Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Total Items Sourced</span>
                    <span style={{ fontWeight: '600' }}>{cartItems.reduce((s, i) => s + i.quantity, 0)} units</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Base Supply Subtotal</span>
                    <span style={{ fontWeight: '600' }}>₦{cartSubtotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)' }}>Estimated Supply</span>
                  <span style={{ color: 'var(--color-gold-muted)' }}>
                    ₦{cartSubtotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Primary Action 1: Instant WhatsApp Order */}
                <a 
                  href={generateWhatsAppCartLink()}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-action-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', marginBottom: '0.75rem', fontSize: '1rem' }}
                >
                  <MessageCircle size={20} /> Order via WhatsApp (+234 9068875555)
                </a>

                {/* Primary Action 2: Formal Database RFQ */}
                <button 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', marginBottom: '1rem' }}
                  onClick={() => setShowRfqForm(true)}
                >
                  Submit as Formal RFQ <Send size={16} />
                </button>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '6px', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.5' }}>
                  <strong>White-Glove Guarantee:</strong> Every order includes verified laser measurements, factory quality audit, and our 10-year structural warranty.
                </div>
              </div>
            </div>
          )}

          {/* Formal RFQ Submission Modal */}
          {showRfqForm && (
            <div className="modal-backdrop" onClick={() => setShowRfqForm(false)}>
              <div className="modal-dialog" style={{ maxWidth: '520px', padding: '2.5rem' }} onClick={(e) => e.stopPropagation()}>
                {rfqSuccessId ? (
                  <div style={{ textAlign: 'center' }}>
                    <CheckCircle2 size={52} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', marginBottom: '0.5rem' }}>
                      Official RFQ Submitted!
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1rem' }}>
                      Your order specifications have been stored in our system under reference:
                    </p>
                    <div className="ticket-badge">{rfqSuccessId}</div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '1rem' }}>
                      Our sourcing directors will review and contact you within 24 hours.
                    </p>
                    <button className="btn-gold" style={{ marginTop: '1.5rem' }} onClick={() => { setShowRfqForm(false); setRfqSuccessId(null); }}>
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDirectCartRfq}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-bg-navy)', marginBottom: '0.5rem' }}>
                      Submit Order Specifications
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                      Enter your details below to generate an official procurement quote for the {cartItems.length} selected materials.
                    </p>

                    <div className="form-group">
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Arc. Babatunde / Lady Cynthia" 
                        value={rfqName}
                        onChange={e => setRfqName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="e.g. client@domain.com" 
                        value={rfqEmail}
                        onChange={e => setRfqEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone / WhatsApp *</label>
                      <input 
                        type="text" 
                        required 
                        value={rfqPhone}
                        onChange={e => setRfqPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Delivery Site Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Lekki Phase 1, Lagos / Maitama, Abuja" 
                        value={rfqLocation}
                        onChange={e => setRfqLocation(e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                      <button 
                        type="submit" 
                        className="btn-gold" 
                        style={{ flex: 1, justifyContent: 'center' }}
                        disabled={rfqSubmitting}
                      >
                        {rfqSubmitting ? 'Recording Order...' : 'Confirm & Submit RFQ'}
                      </button>
                      <button 
                        type="button" 
                        className="btn-outline" 
                        onClick={() => setShowRfqForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          VIEW MODE 2: ARCHITECTURAL PROJECT SOURCING BOARDS
         ========================================================================= */}
      {viewMode === 'boards' && (
        <div>
          {/* Project selector tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {projectBoards.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBoardId(b.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: activeBoardId === b.id ? '1px solid var(--color-gold)' : '1px solid var(--color-border-light)',
                  borderRadius: '6px',
                  backgroundColor: activeBoardId === b.id ? 'var(--color-bg-navy)' : '#ffffff',
                  color: activeBoardId === b.id ? 'var(--color-gold)' : 'var(--color-bg-navy)',
                  fontWeight: '600',
                  fontFamily: 'var(--font-display)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {b.name}
              </button>
            ))}
            {projectBoards.length === 0 && (
              <p style={{ color: '#94a3b8' }}>Create a project board in the Catalog to get started.</p>
            )}
          </div>

          {activeBoard && (
            <div className="cart-layout">
              {/* Left panel: Sourced material items in project */}
              <div className="cart-items-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-bg-navy)' }}>
                    Board Materials Schedule ({activeBoard.items?.length || 0})
                  </h3>
                  <button 
                    onClick={() => handleDeleteBoard(activeBoard.id)} 
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}
                  >
                    <Trash2 size={16} /> Delete Board
                  </button>
                </div>

                {activeBoard.items && activeBoard.items.length > 0 ? (
                  activeBoard.items.map((item, idx) => (
                    <div key={idx} className="cart-item">
                      <div className="cart-item-info">
                        <h4 style={{ fontSize: '1rem', color: 'var(--color-bg-navy)' }}>{item.name}</h4>
                        <div className="cart-item-meta" style={{ fontSize: '0.8rem', color: '#64748b' }}>SKU: {item.sku}</div>
                        <div className="cart-item-meta" style={{ fontSize: '0.8rem', color: '#64748b' }}>Qty Assigned: <strong>{item.quantity}</strong></div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', color: 'var(--color-bg-navy)' }}>
                          ₦{(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#94a3b8', padding: '2rem 0' }}>No materials assigned to this project board yet.</p>
                )}
              </div>

              {/* Right panel: Logistics calculations */}
              <div className="summary-card">
                <h3 className="summary-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Site Logistics & Freight</h3>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.45rem', fontWeight: '500' }}>
                    <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    Nigeria Delivery Site / State
                  </label>
                  <select 
                    className="filter-select"
                    value={`${selectedZone.state}|${selectedZone.city}`}
                    onChange={handleZoneChange}
                  >
                    {zones.map((zone, idx) => (
                      <option key={idx} value={`${zone.state}|${zone.city}`}>
                        {zone.city}, {zone.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Project Supply Cost</span>
                    <span style={{ fontWeight: '600' }}>₦{boardItemsSubtotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>
                      Delivery Freight 
                      {isActiveCalculating && <Loader size={12} className="animate-spin" style={{ marginLeft: '6px', display: 'inline-block' }} />}
                    </span>
                    <span style={{ fontWeight: '600' }}>
                      {activeError ? 'Unavailable' : activeShipping ? `₦${activeShipping.calculation.totalFee.toLocaleString('en-NG', { minimumFractionDigits: 2 })}` : '₦0.00'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)' }}>Estimated Total</span>
                  <span style={{ color: 'var(--color-gold-muted)' }}>₦{boardFinalTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>

                <a 
                  href={`https://wa.me/2349068875555?text=${encodeURIComponent(`Hello HC Group, I am reviewing Project Board "${activeBoard?.name}" totaling ₦${boardFinalTotal.toLocaleString('en-NG')} for delivery to ${selectedZone.city}, ${selectedZone.state}. Please provide the formal schedule.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-action-btn" 
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
                >
                  <MessageCircle size={18} /> Inquire via WhatsApp
                </a>

                {activeError && (
                  <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem', color: '#991b1b', display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>{activeError}</div>
                  </div>
                )}

                {activeShipping && (
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-border-light)', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-bg-navy)', marginBottom: '0.35rem' }}>
                      Recommended Transport: <span style={{ color: 'var(--color-gold-muted)', textTransform: 'uppercase' }}>{activeShipping.calculation.transportType}</span>
                    </div>
                    <div style={{ color: '#64748b' }}>
                      Total Load: {activeShipping.metrics.totalWeightKg.toFixed(1)} kg &bull; {activeShipping.metrics.totalVolumeM3.toFixed(2)} m³
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
