import React, { useState, useEffect } from 'react';
import { Truck, Trash2, MapPin, Loader, Info, FolderArchive, Layers } from 'lucide-react';

export default function Cart() {
  const [projectBoards, setProjectBoards] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState({ state: '', city: '' });
  
  // Calculations per project board (keyed by project ID)
  const [shippingResults, setShippingResults] = useState({});
  const [calculating, setCalculating] = useState({});
  const [errors, setErrors] = useState({});

  const [activeBoardId, setActiveBoardId] = useState(null);

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
    // Load Zones
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

  const activeBoard = projectBoards.find(b => b.id === activeBoardId);
  const activeShipping = activeBoardId ? shippingResults[activeBoardId] : null;
  const activeError = activeBoardId ? errors[activeBoardId] : null;
  const isActiveCalculating = activeBoardId ? calculating[activeBoardId] : false;

  const itemsSubtotal = activeBoard?.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const shippingFee = activeShipping?.calculation?.totalFee || 0;
  const finalTotal = itemsSubtotal + shippingFee;

  return (
    <div>
      <h2 className="section-title">Project Board Sourcing Logs</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Estimate shipping logistics, check vehicle requirements, and view fulfillment logs per custom construction project.
      </p>

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
              backgroundColor: activeBoardId === b.id ? 'var(--color-bg-dark)' : '#ffffff',
              color: activeBoardId === b.id ? 'var(--color-gold)' : 'var(--color-bg-dark)',
              fontWeight: '600',
              fontFamily: 'Cinzel, serif',
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
              <h3 style={{ fontFamily: 'Cinzel', fontSize: '1.1rem', color: 'var(--color-bg-dark)' }}>
                Materials List ({activeBoard.items?.length || 0})
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
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--color-border-light)' }} 
                    />
                  ) : (
                    <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-bg-dark)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', fontFamily: 'Cinzel', fontSize: '0.75rem' }}>
                      SPEC
                    </div>
                  )}
                  <div className="cart-item-info">
                    <h4 style={{ fontSize: '0.95rem' }}>{item.name}</h4>
                    <div className="cart-item-meta">SKU: {item.sku}</div>
                    <div className="cart-item-meta">Qty Assigned: <strong>{item.quantity}</strong></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-bg-dark)' }}>
                      ₦{(item.price * item.quantity).toFixed(2)}
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
            <h3 className="summary-title" style={{ fontSize: '1.1rem' }}>Logistics Calculations</h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: '500' }}>
                <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Delivery Site
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
                <span style={{ fontWeight: '500' }}>₦{itemsSubtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}>
                  Delivery Freight 
                  {isActiveCalculating && <Loader size={12} className="animate-spin" style={{ marginLeft: '6px', display: 'inline-block' }} />}
                </span>
                <span style={{ fontWeight: '500' }}>
                  {activeError ? 'Unavailable' : activeShipping ? `₦${activeShipping.calculation.totalFee.toFixed(2)}` : '₦0.00'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Cinzel' }}>Estimated Total</span>
              <span style={{ color: 'var(--color-gold-muted)' }}>₦{finalTotal.toFixed(2)}</span>
            </div>

            <button 
              className="add-to-cart-btn" 
              style={{ width: '100%', marginBottom: '1rem' }}
              onClick={() => alert(`Official Request for Quote submitted successfully for Project Sourcing Board: "${activeBoard?.name}"`)}
            >
              Request Official Quote
            </button>

            {activeError && (
              <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', borderRadius: '4px', fontSize: '0.85rem', color: '#991b1b', display: 'flex', gap: '0.5rem' }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>{activeError}</div>
              </div>
            )}

            {activeShipping && !activeError && (
              <div className="delivery-estimation-box">
                <span className="delivery-badge">{activeShipping.transport.displayName}</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
                  {activeShipping.transport.description}
                </p>

                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.5rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div>Total Weight: <strong>{activeShipping.metrics.totalWeightKg.toFixed(1)} kg</strong></div>
                  <div>Volumetric Volume: <strong>{activeShipping.metrics.totalVolumeM3.toFixed(2)} m³</strong></div>
                  <div>Transit ETA: <strong>{activeShipping.eta.displayString}</strong></div>
                </div>

                <div className="timeline">
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-gold)', letterSpacing: '0.5px' }}>
                    TRANSPARENCY LEDGER
                  </div>
                  {activeShipping.transparencyTimeline.map((step, idx) => (
                    <div key={idx} className={`timeline-step ${step.completed ? 'completed' : ''}`}>
                      <div className="timeline-dot" />
                      <div className="timeline-info">
                        <span className="timeline-step-title">{step.title}</span>
                        <span className="timeline-step-desc">{step.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
