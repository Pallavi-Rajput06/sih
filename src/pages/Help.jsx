import React, { useState } from 'react';
import './Help.css';

const Help = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I submit comments on draft legislation?",
      answer: "To submit comments, you need to first register for an account on the platform. Once registered, navigate to the draft legislation you want to comment on and use the comment submission form. Your comments will be captured in a structured format for analysis."
    },
    {
      question: "What is the purpose of the eConsultation module?",
      answer: "The eConsultation module allows stakeholders to provide feedback on proposed amendments and draft legislations posted by MCA. This feedback helps in improving legislation through public consultation and ensures all perspectives are considered."
    },
    {
      question: "How does the AI sentiment analysis work?",
      answer: "Our AI model analyzes the emotional tone and sentiment of stakeholder comments using natural language processing. It categorizes feedback as positive, negative, or neutral, helping policymakers understand the general sentiment around specific provisions."
    },
    {
      question: "What is a word cloud and how is it generated?",
      answer: "A word cloud is a visual representation that shows the most frequently used words in stakeholder comments. The size of each word indicates its frequency, helping identify key themes and concerns raised by stakeholders."
    },
    {
      question: "How long are draft documents available for comment?",
      answer: "Draft documents are typically available for a specified period, usually mentioned in the consultation notice. The duration varies depending on the complexity and urgency of the legislation."
    },
    {
      question: "Can I edit my submitted comments?",
      answer: "Currently, comments cannot be edited after submission. Please review your comments carefully before submitting. If you need to make changes, you may submit additional comments clarifying your position."
    },
    {
      question: "How are my comments used in the legislative process?",
      answer: "All comments are systematically analyzed using AI tools for sentiment analysis and summarization. The insights generated help policymakers understand stakeholder concerns and make informed decisions about amending draft legislation."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. Your personal information is protected according to government data protection standards. Only authorized personnel have access to your information, and it's used solely for consultation purposes."
    }
  ];

  const contactInfo = [
    {
      title: "Technical Support",
      email: "tech-support@econsultation.gov.in",
      phone: "+91-11-23456789",
      hours: "Monday - Friday, 9:00 AM - 6:00 PM IST"
    },
    {
      title: "General Inquiries",
      email: "info@econsultation.gov.in",
      phone: "+91-11-23456790",
      hours: "Monday - Friday, 9:00 AM - 5:00 PM IST"
    },
    {
      title: "Emergency Support",
      email: "emergency@econsultation.gov.in",
      phone: "+91-11-23456791",
      hours: "24/7"
    }
  ];

  return (
    <div className="help-container">
      <div className="help-hero">
        <div className="hero-content">
          <h1>Help & Support</h1>
          <p>Find answers to common questions and get the support you need</p>
        </div>
      </div>

      <div className="help-content">
        <div className="help-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className={`faq-question ${activeAccordion === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">
                    {activeAccordion === index ? '−' : '+'}
                  </span>
                </div>
                <div className={`faq-answer ${activeAccordion === index ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="help-section">
          <div className="section-header">
            <h2>Contact Information</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="contact-grid">
            {contactInfo.map((contact, index) => (
              <div key={index} className="contact-card">
                <h3>{contact.title}</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span>{contact.email}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span>{contact.phone}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🕒</span>
                    <span>{contact.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="help-section">
          <div className="section-header">
            <h2>Quick Links</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="quick-links">
            <div className="link-card">
              <h3>User Guide</h3>
              <p>Step-by-step instructions for using the platform</p>
              <button className="link-button">Download PDF</button>
            </div>
            <div className="link-card">
              <h3>Video Tutorials</h3>
              <p>Visual guides for common tasks</p>
              <button className="link-button">Watch Videos</button>
            </div>
            <div className="link-card">
              <h3>API Documentation</h3>
              <p>Technical documentation for developers</p>
              <button className="link-button">View Docs</button>
            </div>
          </div>
        </div>

        <div className="help-section">
          <div className="section-header">
            <h2>Submit a Support Ticket</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="support-form">
            <p>Can't find what you're looking for? Submit a support ticket and our team will get back to you within 24 hours.</p>
            <button className="support-button">Create Support Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
