import React, { useState, useEffect, useMemo } from 'react';
import AdminProductForm from '../components/AdminProductForm.jsx';
import { 
  Plus, 
  Minus,
  Database, 
  Inbox, 
  Truck,
  Search, 
  Edit2, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
  TrendingUp,
  Package,
  Layers,
  ExternalLink,
  AlertTriangle,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function AdminDashboard({ adminUser, onLogout }) {
  const [activeAdminTab, setActiveAdminTab] = useState('inventory'); // 'inventory' | 'inquiries' | 'logistics'
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [shippingRates, setShippingRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Search & Filters for Inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Search & Filter for Inquiries
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Inline Editing State
  const [editingVariantId, setEditingVariantId] = useState(null);
  const [editPriceValue, setEditPriceValue] = useState('');
  const [updatingVariantId, setUpdatingVariantId] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/products');
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch('/api/v1/inquiries');
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error('Inquiries fetch error:', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const fetchShippingRates = async () => {
    try {
      const res = await fetch('/api/v1/shipping/rates');
      if (res.ok) {
        const data = await res.json();
        setShippingRates(data);
      }
    } catch (err) {
      console.error('Shipping rates fetch error:', err);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchInquiries();
    fetchShippingRates();
  }, []);

  // Inline Stock Adjustment (+1 / -1)
  const handleStockAdjust = async (variantId, currentStock, delta) => {
    const newStock = Math.max(0, (currentStock || 0) + delta);
    setUpdatingVariantId(variantId);
    try {
      const res = await fetch(`/api/admin/variants/${variantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock_quantity: newStock })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => ({
          ...p,
          variants: (p.variants || []).map(v => v.id === variantId ? { ...v, stock_quantity: newStock } : v)
        })));
      } else {
        alert('Could not update stock level.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating stock: ' + err.message);
    } finally {
      setUpdatingVariantId(null);
    }
  };

  // Inline Price Edit Save
  const handleSavePrice = async (variantId) => {
    const newPrice = parseFloat(editPriceValue);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert('Please enter a valid price in Naira.');
      return;
    }
    setUpdatingVariantId(variantId);
    try {
      const res = await fetch(`/api/admin/variants/${variantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_markup: newPrice })
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => ({
          ...p,
          variants: (p.variants || []).map(v => v.id === variantId ? { ...v, price_markup: newPrice } : v)
        })));
        setEditingVariantId(null);
      } else {
        alert('Could not update price.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating price: ' + err.message);
    } finally {
      setUpdatingVariantId(null);
    }
  };

  // Deactivate / Soft Delete Product
  const handleDeleteProduct = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to deactivate "${productName}" from the public catalog?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== productId));
      } else {
        alert('Failed to archive product.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deactivating product: ' + err.message);
    }
  };

  // Inquiry Status Update
  const handleUpdateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      const res = await fetch(`/api/v1/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === inquiryId ? { ...inq, status: newStatus } : inq));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // WhatsApp Concierge Link Generator
  const generateWhatsAppUrl = (inquiry) => {
    const rawPhone = (inquiry.phone || '').replace(/[^0-9]/g, '');
    let targetPhone = rawPhone;
    if (targetPhone.startsWith('0')) {
      targetPhone = '234' + targetPhone.slice(1);
    } else if (!targetPhone.startsWith('234')) {
      targetPhone = '2349068875555'; // Fallback to HC Group Hotline
    }

    const message = encodeURIComponent(
      `Hello ${inquiry.name},\n\nThis is HC Group Executive Concierge (Maiduguri HQ) following up on your consultation request [Ticket #${inquiry.id.slice(0, 8)}] for ${inquiry.project_type || 'Architectural Customization'}.\n\nWe have reviewed your project parameters and would like to coordinate your technical bill of quantities. How can we best assist your architectural schedule?`
    );

    return `https://wa.me/${targetPhone}?text=${message}`;
  };

  // Compute Executive KPI Stats
  const stats = useMemo(() => {
    let totalStock = 0;
    let totalValuation = 0;
    let totalVariants = 0;

    products.forEach(p => {
      (p.variants || []).forEach(v => {
        totalVariants++;
        const qty = v.stock_quantity || 0;
        const price = v.price_markup || 0;
        totalStock += qty;
        totalValuation += qty * price;
      });
    });

    const pendingInquiries = inquiries.filter(i => i.status === 'pending').length;

    return {
      totalProducts: products.length,
      totalVariants,
      totalStock,
      totalValuation,
      totalInquiries: inquiries.length,
      pendingInquiries
    };
  }, [products, inquiries]);

  // Filtered inventory rows
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = categoryFilter === 'all' || p.category_id === categoryFilter;
      const q = inventorySearch.toLowerCase().trim();
      const matchSearch = !q || 
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category_name && p.category_name.toLowerCase().includes(q)) ||
        (p.variants && p.variants.some(v => v.sku.toLowerCase().includes(q)));

      return matchCat && matchSearch;
    });
  }, [products, categoryFilter, inventorySearch]);

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const matchStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
      const q = inquirySearch.toLowerCase().trim();
      const matchSearch = !q ||
        inq.name.toLowerCase().includes(q) ||
        (inq.email && inq.email.toLowerCase().includes(q)) ||
        (inq.phone && inq.phone.includes(q)) ||
        (inq.id && inq.id.toLowerCase().includes(q)) ||
        (inq.company && inq.company.toLowerCase().includes(q));

      return matchStatus && matchSearch;
    });
  }, [inquiries, inquiryStatusFilter, inquirySearch]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1.25rem',
        borderBottom: '1px solid var(--color-border-light)',
        paddingBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <span style={{
              background: 'var(--color-bg-navy)',
              color: 'var(--color-gold)',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              letterSpacing: '1px'
            }}>
              PORTAL 5001
            </span>
            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} color="var(--color-gold)" /> Maiduguri HQ, Borno State
            </span>
          </div>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.25rem', fontSize: '2rem' }}>
            Executive Control Center
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            Central administration for catalog inventory, pricing thresholds, client RFQs, and Maiduguri logistics freight matrix.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '0.2rem 0.65rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}>
            <ShieldCheck size={14} color="#166534" />
            <span>Authenticated Executive: <strong>{adminUser?.email || 'hccompanyltd1@gmail.com'}</strong></span>
          </div>
        </div>

        {/* Global Controls & Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Lock Terminal & Sign Out"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                padding: '0.6rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: '600',
                color: '#dc2626'
              }}
            >
              <LogOut size={15} />
              <span>Lock Terminal</span>
            </button>
          )}

          <button
            onClick={() => {
              fetchInventory();
              fetchInquiries();
            }}
            title="Refresh All Records"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              padding: '0.6rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: '600',
              color: 'var(--color-bg-navy)'
            }}
          >
            <RefreshCw size={15} className={loading || inquiriesLoading ? 'spin' : ''} />
            <span>Sync</span>
          </button>

          <div style={{ display: 'flex', gap: '0.35rem', background: '#e2e8f0', padding: '0.3rem', borderRadius: '8px' }}>
            <button
              onClick={() => setActiveAdminTab('inventory')}
              style={{
                padding: '0.55rem 1.15rem',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: activeAdminTab === 'inventory' ? 'var(--color-bg-navy)' : 'transparent',
                color: activeAdminTab === 'inventory' ? 'var(--color-gold)' : '#475569',
                boxShadow: activeAdminTab === 'inventory' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Database size={15} /> Inventory ({stats.totalProducts})
            </button>
            <button
              onClick={() => setActiveAdminTab('inquiries')}
              style={{
                padding: '0.55rem 1.15rem',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: activeAdminTab === 'inquiries' ? 'var(--color-bg-navy)' : 'transparent',
                color: activeAdminTab === 'inquiries' ? 'var(--color-gold)' : '#475569',
                boxShadow: activeAdminTab === 'inquiries' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Inbox size={15} /> Client RFQs
              {stats.pendingInquiries > 0 && (
                <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: '10px', fontWeight: '700' }}>
                  {stats.pendingInquiries}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveAdminTab('logistics')}
              style={{
                padding: '0.55rem 1.15rem',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: activeAdminTab === 'logistics' ? 'var(--color-bg-navy)' : 'transparent',
                color: activeAdminTab === 'logistics' ? 'var(--color-gold)' : '#475569',
                boxShadow: activeAdminTab === 'logistics' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Truck size={15} /> Freight Matrix
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid var(--color-gold)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Catalog Headers</span>
            <Layers size={18} color="var(--color-gold)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', marginTop: '0.35rem' }}>
            {stats.totalProducts} <span style={{ fontSize: '1rem', fontWeight: '400', color: '#94a3b8' }}>Lines</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            {stats.totalVariants} individual SKU specifications
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid var(--color-gold)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Stock Available</span>
            <Package size={18} color="var(--color-gold)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', marginTop: '0.35rem' }}>
            {stats.totalStock.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: '400', color: '#94a3b8' }}>Units</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Across all architectural production categories
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid var(--color-gold)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Inventory Valuation</span>
            <TrendingUp size={18} color="var(--color-gold)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', marginTop: '0.35rem' }}>
            ₦{stats.totalValuation.toLocaleString('en-NG', { maximumFractionDigits: 0 })}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Total wholesale & architectural inventory value
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid #f59e0b', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Consultations</span>
            <Inbox size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: '#f59e0b', marginTop: '0.35rem' }}>
            {stats.pendingInquiries} <span style={{ fontSize: '1rem', fontWeight: '400', color: '#94a3b8' }}>Pending</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            {stats.totalInquiries} total architectural requests logged
          </div>
        </div>
      </div>

      {/* TAB 1: INVENTORY & PRODUCTS */}
      {activeAdminTab === 'inventory' && (
        <div>
          {/* Controls bar: Search, Filter, Add button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
            background: '#ffffff',
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search products, SKU or specs..."
                  className="filter-input"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.25rem', fontSize: '0.875rem' }}
                />
              </div>

              <select
                className="filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ minWidth: '210px', fontSize: '0.875rem' }}
              >
                <option value="all">All Architectural Classes</option>
                <option value="cat_doors">Luxury Doors & Entries</option>
                <option value="cat_whole_house">Whole-House Customization</option>
                <option value="cat_flooring">Flooring & Staircase / Marble</option>
                <option value="cat_kitchen">Kitchen & Wardrobe</option>
                <option value="cat_sanitary">Sanitary Ware & Baths</option>
              </select>
            </div>

            <button
              className="btn-gold"
              onClick={() => setShowAddForm(!showAddForm)}
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
            >
              <Plus size={16} /> {showAddForm ? 'Close Specification Editor' : 'New Architectural Specification'}
            </button>
          </div>

          {/* New Product Form Accordion */}
          {showAddForm && (
            <div style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid var(--color-gold)',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
                <Database size={22} color="var(--color-gold)" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-bg-navy)', margin: 0 }}>
                  Publish New Architectural Catalog Item
                </h3>
              </div>
              <AdminProductForm
                onSuccess={() => {
                  setShowAddForm(false);
                  fetchInventory();
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {/* Table Container */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#ffffff', borderRadius: '10px' }}>
              <RefreshCw size={28} className="spin" color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--color-gold-muted)', fontWeight: '600' }}>Synchronizing Catalog from Database...</p>
            </div>
          ) : error ? (
            <div style={{ color: '#ef4444', padding: '1.5rem', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              Failed to load catalog: {error}
            </div>
          ) : (
            <div style={{
              overflowX: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', borderBottom: '2px solid var(--color-gold)' }}>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Product & Asset</th>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Category</th>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Unit Markup Price (₦)</th>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Live Stock & Quick Adjust</th>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Technical Specs</th>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No catalog items matched your filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.flatMap(p =>
                      (p.variants || []).map((v) => {
                        const isEditingPrice = editingVariantId === v.id;
                        const isBusy = updatingVariantId === v.id;

                        return (
                          <tr key={v.id} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background-color 0.2s' }}>
                            {/* Product & Asset */}
                            <td style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                  backgroundColor: '#f1f5f9',
                                  border: '1px solid var(--color-border-light)',
                                  flexShrink: 0
                                }}>
                                  <img
                                    src={p.image_url || '/assets/products/door_1.jpeg'}
                                    alt={p.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = '/assets/products/door_1.jpeg'; }}
                                  />
                                </div>
                                <div>
                                  <div style={{ fontWeight: '600', color: 'var(--color-bg-navy)', fontSize: '0.925rem' }}>{p.name}</div>
                                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b', marginTop: '0.15rem' }}>
                                    SKU: <span style={{ color: 'var(--color-gold)', fontWeight: '700' }}>{v.sku}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td style={{ padding: '1rem' }}>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '4px',
                                backgroundColor: '#f1f5f9',
                                color: '#334155',
                                border: '1px solid #e2e8f0'
                              }}>
                                {p.category_name}
                              </span>
                            </td>

                            {/* Price Markup with Inline Edit */}
                            <td style={{ padding: '1rem' }}>
                              {isEditingPrice ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <input
                                    type="number"
                                    value={editPriceValue}
                                    onChange={(e) => setEditPriceValue(e.target.value)}
                                    style={{
                                      width: '130px',
                                      padding: '0.35rem 0.5rem',
                                      borderRadius: '4px',
                                      border: '1px solid var(--color-gold)',
                                      fontSize: '0.85rem'
                                    }}
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleSavePrice(v.id)}
                                    disabled={isBusy}
                                    style={{
                                      background: 'var(--color-bg-navy)',
                                      color: 'var(--color-gold)',
                                      border: 'none',
                                      padding: '0.35rem 0.6rem',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      fontWeight: '600',
                                      fontSize: '0.75rem'
                                    }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingVariantId(null)}
                                    style={{
                                      background: '#f1f5f9',
                                      color: '#64748b',
                                      border: 'none',
                                      padding: '0.35rem 0.5rem',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      fontSize: '0.75rem'
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontWeight: '700', color: 'var(--color-bg-navy)', fontSize: '0.95rem' }}>
                                    ₦{Number(v.price_markup).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                                  </span>
                                  <button
                                    onClick={() => {
                                      setEditingVariantId(v.id);
                                      setEditPriceValue(v.price_markup);
                                    }}
                                    title="Edit Price"
                                    style={{
                                      background: 'transparent',
                                      border: 'none',
                                      color: '#94a3b8',
                                      cursor: 'pointer',
                                      padding: '2px',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <Edit2 size={13} />
                                  </button>
                                </div>
                              )}
                            </td>

                            {/* Stock Quantity + Quick Adjust */}
                            <td style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button
                                  onClick={() => handleStockAdjust(v.id, v.stock_quantity, -1)}
                                  disabled={isBusy || v.stock_quantity <= 0}
                                  title="Decrease Stock (-1)"
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '4px',
                                    border: '1px solid #cbd5e1',
                                    background: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#475569'
                                  }}
                                >
                                  <Minus size={12} />
                                </button>

                                <span style={{
                                  fontWeight: '700',
                                  fontSize: '0.95rem',
                                  minWidth: '36px',
                                  textAlign: 'center',
                                  color: v.stock_quantity > 10 ? '#10b981' : v.stock_quantity > 0 ? '#f59e0b' : '#ef4444'
                                }}>
                                  {v.stock_quantity}
                                </span>

                                <button
                                  onClick={() => handleStockAdjust(v.id, v.stock_quantity, 1)}
                                  disabled={isBusy}
                                  title="Increase Stock (+1)"
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '4px',
                                    border: '1px solid #cbd5e1',
                                    background: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#475569'
                                  }}
                                >
                                  <Plus size={12} />
                                </button>

                                <button
                                  onClick={() => handleStockAdjust(v.id, v.stock_quantity, 10)}
                                  disabled={isBusy}
                                  title="Bulk Restock (+10)"
                                  style={{
                                    padding: '0.15rem 0.4rem',
                                    borderRadius: '4px',
                                    border: '1px solid #e2e8f0',
                                    background: '#f8fafc',
                                    fontSize: '0.7rem',
                                    fontWeight: '600',
                                    color: '#64748b',
                                    cursor: 'pointer'
                                  }}
                                >
                                  +10
                                </button>
                              </div>

                              <div style={{ marginTop: '0.25rem' }}>
                                <span style={{
                                  fontSize: '0.68rem',
                                  fontWeight: '600',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  color: v.stock_quantity > 10 ? '#166534' : v.stock_quantity > 0 ? '#92400e' : '#991b1b'
                                }}>
                                  {v.stock_quantity > 10 ? '● In Stock' : v.stock_quantity > 0 ? '▲ Low Supply' : '✕ Depleted'}
                                </span>
                              </div>
                            </td>

                            {/* Spec Summary */}
                            <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#475569', maxWidth: '260px' }}>
                              {v.attributes && v.attributes.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                  {v.attributes.map(attr => (
                                    <div key={attr.name} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      <strong style={{ color: 'var(--color-bg-navy)' }}>{attr.display_name}:</strong> {attr.value}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span style={{ color: '#94a3b8' }}>Standard Architectural Unit</span>
                              )}
                            </td>

                            {/* Actions */}
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                title="Deactivate / Archive Product"
                                style={{
                                  border: 'none',
                                  background: 'transparent',
                                  color: '#dc2626',
                                  cursor: 'pointer',
                                  padding: '0.4rem',
                                  borderRadius: '4px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'background-color 0.2s'
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLIENT RFQS & INQUIRIES */}
      {activeAdminTab === 'inquiries' && (
        <div>
          {/* Controls bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
            background: '#ffffff',
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by client name, email, phone or ticket..."
                  className="filter-input"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.25rem', fontSize: '0.875rem' }}
                />
              </div>

              {/* Status Tabs */}
              <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '6px' }}>
                {['all', 'pending', 'contacted', 'quoted', 'closed'].map(st => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    style={{
                      padding: '0.35rem 0.8rem',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      background: inquiryStatusFilter === st ? 'var(--color-bg-navy)' : 'transparent',
                      color: inquiryStatusFilter === st ? 'var(--color-gold)' : '#64748b'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Showing <strong>{filteredInquiries.length}</strong> inquiries
            </div>
          </div>

          {filteredInquiries.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '3.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--color-border-light)' }}>
              <Inbox size={48} color="var(--color-gold-muted)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--color-bg-navy)', marginBottom: '0.5rem' }}>No Client RFQs Found</h3>
              <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
                {inquirySearch ? 'No client consultation matches your search criteria.' : 'New architectural requests submitted via the Contact page or BoQ generator will appear here instantly.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredInquiries.map((inq) => {
                const whatsappUrl = generateWhatsAppUrl(inq);

                return (
                  <div key={inq.id} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-border-light)',
                    borderLeft: inq.status === 'pending' ? '5px solid #f59e0b' : inq.status === 'quoted' ? '5px solid #6366f1' : inq.status === 'contacted' ? '5px solid #3b82f6' : '5px solid #10b981',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-bg-navy)', margin: 0 }}>{inq.name}</h3>
                          {inq.company && <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>({inq.company})</span>}
                          <span style={{
                            fontSize: '0.72rem',
                            fontFamily: 'monospace',
                            backgroundColor: '#f1f5f9',
                            color: '#475569',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0'
                          }}>
                            {inq.id}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#475569', flexWrap: 'wrap' }}>
                          <a href={`mailto:${inq.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-bg-navy)', textDecoration: 'none' }}>
                            <Mail size={14} color="var(--color-gold)" /> {inq.email}
                          </a>
                          {inq.phone && (
                            <a href={`tel:${inq.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-bg-navy)', textDecoration: 'none' }}>
                              <Phone size={14} color="var(--color-gold)" /> {inq.phone}
                            </a>
                          )}
                          {inq.location && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <MapPin size={14} color="var(--color-gold)" /> {inq.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status Selector + WhatsApp Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: '#25D366',
                            color: '#ffffff',
                            padding: '0.45rem 0.9rem',
                            borderRadius: '6px',
                            fontSize: '0.825rem',
                            fontWeight: '700',
                            textDecoration: 'none',
                            boxShadow: '0 2px 4px rgba(37, 211, 102, 0.25)'
                          }}
                        >
                          <MessageSquare size={15} /> WhatsApp Concierge
                        </a>

                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          style={{
                            padding: '0.45rem 0.8rem',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.825rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            backgroundColor: inq.status === 'pending' ? '#fef3c7' : inq.status === 'quoted' ? '#e0e7ff' : inq.status === 'contacted' ? '#dbeafe' : '#dcfce7',
                            color: inq.status === 'pending' ? '#92400e' : inq.status === 'quoted' ? '#3730a3' : inq.status === 'contacted' ? '#1e40af' : '#166534'
                          }}
                        >
                          <option value="pending">Pending Review</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted / BoQ Issued</option>
                          <option value="closed">Closed / Finalized</option>
                        </select>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem',
                      background: '#f8fafc',
                      padding: '0.9rem 1.15rem',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      fontSize: '0.85rem'
                    }}>
                      <div>
                        <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project Type</span>
                        <strong style={{ color: 'var(--color-bg-navy)' }}>{inq.project_type || 'General Sourcing'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Budget Bracket</span>
                        <strong style={{ color: 'var(--color-bg-navy)' }}>{inq.budget || 'Custom / To be scoped'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scope Required</span>
                        <strong style={{ color: 'var(--color-bg-navy)' }}>{inq.scope || 'Complete Architectural Line'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logged Timestamp</span>
                        <span style={{ color: '#475569' }}>{new Date(inq.created_at).toLocaleString('en-NG')}</span>
                      </div>
                    </div>

                    {/* Message / Project Note */}
                    {inq.message && (
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#334155',
                        lineHeight: '1.6',
                        background: '#ffffff',
                        padding: '0.85rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px'
                      }}>
                        <strong style={{ color: 'var(--color-bg-navy)', display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Client Project Brief:
                        </strong>
                        <p style={{ margin: 0 }}>{inq.message}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LOGISTICS & FREIGHT MATRIX */}
      {activeAdminTab === 'logistics' && (
        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} color="var(--color-gold)" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-bg-navy)', margin: 0 }}>
                  Maiduguri HQ Freight Dispatch Matrix
                </h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Calculated freight zones dispatching from Sir Kashim Ibrahim Way, Maiduguri, Borno State to nationwide locations.
              </p>
            </div>
            <div style={{
              background: '#fef9e7',
              border: '1px solid var(--color-gold)',
              padding: '0.5rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: 'var(--color-bg-navy)',
              fontWeight: '600'
            }}>
              HQ Hub: Maiduguri Central
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Destination State</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Destination Hub / City</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Transport Fleet</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Base Delivery Rate (₦)</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Per-Kg Heavy Rate (₦/kg)</th>
                </tr>
              </thead>
              <tbody>
                {shippingRates.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                      Loading freight distribution table...
                    </td>
                  </tr>
                ) : (
                  shippingRates.map((sr) => (
                    <tr key={sr.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
                        {sr.state}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                        {sr.city}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          textTransform: 'uppercase',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          backgroundColor: sr.transport_type === 'crane_lift' ? '#fef3c7' : sr.transport_type === 'flatbed' ? '#dbeafe' : '#f1f5f9',
                          color: sr.transport_type === 'crane_lift' ? '#92400e' : sr.transport_type === 'flatbed' ? '#1e40af' : '#475569'
                        }}>
                          {sr.transport_type.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: 'var(--color-bg-navy)' }}>
                        ₦{Number(sr.base_rate).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>
                        ₦{Number(sr.per_kg_rate).toLocaleString('en-NG', { minimumFractionDigits: 2 })} / kg
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
