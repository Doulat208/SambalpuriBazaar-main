import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      className="hero-section d-flex align-items-center"
      style={{
        backgroundColor: '#f8f9fa',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        minHeight: '100vh',
        color: '#333',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Optional: Add a decorative element */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 123, 255, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }}
      />
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-4">
              Discover the Elegance of Sambalpuri Handlooms
            </h1>
            <p className="lead mb-5 fs-4">
              Where Tradition Meets Timeless Style.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/shop" className="btn btn-primary btn-lg px-4 me-2">
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-outline-light btn-lg px-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
