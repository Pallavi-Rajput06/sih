import React, { useState } from 'react'
import './Draft.css';

const Draft = () => {
  const [selectedDraft, setSelectedDraft] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Sample draft data
  const drafts = [
    {
      id: 1,
      title: "Companies Act 2024 Amendments",
      userID: "09261468759657256208",
      content: {
        introduction: "The Ministry of Corporate Affairs (MCA) is pleased to present the proposed amendments to the Companies Act, 2013, aimed at enhancing corporate governance standards, streamlining regulatory processes, and fostering an environment conducive to business growth and innovation. These amendments are a result of extensive consultations with industry experts, legal professionals, and regulatory bodies.",
        sections: [
          {
            title: "Section 1: Definitions",
            content: "In this Act, unless the context otherwise requires, \"E-consultation module\" means the online platform maintained by the Ministry for the purpose of soliciting and receiving public comments and suggestions on draft legislations, policies, and regulations."
          }
        ]
      }
    },
    {
      id: 2,
      title: "Direct and Indirect Taxation Bill 2025",
      userID: "09261468759657256208",
      content: {
        introduction: "The proposed Direct and Indirect Taxation Bill 2025 aims to simplify the tax structure, reduce compliance burden, and promote economic growth through strategic tax reforms.",
        sections: [
          {
            title: "Section 1: Tax Structure Overview",
            content: "This bill introduces a simplified tax structure with reduced rates for small and medium enterprises while maintaining progressive taxation for high-income individuals."
          }
        ]
      }
    },
    {
      id: 3,
      title: "National Environmental Policy",
      userID: "09261468759657256208",
      content: {
        introduction: "The National Environmental Policy framework establishes comprehensive guidelines for environmental protection, sustainable development, and climate change mitigation.",
        sections: [
          {
            title: "Section 1: Environmental Objectives",
            content: "The primary objective is to achieve sustainable development while ensuring environmental protection and conservation of natural resources for future generations."
          }
        ]
      }
    }
  ];

  // Filter drafts based on search term
  const filteredDrafts = drafts.filter(draft =>
    draft.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        timestamp: new Date().toLocaleString(),
        userID: "09261468759657256208"
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="draft-container">
      {/* Header */}
      <div className="draft-header">
        <span>eConsultation ID: 09261468759657256208</span>
      </div>

      <div className="draft-main">
        {/* Sidebar */}
        <div className="draft-sidebar">
          <div className="sidebar-header">
            <h2>DRAFTS</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search drafts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="draft-list">
            {filteredDrafts.map((draft, index) => (
              <div
                key={draft.id}
                className={`draft-item ${selectedDraft === index ? 'active' : ''}`}
                onClick={() => setSelectedDraft(index)}
              >
                {draft.title}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="draft-content">
          {filteredDrafts.length > 0 && (
            <>
              <div className="content-header">
                <h1>{filteredDrafts[selectedDraft].title}</h1>
                <p>Your user ID: {filteredDrafts[selectedDraft].userID}</p>
              </div>

              {/* Amendment Details */}
              <div className="amendment-card">
                <p>{filteredDrafts[selectedDraft].content.introduction}</p>
                {filteredDrafts[selectedDraft].content.sections.map((section, index) => (
                  <div key={index}>
                    <h3>{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>

              {/* Comments Section */}
              <div className="comments-card">
                <h3>Comments ({comments.length})</h3>
                {comments.length === 0 ? (
                  <p className="no-comments">No comments yet. Be the first to add one!</p>
                ) : (
                  <div className="comments-list">
                    {comments.map(comment => (
                      <div key={comment.id} className="comment-item">
                        <p>{comment.text}</p>
                        <small>Posted by {comment.userID} on {comment.timestamp}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Comment Section */}
              <div className="add-comment-card">
                <h3>Add Your Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Enter your comment here..."
                    className="comment-textarea"
                    rows="6"
                  />
                  <button type="submit" className="submit-button">
                    Submit Comment
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Draft;
