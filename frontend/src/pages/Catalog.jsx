import React, { useState, useEffect } from 'react';
import { Layers, Sparkles, Award, Plus, FileText, ShoppingBag, MessageCircle, Check, ArrowRight } from 'lucide-react';

export default function Catalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [projectBoards, setProjectBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  
  // Selected variant state per product (keyed by product ID)
  const [selectedVariants, setSelectedVariants] = useState({});
  // Selected tab per product card: 'overview' or 'blueprint' (keyed by product ID)
  const [activeCardTabs, setActiveCardTabs] = useState({});

  // Project board selection per product (keyed by product ID)
  const [selectedBoards, setSelectedBoards] = useState({});
  const [newBoardName, setNewBoardName] = useState('');
  const [creatingBoard, setCreatingBoard] = useState(false);
  const [addedItemEffect, setAddedItemEffect] = useState({});

  const directPhone = '+234 9068875555';

  const fetchCatalogData = async () => {
    try {
      const prodRes = await fetch('/api/v1/products');
      if (!prodRes.ok) throw new Error('Failed to load products');
      const prodData = await prodRes.json();
      setProducts(prodData);

      // Default selected variant & active tab
      const initialVariants = {};
      const initialTabs = {};
      prodData.forEach(p => {
        if (p.variants && p.variants.length > 0) {
          initialVariants[p.id] = p.variants[0];
        }
        initialTabs[p.id] = 'overview';
      });
      setSelectedVariants(initialVariants);
      setActiveCardTabs(initialTabs);

      // Fetch project boards
      const projRes = await fetch('/api/v1/projects');
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjectBoards(projData);
        
        // Setup initial default board selection per product
        const initialBoardSelect = {};
        prodData.forEach(p => {
          if (projData.length > 0) {
            initialBoardSelect[p.id] = projData[0].id;
          }
        });
        setSelectedBoards(initialBoardSelect);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const handleVariantChange = (productId, variantId, product) => {
    const variant = product.variants.find(v => v.id === variantId);
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }));
  };

  const toggleCardTab = (productId, tab) => {
    setActiveCardTabs(prev => ({ ...prev, [productId]: tab }));
  };

  const handleAddToCartClick = (product) => {
    const variant = selectedVariants[product.id] || (product.variants && product.variants[0]);
    if (!variant) return;

    if (onAddToCart) {
      onAddToCart(variant.id, product.name, variant.sku, variant.price_markup);
    }

    // Snappy visual feedback on the button
    setAddedItemEffect(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemEffect(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const getWhatsAppProductLink = (product) => {
    const variant = selectedVariants[product.id] || (product.variants && product.variants[0]);
    const priceStr = variant ? `₦${variant.price_markup.toLocaleString('en-NG', { minimumFractionDigits: 2 })}` : '';
    const skuStr = variant ? variant.sku : '';
    const msg = `Hello HC Group, I am interested in ordering/inquiring about:\n*${product.name}*\nSKU: ${skuStr}\nPrice: ${priceStr}\n\nPlease share lead time and delivery schedule. Thank you.`;
    return `https://wa.me/2349068875555?text=${encodeURIComponent(msg)}`;
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    setCreatingBoard(true);
    try {
      const res = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBoardName })
      });
      if (res.ok) {
        const newBoard = await res.json();
        setProjectBoards(prev => [newBoard, ...prev]);
        setNewBoardName('');
        
        // Update product board selections to the newly created board
        setSelectedBoards(prev => {
          const updated = { ...prev };
          products.forEach(p => {
            updated[p.id] = newBoard.id;
          });
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingBoard(false);
    }
  };

  const handleAssignToBoard = async (productId) => {
    const variant = selectedVariants[productId];
    const boardId = selectedBoards[productId];
    if (!variant || !boardId) {
      alert('Please select or create a Project Board first');
      return;
    }

    try {
      const res = await fetch('/api/v1/projects/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_board_id: boardId,
          variant_id: variant.id,
          quantity: 1
        })
      });
      if (!res.ok) throw new Error('Failed to assign item');
      
      const targetBoard = projectBoards.find(b => b.id === boardId);
      alert(`Assigned "${variant.sku}" to Board "${targetBoard?.name}". You can review freight in the Cart/Project Board.`);
      
      // Refresh boards representation
      const refreshRes = await fetch('/api/v1/projects');
      if (refreshRes.ok) {
        const refreshed = await refreshRes.json();
        setProjectBoards(refreshed);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === '' || p.category_id === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <p style={{ fontFamily: 'var(--font-display)', color: '#aa8c2c', fontSize: '1.5rem' }}>
          Loading Architectural Materials...
        </p>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge-luxury">WHOLE-HOUSE ARCHITECTURAL PORTFOLIO</span>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.25rem' }}>
            Materials Catalog & CAD Specifications
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Factory-direct pricing, configurable dimensions, and 1-tap WhatsApp consultation.
          </p>
        </div>

        {/* Quick Project Board Creator */}
        <form onSubmit={handleCreateBoard} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="New Project Board (e.g. Master Suite)" 
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border-light)',
              fontSize: '0.85rem',
              minWidth: '240px'
            }}
          />
          <button 
            type="submit" 
            className="btn-gold"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            disabled={creatingBoard}
          >
            <Plus size={16} /> New Board
          </button>
        </form>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          <h3 className="filter-title">Search & Categories</h3>
          
          <div className="filter-group">
            <label>Keyword Search</label>
            <input 
              type="text" 
              className="filter-input" 
              placeholder="e.g. Pivot Door, Marble, Bathtub..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Material Classification</label>
            <select 
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Architectural Lines</option>
              <option value="cat_whole_house">Whole-House Customization</option>
              <option value="cat_sanitary">Sanitary Ware & Baths</option>
              <option value="cat_flooring">Flooring & Marble Slabs</option>
              <option value="cat_kitchen">Kitchen & Wardrobe Systems</option>
              <option value="cat_doors">Luxury Doors & Entries</option>
            </select>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--color-gold-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
              NEED CUSTOM BLUEPRINTS?
            </span>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1rem' }}>
              We manufacture to exact millimeter CAD apertures. Chat directly with an engineer for non-standard sizes.
            </p>
            <a 
              href={`https://wa.me/2349068875555?text=${encodeURIComponent('Hello HC Group, I need custom dimension quotes for a project.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-action-btn"
              style={{ padding: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
            >
              <MessageCircle size={15} /> WhatsApp (+234 9068875555)
            </a>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const currentVariant = selectedVariants[product.id] || (product.variants && product.variants[0]);
            const currentTab = activeCardTabs[product.id] || 'overview';
            const isAdded = addedItemEffect[product.id];
            
            return (
              <article key={product.id} className="product-card">
                {/* Visual Header */}
                <div className="product-image-container">
                  <span className="product-category-tag">{product.category_name}</span>
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="product-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="product-image-fallback" style={{ display: product.image_url ? 'none' : 'flex' }}>
                    <Sparkles size={40} style={{ color: '#d4af37', marginBottom: '0.5rem' }} />
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '1px', padding: '0 1rem', textAlign: 'center' }}>
                      {product.name}
                    </div>
                  </div>
                </div>

                <div className="product-info">
                  {/* Title & Short Description */}
                  <h3 className="product-name">{product.name}</h3>
                  
                  {/* Tab selection switches */}
                  <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-light)', marginBottom: '1rem' }}>
                    <button 
                      onClick={() => toggleCardTab(product.id, 'overview')}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: 'none',
                        background: 'none',
                        borderBottom: currentTab === 'overview' ? '2.5px solid var(--color-gold)' : 'none',
                        color: currentTab === 'overview' ? 'var(--color-bg-navy)' : '#64748b',
                        cursor: 'pointer'
                      }}
                    >
                      Overview & Order
                    </button>
                    <button 
                      onClick={() => toggleCardTab(product.id, 'blueprint')}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: 'none',
                        background: 'none',
                        borderBottom: currentTab === 'blueprint' ? '2.5px solid var(--color-gold)' : 'none',
                        color: currentTab === 'blueprint' ? 'var(--color-bg-navy)' : '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <FileText size={12} /> CAD Specifications
                    </button>
                  </div>

                  {currentTab === 'overview' ? (
                    <div>
                      <p className="product-desc" style={{ minHeight: '44px', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                        {product.description}
                      </p>

                      {/* Variant Selection */}
                      {product.variants && product.variants.length > 1 && (
                        <div className="filter-group" style={{ marginBottom: '0.75rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Configuration / Spec</label>
                          <select 
                            className="filter-select" 
                            value={currentVariant?.id || ''}
                            onChange={(e) => handleVariantChange(product.id, e.target.value, product)}
                            style={{ padding: '0.45rem', fontSize: '0.85rem' }}
                          >
                            {product.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                SKU: {v.sku} — ₦{v.price_markup.toLocaleString('en-NG')}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Price Display */}
                      {currentVariant && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                          <div className="variant-price" style={{ margin: 0 }}>
                            ₦{currentVariant.price_markup.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            Base Supply (Ex-Factory)
                          </span>
                        </div>
                      )}

                      {/* SHARP & SMOOTH ACTION BUTTONS */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                        <button
                          className="btn-gold"
                          style={{
                            padding: '0.65rem 0.75rem',
                            fontSize: '0.85rem',
                            justifyContent: 'center',
                            backgroundColor: isAdded ? '#10b981' : 'var(--color-gold)',
                            color: isAdded ? '#ffffff' : 'var(--color-bg-navy)'
                          }}
                          onClick={() => handleAddToCartClick(product)}
                        >
                          {isAdded ? (
                            <>
                              <Check size={16} /> Added!
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={16} /> Add to Order
                            </>
                          )}
                        </button>

                        <a
                          href={getWhatsAppProductLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-action-btn"
                          style={{
                            padding: '0.65rem 0.5rem',
                            fontSize: '0.8rem',
                            justifyContent: 'center'
                          }}
                          title="Quick inquiry on WhatsApp"
                        >
                          <MessageCircle size={15} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Blueprint specs list EAV parameters */
                    <div style={{ minHeight: '166px', fontSize: '0.8rem', color: '#475569', backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border-light)', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--color-bg-navy)', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.25rem' }}>
                        TECHNICAL SPECIFICATION GRID
                      </div>
                      {currentVariant && currentVariant.attributes && currentVariant.attributes.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {currentVariant.attributes.map((attr, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.2rem' }}>
                              <span style={{ color: '#64748b' }}>{attr.display_name}</span>
                              <span style={{ fontWeight: '600', color: '#1e293b' }}>{attr.value}</span>
                            </div>
                          ))}
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Weight</span>
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{currentVariant.weight_kg} kg</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Volume</span>
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{currentVariant.volume_m3} m³</span>
                          </div>
                        </div>
                      ) : (
                        <p style={{ color: '#94a3b8' }}>Custom milling available on request.</p>
                      )}
                    </div>
                  )}

                  {/* Project Board Allocation */}
                  <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <select 
                        className="filter-select"
                        value={selectedBoards[product.id] || ''}
                        onChange={(e) => setSelectedBoards(prev => ({ ...prev, [product.id]: e.target.value }))}
                        style={{ padding: '0.35rem', fontSize: '0.75rem' }}
                      >
                        {projectBoards.map((b) => (
                          <option key={b.id} value={b.id}>
                            Board: {b.name}
                          </option>
                        ))}
                        {projectBoards.length === 0 && (
                          <option value="">Default Project</option>
                        )}
                      </select>
                      <button 
                        onClick={() => handleAssignToBoard(product.id)}
                        className="btn-outline"
                        style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                      >
                        Assign
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
