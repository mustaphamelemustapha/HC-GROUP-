import React from 'react';

export default function PlaceholderPage({ title, description, setActiveTab }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-bg-navy)', marginBottom: '1rem' }}>
        {title}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '2rem' }}>
        {description}
      </p>
      <button 
        onClick={() => setActiveTab('home')}
        style={{
          backgroundColor: 'var(--color-gold)',
          color: 'var(--color-bg-navy)',
          padding: '0.75rem 2rem',
          border: 'none',
          borderRadius: '4px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Return Home
      </button>
    </div>
  );
}
