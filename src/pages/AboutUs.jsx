import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About eConsultation</h1>
          <p>Empowering stakeholders through AI-driven consultation analysis</p>
        </div>
      </div>

      <div className="about-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Background</h2>
            <div className="section-line"></div>
          </div>
          <p>
            eConsultation module is an online platform wherein proposed amendments/draft legislations 
            are posted on MCA's website for external users to submit their comments and suggestions 
            pertaining to the same through the MCA21 portal. The comments are captured in a structured 
            format for due consideration with respect to amending the draft legislation, based on the 
            suggestions or observations received.
          </p>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Problem Statement</h2>
            <div className="section-line"></div>
          </div>
          <p>
            The draft document soliciting comments is made available for a specified period, during 
            which any stakeholder may submit their observations either on the overall amendment or on 
            specific provisions of the draft legislation. In instances where a substantial volume of 
            comments is received on draft legislation, there exists a risk of certain observations 
            being inadvertently overlooked or inadequately analysed.
          </p>
          <p>
            In order to review each individual submission, leveraging AI-assisted tools will help 
            ensure that all remarks are duly considered and systematically analysed. Requirement is 
            the development of an AI model aimed at predicting the sentiments of the suggestions 
            provided by stakeholders in the eConsultation module. It should also generate a visual 
            representation in the form of a word cloud, highlighting the keywords utilised by the 
            stakeholders within their suggestions.
          </p>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Expected Outcome</h2>
            <div className="section-line"></div>
          </div>
          <p>
            The intention is to discern the feedback received from the stakeholders through the following:
          </p>
          <div className="outcome-grid">
            <div className="outcome-card">
              <div className="outcome-icon">📊</div>
              <h3>Sentiment Analysis</h3>
              <p>AI-powered analysis to understand the emotional tone and sentiment of stakeholder feedback</p>
            </div>
            <div className="outcome-card">
              <div className="outcome-icon">📝</div>
              <h3>Summary Generation</h3>
              <p>Automated generation of concise summaries that accurately convey the meaning of comments</p>
            </div>
            <div className="outcome-card">
              <div className="outcome-icon">☁️</div>
              <h3>Word Cloud</h3>
              <p>Visual representation showcasing the density and frequency of keywords used by stakeholders</p>
            </div>
          </div>
          <p className="outcome-note">
            The solution should considerably reduce the effort of the end user in analysing a high 
            volume of comments. It should be able to clearly identify the sentiments of comments 
            individually as well as broadly overall. The summary generation should be accurate and 
            convey the meaning of the comment properly, in a precise manner. The word cloud feature 
            should showcase the density of the words used by all users.
          </p>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Our Mission</h2>
            <div className="section-line"></div>
          </div>
          <p>
            To revolutionize the way government consultations are analyzed by providing intelligent, 
            AI-driven insights that ensure no stakeholder feedback goes unnoticed. We believe in 
            making the democratic process more efficient and transparent through technology.
          </p>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Key Benefits</h2>
            <div className="section-line"></div>
          </div>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">⚡</span>
              <span>Reduced manual effort in comment analysis</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <span>Comprehensive sentiment analysis</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📈</span>
              <span>Improved decision-making through data insights</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔍</span>
              <span>No feedback overlooked or missed</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📊</span>
              <span>Visual representation of stakeholder concerns</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">⚖️</span>
              <span>Better legislative outcomes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
