import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  Box, 
  DollarSign, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  UploadCloud, 
  Camera, 
  Trash2, 
  Link2,
  CheckCircle2,
  FileImage
} from 'lucide-react';

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

  // Image upload tab mode: 'upload' | 'url'
  const [imageInputMode, setImageInputMode] = useState('upload');
  const [uploadedImageInfo, setUploadedImageInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

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

  // Process uploaded image file with browser canvas auto-optimization
  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Selected file must be an image (JPEG, PNG, WEBP, or HEIC).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Optimize image resolution: maximum 1600px width/height for fast loading
        const maxDim = 1600;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-fidelity JPEG data URL
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        const approxSizeKb = Math.round((optimizedDataUrl.length * 0.75) / 1024);

        setFormData(prev => ({ ...prev, image_url: optimizedDataUrl }));
        setUploadedImageInfo({
          name: file.name,
          size: `${approxSizeKb} KB`,
          dimensions: `${width} × ${height} px`
        });
        setError(null);
      };

      img.onerror = () => {
        setError('Failed to process image file. Please try another picture.');
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
    setUploadedImageInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

    if (!formData.image_url) {
      setError('Please upload a product picture or select an architectural image.');
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

      {/* 1. DEDICATED PICTURE UPLOAD SPACE */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--color-border-light)',
        borderRadius: '10px',
        padding: '1.25rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Camera size={18} color="var(--color-gold)" />
              <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-bg-navy)', margin: 0 }}>
                Product Photography / Picture *
              </label>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Upload actual product photo from your device or select an architectural visual
            </span>
          </div>

          {/* Toggle between Device Upload vs URL/Preset */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px' }}>
            <button
              type="button"
              onClick={() => setImageInputMode('upload')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                background: imageInputMode === 'upload' ? 'var(--color-bg-navy)' : 'transparent',
                color: imageInputMode === 'upload' ? 'var(--color-gold)' : '#64748b'
              }}
            >
              <UploadCloud size={13} /> Upload Picture
            </button>
            <button
              type="button"
              onClick={() => setImageInputMode('url')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                background: imageInputMode === 'url' ? 'var(--color-bg-navy)' : 'transparent',
                color: imageInputMode === 'url' ? 'var(--color-gold)' : '#64748b'
              }}
            >
              <Link2 size={13} /> Preset / URL
            </button>
          </div>
        </div>

        {/* UPLOAD MODE */}
        {imageInputMode === 'upload' && (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              style={{ display: 'none' }}
            />

            {!formData.image_url || formData.image_url.startsWith('/assets/') ? (
              // Empty Upload Dropzone
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  border: isDragging ? '2px dashed var(--color-gold)' : '2px dashed #cbd5e1',
                  backgroundColor: isDragging ? '#fef9e7' : '#fafafa',
                  borderRadius: '10px',
                  padding: '2.25rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <UploadCloud size={28} color="var(--color-gold)" />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-bg-navy)' }}>
                  Click to select or drag & drop a picture here
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem' }}>
                  Supports camera photos, PNG, JPG, WEBP (Automatically optimized for web)
                </div>
                <button
                  type="button"
                  style={{
                    marginTop: '1rem',
                    backgroundColor: 'var(--color-bg-navy)',
                    color: 'var(--color-gold)',
                    border: 'none',
                    padding: '0.45rem 1.15rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Browse Device Photos
                </button>
              </div>
            ) : (
              // Active Upload Preview Card
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  width: '120px',
                  height: '100px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '2px solid var(--color-gold)',
                  backgroundColor: '#000',
                  flexShrink: 0
                }}>
                  <img
                    src={formData.image_url}
                    alt="Upload preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <strong style={{ color: 'var(--color-bg-navy)', fontSize: '0.9rem' }}>
                      {uploadedImageInfo?.name || 'Custom Uploaded Picture'}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Status: <span style={{ color: '#10b981', fontWeight: '600' }}>Optimized & Ready to Publish</span>
                    {uploadedImageInfo && (
                      <span> • {uploadedImageInfo.dimensions} ({uploadedImageInfo.size})</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--color-bg-navy)',
                        cursor: 'pointer'
                      }}
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #fecaca',
                        background: '#fef2f2',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#dc2626',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* URL & PRESET MODE */}
        {imageInputMode === 'url' && (
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <input
                type="text"
                name="image_url"
                className="filter-input"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://... or /assets/products/door_1.jpeg"
                style={{ flex: 1 }}
              />
              {formData.image_url && (
                <div style={{
                  width: '45px',
                  height: '45px',
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

            {/* Quick Bundled Architectural Presets */}
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                Or select from bundled architectural project photos:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {QUICK_ASSETS.map((asset) => (
                  <button
                    type="button"
                    key={asset.path}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image_url: asset.path }));
                      setUploadedImageInfo(null);
                    }}
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
        )}
      </div>

      {/* 2. BASIC CLASSIFICATION */}
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

      {/* 3. PRODUCT NAME */}
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

      {/* 4. DESCRIPTION */}
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

      {/* 5. PRICING & INVENTORY */}
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

      {/* 6. FREIGHT & LOGISTICS PARAMETERS */}
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

      {/* 7. ARCHITECTURAL TECHNICAL SPECIFICATIONS */}
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

      {/* 8. ACTION BUTTONS */}
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
