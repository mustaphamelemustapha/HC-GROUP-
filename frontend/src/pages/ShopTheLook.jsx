import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';

export default function ShopTheLook({ onAddToCart }) {
  const hotspots = [
    {
      id: 'hotspot_chandelier',
      top: '25%',
      left: '50%',
      title: 'Aurelia Crystal Chandelier',
      variantId: 'var_chand_warm_gold',
      sku: 'AU-CHAND-WRM-GD',
      price: 890.00,
      description: '2700K Warm White, Brushed Brass Finish'
    },
    {
      id: 'hotspot_sofa',
      top: '68%',
      left: '60%',
      title: 'Chesterfield Velvet Sofa',
      variantId: 'var_sofa_gold_lg',
      sku: 'CH-SOFA-GLD-LG',
      price: 2600.00,
      description: 'Imperial Gold, 240cm x 100cm'
    },
    {
      id: 'hotspot_oak',
      top: '90%',
      left: '35%',
      title: 'European Oak Planks',
      variantId: 'var_oak_matte_gradea',
      sku: 'OAK-TIMB-MAT-GA',
      price: 45.00,
      description: 'Matte Polyurethane Finish'
    }
  ];

  return (
    <div>
      <h2 className="section-title">Shop the Look</h2>
      <p style={{ marginBottom: '2rem', color: '#64748b' }}>
        Experience luxury curated interiors. Hover over or tap the golden beacons on our signature "Aurelia Gold Lounge" to view specifications and add materials directly to your order.
      </p>

      <div className="room-mockup-container">
        {/* Decorative Luxury Room Scene Rendered via Styled CSS Layers */}
        <div style={{
          width: '100%',
          height: '480px',
          background: 'linear-gradient(to bottom, #070d1e 0%, #0c1630 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '2rem',
          textAlign: 'center'
        }}>
          {/* Ceiling/Light Area representation */}
          <div style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '35%',
            background: 'radial-gradient(circle at 50% 10%, rgba(212, 175, 55, 0.25) 0%, transparent 70%)'
          }} />

          {/* Luxury Graphic elements representing interior mockup */}
          <div style={{
            fontFamily: 'Cinzel, serif',
            color: 'rgba(212, 175, 55, 0.15)',
            fontSize: '5rem',
            letterSpacing: '10px',
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            H-C LUXE
          </div>

          <div style={{
            position: 'absolute',
            bottom: '20px',
            color: '#8b9bb4',
            fontSize: '0.9rem',
            border: '1px solid rgba(212,175,55,0.3)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            backgroundColor: 'rgba(7, 13, 30, 0.8)'
          }}>
            Interactive Concept Room: Aurelia Lounge
          </div>

          {/* Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="hotspot"
              style={{ top: spot.top, left: spot.left }}
            >
              <div className="hotspot-tooltip">
                <h4 className="tooltip-title">{spot.title}</h4>
                <div style={{ fontSize: '0.75rem', color: '#8b9bb4', marginBottom: '0.25rem' }}>
                  {spot.description}
                </div>
                <div className="tooltip-price">₦{spot.price.toFixed(2)}</div>
                <button
                  className="tooltip-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(spot.variantId, spot.title, spot.sku, spot.price);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
