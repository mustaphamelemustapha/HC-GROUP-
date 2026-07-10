import React from 'react';
import { PenTool, Ruler, Factory, Truck, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home({ setActiveTab }) {
  const services = [
    { id: 1, title: 'Design', icon: <PenTool />, desc: 'Bespoke architectural and interior design tailored to your vision.' },
    { id: 2, title: 'Measurement', icon: <Ruler />, desc: 'Precise on-site measurements for perfect material fitting.' },
    { id: 3, title: 'Producing', icon: <Factory />, desc: 'High-quality manufacturing with premium materials.' },
    { id: 4, title: 'Delivery Shipment', icon: <Truck />, desc: 'Global, secure, and timely logistics to your project site.' },
    { id: 5, title: 'Installation', icon: <Wrench />, desc: 'Professional installation by certified experts.' },
    { id: 6, title: 'Warranty', icon: <ShieldCheck />, desc: 'Comprehensive warranty for absolute peace of mind.' },
  ];

  const categories = [
    { id: 1, name: 'Doors & Windows', image: '/assets/products/door_1.jpeg' },
    { id: 2, name: 'Premium Tiles', image: '/assets/products/door_3.jpeg' },
    { id: 3, name: 'Kitchen & Wardrobe', image: '/assets/products/door_7.jpeg' },
    { id: 4, name: 'Sanitary Wares', image: '/assets/products/door_9.jpeg' },
  ];

  const projects = [
    { id: 1, title: 'The Royal Villa', location: 'Dubai, UAE', image: '/assets/products/interior_1.jpeg' },
    { id: 2, title: 'Azure Hotel Resort', location: 'Maldives', image: '/assets/products/interior_2.jpeg' },
    { id: 3, title: 'Skyline Penthouse', location: 'New York, USA', image: '/assets/products/interior_3.jpeg' },
    { id: 4, title: 'Grand Medical Center', location: 'London, UK', image: '/assets/products/interior_4.jpeg' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/assets/products/interior_1.jpeg" alt="Luxury Interior" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Premium Building <span>Materials</span></h1>
          <p className="hero-subtitle">Elevating spaces with one-stop interior solutions for villas, hotels, and luxury estates worldwide.</p>
          <a href="#" className="hero-cta" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>
            Explore Products
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">One-Stop Service</h2>
          <p className="section-subtitle">We handle everything from initial concept to final installation, ensuring a seamless experience for your project.</p>
        </div>
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="section-container dark">
        <div className="section-header">
          <h2 className="section-title">Our Product Lines</h2>
          <p className="section-subtitle" style={{ color: 'var(--color-text-muted)' }}>Discover our comprehensive range of high-end building materials.</p>
        </div>
        <div className="categories-masonry">
          {categories.map(category => (
            <a href="#" key={category.id} className="category-tile" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Take a look at some of the world-class environments we've helped create.</p>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-location">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#" className="hero-cta" style={{ background: 'transparent', border: '2px solid var(--color-bg-navy)', color: 'var(--color-bg-navy)' }}>
            View All Projects <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
          </a>
        </div>
      </section>
    </div>
  );
}
