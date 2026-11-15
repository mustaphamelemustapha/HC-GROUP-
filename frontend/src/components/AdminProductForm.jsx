import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, Box, DollarSign, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'cat_doors', name: 'Luxury Doors & Entries', prefix: 'HC-DOOR' },
  { id: 'cat_whole_house', name: 'Whole-House Customization', prefix: 'HC-WHC' },
  { id: 'cat_flooring', name: 'Flooring & Staircase / Marble', prefix: 'HC-MRBL' },
  { id: 'cat_kitchen', name: 'Kitchen & Wardrobe', prefix: 'HC-KTC' },
  { id: 'cat_sanitary', name: 'Sanitary Ware & Baths', prefix: 'HC-SNT' }
];

const QUICK_ASSETS = [
  { label: 'Pivot Door', path: '/assets/products/door_1.jpeg' },
  { label: 'French Door', path: '/assets/products/door_2.jpeg' },
  { label: 'Sliding Door', path: '/assets/products/door_3.jpeg' },
  { label: 'Classic Oak', path: '/assets/products/door_4.jpeg' },
  { label: 'Flush Door', path: '/assets/products/door_5.jpeg' },
  { label: 'Glass Door', path: '/assets/products/door_6.jpeg' },
  { label: 'Wardrobe System', path: '/assets/products/interior_1.jpeg' },
  { label: 'Resin Bathtub', path: '/assets/products/interior_2.jpeg' },
  { label: 'Carrara Marble', path: '/assets/products/interior_3.jpeg' },
  { label: 'Acoustic Panels', path: '/assets/products/interior_4.jpeg' }
];

export default function AdminProductForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku_prefix: 'HC-DOOR',
    category_id: 'cat_doors',
    price: '',
    stock: '10',
    weight_kg: '45',
    volume_m3: '0.45',
    image_url: '/assets/products/door_1.jpeg',
    // Architectural specifications (EAV attributes)
    material: 'Engineered Solid Oak & Thermal Insulation Core',
    dimensions: '2400mm x 1000mm x 65mm',
    finish: 'Matte Hardwax Oil & Brushed Brass Accents',
    flammability: 'Class A (60-minute fire retardant)',
    load_capacity: '350 kg load rating'
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-update SKU prefix when category changes
  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const matched = CATEGORIES.find(c => c.id === catId);
    setFormData(prev => ({
      ...prev,
      category_id: catId,
      sku_prefix: matched ? matched.prefix : prev.sku_prefix
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please provide a valid unit price in Nigerian Naira (₦).');
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      sku_prefix: formData.sku_prefix.trim().toUpperCase(),
      category_id: formData.category_id,
      price: priceNum,
      stock: parseInt(formData.stock || 0, 10),
      weight_kg: parseFloat(formData.weight_kg || 0),
      volume_m3: parseFloat(formData.volume_m3 || 0),
      image_url: formData.image_url.trim(),
      attributes: {
        material: formData.material,
        dimensions: formData.dimensions,
        finish: formData.finish,
        flammability: formData.flammability,
        load_capacity: formData.load_capacity
      }
    };

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create product');

      alert(`Specification successfully added to HC Group catalog!\nSKU: ${data.sku}`);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#ef4444',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          fontSize: '0.875rem'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Basic Classification */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
            Category Classification *
          </label>
          <select
            name="category_id"
            className="filter-select"
            value={formData.category_id}
            onChange={handleCategoryChange}
            required
            style={{ width: '100%' }}
          >
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
            SKU Prefix *
          </label>
          <input
            type="text"
            name="sku_prefix"
            className="filter-input"
            value={formData.sku_prefix}
            onChange={handleChange}
            placeholder="e.g. HC-DOOR"
            required
            style={{ width: '100%', textTransform: 'uppercase' }}
          />
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
          Product / System Name *
        </label>
        <input
          type="text"
          name="name"
          className="filter-input"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Royal Sovereign Dual Pivot Entrance Door"
          required
          style={{ width: '100%' }}
        />
      </div>

      {/* Description */}
      <div>
        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
          Architectural Scope & Description
        </label>
        <textarea
          name="description"
          className="filter-input"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="High-specification architectural custom fabrication for presidential residences and estates..."
          style={{ width: '100%', resize: 'vertical' }}
        />
      </div>

      {/* Pricing & Inventory */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
            Base Unit Price (₦) *
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: 'var(--color-gold)' }}>
              ₦
            </span>
            <input
              type="number"
              step="1000"
              name="price"
              className="filter-input"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 2450000"
              required
              style={{ width: '100%', paddingLeft: '2rem' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
            Initial Warehouse Stock (Units) *
          </label>
          <input
            type="number"
            min="0"
            name="stock"
            className="filter-input"
            value={formData.stock}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Freight & Logistics Parameters */}
      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Box size={16} color="var(--color-gold)" />
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-bg-navy)' }}>
            Logistics & Freight Parameters (Maiduguri HQ Calculation)
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: '#64748b' }}>Unit Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              name="weight_kg"
              className="filter-input"
              value={formData.weight_kg}
              onChange={handleChange}
              placeholder="kg"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: '#64748b' }}>Unit Volume (m³)</label>
            <input
              type="number"
              step="0.01"
              name="volume_m3"
              className="filter-input"
              value={formData.volume_m3}
              onChange={handleChange}
              placeholder="m³"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Architectural Specifications (EAV) */}
      <div style={{ background: '#fdfcf7', padding: '1.25rem', borderRadius: '8px', border: '1px solid #f1e7cc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Sparkles size={16} color="var(--color-gold)" />
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-bg-navy)', fontFamily: 'var(--font-display)' }}>
            Architectural Technical Specifications
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', fontWeight: '600', color: '#475569' }}>Material Composition</label>
            <input
              type="text"
              name="material"
              className="filter-input"
              value={formData.material}
              onChange={handleChange}
              placeholder="e.g. Italian Carrara White Marble"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', fontWeight: '600', color: '#475569' }}>Dimensions (CAD Spec)</label>
            <input
              type="text"
              name="dimensions"
              className="filter-input"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="e.g. 2400 x 1000 x 60 mm"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', fontWeight: '600', color: '#475569' }}>Surface Finish</label>
            <input
              type="text"
              name="finish"
              className="filter-input"
              value={formData.finish}
              onChange={handleChange}
              placeholder="e.g. Honed Satin, Brushed Brass"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', fontWeight: '600', color: '#475569' }}>Fire Safety / Thermal Rating</label>
            <input
              type="text"
              name="flammability"
              className="filter-input"
              value={formData.flammability}
              onChange={handleChange}
              placeholder="e.g. Class A (90-min Fire Retardant)"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Image URL & Quick Asset Select */}
      <div>
        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-bg-navy)' }}>
          Product Image URL
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            type="text"
            name="image_url"
            className="filter-input"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="/assets/products/door_1.jpeg"
            style={{ flex: 1 }}
          />
          {formData.image_url && (
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid var(--color-gold)',
              flexShrink: 0
            }}>
              <img
                src={formData.image_url}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        {/* Quick Asset Pill Selector */}
        <div style={{ marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
            Or choose a bundled high-res architectural asset:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {QUICK_ASSETS.map((asset) => (
              <button
                type="button"
                key={asset.path}
                onClick={() => setFormData(prev => ({ ...prev, image_url: asset.path }))}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '12px',
                  border: formData.image_url === asset.path ? '1px solid var(--color-gold)' : '1px solid #cbd5e1',
                  background: formData.image_url === asset.path ? '#fef9e7' : '#ffffff',
                  color: formData.image_url === asset.path ? 'var(--color-bg-navy)' : '#64748b',
                  cursor: 'pointer',
                  fontWeight: formData.image_url === asset.path ? '700' : '500'
                }}
              >
                {asset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
        <button
          type="submit"
          className="btn-gold"
          disabled={loading}
          style={{ flex: 1, padding: '0.75rem 1.5rem', justifyContent: 'center' }}
        >
          {loading ? 'Creating Catalog Specification...' : 'Publish to Catalog'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#475569',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
