import React from 'react';
import '../styling/Home.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Capture Your Perfect Moment</h1>
          <p>Book professional photography sessions easily.</p>
          <Link to="/sessions" className="sessions-button">Explore Sessions</Link>
        </div>
      </div>

      {/* 2. Why Choose Us Section */}
      <div className="section-container" id='why-us-bg'>
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>Professional service, stunning results</p>
        </div>
        
        <div className="why-us-grid">
          <div className="why-us-card">
            <h2><i className="fa-regular fa-camera"></i></h2>
            <h3>Professional Equipment</h3>
            <p>State-of-the-art cameras and lighting for perfect shots.</p>
          </div>
          <div className="why-us-card">
            <h2><i className="fa-regular fa-clock"></i></h2>
            <h3>Fast Turnaround</h3>
            <p>Receive your edited photos within 5-7 business days.</p>
          </div>
          <div className="why-us-card">
            <h2><i className="fa-solid fa-trophy"></i></h2>
            <h3>Experienced Team</h3>
            <p>Award-winning photographers with years of expertise.</p>
          </div>
          <div className="why-us-card">
            <h2><i className="fa-regular fa-heart"></i></h2>
            <h3>Customer Focused</h3>
            <p>Your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      {/* 3. Popular Services Section */}
      <div className="section-container">
        <div className="section-header">
          <h2>Popular Services</h2>
          <p>Explore our photography session types</p>
        </div>
        
        <div className="popular-services-flex">
          <div className="custom-service-card">
            <h3>Portrait Photography</h3>
            <p>Professional portrait sessions capturing your personality.</p>
            <div className="service-card-meta">
              <span>1-2 hours</span>
              <span className="price">$299</span>
            </div>
            <Link to="/SessionDetails/1" className="details-btn">View Details</Link>
          </div>

          <div className="custom-service-card">
            <h3>Event Photography</h3>
            <p>Comprehensive coverage of your special events.</p>
            <div className="service-card-meta">
              <span>3-5 hours</span>
              <span className="price">$599</span>
            </div>
            <Link to="/SessionDetails/2" className="details-btn">View Details</Link>
          </div>

          <div className="custom-service-card">
            <h3>Product Photography</h3>
            <p>High-quality product photography for e-commerce.</p>
            <div className="service-card-meta">
              <span>2-3 hours</span>
              <span className="price">$399</span>
            </div>
            <Link to="/SessionDetails/3" className="details-btn">View Details</Link>
          </div>
        </div>
      </div>

      {/* 4. Final Section */}
      <div className="section-container cta-block">
        <div className="section-header">
          <h2>Get Started Today</h2>
          <p>Book your session and capture unforgettable moments.</p>
        </div>
        <Link to="/sessions">
        <Button variant="dark">Book a Session</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;