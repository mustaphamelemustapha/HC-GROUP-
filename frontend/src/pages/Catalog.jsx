import React, { useState, useEffect } from 'react';
import { 
  Layers, Sparkles, Award, Plus, FileText, ShoppingBag, 
  MessageCircle, Check, ArrowRight, X, Search, RotateCcw, ShieldCheck,
  Ruler, Calculator, CheckCircle2, ChevronRight, Info
} from 'lucide-react';

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

  // CAD Sizing Calculator Modal State (Pillar 2)
  const [activeCadModal, setActiveCadModal] = useState(null);
  const [cadDimensions, setCadDimensions] = useState({
    widthMm: 2400,
    heightMm: 3000,
    depthMm: 65,
    materialGrade: 'highland_wool_silk',
    projectNote: ''
  });
  const [cadAddedEffect, setCadAddedEffect] = useState(false);

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
    const msg = `Hello HC Group, I am interested in ordering/inquiring about:\n*${product.name}*\nSKU: ${skuStr}\nPrice: ${priceStr}\n\nPlease share lead time and delivery schedule to Maiduguri / our site. Thank you.`;
    return `https://wa.me/2349068875555?text=${encodeURIComponent(msg)}`;
  };

  // Open CAD Sizing Modal for a specific product
  const handleOpenCadModal = (product) => {
    if (!product) return;
    setActiveCadModal(product);
    setCadAddedEffect(false);

    // Contextually preset realistic dimensions based on category
    if (product.category_id === 'cat_carpets') {
      setCadDimensions({
        widthMm: 3000,
        heightMm: 2000,
        depthMm: 12,
        materialGrade: 'highland_wool_silk',
        projectNote: 'Living room custom area rug'
      });
    } else if (product.category_id === 'cat_doors') {
      setCadDimensions({
        widthMm: 1200,
        heightMm: 2800,
        depthMm: 80,
        materialGrade: 'solid_hardwood_core',
        projectNote: 'Grand entrance architectural pivot aperture'
      });
    } else if (product.category_id === 'cat_kitchen') {
      setCadDimensions({
        widthMm: 3200,
        heightMm: 2400,
        depthMm: 650,
        materialGrade: 'walnut_veneer_mdf',
        projectNote: 'Floor-to-ceiling modular wardrobe joinery'
      });
    } else if (product.category_id === 'cat_flooring') {
      setCadDimensions({
        widthMm: 1200,
        heightMm: 600,
        depthMm: 20,
        materialGrade: 'carrara_polished_marble',
        projectNote: 'Batch-matched marble flooring slabs'
      });
    } else {
      setCadDimensions({
        widthMm: 2000,
        heightMm: 2400,
        depthMm: 50,
        materialGrade: 'composite_resin_stone',
        projectNote: 'Custom architectural specifications'
      });
    }
  };

  // Real-time CAD sizing math calculation
  const calculateCadQuote = () => {
    const w = Number(cadDimensions.widthMm) || 1000;
    const h = Number(cadDimensions.heightMm) || 1000;
    const d = Number(cadDimensions.depthMm) || 20;

    const areaM2 = (w * h) / 1000000;
    const volumeM3 = (w * h * d) / 1000000000;
    
    let densityKgM3 = 600;
    let baseRatePerM2 = 280000;

    if (activeCadModal?.category_id === 'cat_carpets') {
      densityKgM3 = 350;
      baseRatePerM2 = cadDimensions.materialGrade === 'pure_silk' ? 780000 : 310000;
    } else if (activeCadModal?.category_id === 'cat_doors') {
      densityKgM3 = 780;
      baseRatePerM2 = 520000;
    } else if (activeCadModal?.category_id === 'cat_flooring') {
      densityKgM3 = 2700;
      baseRatePerM2 = 180000;
    } else if (activeCadModal?.category_id === 'cat_kitchen') {
      densityKgM3 = 650;
      baseRatePerM2 = 420000;
    }

    const estimatedWeightKg = Math.max(12, Math.round(volumeM3 * densityKgM3 * 10) / 10);
    const estimatedPrice = Math.max(180000, Math.round(areaM2 * baseRatePerM2));

    let transportRecommendation = 'parcel';
    if (estimatedWeightKg > 140 || volumeM3 > 1.2) {
      transportRecommendation = 'crane_lift';
    } else if (estimatedWeightKg > 35 || volumeM3 > 0.35) {
      transportRecommendation = 'flatbed';
    }

    return {
      areaM2: areaM2.toFixed(2),
      volumeM3: volumeM3.toFixed(3),
      estimatedWeightKg,
      estimatedPrice,
      transportRecommendation
    };
  };

  const handleAddCadToCart = () => {
    if (!activeCadModal) return;
    const quote = calculateCadQuote();
    const customSku = `CAD-${(activeCadModal.sku_prefix || 'HC').toUpperCase()}-${cadDimensions.widthMm}x${cadDimensions.heightMm}`;
    const customName = `${activeCadModal.name} (Custom CAD: ${cadDimensions.widthMm}mm × ${cadDimensions.heightMm}mm)`;
    
    if (onAddToCart) {
      onAddToCart(
        `cad_${activeCadModal.id}_${Date.now()}`,
        customName,
        customSku,
        quote.estimatedPrice
      );
    }
    setCadAddedEffect(true);
    setTimeout(() => {
      setCadAddedEffect(false);
      setActiveCadModal(null);
    }, 1500);
  };

  const getWhatsAppCadLink = () => {
    if (!activeCadModal) return '';
    const quote = calculateCadQuote();
    const msg = `Hello HC Group Technical Team, I need an official custom CAD production quotation for:\n*${activeCadModal.name}*\n\n*Custom Blueprint Specifications:*\n• Width: ${cadDimensions.widthMm} mm\n• Height/Length: ${cadDimensions.heightMm} mm\n• Depth/Thickness: ${cadDimensions.depthMm} mm\n• Calculated Surface Area: ${quote.areaM2} m²\n• Calculated Volume: ${quote.volumeM3} m³\n• Estimated Unit Weight: ${quote.estimatedWeightKg} kg\n• Material Grade: ${cadDimensions.materialGrade.replace(/_/g, ' ').toUpperCase()}\n• Estimated Custom Supply Rate: ₦${quote.estimatedPrice.toLocaleString('en-NG')}\n• Recommended Fleet: ${quote.transportRecommendation.toUpperCase()}\n\nDelivery Destination: Maiduguri / Project Site.\nPlease review aperture parameters and confirm production schedule.`;
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

  const cadQuote = activeCadModal ? calculateCadQuote() : null;

  return (
    <div className="catalog-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge-luxury">WHOLE-HOUSE ARCHITECTURAL PORTFOLIO</span>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.25rem' }}>
            Materials Catalog & CAD Specifications
          </h2>
          <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Factory-direct pricing in Nigerian Naira (₦), configurable dimensions, and 1-tap WhatsApp consultation.
          </p>
        </div>

        {/* Quick Project Board Creator */}
        <form onSubmit={handleCreateBoard} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: '100%', maxWidth: '440px' }}>
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
              flex: '1 1 180px',
              minWidth: 0,
              maxWidth: '100%'
            }}
          />
          <button 
            type="submit" 
            className="btn-gold"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
            disabled={creatingBoard}
          >
            <Plus size={16} /> New Board
          </button>
        </form>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="filter-title" style={{ margin: 0 }}>Filter Portfolio</h3>
            {(search || category) && (
              <button 
                onClick={() => { setSearch(''); setCategory(''); }}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--color-gold-muted)', 
                  fontSize: '0.75rem', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>
          
          <div className="filter-group">
            <label>Keyword Search</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="filter-input" 
                placeholder="e.g. Silk Carpet, Pivot Door, Marble..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingRight: search ? '2.5rem' : '1rem' }}
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  style={{ 
                    position: 'absolute', 
                    right: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    color: '#94a3b8', 
                    cursor: 'pointer',
                    padding: '2px'
                  }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="filter-group">
            <label>Material Classification</label>
            <select 
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Architectural Lines</option>
              <option value="cat_doors">Luxury Doors & Entries</option>
              <option value="cat_carpets">Luxury Architectural Carpets & Rugs</option>
              <option value="cat_whole_house">Whole-House Customization</option>
              <option value="cat_flooring">Flooring & Marble Slabs</option>
              <option value="cat_kitchen">Kitchen & Wardrobe Systems</option>
              <option value="cat_sanitary">Sanitary Ware & Baths</option>
            </select>
          </div>

          {/* Interactive CAD Sizing Calculator Callout Box */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--color-border-gold)', marginTop: '2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--color-gold-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
              <Calculator size={14} color="var(--color-gold)" /> CUSTOM CAD SIZING MATRIX
            </span>
            <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.5', marginBottom: '1rem' }}>
              Need non-standard apertures, custom rug dimensions, or book-matched slab square meters? Calculate instant CAD blueprints.
            </p>
            <button
              className="btn-gold"
              style={{ width: '100%', padding: '0.6rem', fontSize: '0.82rem', justifyContent: 'center', marginBottom: '0.5rem' }}
              onClick={() => handleOpenCadModal(filteredProducts[0] || products[0])}
            >
              <Ruler size={14} /> Open CAD Sizer Tool
            </button>
            <a 
              href={`https://wa.me/2349068875555?text=${encodeURIComponent('Hello HC Group, I need custom dimension quotes for an architectural commission in Maiduguri / Nigeria.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-action-btn"
              style={{ padding: '0.5rem', fontSize: '0.82rem', justifyContent: 'center' }}
            >
              <MessageCircle size={14} /> WhatsApp Hotline (+234 9068875555)
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minWidth: 0, width: '100%' }}>
          
          {/* Quick-Filter Horizontal Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
            {[
              { id: '', label: 'All Collections' },
              { id: 'cat_doors', label: 'Luxury Doors' },
              { id: 'cat_carpets', label: 'Luxury Carpets & Rugs' },
              { id: 'cat_whole_house', label: 'Whole-House Joinery' },
              { id: 'cat_flooring', label: 'Marble & Stone' },
              { id: 'cat_kitchen', label: 'Kitchen & Wardrobe' },
              { id: 'cat_sanitary', label: 'Sanitary Ware' }
            ].map(cat => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '2px',
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: isSelected ? '700' : '600',
                    border: isSelected ? '1px solid var(--color-gold)' : '1px solid var(--color-border-light)',
                    backgroundColor: isSelected ? 'var(--color-bg-navy)' : '#ffffff',
                    color: isSelected ? 'var(--color-gold)' : '#475569',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    boxShadow: isSelected ? '0 4px 14px rgba(11, 19, 41, 0.2)' : 'var(--shadow-sm)'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
              <Layers size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', marginBottom: '0.5rem' }}>No Materials Found</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                No materials matched your filter query "{search}". Try searching for another item or reset filters.
              </p>
              <button 
                className="btn-gold"
                onClick={() => { setSearch(''); setCategory(''); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const currentVariant = selectedVariants[product.id] || (product.variants && product.variants[0]);
                const currentTab = activeCardTabs[product.id] || 'overview';
                const isAdded = addedItemEffect[product.id];
                
                return (
                  <article key={product.id} className="product-card">
                    {/* Visual Header */}
                    <div className="product-image-container">
                      <span className="product-category-tag">
                        {product.category_name || (
                          product.category_id === 'cat_carpets' ? 'Luxury Architectural Carpets' :
                          product.category_id === 'cat_doors' ? 'Luxury Doors & Entries' :
                          product.category_id === 'cat_flooring' ? 'Flooring & Marble' :
                          product.category_id === 'cat_kitchen' ? 'Kitchen & Wardrobe' :
                          product.category_id === 'cat_sanitary' ? 'Sanitary Ware' :
                          product.category_id === 'cat_whole_house' ? 'Whole-House Custom' :
                          'Architectural Specification'
                        )}
                      </span>
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(12, 22, 48, 0.88)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        color: '#34d399',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        zIndex: 2
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        Direct Supply
                      </span>
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
                          <p className="product-desc" style={{ minHeight: '44px', fontSize: '0.88rem', color: '#334155', marginBottom: '0.75rem', lineHeight: '1.5' }}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                              <div className="variant-price" style={{ margin: 0 }}>
                                ₦{currentVariant.price_markup.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                              </div>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                Base Supply (Ex-Factory)
                              </span>
                            </div>
                          )}

                          {/* Custom CAD Sizer Trigger Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenCadModal(product)}
                            style={{
                              width: '100%',
                              padding: '0.45rem',
                              fontSize: '0.78rem',
                              color: 'var(--color-bg-navy)',
                              backgroundColor: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              marginBottom: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.35rem',
                              cursor: 'pointer',
                              fontWeight: '600',
                              transition: 'var(--transition-fast)'
                            }}
                          >
                            <Ruler size={13} color="var(--color-gold-muted)" />
                            <span>Custom CAD Aperture & Sizing Calculator</span>
                          </button>

                          {/* Action Buttons */}
                          <div className="product-card-actions">
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
          )}
        </div>
      </div>

      {/* Pillar 2: Interactive CAD Sizing & Area Calculator Modal */}
      {activeCadModal && cadQuote && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(7, 13, 30, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1.5px solid var(--color-border-gold)',
            boxShadow: 'var(--shadow-xl)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '92vh',
            overflowY: 'auto',
            position: 'relative',
            padding: '2rem'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div>
                <span className="badge-luxury" style={{ margin: 0, padding: '0.2rem 0.65rem', fontSize: '0.72rem' }}>
                  <Calculator size={11} style={{ marginRight: '4px' }} /> MILLIMETER CAD APERTURE SIZER
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-bg-navy)', margin: '0.4rem 0 0.2rem 0' }}>
                  {activeCadModal.name}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                  Enter tailored dimensions to calculate instant surface area, volumetric mass, and custom pricing in ₦.
                </p>
              </div>
              <button
                onClick={() => setActiveCadModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                aria-label="Close CAD Sizer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                  Width (mm)
                </label>
                <input
                  type="number"
                  min="300"
                  max="12000"
                  step="50"
                  value={cadDimensions.widthMm}
                  onChange={(e) => setCadDimensions(prev => ({ ...prev, widthMm: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '6px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.95rem',
                    fontFamily: 'monospace',
                    fontWeight: '700'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                  Height / Length (mm)
                </label>
                <input
                  type="number"
                  min="300"
                  max="12000"
                  step="50"
                  value={cadDimensions.heightMm}
                  onChange={(e) => setCadDimensions(prev => ({ ...prev, heightMm: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '6px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.95rem',
                    fontFamily: 'monospace',
                    fontWeight: '700'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                  Thickness / Pile Depth (mm)
                </label>
                <input
                  type="number"
                  min="5"
                  max="500"
                  step="5"
                  value={cadDimensions.depthMm}
                  onChange={(e) => setCadDimensions(prev => ({ ...prev, depthMm: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '6px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.95rem',
                    fontFamily: 'monospace',
                    fontWeight: '700'
                  }}
                />
              </div>
            </div>

            {/* Material Grade Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                Specification & Material Density Grade
              </label>
              <select
                value={cadDimensions.materialGrade}
                onChange={(e) => setCadDimensions(prev => ({ ...prev, materialGrade: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '6px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.9rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="highland_wool_silk">Highland Wool & Mulberry Silk Blend (1,200,000 Knots/m²)</option>
                <option value="pure_silk">100% Pure Mulberry Silk Luxury Weave (1,600,000 Knots/m²)</option>
                <option value="solid_hardwood_core">Solid Hardwood & Thermal Insulated Core (Heavy Architectural Grade)</option>
                <option value="carrara_polished_marble">100% Authentic Carrara Marble (20mm Mirror Gloss Polish)</option>
                <option value="walnut_veneer_mdf">American Walnut Millwork & Moisture-Proof Acoustic Core</option>
              </select>
            </div>

            {/* Calculated Metrics Display Bar */}
            <div style={{
              backgroundColor: '#070d1e',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              textAlign: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Surface Area</span>
                <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                  {cadQuote.areaM2} m²
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Volume</span>
                <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                  {cadQuote.volumeM3} m³
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Est. Weight</span>
                <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                  {cadQuote.estimatedWeightKg} kg
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transport Fleet</span>
                <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: '700', color: '#34d399', textTransform: 'uppercase' }}>
                  {cadQuote.transportRecommendation.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* Price Calculation and Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Estimated Tailored Supply Rate</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: '700', color: 'var(--color-bg-navy)' }}>
                  ₦{cadQuote.estimatedPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '600' }}>
                  Millimeter CAD Precision Guaranteed
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-gold"
                  style={{
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.88rem',
                    backgroundColor: cadAddedEffect ? '#10b981' : 'var(--color-gold)',
                    color: cadAddedEffect ? '#ffffff' : 'var(--color-bg-navy)',
                    fontWeight: '700'
                  }}
                  onClick={handleAddCadToCart}
                >
                  {cadAddedEffect ? (
                    <>
                      <CheckCircle2 size={16} /> Added to BoQ!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Add Custom Sized Item
                    </>
                  )}
                </button>

                <a
                  href={getWhatsAppCadLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-action-btn"
                  style={{ padding: '0.75rem 1.1rem', fontSize: '0.85rem' }}
                >
                  <MessageCircle size={16} /> WhatsApp Blueprint
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
