import React, { useState } from 'react';
import { ShoppingBag, CheckCircle2, Sparkles, X, Plus, MessageCircle, ArrowRight, Layers, Check } from 'lucide-react';

export default function ShopTheLook({ onAddToCart }) {
  const [selectedRoomId, setSelectedRoomId] = useState('foyer');
  const [activeSpot, setActiveSpot] = useState(null);
  const [packageAddedEffect, setPackageAddedEffect] = useState(false);

  const rooms = [
    {
      id: 'foyer',
      name: 'Presidential Entrance Foyer',
      badge: 'MONUMENTAL ARCHITECTURAL ARRIVAL',
      image: '/assets/products/interior_1.jpeg',
      description: 'An awe-inspiring arrival pavilion combining a 3.2-meter copper-clad pivot entrance system, Royal Isfahan hand-knotted silk carpet, Italian book-matched Carrara marble, and acoustic natural walnut slats.',
      hotspots: [
        {
          id: 'spot_pivot_door',
          top: '38%',
          left: '22%',
          title: '3.2m Monolithic Copper Pivot Door',
          variantId: 'var_door_pivot_std',
          sku: 'DR-PVT-STD',
          price: 3200000.00,
          specs: 'Solid Walnut Core & Textured Copper Cladding • Class B1 Fire Safe • Smart Biometric Lock',
          category: 'Luxury Doors & Entries'
        },
        {
          id: 'spot_carpet_foyer',
          top: '78%',
          left: '52%',
          title: 'Royal Isfahan Hand-Knotted Silk & Wool Rug',
          variantId: 'var_carpet_isfahan_3x2',
          sku: 'HC-CRPT-ISF-3020',
          price: 1850000.00,
          specs: '3000mm x 2000mm • 80% NZ Highland Wool, 20% Mulberry Silk • 1.2M Knots/m²',
          category: 'Luxury Architectural Carpets'
        },
        {
          id: 'spot_marble_floor',
          top: '84%',
          left: '26%',
          title: 'Book-Matched Carrara Marble Slabs',
          variantId: 'var_marble_slab_60',
          sku: 'FS-MARB-SLB60',
          price: 110000.00,
          specs: '100% Authentic Italian Carrara Marble • Mirror Gloss Polish (per m²)',
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
      id: 'wardrobe',
      name: 'Executive Master Dressing Suite',
      badge: 'WHOLE-HOUSE BESPOKE JOINERY',
      image: '/assets/products/interior_3.jpeg',
      description: 'A bespoke dressing suite outfitted with floor-to-ceiling modular American walnut wardrobes, Imperial Kashan medallion wool carpet, and architectural slim-profile carbon steel French doors.',
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
          id: 'spot_carpet_wardrobe',
          top: '82%',
          left: '52%',
          title: 'Imperial Kashan Medallion Wool Carpet',
          variantId: 'var_carpet_kashan_3x2',
          sku: 'HC-CRPT-KSH-3020',
          price: 1450000.00,
          specs: '3000mm x 2000mm • 100% Hand-Spun Ghazni Wool • Heavy Contract Footfall Grade',
          category: 'Luxury Architectural Carpets'
        },
        {
          id: 'spot_french_door',
          top: '42%',
          left: '78%',
          title: 'Aurelia Carbon Steel French Double Doors',
          variantId: 'var_door_french_std',
          sku: 'DR-FRN-STD',
          price: 2450000.00,
          specs: 'Slim Carbon Steel Stile • Double Tempered Acoustic Glass • Matte Black Finish',
          category: 'Luxury Doors & Entries'
        },
        {
          id: 'spot_island_top',
          top: '64%',
          left: '60%',
          title: 'Carrara Marble Dressing Island Counter',
          variantId: 'var_marble_slab_60',
          sku: 'FS-MARB-SLB60',
          price: 110000.00,
          specs: 'Precision CNC Mitred Edges • Scratch & Stain Resistant Protective Sealant',
          category: 'Flooring & Stone'
        }
      ]
    },
    {
      id: 'bath',
      name: 'Luxury Spa Bath & Wellness',
      badge: 'SPA-GRADE MONOLITHIC WELLNESS',
      image: '/assets/products/interior_2.jpeg',
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
          id: 'spot_glass_door',
          top: '42%',
          left: '18%',
          title: 'Frosted Glass Privacy Door (Brushed Gold)',
          variantId: 'var_door_glass_std',
          sku: 'DR-GLS-STD',
          price: 1150000.00,
          specs: 'Acid-Etched Tempered Glass • Brushed Gold Architectural Pivot Hardware',
          category: 'Luxury Doors & Entries'
        },
        {
          id: 'spot_marble_vanity',
          top: '55%',
          left: '32%',
          title: 'Italian Carrara Stone Vanity Slab',
          variantId: 'var_marble_slab_60',
          sku: 'FS-MARB-SLB60',
          price: 110000.00,
          specs: 'Precision CNC Basin Apertures • Water-Repellent Seal (per m²)',
          category: 'Flooring & Stone'
        }
      ]
    },
    {
      id: 'culinary',
      name: 'Minimalist Culinary Studio',
      badge: 'CONTEMPORARY GASTRONOMIC LIVING',
      image: '/assets/products/interior_4.jpeg',
      description: 'An open-concept minimalist culinary studio featuring soft-closing architectural sliding glass pocket doors, Aura abstract low-pile silk carpet runner, and acoustic walnut slatted ceilings.',
      hotspots: [
        {
          id: 'spot_sliding_door',
          top: '38%',
          left: '22%',
          title: 'Minimalist Pocket Sliding Glass Door',
          variantId: 'var_door_sliding_std',
          sku: 'DR-SLD-STD',
          price: 1800000.00,
          specs: 'Extruded Aluminum Low-E Glass • Soft-Close Hidden Tracks • Charcoal Finish',
          category: 'Luxury Doors & Entries'
        },
        {
          id: 'spot_carpet_culinary',
          top: '78%',
          left: '48%',
          title: 'Aura Minimalist Abstract Silk & Wool Rug',
          variantId: 'var_carpet_abstract_3x2',
          sku: 'HC-CRPT-ABS-3020',
          price: 980000.00,
          specs: '3000mm x 2000mm • Botanical Bamboo Silk & Matte Wool • Carved High-Low Pile',
          category: 'Luxury Architectural Carpets'
        },
        {
          id: 'spot_ceiling_slats',
          top: '25%',
          left: '75%',
          title: 'Acoustic Natural Walnut Ceiling Panels',
          variantId: 'var_panel_walnut',
          sku: 'WH-WOOD-WAL',
          price: 65000.00,
          specs: 'Class B1 Fire-Safe Natural American Walnut Slats & Acoustic Absorptive Backing',
          category: 'Wall Systems'
        },
        {
          id: 'spot_waterfall_marble',
          top: '62%',
          left: '70%',
          title: 'Carrara Marble Waterfall Island Counter',
          variantId: 'var_marble_slab_60',
          sku: 'FS-MARB-SLB60',
          price: 110000.00,
          specs: 'Continuous Vein-Matched Waterfall Edges • Polished Mirror Gloss Finish',
          category: 'Flooring & Stone'
        }
      ]
    }
  ];

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  const packageSubtotal = (currentRoom?.hotspots || []).reduce((sum, spot) => sum + (spot?.price || 0), 0);
  const packageDiscountRate = 0.05; // 5% Turnkey Procurement Package Discount
  const packageDiscountAmount = packageSubtotal * packageDiscountRate;
  const packageTotal = packageSubtotal - packageDiscountAmount;

  const handleAddEntirePackage = () => {
    if (onAddToCart && Array.isArray(currentRoom?.hotspots)) {
      currentRoom.hotspots.forEach(spot => {
        if (spot) {
          onAddToCart(spot.variantId, spot.title, spot.sku, spot.price);
        }
      });
    }
    setPackageAddedEffect(true);
    setTimeout(() => setPackageAddedEffect(false), 3000);
  };

  const getWhatsAppPackageLink = () => {
    const itemsList = currentRoom.hotspots.map(s => `• ${s.title} (${s.sku}) - ₦${s.price.toLocaleString('en-NG')}`).join('\n');
    const msg = `Hello HC Group, I would like to procure the *Entire Room Package* for:\n*${currentRoom.name}*\n\nIncluded Architectural Elements:\n${itemsList}\n\n*Turnkey Package Total:* ₦${packageTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}\n(Includes 5% Turnkey Package Discount)\n\nPlease generate an official BoQ Quotation and advise fabrication lead time to Maiduguri / our site.`;
    return `https://wa.me/2349068875555?text=${encodeURIComponent(msg)}`;
  };

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
          CURATED ARCHITECTURAL SPACES &bull; ROOM COMMISSIONS
        </span>
        <h1 className="section-title" style={{ display: 'block', margin: '0.75rem 0', letterSpacing: '0.04em' }}>
          Shop The Look: Architectural Environments
        </h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Examine fully integrated interior commissions. Select the architectural hotspots on doors, rugs, and stonework to view material specifications or commission the complete turnkey package.
        </p>
      </div>

      {/* Room Selector Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {rooms.map((room, idx) => {
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
                borderRadius: '2px',
                border: isActive ? '1px solid var(--color-gold)' : '1px solid var(--color-border-light)',
                backgroundColor: isActive ? 'var(--color-bg-navy)' : '#ffffff',
                color: isActive ? 'var(--color-gold)' : 'var(--color-bg-navy)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                boxShadow: isActive ? '0 4px 14px rgba(11, 19, 41, 0.2)' : 'var(--shadow-sm)'
              }}
            >
              <Layers size={14} color={isActive ? 'var(--color-gold)' : '#64748b'} />
              <span>{['01.', '02.', '03.', '04.'][idx]} {room.name}</span>
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

      {/* Turnkey Procurement Room Package Card (Pillar 1 Bundle) */}
      <div style={{
        backgroundColor: '#070d1e',
        border: '1.5px solid var(--color-border-gold)',
        borderRadius: '12px',
        padding: '1.75rem 2rem',
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle gold glow accent in corner */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span className="badge-luxury" style={{ margin: 0, padding: '0.2rem 0.65rem', fontSize: '0.72rem' }}>
              <Sparkles size={11} style={{ marginRight: '4px' }} /> TURNKEY PACKAGE BUNDLE
            </span>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700', letterSpacing: '0.5px' }}>
              SAVE 5% WHEN ORDERING ENTIRE ROOM TOGETHER
            </span>
          </div>
          <h3 style={{ color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '0 0 0.35rem 0' }}>
            Procure Entire {currentRoom.name} Package
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, maxWidth: '600px', lineHeight: '1.5' }}>
            Includes all {currentRoom.hotspots.length} architectural elements: luxury entrance systems, architectural carpets, marble surfaces & custom joinery, coordinated for zero-tolerance matching and simultaneous flatbed delivery to Maiduguri or your site.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textDecoration: 'line-through' }}>
              ₦{packageSubtotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
            <div style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: '700' }}>
              ₦{packageTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
            <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: '600', display: 'block' }}>
              Includes ₦{packageDiscountAmount.toLocaleString('en-NG', { minimumFractionDigits: 0 })} Turnkey Sourcing Discount
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className="btn-gold"
              style={{
                padding: '0.8rem 1.4rem',
                fontSize: '0.9rem',
                backgroundColor: packageAddedEffect ? '#10b981' : 'var(--color-gold)',
                color: packageAddedEffect ? '#ffffff' : 'var(--color-bg-navy)',
                fontWeight: '700'
              }}
              onClick={handleAddEntirePackage}
            >
              {packageAddedEffect ? (
                <>
                  <CheckCircle2 size={18} /> Package Added to BoQ!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add Entire Room ({currentRoom.hotspots.length} Items)
                </>
              )}
            </button>

            <a
              href={getWhatsAppPackageLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-action-btn"
              style={{ padding: '0.8rem 1.25rem', fontSize: '0.85rem' }}
            >
              <MessageCircle size={18} /> WhatsApp Turnkey RFQ
            </a>
          </div>
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
