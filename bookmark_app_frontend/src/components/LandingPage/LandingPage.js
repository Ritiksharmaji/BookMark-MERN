import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './index.css';

function LandingPage() {
  return (
    <div>
      <Header />
      <div className="landing-container">
        <section className="intro-section">
          <h1 className="main-heading">Welcome to My Bookmark App</h1>
          <p className="description">
            Organize, save, and manage your favorite websites easily. 
            With our intuitive interface, you can store links, categorize them, 
            and access them at your convenience, all while keeping your bookmarks secure.
          </p>
        </section>

        <section className="features-section">
          <h2 className="section-title">Key Features</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3 className="feature-title">Organize Your Bookmarks</h3>
              <p>Classify your bookmarks into categories for easy access and better organization.</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Quick Access</h3>
              <p>Access your bookmarks in just a click. Save time by keeping your favorite sites at your fingertips.</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">User-friendly Interface</h3>
              <p>With a simple and clean design, you can easily add, delete, or edit your bookmarks without hassle.</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Secure and Safe</h3>
              <p>Your bookmarks are stored securely with proper authentication to ensure privacy and security.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-heading">Ready to Get Started?</h2>
          <p className="cta-description">Create an account and start managing your bookmarks today!</p>
          <div className="cta-buttons">
            <Link to="/registration">
              <button className="cta-button">Sign Up Now</button>
            </Link>
            <p className="cta-login-text">Already have an account? <Link to="/login" className="cta-login-link">Login</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;