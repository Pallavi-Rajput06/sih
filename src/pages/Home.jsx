import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">

          
         

          <h1 id='heading'>Welcome to eConsultation</h1>
          <p id='mainpara'>Empowering democratic participation <br />through AI-driven consultation analysis</p>
          <div className="hero-buttons">
            <Link to="/register" className="cta-button primary">Get Started</Link>
            <Link to="/about" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <div className="floating-card card-1">
              <span className="card-icon">📊</span>
              <span className="card-text">AI Analysis</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">☁️</span>
              <span className="card-text">Word Cloud</span>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">📝</span>
              <span className="card-text">Smart Summary</span>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="section-header">
          <h2>Platform Features</h2>
          <p>Discover how AI is revolutionizing government consultation</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Analysis</h3>
            <p>Advanced machine learning algorithms analyze stakeholder feedback for comprehensive insights</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Sentiment Analysis</h3>
            <p>Understand the emotional tone and sentiment of public feedback automatically</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Smart Summarization</h3>
            <p>Generate concise, accurate summaries of stakeholder comments using NLP</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Visual Analytics</h3>
            <p>Interactive word clouds and charts for better understanding of key themes</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Consultations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Stakeholders</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Availability</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Participate?</h2>
          <p>Join thousands of stakeholders in shaping better legislation through intelligent consultation</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary large">Create Account</Link>
            <Link to="/help" className="cta-button secondary large">Get Help</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
