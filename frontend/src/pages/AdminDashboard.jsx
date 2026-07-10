import React, { useState, useEffect } from 'react';
import AdminProductForm from '../components/AdminProductForm.jsx';
import { Plus, Database, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetchInventory();
  }, []);

  // Compute stats
  const totalStockItems = products.reduce((acc, p) => {
    const variantStock = p.variants?.reduce((sum, v) => sum + (v.stock_quantity || 0), 0) || 0;
    return acc + variantStock;
  }, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Admin Inventory</h2>
        
        {!showAddForm && (
          <button 
            className="add-to-cart-btn" 
            style={{ width: 'auto', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={18} /> New Material / Product
          </button>
        )}
      </div>

      {showAddForm ? (
        <div style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid var(--color-border-light)',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.5rem' }}>
            <Database size={20} style={{ color: 'var(--color-gold)' }} />
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '1.2rem', color: 'var(--color-bg-dark)' }}>Add Catalog Item</h3>
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
            <div style={{ backgroundColor: 'var(--color-bg-dark)', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-gold)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Catalog Headers</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'Cinzel', color: 'var(--color-gold)', marginTop: '0.25rem' }}>
                {products.length} Products
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--color-bg-dark)', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-gold)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Stock count</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'Cinzel', color: 'var(--color-gold)', marginTop: '0.25rem' }}>
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
                  <tr style={{ backgroundColor: 'var(--color-bg-dark)', color: '#ffffff', borderBottom: '2px solid var(--color-gold)' }}>
                    <th style={{ padding: '1rem', fontFamily: 'Cinzel', letterSpacing: '0.5px' }}>Product & SKU</th>
                    <th style={{ padding: '1rem', fontFamily: 'Cinzel', letterSpacing: '0.5px' }}>Category</th>
                    <th style={{ padding: '1rem', fontFamily: 'Cinzel', letterSpacing: '0.5px' }}>Price Markup</th>
                    <th style={{ padding: '1rem', fontFamily: 'Cinzel', letterSpacing: '0.5px' }}>Current Stock</th>
                    <th style={{ padding: '1rem', fontFamily: 'Cinzel', letterSpacing: '0.5px' }}>Spec Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {products.flatMap(p => 
                    (p.variants || []).map((v, index) => (
                      <tr key={v.id} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background-color 0.2s' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '600', color: 'var(--color-bg-dark)' }}>{p.name}</div>
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
                        <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-bg-dark)' }}>
                          ₦{v.price_markup.toFixed(2)}
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
    </div>
  );
}
