import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// Global Top-Level Error Boundary preventing blank white screens under any circumstances
class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured in GlobalErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0c1630',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: "'Montserrat', sans-serif",
          color: '#ffffff'
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#0e1832',
            borderRadius: '4px',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/assets/logo.jpg" alt="HC Group" style={{ height: '54px', borderRadius: '3px', border: '1px solid rgba(197, 160, 89, 0.4)' }} />
            </div>
            
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              color: '#ffffff',
              fontSize: '1.8rem',
              marginBottom: '0.75rem',
              letterSpacing: '1px'
            }}>
              HC <span style={{ color: '#d4af37' }}>GROUP</span>
            </h2>

            <h3 style={{
              fontSize: '1.1rem',
              color: '#d4af37',
              fontWeight: 600,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Session Refresh Required
            </h3>

            <p style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.7',
              marginBottom: '2rem'
            }}>
              An unexpected display interruption occurred. Click below to reload the platform or contact our VIP concierge desk directly.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.hash = '';
                  window.location.reload();
                }}
                style={{
                  background: 'linear-gradient(135deg, #e5c158 0%, #d4af37 60%, #c49e29 100%)',
                  color: '#0c1630',
                  border: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
                }}
              >
                Reload HC Group
              </button>

              <a
                href="https://wa.me/2349068875555?text=Hello%20HC%20Group%2C%20I%20am%20experiencing%20an%20issue%20with%20the%20platform."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'transparent',
                  color: '#d4af37',
                  border: '1px solid #d4af37',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                WhatsApp Desk (+234 9068875555)
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>,
);
