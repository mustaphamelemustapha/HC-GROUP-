import React, { useState } from 'react';
import { ShoppingBag, Eye, CheckCircle2, Sparkles, X, Plus, MessageCircle, ArrowRight, Layers } from 'lucide-react';

export default function ShopTheLook({ onAddToCart }) {
  const [selectedRoomId, setSelectedRoomId] = useState('living');
  const [activeSpot, setActiveSpot] = useState(null);

  const rooms = [
    {
      id: 'living',
      name: 'Aurelia Living Suite',
      badge: 'CONTEMPORARY VILLA LOUNGE',
      image: '/assets/products/interior_1.jpeg',
      description: 'An executive living pavilion merging floor-to-ceiling copper pivot entrance systems, book-matched Italian Carrara marble, and acoustic natural walnut slats.',
      hotspots: [
        {
          id: 'spot_pivot_door',
          top: '38%',
          left: '22%',
          title: '3.2m Monolithic Copper Pivot Door',
          variantId: 'var_door_pivot_std',
          sku: 'DR-PVT-STD',
          price: 3200000.00,
          specs: 'Solid Walnut Core & Textured Copper Cladding • Class B1 Fire Safe',
          category: 'Luxury Doors & Entries'
        },
        {
          id: 'spot_marble_floor',
          top: '78%',
          left: '52%',
          title: 'Book-Matched Carrara Marble Slabs',
          variantId: 'var_marble_slab_60',
          sku: 'FS-MARB-SLB60',
          price: 110000.00,
          specs: '100% Authentic Italian Marble • Mirror Gloss Polish (per m²)',
          category: 'Flooring & Stone'
        },
        {
          id: 'spot_walnut_panel',
          top: '32%',
          left: '74%',
          title: 'Acoustic Natural Walnut Wall Slats',
          variantId: 'var_panel_walnut',
          sku: 'WH-WOOD-WAL',
          price: 65000.00,
          specs: 'Natural American Walnut Slats & Sound-Damping Acoustic Felt (per panel)',
          category: 'Wall Systems'
        }
      ]
    },
    {
      id: 'bath',
      name: 'Villa Master Sanctuary',
      badge: 'SPA-GRADE WELLNESS SUITE',
      image: '/assets/products/interior_4.jpeg',
      description: 'A serene master wellness sanctuary with monolithic freestanding resin composite baths, concealed aluminum-frame wall-flush doors, and non-porous marble surfaces.',
      hotspots: [
        {
          id: 'spot_stone_bathtub',
          top: '64%',
          left: '50%',
          title: 'Freestanding Solid Resin Stone Bathtub',
          variantId: 'var_bathtub_std',
          sku: 'SW-BATHT-STD',
          price: 1850000.00,
          specs: '1700mm x 800mm • Solid Resin Composite Stone • Matte White Velvet Finish',
          category: 'Sanitary Ware & Baths'
        },
        {
          id: 'spot_flush_door',
          top: '40%',
          left: '82%',
          title: 'Concealed Aluminum Wall-Flush Door',
          variantId: 'var_door_flush_std',
          sku: 'DR-FLS-STD',
          price: 950000.00,
          specs: 'Concealed Magnetic Latch • Invisible Frame • Paint-to-Wall Ready',
          category: 'Luxury Doors & Entries'
        },
        {
          id: 'spot_marble_vanity',
          top: '52%',
          left: '20%',
          title: 'Italian Carrara Stone Vanity Slab',
          variantId: 'var_marble_slab_60',
          sku: 'FS-MARB-SLB60',
          price: 110000.00,
          specs: 'Precision CNC Basin Apertures • Water-Repellent Seal',
          category: 'Flooring & Stone'
        }
      ]
    },
    {
      id: 'wardrobe',
      name: 'Penthouse Dressing Suite',
      badge: 'WHOLE-HOUSE BESPOKE JOINERY',
      image: '/assets/products/interior_3.jpeg',
      description: 'A bespoke dressing suite outfitted with floor-to-ceiling modular walnut wardrobes, architectural French glass dividers, and integrated warm-LED millwork.',
      hotspots: [
        {
          id: 'spot_wardrobe_suite',
          top: '45%',
          left: '32%',
          title: 'Modular Custom American Walnut Wardrobe',
          variantId: 'var_wardrobe_walnut',
          sku: 'WH-WARD-WLN',
          price: 4200000.00,
          specs: '3200mm (H) • Solid Walnut Veneer • Sensor Integrated LED Channels',
          category: 'Whole-House Customization'
        },
        {
          id: 'spot_french_door',
          top: '42%',
          left: '78%',
          title: 'Aurelia Carbon Steel French Double Doors',
          variantId: 'var_door_french_std',
          sku: 'DR-FRN-STD',
          price: 2450000.00,
          specs: 'Slim Carbon Steel Stile • Double Tempered Acoustic Glass',
          category: 'Luxury Doors & Entries'
        }
      ]
    }
  ];

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  const handleSpotClick = (spotId, e) => {
    e.stopPropagation();
    setActiveSpot(activeSpot === spotId ? null : spotId);
  };

  const getWhatsAppLink = (spot) => {
    const msg = `Hello HC Group, I am viewing the "${currentRoom.name}" on Shop The Look and would like an official quote for:\n*${spot.title}*\nSKU: ${spot.sku}\nPrice: ₦${spot.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}\n\nPlease share availability and delivery schedule to Maiduguri / site.`;
    return `https://wa.me/2349068875555?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="shop-the-look-page" style={{ padding: '2rem 0' }}>
      
      {/* Header Introduction */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <span className="badge-luxury">
          <Sparkles size={13} color="var(--color-gold)" style={{ marginRight: '6px' }} />
          INTERACTIVE ARCHITECTURAL SHOWROOM
        </span>
        <h1 className="section-title" style={{ display: 'block', margin: '0.75rem 0' }}>
          Shop The Look: Curated Living Spaces
        </h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Explore photorealistic luxury installations. Tap the glowing golden beacons on any architectural element 
          to inspect laser tolerances, materials, and add items directly to your procurement quotation.
        </p>
      </div>

      {/* Room Selector Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {rooms.map(room => {
          const isActive = room.id === selectedRoomId;
          return (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoomId(room.id);
                setActiveSpot(null);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '30px',
                border: isActive ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border-light)',
                backgroundColor: isActive ? 'var(--color-bg-navy)' : '#ffffff',
                color: isActive ? 'var(--color-gold)' : 'var(--color-bg-navy)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                boxShadow: isActive ? 'var(--shadow-gold-sm)' : 'var(--shadow-sm)'
              }}
            >
              <Layers size={16} color={isActive ? 'var(--color-gold)' : '#64748b'} />
              <span>{room.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="room-mockup-container" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border-gold)', boxShadow: 'var(--shadow-xl)' }}>
        
        <div 
          className="room-scene-box"
          onClick={() => setActiveSpot(null)}
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(420px, 55vw, 680px)',
            background: '#070d1e',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default'
          }}
        >
          {/* Background High-Res Photographic Plate */}
          <img 
            src={currentRoom.image} 
            alt={currentRoom.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.92) contrast(1.04)'
            }}
          />

          {/* Luxury Ambient Vignette Overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 50%, rgba(7, 13, 30, 0.1) 0%, rgba(7, 13, 30, 0.65) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Room Concept Eyebrow Badge */}
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(12, 22, 48, 0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#ffffff',
              padding: '0.45rem 1.1rem',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              zIndex: 10
            }}
          >
            <Sparkles size={14} color="var(--color-gold)" />
            <span>{currentRoom.badge}</span>
          </div>

          {/* Interactive Beacons */}
          {currentRoom.hotspots.map((spot) => {
            const isSelected = activeSpot === spot.id;

            return (
              <div
                key={spot.id}
                className={`hotspot ${isSelected ? 'active-touch' : ''}`}
                style={{
                  position: 'absolute',
                  top: spot.top,
                  left: spot.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 120 : 50,
                  cursor: 'pointer'
                }}
                onClick={(e) => handleSpotClick(spot.id, e)}
              >
                {/* Glowing Concentric Pulse Ring */}
                <div 
                  className="hotspot-pulse"
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.35)',
                    animation: 'beaconPulse 2.2s infinite ease-out',
                    pointerEvents: 'none'
                  }}
                />

                {/* Core Golden Beacon Dot */}
                <div 
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold)',
                    border: '2.5px solid #ffffff',
                    boxShadow: '0 0 16px rgba(212, 175, 55, 0.9), 0 2px 6px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-bg-navy)' }} />
                </div>

                {/* Floating Glassmorphic Tooltip Card */}
                {isSelected && (
                  <div 
                    className="hotspot-tooltip"
                    style={{
                      display: 'block',
                      position: 'absolute',
                      bottom: '36px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 'clamp(280px, 80vw, 320px)',
                      backgroundColor: 'rgba(12, 22, 48, 0.96)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid var(--color-gold)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      textAlign: 'left',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.25)',
                      zIndex: 200,
                      animation: 'fadeUp 0.25s ease-out'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Tooltip Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: '700' }}>
                        {spot.category}
                      </span>
                      <button 
                        onClick={() => setActiveSpot(null)}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0 0 0 8px' }}
                        aria-label="Close specification"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <h4 style={{ color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '1.15rem', lineHeight: '1.3', marginBottom: '0.4rem' }}>
                      {spot.title}
                    </h4>

                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                      {spot.specs}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.6rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Unit Price (Ex-Factory):</span>
                      <strong style={{ color: 'var(--color-gold)', fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
                        ₦{spot.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </strong>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem' }}>
                      <button
                        className="btn-gold"
                        style={{ padding: '0.6rem', fontSize: '0.82rem', justifyContent: 'center' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAddToCart) {
                            onAddToCart(spot.variantId, spot.title, spot.sku, spot.price);
                          }
                        }}
                      >
                        <Plus size={15} /> Add to Order
                      </button>

                      <a
                        href={getWhatsAppLink(spot)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-action-btn"
                        style={{ padding: '0.6rem', fontSize: '0.8rem', justifyContent: 'center' }}
                      >
                        <MessageCircle size={15} /> WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Room Description Bar */}
        <div style={{ backgroundColor: 'var(--color-bg-navy)', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(212, 175, 55, 0.25)' }}>
          <div style={{ maxWidth: '750px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
              {currentRoom.name}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
              {currentRoom.description}
            </p>
          </div>

          <a 
            href={`https://wa.me/2349068875555?text=${encodeURIComponent(`Hello HC Group, I am interested in sourcing complete interior materials based on the "${currentRoom.name}" specification.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-action-btn"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
          >
            <MessageCircle size={16} /> Consult Architectural Director
          </a>
        </div>

      </div>

      {/* Materials Schedule Grid */}
      <div style={{ marginTop: '4rem' }}>
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">ARCHITECTURAL SCHEDULE OF MATERIALS</span>
          <h2 className="section-title">Specifications in This Space</h2>
          <p className="section-subtitle">
            All items are fabricated to millimeter CAD apertures and delivered with 10-year certified warranty.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {currentRoom.hotspots.map((spot) => (
            <div 
              key={spot.id}
              className="service-card"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border-light)',
                borderRadius: '10px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'left',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-muted)', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                    {spot.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {spot.sku}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-bg-navy)', margin: '0.35rem 0 0.5rem 0', textWrap: 'balance' }}>
                  {spot.title}
                </h3>
                
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem', textWrap: 'pretty' }}>
                  {spot.specs}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b' }}>Supply Rate</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.3rem', color: 'var(--color-bg-navy)' }}>
                    ₦{spot.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  className="btn-gold"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart(spot.variantId, spot.title, spot.sku, spot.price);
                    }
                  }}
                >
                  <Plus size={15} /> Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
