import React, { useState, useEffect } from 'react';
import { Layers, Sparkles, Award, ClipboardList, Plus, FileText } from 'lucide-react';

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
      alert(`Successfully assigned variant (SKU: ${variant.sku}) to Project Board: "${targetBoard?.name}"`);
      
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
        <p style={{ fontFamily: 'Cinzel', color: '#aa8c2c', fontSize: '1.5rem' }}>Loading Project Sourcing...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">Project Sourcing Hub</h2>

      {/* Project Boards Administration Panel */}
      <div style={{
        backgroundColor: 'var(--color-bg-dark)',
        color: '#ffffff',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid var(--color-gold-muted)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div>
          <h3 style={{ fontFamily: 'Cinzel', color: 'var(--color-gold)', fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClipboardList size={20} /> Active Project Sourcing Boards
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Group items, materials, and custom measurements by project task (e.g. Master Bedroom, Bath Renovation).
          </p>
        </div>

        <form onSubmit={handleCreateBoard} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
          <input 
            type="text" 
            placeholder="e.g. Penthouse Bathroom Sourcing"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            className="filter-input"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#ffffff', border: '1px solid var(--color-bg-navy-light)' }}
            required
          />
          <button 
            type="submit" 
            className="add-to-cart-btn" 
            style={{ width: 'auto', padding: '0 1.25rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            disabled={creatingBoard}
          >
            <Plus size={16} /> Create Board
          </button>
        </form>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          <h3 className="filter-title">Project Categories</h3>
          
          <div className="filter-group">
            <label>Search Inventory</label>
            <input 
              type="text" 
              className="filter-input" 
              placeholder="e.g. Custom Wardrobe, Bathtub..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Project Classification</label>
            <select 
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Project Classes</option>
              <option value="cat_whole_house">Whole-House Customization</option>
              <option value="cat_sanitary">Sanitary Ware</option>
              <option value="cat_flooring">Flooring & Staircase</option>
              <option value="cat_kitchen">Kitchen & Wardrobe</option>
              <option value="cat_doors">Luxury Doors & Entries</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const currentVariant = selectedVariants[product.id];
            const currentTab = activeCardTabs[product.id] || 'overview';
            
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
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="product-image-fallback" style={{ display: product.image_url ? 'none' : 'flex' }}>
                    {product.category_id === 'cat_whole_house' ? (
                      <Award size={40} style={{ color: '#d4af37', marginBottom: '0.5rem' }} />
                    ) : product.category_id === 'cat_kitchen' ? (
                      <Layers size={40} style={{ color: '#d4af37', marginBottom: '0.5rem' }} />
                    ) : (
                      <Sparkles size={40} style={{ color: '#d4af37', marginBottom: '0.5rem' }} />
                    )}
                    <div style={{ fontFamily: 'Cinzel', fontSize: '0.9rem', letterSpacing: '1px', padding: '0 1rem', textAlign: 'center' }}>
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
                        color: currentTab === 'overview' ? 'var(--color-bg-dark)' : '#64748b',
                        cursor: 'pointer'
                      }}
                    >
                      Overview
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
                        color: currentTab === 'blueprint' ? 'var(--color-bg-dark)' : '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <FileText size={12} /> Blueprint & Tech Specs
                    </button>
                  </div>

                  {currentTab === 'overview' ? (
                    <div>
                      <p className="product-desc" style={{ minHeight: '44px' }}>{product.description}</p>

                      {/* Variant Selection */}
                      {product.variants && product.variants.length > 1 && (
                        <div className="filter-group" style={{ marginBottom: '0.75rem' }}>
                          <label style={{ fontSize: '0.75rem' }}>Configuration</label>
                          <select 
                            className="filter-select" 
                            value={currentVariant?.id || ''}
                            onChange={(e) => handleVariantChange(product.id, e.target.value, product)}
                          >
                            {product.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                SKU: {v.sku}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {currentVariant && (
                        <div className="variant-price" style={{ marginBottom: '1rem' }}>
                          ₦{currentVariant.price_markup.toFixed(2)} 
                          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}> (Base Supply)</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Blueprint specs list EAV parameters beautifully in a corporate structured grid */
                    <div style={{ minHeight: '166px', fontSize: '0.8rem', color: '#475569', backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border-light)', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--color-bg-dark)', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.25rem' }}>
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
                            <span style={{ color: '#64748b' }}>Fulfillment weight</span>
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{currentVariant.weight_kg} kg</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>Freight Volume</span>
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{currentVariant.volume_m3} m³</span>
                          </div>
                        </div>
                      ) : (
                        <p style={{ color: '#94a3b8' }}>No technical specs registered.</p>
                      )}
                    </div>
                  )}

                  {/* Project Board Allocation System */}
                  <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem', fontWeight: '600' }}>
                      Assign to Project Board
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select 
                        className="filter-select"
                        value={selectedBoards[product.id] || ''}
                        onChange={(e) => setSelectedBoards(prev => ({ ...prev, [product.id]: e.target.value }))}
                        style={{ padding: '0.4rem' }}
                      >
                        {projectBoards.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                        {projectBoards.length === 0 && (
                          <option value="">No Active Boards</option>
                        )}
                      </select>
                      <button 
                        onClick={() => handleAssignToBoard(product.id)}
                        className="add-to-cart-btn"
                        style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      >
                        Assign Material
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
