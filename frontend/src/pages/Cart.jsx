import React, { useState, useEffect, useMemo } from 'react';
import { 
  Truck, 
  Trash2, 
  MapPin, 
  Loader, 
  Info, 
  FolderArchive, 
  Layers, 
  ShoppingBag, 
  Plus, 
  Minus, 
  ArrowRight, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Printer, 
  FileText, 
  X, 
  ShieldCheck, 
  Download,
  Building2,
  Calendar,
  Check,
  Phone,
  Mail,
  FileCheck
} from 'lucide-react';

export default function Cart({ cartItems = [], onUpdateQty, onRemove, onClearCart, setActiveTab }) {
  const directPhone = '+234 9068875555';
  
  // Default to Direct Material Order view so users always see their cart items or empty state
  const [viewMode, setViewMode] = useState('cart');

  // Default Nigerian logistics zones so UI is instant and never crashes if API is unreachable
  const DEFAULT_ZONES = [
    { state: 'Borno', city: 'Maiduguri Central (Sir Kashim Ibrahim Way)' },
    { state: 'Borno', city: 'Maiduguri (GRA)' },
    { state: 'FCT Abuja', city: 'Maitama / Asokoro' },
    { state: 'Lagos', city: 'Victoria Island / Lekki' },
    { state: 'Kano', city: 'Nassarawa Commercial District' }
  ];

  // Project Boards State
  const [projectBoards, setProjectBoards] = useState([]);
  const [zones, setZones] = useState(DEFAULT_ZONES);
  const [selectedZone, setSelectedZone] = useState({ state: 'Borno', city: 'Maiduguri Central (Sir Kashim Ibrahim Way)' });
  const [activeBoardId, setActiveBoardId] = useState(null);

  // Freight Calculation States
  const [cartShipping, setCartShipping] = useState(null);
  const [boardShippingResults, setBoardShippingResults] = useState({});
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false);
  const [freightError, setFreightError] = useState(null);

  // RFQ Submission Modal State
  const [showRfqForm, setShowRfqForm] = useState(false);
  const [rfqName, setRfqName] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('+234 ');
  const [rfqLocation, setRfqLocation] = useState('GRA, Maiduguri, Borno State');
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqSuccessId, setRfqSuccessId] = useState(null);

  // Formal Quotation & PDF BoQ Spec Sheet Modal State
  const [showPrintQuote, setShowPrintQuote] = useState(false);
  const [quoteRef] = useState(() => 'HC-BOQ-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000));
  const [quoteClientName, setQuoteClientName] = useState('Executive Private Estate / Architecture Partner');
  const [quoteSiteAddress, setQuoteSiteAddress] = useState('Sir Kashim Ibrahim Way / GRA, Maiduguri, Borno State');
  const [quoteClientPhone, setQuoteClientPhone] = useState('+234 9068875555');
  const [quoteProjectType, setQuoteProjectType] = useState('Turnkey Architectural Fit-Out & Bespoke Materials');
  const [quoteSubmitSuccess, setQuoteSubmitSuccess] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);

  // Safe helper to extract transport fleet label
  const getTransportFleetLabel = (shippingData) => {
    if (!shippingData) return 'Standard Freight Transit';
    const rawType = shippingData?.transport?.type || shippingData?.calculation?.transportType || 'flatbed';
    return String(rawType).replace(/_/g, ' ').toUpperCase();
  };

  const fetchProjectData = async () => {
    try {
      const res = await fetch('/api/v1/projects');
      if (res.ok) {
        const data = await res.json();
        setProjectBoards(Array.isArray(data) ? data : []);
        if (Array.isArray(data) && data.length > 0 && !activeBoardId) {
          setActiveBoardId(data[0]?.id);
        }
      }
    } catch (e) {
      console.warn('Projects fetch error:', e);
      setProjectBoards([]);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetch('/api/v1/shipping/zones')
      .then((res) => {
        if (!res.ok) throw new Error('Status ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setZones(data);
          const bornoZone = data.find(z => z?.state && String(z.state).toLowerCase() === 'borno') || data[0];
          if (bornoZone) {
            setSelectedZone(bornoZone);
            setQuoteSiteAddress(`${bornoZone.city || 'Maiduguri'}, ${bornoZone.state || 'Borno'}, Nigeria`);
          }
        }
      })
      .catch((err) => {
        console.warn('Using default Nigerian zones:', err.message);
      });
  }, []);

  // Recalculate freight for Direct Cart
  useEffect(() => {
    if (!selectedZone?.state || !selectedZone?.city || !Array.isArray(cartItems) || cartItems.length === 0) {
      setCartShipping(null);
      return;
    }

    setIsCalculatingFreight(true);
    setFreightError(null);

    fetch('/api/v1/shipping/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        })),
        state: selectedZone.state,
        city: selectedZone.city
      })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to compute site freight');
        setCartShipping(data);
        setIsCalculatingFreight(false);
      })
      .catch((err) => {
        setFreightError(err.message);
        setCartShipping(null);
        setIsCalculatingFreight(false);
      });
  }, [cartItems, selectedZone]);

  // Recalculate freight for Active Project Board
  useEffect(() => {
    if (!activeBoardId || !selectedZone?.state || !selectedZone?.city) return;
    const activeBoard = projectBoards.find(b => b.id === activeBoardId);
    if (!activeBoard || !activeBoard.items || activeBoard.items.length === 0) {
      setBoardShippingResults(prev => ({ ...prev, [activeBoardId]: null }));
      return;
    }

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
        if (res.ok) {
          setBoardShippingResults(prev => ({ ...prev, [activeBoardId]: data }));
        }
      })
      .catch((err) => console.error(err));
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
    setQuoteSiteAddress(`${city}, ${state}, Nigeria`);
  };

  // Calculations for Direct Cart
  const cartSubtotal = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((acc, item) => acc + (((item && item.price) || 0) * ((item && item.quantity) || 1)), 0);
  }, [cartItems]);

  const cartShippingFee = cartShipping?.calculation?.totalFee || 0;
  const cartGrandTotal = cartSubtotal + cartShippingFee;

  // Calculations for Active Project Board
  const activeBoard = projectBoards.find(b => b.id === activeBoardId);
  const activeBoardShipping = activeBoardId ? boardShippingResults[activeBoardId] : null;
  const boardItemsSubtotal = activeBoard?.items?.reduce((acc, item) => acc + (((item && item.price) || 0) * ((item && item.quantity) || 1)), 0) || 0;
  const boardShippingFee = activeBoardShipping?.calculation?.totalFee || 0;
  const boardFinalTotal = boardItemsSubtotal + boardShippingFee;

  // Active items for quotation export
  const activeItemsForQuote = useMemo(() => {
    if (viewMode === 'cart') {
      return (cartItems || []).filter(Boolean).map(i => ({
        name: i?.name || 'Architectural Specification',
        sku: i?.sku || 'HC-SPEC',
        quantity: i?.quantity || 1,
        price: i?.price || 0,
        subtotal: (i?.price || 0) * (i?.quantity || 1)
      }));
    }
    return (activeBoard?.items || []).filter(Boolean).map(i => ({
      name: i?.name || 'Architectural Specification',
      sku: i?.sku || 'HC-SPEC',
      quantity: i?.quantity || 1,
      price: i?.price || 0,
      subtotal: (i?.price || 0) * (i?.quantity || 1)
    }));
  }, [viewMode, cartItems, activeBoard]);

  const activeSubtotalForQuote = viewMode === 'cart' ? cartSubtotal : boardItemsSubtotal;
  const activeShippingData = viewMode === 'cart' ? cartShipping : activeBoardShipping;
  const activeFreightFeeForQuote = viewMode === 'cart' ? cartShippingFee : boardShippingFee;
  const activeGrandTotalForQuote = viewMode === 'cart' ? cartGrandTotal : boardFinalTotal;

  // Generate WhatsApp Order Message
  const generateWhatsAppQuoteLink = () => {
    try {
      let msg = `*HC GROUP — OFFICIAL BILL OF QUANTITIES QUOTATION*\n`;
      msg += `Ref: ${quoteRef}\n`;
      msg += `Client: ${quoteClientName}\n`;
      msg += `Site Location: ${quoteSiteAddress}\n`;
      msg += `Project Scope: ${quoteProjectType}\n\n`;
      msg += `*SCHEDULE OF MATERIALS:*\n`;
      activeItemsForQuote.forEach((item, idx) => {
        msg += `${idx + 1}. *${item.name}* (SKU: ${item.sku})\n`;
        msg += `   Qty: ${item.quantity} × ₦${Number(item.price || 0).toLocaleString('en-NG')} = ₦${Number(item.subtotal || 0).toLocaleString('en-NG')}\n`;
      });
      msg += `\n*Material Supply Subtotal:* ₦${Number(activeSubtotalForQuote || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}\n`;
      if (activeShippingData) {
        msg += `*Site Delivery Freight (${getTransportFleetLabel(activeShippingData)}):* ₦${Number(activeFreightFeeForQuote || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}\n`;
      }
      msg += `*TOTAL ESTIMATED INVESTMENT:* ₦${Number(activeGrandTotalForQuote || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}\n\n`;
      msg += `Headquarters: Sir Kashim Ibrahim Way, Maiduguri, Borno State.\nPlease confirm technical CAD review and production schedule.`;
      return `https://wa.me/2349068875555?text=${encodeURIComponent(msg)}`;
    } catch {
      return `https://wa.me/2349068875555?text=${encodeURIComponent('Hello HC Group, I would like to inquire about my architectural order.')}`;
    }
  };

  // Submit Formal Quotation to Backend RFQ Database
  const handleSubmitQuotationToDesk = async () => {
    setQuoteSubmitting(true);
    try {
      const scheduleSummary = activeItemsForQuote
        .map((it, idx) => `${idx + 1}. ${it.name} (SKU: ${it.sku}, Qty: ${it.quantity}, Total: ₦${Number(it.subtotal || 0).toLocaleString('en-NG')})`)
        .join('\n');

      const fullMessage = `QUOTATION REFERENCE: ${quoteRef}\n` +
        `Site Address: ${quoteSiteAddress}\n` +
        `Materials Subtotal: ₦${Number(activeSubtotalForQuote || 0).toLocaleString('en-NG')}\n` +
        `Logistics Freight: ₦${Number(activeFreightFeeForQuote || 0).toLocaleString('en-NG')}\n` +
        `Total Investment: ₦${Number(activeGrandTotalForQuote || 0).toLocaleString('en-NG')}\n\n` +
        `SCHEDULE OF FINISHES:\n${scheduleSummary}`;

      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteClientName,
          email: 'quote@hcgroup-client.com',
          phone: quoteClientPhone,
          company: quoteClientName,
          project_type: quoteProjectType,
          scope: 'Official Architectural BoQ',
          budget: `₦${Number(activeGrandTotalForQuote || 0).toLocaleString('en-NG')}`,
          location: quoteSiteAddress,
          message: fullMessage
        })
      });

      if (res.ok) {
        setQuoteSubmitSuccess(true);
        setTimeout(() => setQuoteSubmitSuccess(false), 6000);
      } else {
        throw new Error('Failed to submit quote to desk');
      }
    } catch (e) {
      console.error(e);
      alert('Could not submit quotation: ' + e.message);
    } finally {
      setQuoteSubmitting(false);
    }
  };

  // Submit Direct Cart RFQ Modal
  const handleDirectCartRfq = async (e) => {
    e.preventDefault();
    if (!rfqName || !rfqEmail) return;

    setRfqSubmitting(true);
    try {
      const lineItemsSummary = cartItems.map(i => `${i.name} (SKU: ${i.sku}, Qty: ${i.quantity}, Price: ₦${i.price})`).join('; ');
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rfqName,
          email: rfqEmail,
          phone: rfqPhone,
          company: 'Direct Client Order',
          project_type: 'Material Sourcing & Delivery',
          scope: 'Direct Cart Schedule',
          budget: `₦${Number(cartGrandTotal || 0).toLocaleString('en-NG')}`,
          location: rfqLocation,
          message: `Ordered Items: ${lineItemsSummary}. Delivery Site: ${selectedZone?.city || ''}, ${selectedZone?.state || ''}.`
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
            Review your architectural specifications, calculate site delivery freight, and export formal BoQ quotations.
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
            Direct Order ({(Array.isArray(cartItems) ? cartItems : []).reduce((sum, i) => sum + ((i && i.quantity) || 1), 0)})
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
          {(!cartItems || cartItems.length === 0) ? (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border-light)', borderRadius: '12px', padding: '4rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <ShoppingBag size={56} color="var(--color-gold-muted)" style={{ margin: '0 auto 1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', fontSize: '1.6rem', marginBottom: '0.75rem' }}>
                Your Material Cart is Empty
              </h3>
              <p style={{ color: '#64748b', maxWidth: '540px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
                Browse our premium architectural doors, luxury hand-knotted carpets & rugs, Italian marble slabs, freestanding stone bathtubs, or "Shop The Look" interactive room scenes to specify materials.
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
                {setActiveTab && (
                  <button className="btn-outline" onClick={() => setActiveTab('tracking')}>
                    Track Active Project
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
                    Selected Architectural Items ({(Array.isArray(cartItems) ? cartItems : []).reduce((sum, i) => sum + ((i && i.quantity) || 1), 0)})
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
                          SKU: <span style={{ color: 'var(--color-gold)', fontWeight: '700' }}>{item.sku}</span> &bull; Unit Rate: ₦{Number(item.price || 0).toLocaleString('en-NG')}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="qty-stepper">
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQty && onUpdateQty(item.variantId, (item.quantity || 1) - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQty && onUpdateQty(item.variantId, (item.quantity || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Item Subtotal & Delete */}
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-bg-navy)' }}>
                          ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
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

              {/* Order Summary & Site Freight Engine */}
              <div className="summary-card">
                <h3 className="summary-title" style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>
                  Procurement & Site Freight
                </h3>

                {/* Delivery Zone Selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.45rem', fontWeight: '500' }}>
                    <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px', color: 'var(--color-gold)' }} />
                    Destination Project Site (Nigeria)
                  </label>
                  <select 
                    className="filter-select"
                    value={`${selectedZone?.state || ''}|${selectedZone?.city || ''}`}
                    onChange={handleZoneChange}
                    style={{ width: '100%' }}
                  >
                    {zones.map((zone, idx) => (
                      <option key={idx} value={`${zone.state}|${zone.city}`}>
                        {zone.city}, {zone.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Materials Supply Subtotal</span>
                    <span style={{ fontWeight: '600' }}>₦{cartSubtotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Truck size={15} color="var(--color-gold)" /> Site Delivery Freight
                      {isCalculatingFreight && <Loader size={12} className="spin" />}
                    </span>
                    <span style={{ fontWeight: '600', color: 'var(--color-bg-navy)' }}>
                      {freightError ? 'Contact Dispatch' : cartShipping ? `₦${cartShippingFee.toLocaleString('en-NG', { minimumFractionDigits: 2 })}` : 'Calculating...'}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)' }}>Total Estimated Investment</span>
                  <span style={{ color: 'var(--color-gold)' }}>
                    ₦{cartGrandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Primary Action 1: Export Formal BoQ PDF */}
                <button 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}
                  onClick={() => setShowPrintQuote(true)}
                >
                  <FileText size={18} /> Generate Architectural BoQ / PDF Quote
                </button>

                {/* Primary Action 2: Direct WhatsApp Order */}
                <a 
                  href={generateWhatsAppQuoteLink()}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-action-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}
                >
                  <MessageCircle size={18} /> Inquire via WhatsApp (+234 9068875555)
                </a>

                {/* Primary Action 3: Formal Database RFQ */}
                <button 
                  className="btn-outline" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem' }}
                  onClick={() => setShowRfqForm(true)}
                >
                  Submit Order as Formal RFQ <Send size={15} />
                </button>

                {/* Logistics Badge */}
                {cartShipping && (
                  <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--color-border-light)', fontSize: '0.8rem', color: '#64748b' }}>
                    <div style={{ fontWeight: '700', color: 'var(--color-bg-navy)', marginBottom: '0.2rem' }}>
                      Recommended Fleet: <span style={{ color: 'var(--color-gold)' }}>{getTransportFleetLabel(cartShipping)}</span>
                    </div>
                    <div>
                      Load Metrics: {cartShipping?.metrics?.totalWeightKg?.toFixed(1) || '0.0'} kg &bull; {cartShipping?.metrics?.totalVolumeM3?.toFixed(2) || '0.00'} m³
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Formal RFQ Submission Modal */}
          {showRfqForm && (
            <div className="modal-backdrop" onClick={() => setShowRfqForm(false)}>
              <div className="modal-dialog" style={{ maxWidth: '520px', padding: '2.5rem' }} onClick={(e) => e.stopPropagation()}>
                {rfqSuccessId ? (
                  <div style={{ textAlign: 'center' }}>
                    <CheckCircle2 size={52} color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
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
                    <button className="btn-gold" style={{ marginTop: '1.5rem', marginInline: 'auto' }} onClick={() => { setShowRfqForm(false); setRfqSuccessId(null); }}>
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
                        placeholder="e.g. GRA, Maiduguri / Sir Kashim Ibrahim Way / Abuja" 
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
              <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%' }}>
                <p style={{ color: '#64748b', margin: '0 0 1rem 0' }}>No saved Project Boards found. Sourced products appear on your Direct Order schedule.</p>
                <button className="btn-gold" onClick={() => setViewMode('cart')}>
                  View Direct Order Schedule
                </button>
              </div>
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
                          ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
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
                    value={`${selectedZone?.state || ''}|${selectedZone?.city || ''}`}
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
                    <span style={{ color: '#64748b' }}>Delivery Freight</span>
                    <span style={{ fontWeight: '600' }}>
                      {activeBoardShipping ? `₦${boardShippingFee.toLocaleString('en-NG', { minimumFractionDigits: 2 })}` : '₦0.00'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)' }}>Estimated Total</span>
                  <span style={{ color: 'var(--color-gold)' }}>₦{boardFinalTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>

                <button 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginBottom: '0.75rem' }}
                  onClick={() => setShowPrintQuote(true)}
                >
                  <FileText size={17} /> Generate Architectural BoQ / PDF Quote
                </button>

                <a 
                  href={`https://wa.me/2349068875555?text=${encodeURIComponent(`Hello HC Group, I am reviewing Project Board "${activeBoard?.name}" totaling ₦${boardFinalTotal.toLocaleString('en-NG')} for delivery to ${selectedZone?.city || ''}, ${selectedZone?.state || ''}. Please provide the formal schedule.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-action-btn" 
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
                >
                  <MessageCircle size={18} /> Inquire via WhatsApp
                </a>

                {activeBoardShipping && (
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-border-light)', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-bg-navy)', marginBottom: '0.35rem' }}>
                      Recommended Fleet: <span style={{ color: 'var(--color-gold)' }}>{getTransportFleetLabel(activeBoardShipping)}</span>
                    </div>
                    <div style={{ color: '#64748b' }}>
                      Total Load: {activeBoardShipping?.metrics?.totalWeightKg?.toFixed(1) || '0.0'} kg &bull; {activeBoardShipping?.metrics?.totalVolumeM3?.toFixed(2) || '0.00'} m³
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          OFFICIAL ARCHITECTURAL BILL OF QUANTITIES (BoQ) & PDF QUOTATION MODAL
         ========================================================================= */}
      {showPrintQuote && (
        <div className="modal-backdrop print-modal-backdrop" onClick={() => setShowPrintQuote(false)}>
          <div className="modal-dialog print-quote-dialog" onClick={(e) => e.stopPropagation()}>
            
            {/* Top Modal Controls (Hidden in Print) */}
            <div className="print-controls-bar no-print">
              <div>
                <strong style={{ fontSize: '1rem', color: '#ffffff' }}>Official Architectural Quotation</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', marginLeft: '0.5rem' }}>
                  Letterhead & Bill of Quantities (BoQ)
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  className="btn-gold"
                  style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
                  onClick={() => window.print()}
                  title="Print or Save as PDF"
                >
                  <Printer size={15} /> Print / Download PDF
                </button>
                <a 
                  href={generateWhatsAppQuoteLink()}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="whatsapp-action-btn"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                >
                  <MessageCircle size={15} /> WhatsApp Dispatch
                </a>
                <button
                  type="button"
                  onClick={handleSubmitQuotationToDesk}
                  disabled={quoteSubmitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: quoteSubmitSuccess ? '#10b981' : '#ffffff',
                    color: quoteSubmitSuccess ? '#ffffff' : 'var(--color-bg-navy)',
                    border: 'none',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {quoteSubmitSuccess ? (
                    <><Check size={14} /> Logged with Desk</>
                  ) : (
                    <><FileCheck size={14} /> Submit to Engineering Desk</>
                  )}
                </button>
                <button 
                  className="modal-close-btn" 
                  style={{ position: 'static', color: '#ffffff' }}
                  onClick={() => setShowPrintQuote(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Printable Document Sheet (Conforms to A4 standards) */}
            <div className="printable-document">
              
              {/* Corporate Header */}
              <div className="quote-header-grid">
                <div className="quote-logo-wrap">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                    <img src="/assets/logo.jpg" alt="HC Group" style={{ height: '56px', borderRadius: '4px', border: '1px solid var(--color-gold)' }} />
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-bg-navy)', margin: 0 }}>
                        HC <span style={{ color: 'var(--color-gold)' }}>GROUP</span>
                      </h2>
                      <span style={{ fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>
                        H-C COMPANY LTD • ARCHITECTURAL SOURCING & FIT-OUT
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                    <p style={{ margin: '0 0 2px 0' }}>
                      <strong>Corporate Headquarters:</strong> HC Group House, Sir Kashim Ibrahim Way / GRA, Maiduguri, Borno State, Nigeria
                    </p>
                    <p style={{ margin: '0 0 2px 0' }}>
                      <strong>Liaison Desks:</strong> Maitama, Abuja &bull; Admiralty Way, Lekki Phase 1, Lagos
                    </p>
                    <p style={{ margin: '0 0 2px 0' }}>
                      <strong>Hotline / WhatsApp:</strong> {directPhone} &bull; <strong>Email:</strong> info@hcgroup-trade.com / hccompanyltd1@gmail.com
                    </p>
                  </div>
                </div>

                <div className="quote-meta-wrap" style={{ textAlign: 'right' }}>
                  <div className="quote-badge">OFFICIAL BILL OF QUANTITIES</div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
                    <div>Quotation Ref: <strong style={{ color: 'var(--color-bg-navy)', fontFamily: 'monospace', fontSize: '1rem' }}>{quoteRef}</strong></div>
                    <div>Date of Issue: <strong>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
                    <div>Commercial Validity: <strong style={{ color: '#166534' }}>30 Business Days (Price Locked)</strong></div>
                  </div>
                </div>
              </div>

              {/* Client & Project Specs Summary */}
              <div className="quote-client-summary">
                <div className="summary-field">
                  <span>Client / Organization:</span>
                  <input 
                    type="text" 
                    value={quoteClientName} 
                    onChange={e => setQuoteClientName(e.target.value)}
                    className="client-editable-field"
                    placeholder="Enter Client or Architectural Firm Name"
                  />
                </div>
                <div className="summary-field">
                  <span>Project Classification:</span>
                  <input 
                    type="text" 
                    value={quoteProjectType} 
                    onChange={e => setQuoteProjectType(e.target.value)}
                    className="client-editable-field"
                    placeholder="e.g. Private Luxury Villa / Hospitality"
                  />
                </div>
                <div className="summary-field">
                  <span>Project Site Delivery Address:</span>
                  <input 
                    type="text" 
                    value={quoteSiteAddress} 
                    onChange={e => setQuoteSiteAddress(e.target.value)}
                    className="client-editable-field"
                    placeholder="Enter Site Location / Plot"
                  />
                </div>
                <div className="summary-field">
                  <span>Client Contact / WhatsApp:</span>
                  <input 
                    type="text" 
                    value={quoteClientPhone} 
                    onChange={e => setQuoteClientPhone(e.target.value)}
                    className="client-editable-field"
                    placeholder="+234..."
                  />
                </div>
              </div>

              {/* Line Items BoQ Table */}
              <div className="quote-table-wrapper">
                <table className="quote-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>Item</th>
                      <th>Architectural Specification & Material Description</th>
                      <th>SKU Code</th>
                      <th style={{ textAlign: 'center' }}>Qty</th>
                      <th style={{ textAlign: 'right' }}>Unit Rate (₦)</th>
                      <th style={{ textAlign: 'right' }}>Total Amount (₦)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeItemsForQuote.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                          No materials specified in this quotation.
                        </td>
                      </tr>
                    ) : (
                      activeItemsForQuote.map((item, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: '600' }}>{idx < 9 ? `0${idx + 1}` : idx + 1}</td>
                          <td>
                            <strong style={{ color: 'var(--color-bg-navy)' }}>{item.name}</strong>
                          </td>
                          <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#475569' }}>
                            {item.sku}
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: '700' }}>
                            {item.quantity}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            ₦{Number(item.price || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--color-bg-navy)' }}>
                            ₦{Number(item.subtotal || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Totals & Freight Grid */}
              <div className="quote-totals-grid">
                <div className="quote-notes">
                  <h4>Commercial Terms & Fabrication Schedule:</h4>
                  <ul>
                    <li><strong>Factory Fabrication:</strong> 25 – 45 business days upon architectural CAD blueprint sign-off.</li>
                    <li><strong>Laser 3D Measurement:</strong> Complimentary on-site laser survey audit prior to final millwork.</li>
                    <li><strong>Freight Mode:</strong> Dedicated hydraulic transport fleet dispatching directly from Maiduguri HQ.</li>
                    <li><strong>Payment Milestone:</strong> 50% production deposit, 50% upon quality control sign-off prior to site delivery.</li>
                  </ul>
                </div>

                <div className="quote-calculations-box">
                  <div className="calc-row">
                    <span>Materials Supply Subtotal:</span>
                    <strong>₦{Number(activeSubtotalForQuote || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  {activeShippingData && (
                    <div className="calc-row">
                      <span>Logistics Freight ({getTransportFleetLabel(activeShippingData)}):</span>
                      <strong>₦{Number(activeFreightFeeForQuote || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
                    </div>
                  )}
                  <div className="calc-row">
                    <span>Value Added Tax (VAT 7.5%):</span>
                    <strong style={{ color: '#166534' }}>Included in Commercial Rate</strong>
                  </div>
                  <div className="calc-row grand-total-row">
                    <span>Total Estimated Investment:</span>
                    <strong style={{ color: 'var(--color-bg-navy)', fontSize: '1.3rem' }}>
                      ₦{Number(activeGrandTotalForQuote || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Warranty Stamp & Official Signatures */}
              <div className="quote-signatures-row">
                <div className="warranty-stamp">
                  <ShieldCheck size={36} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-bg-navy)' }}>10-Year Certified Guarantee</strong>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                      Official warranty covering precision joinery, pivot hardware & marble structural integrity.
                    </p>
                  </div>
                </div>

                <div className="signature-box">
                  <div className="sig-line"></div>
                  <span>Authorized Signatory (HC Group Ltd)</span>
                </div>

                <div className="signature-box">
                  <div className="sig-line"></div>
                  <span>Client / Architect Acceptance</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
