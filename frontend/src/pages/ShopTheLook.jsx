import React, { useState } from 'react';
import { ShoppingBag, Eye, CheckCircle2, Sparkles, X, Plus } from 'lucide-react';

export default function ShopTheLook({ onAddToCart }) {
  const [activeSpot, setActiveSpot] = useState(null);

  const hotspots = [
    {
      id: 'hotspot_chandelier',
      top: '25%',
      left: '50%',
      title: 'Aurelia Crystal Chandelier',
      variantId: 'var_chand_warm_gold',
      sku: 'AU-CHAND-WRM-GD',
      price: 890000.00,
      description: '2700K Warm White, Brushed Brass Finish, K9 Cut Crystals'
    },
    {
      id: 'hotspot_sofa',
      top: '68%',
      left: '60%',
      title: 'Chesterfield Velvet Sofa Suite',
      variantId: 'var_sofa_gold_lg',
      sku: 'CH-SOFA-GLD-LG',
      price: 2600000.00,
      description: 'Imperial Gold Velvet, 240cm x 100cm, Solid Hardwood Frame'
    },
    {
      id: 'hotspot_oak',
      top: '88%',
      left: '35%',
      title: 'European White Oak Planks',
      variantId: 'var_oak_matte_gradea',
      sku: 'OAK-TIMB-MAT-GA',
      price: 45000.00,
      description: 'Matte Polyurethane Finish, Grade A Prime European Oak (per m²)'
    }
  ];

  return (
    <div className="shop-the-look-page">
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
        <span className="badge-luxury">INTERACTIVE ROOM INSPIRATION</span>
        <h2 className="section-title">Shop The Look: "Aurelia Gold Lounge"</h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.7' }}>
          Tap the glowing golden beacons on the room mockup to inspect architectural specifications, 
          materials, and add items directly to your project sourcing order.
        </p>
      </div>

      <div className="room-mockup-container">
        <div 
          className="room-scene-box"
          onClick={() => setActiveSpot(null)}
        >
          {/* Ceiling / Ambient Lighting Glow */}
          <div className="room-ceiling-glow" />

          {/* Luxury Graphic elements */}
          <div className="room-brand-watermark">
            H-C LUXE
          </div>

          <div className="room-scene-pill">
            <Sparkles size={14} color="var(--color-gold)" style={{ marginRight: '6px' }} />
            Interactive Concept Room: Aurelia Gold Lounge
          </div>

          {/* Hotspots */}
          {hotspots.map((spot) => {
            const isSelected = activeSpot === spot.id;

            return (
              <div
                key={spot.id}
                className={`hotspot ${isSelected ? 'active-touch' : ''}`}
                style={{ top: spot.top, left: spot.left }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSpot(isSelected ? null : spot.id);
                }}
              >
                <div className="hotspot-pulse"></div>
                <div className="hotspot-beacon-dot"></div>

                <div 
                  className={`hotspot-tooltip ${isSelected ? 'visible-touch' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <h4 className="tooltip-title">{spot.title}</h4>
                    <button 
                      onClick={() => setActiveSpot(null)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8b9bb4', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                    {spot.description}
                  </div>
                  <div className="tooltip-price">
                    ₦{spot.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </div>
                  <button
                    className="tooltip-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(spot.variantId, spot.title, spot.sku, spot.price);
                    }}
                  >
                    <Plus size={14} /> Add to Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-Friendly Materials Breakdown Grid */}
      <div style={{ marginTop: '3.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-bg-navy)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Materials Specified in This Scene
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {hotspots.map((spot) => (
            <div 
              key={spot.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border-light)',
                borderRadius: '8px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-muted)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  SKU: {spot.sku}
                </span>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-bg-navy)', margin: '0.35rem 0' }}>{spot.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {spot.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-bg-navy)' }}>
                  ₦{spot.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </span>
                <button
                  className="btn-gold"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  onClick={() => onAddToCart(spot.variantId, spot.title, spot.sku, spot.price)}
                >
                  <Plus size={14} /> Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
