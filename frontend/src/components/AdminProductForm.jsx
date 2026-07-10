import React, { useState } from 'react';

export default function AdminProductForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku_prefix: '',
    category_id: 'cat_furniture',
    price: '',
    stock: '',
    weight_kg: '',
    volume_m3: '',
    image_url: '',
    // Dynamic lighting attributes
    lumens: '',
    color_temp: '',
    // Dynamic materials attributes
    finish: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build the request body mapping
    const payload = {
      name: formData.name,
      description: formData.description,
      sku_prefix: formData.sku_prefix,
      category_id: formData.category_id,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock || 0),
      weight_kg: parseFloat(formData.weight_kg || 0),
      volume_m3: parseFloat(formData.volume_m3 || 0),
      image_url: formData.image_url,
      attributes: {}
    };

    // If Luxury Lighting, collect EAV fields
    if (formData.category_id === 'cat_lighting') {
      if (formData.lumens) payload.attributes.lumens = formData.lumens;
      if (formData.color_temp) payload.attributes.color_temp = formData.color_temp;
    }

    // If Construction Materials
    if (formData.category_id === 'cat_materials') {
      if (formData.finish) payload.attributes.finish = formData.finish;
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create product');

      alert(`Product created successfully! SKU: ${data.sku}`);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <div>
        <label className="filter-group" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '600' }}>Product Name *</label>
        <input type="text" name="name" className="filter-input" value={formData.name} onChange={handleChange} required />
      </div>

      <div>
        <label className="filter-group" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '600' }}>Description</label>
        <textarea name="description" className="filter-input" style={{ minHeight: '80px', fontFamily: 'inherit' }} value={formData.description} onChange={handleChange} />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '600' }}>Product Image URL</label>
        <input type="text" name="image_url" className="filter-input" placeholder="e.g. /assets/products/door_1.jpeg" value={formData.image_url} onChange={handleChange} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '600' }}>SKU Prefix *</label>
          <input type="text" name="sku_prefix" className="filter-input" placeholder="e.g. LUX-SOFA" value={formData.sku_prefix} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '600' }}>Category *</label>
          <select name="category_id" className="filter-select" value={formData.category_id} onChange={handleChange}>
            <option value="cat_furniture">Luxury Furniture</option>
            <option value="cat_lighting">Luxury Lighting</option>
            <option value="cat_materials">Construction Materials</option>
            <option value="cat_doors">Luxury Doors & Entries</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '600' }}>Base Price (₦) *</label>
          <input type="number" step="0.01" name="price" className="filter-input" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '600' }}>Initial Stock *</label>
          <input type="number" name="stock" className="filter-input" value={formData.stock} onChange={handleChange} required />
        </div>
      </div>

      {/* Dynamic fields for Luxury Lighting */}
      {formData.category_id === 'cat_lighting' && (
        <div style={{ padding: '1rem', backgroundColor: '#fafafb', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-gold-muted)', marginBottom: '0.75rem', fontFamily: 'Cinzel' }}>Lighting Specifications (EAV)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem' }}>Lumens</label>
              <input type="text" name="lumens" className="filter-input" placeholder="e.g. 1200lm" value={formData.lumens} onChange={handleChange} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem' }}>Color Temperature</label>
              <input type="text" name="color_temp" className="filter-input" placeholder="e.g. 3000K" value={formData.color_temp} onChange={handleChange} />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic fields for Construction Materials */}
      {formData.category_id === 'cat_materials' && (
        <div style={{ padding: '1rem', backgroundColor: '#fafafb', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-gold-muted)', marginBottom: '0.75rem', fontFamily: 'Cinzel' }}>Material Specifications</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem' }}>Weight (kg)</label>
              <input type="number" step="0.1" name="weight_kg" className="filter-input" placeholder="Weight in kg" value={formData.weight_kg} onChange={handleChange} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem' }}>Bulk Volume (m³)</label>
              <input type="number" step="0.01" name="volume_m3" className="filter-input" placeholder="Volume in cubic meters" value={formData.volume_m3} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem' }}>Finish Type</label>
            <input type="text" name="finish" className="filter-input" placeholder="e.g. Matte Polyurethane" value={formData.finish} onChange={handleChange} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" className="add-to-cart-btn" style={{ flex: 1 }} disabled={loading}>
          {loading ? 'Creating...' : 'Save Product'}
        </button>
        <button type="button" onClick={onCancel} className="filter-input" style={{ width: '120px', cursor: 'pointer', fontWeight: '600' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
