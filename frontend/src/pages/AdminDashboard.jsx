import React, { useState, useEffect } from 'react';
import AdminProductForm from '../components/AdminProductForm.jsx';
import { Plus, Database, Inbox, CheckCircle2, Clock, Mail, Phone, MapPin, Tag } from 'lucide-react';

export default function AdminDashboard() {
  const [activeAdminTab, setActiveAdminTab] = useState('inventory'); // 'inventory' | 'inquiries'
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchInventory = () => {
    setLoading(true);
    fetch('/api/v1/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchInquiries = () => {
    fetch('/api/v1/inquiries')
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchInventory();
    fetchInquiries();
  }, []);

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

  // Compute stats
  const totalStockItems = products.reduce((acc, p) => {
    const variantStock = p.variants?.reduce((sum, v) => sum + (v.stock_quantity || 0), 0) || 0;
    return acc + variantStock;
  }, 0);

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'pending').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: '0.25rem', textAlign: 'left' }}>Executive Control Center</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Manage industrial catalog stock, pricing rules, and inbound client RFQ consultations.</p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', background: '#e2e8f0', padding: '0.25rem', borderRadius: '8px' }}>
          <button
            onClick={() => setActiveAdminTab('inventory')}
            style={{
              padding: '0.5rem 1.25rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeAdminTab === 'inventory' ? 'var(--color-bg-navy)' : 'transparent',
              color: activeAdminTab === 'inventory' ? 'var(--color-gold)' : '#475569'
            }}
          >
            <Database size={16} /> Inventory & Products
          </button>
          <button
            onClick={() => {
              setActiveAdminTab('inquiries');
              fetchInquiries();
            }}
            style={{
              padding: '0.5rem 1.25rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeAdminTab === 'inquiries' ? 'var(--color-bg-navy)' : 'transparent',
              color: activeAdminTab === 'inquiries' ? 'var(--color-gold)' : '#475569'
            }}
          >
            <Inbox size={16} /> Client RFQs
            {pendingInquiriesCount > 0 && (
              <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.45rem', borderRadius: '10px' }}>
                {pendingInquiriesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeAdminTab === 'inventory' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            {!showAddForm && (
              <button 
                className="btn-gold" 
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={18} /> New Material / Product
              </button>
            )}
          </div>

          {showAddForm ? (
            <div style={{
              backgroundColor: '#ffffff',
              padding: '2.5rem',
              borderRadius: '12px',
              border: '1px solid var(--color-border-light)',
              maxWidth: '650px',
              margin: '0 auto',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
                <Database size={22} style={{ color: 'var(--color-gold)' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-bg-navy)' }}>Add Sourcing Catalog Item</h3>
              </div>
              <AdminProductForm 
                onSuccess={() => {
                  setShowAddForm(false);
                  fetchInventory();
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-gold)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Catalog Headers</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', marginTop: '0.25rem' }}>
                    {products.length} Products
                  </div>
                </div>
                <div style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-gold)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Stock count</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', marginTop: '0.25rem' }}>
                    {totalStockItems} Units
                  </div>
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ color: 'var(--color-gold-muted)' }}>Refreshing Inventory...</p>
                </div>
              ) : error ? (
                <div style={{ color: '#ef4444', padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '4px' }}>
                  Failed to load inventory stats: {error}
                </div>
              ) : (
                <div style={{ 
                  overflowX: 'auto', 
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px', 
                  border: '1px solid var(--color-border-light)', 
                  boxShadow: 'var(--shadow-sm)' 
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-bg-navy)', color: '#ffffff', borderBottom: '2px solid var(--color-gold)' }}>
                        <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Product & SKU</th>
                        <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Category</th>
                        <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Price Markup</th>
                        <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Current Stock</th>
                        <th style={{ padding: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>Spec Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.flatMap(p => 
                        (p.variants || []).map((v) => (
                          <tr key={v.id} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background-color 0.2s' }}>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ fontWeight: '600', color: 'var(--color-bg-navy)' }}>{p.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SKU: {v.sku}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{ 
                                fontSize: '0.75rem', 
                                fontWeight: '600', 
                                padding: '0.2rem 0.5rem', 
                                borderRadius: '4px', 
                                backgroundColor: '#f1f5f9',
                                color: '#475569' 
                              }}>
                                {p.category_name}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
                              ${v.price_markup.toFixed(2)}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{ 
                                fontWeight: '600',
                                color: v.stock_quantity > 10 ? '#10b981' : '#f59e0b'
                              }}>
                                {v.stock_quantity}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                              {v.attributes && v.attributes.length > 0 ? (
                                v.attributes.map(attr => `${attr.display_name}: ${attr.value}`).join(', ')
                              ) : 'No attributes'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}

      {activeAdminTab === 'inquiries' && (
        <div>
          {inquiries.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--color-border-light)' }}>
              <Inbox size={48} color="var(--color-gold-muted)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--color-bg-navy)', marginBottom: '0.5rem' }}>No Client RFQs Yet</h3>
              <p style={{ color: '#64748b' }}>New requests submitted via the Contact & Consultation page will appear here instantly.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {inquiries.map((inq) => (
                <div key={inq.id} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border-light)',
                  borderLeft: inq.status === 'pending' ? '4px solid #f59e0b' : '4px solid #10b981',
                  borderRadius: '8px',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-bg-navy)', margin: 0 }}>{inq.name}</h3>
                        {inq.company && <span style={{ color: '#64748b', fontSize: '0.9rem' }}>({inq.company})</span>}
                        <span style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          backgroundColor: '#f1f5f9',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          {inq.id}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#475569', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Mail size={14} color="var(--color-gold)" /> {inq.email}</span>
                        {inq.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Phone size={14} color="var(--color-gold)" /> {inq.phone}</span>}
                        {inq.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={14} color="var(--color-gold)" /> {inq.location}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        backgroundColor: inq.status === 'pending' ? '#fef3c7' : inq.status === 'quoted' ? '#e0e7ff' : '#dcfce7',
                        color: inq.status === 'pending' ? '#92400e' : inq.status === 'quoted' ? '#3730a3' : '#166534'
                      }}>
                        {inq.status}
                      </span>
                      <select 
                        value={inq.status} 
                        onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                        style={{ padding: '0.35rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="closed">Closed / Handled</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Project Type</span>
                      <strong>{inq.project_type}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Budget Bracket</span>
                      <strong>{inq.budget || 'Not specified'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Scope Required</span>
                      <strong>{inq.scope || 'General consultation'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Submitted Date</span>
                      <span>{new Date(inq.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  {inq.message && (
                    <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', background: '#ffffff', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                      <strong>Client Note / Specification:</strong>
                      <p style={{ margin: '0.35rem 0 0 0' }}>{inq.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
