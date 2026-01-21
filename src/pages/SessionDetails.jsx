import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/SessionDetails.css';

const SessionDetails = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/sessions`)
      .then(res => {
        const found = res.data.find(s => s.id === parseInt(sessionId));
        setSession(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <div className="container">Loading...</div>;
  if (!session) return <div className="container">Session not found. ID: {sessionId}</div>;

  return (
    <div className="details-page">
      <div className="top-nav-area">
        <Link to="/sessions" className="back-link"><i className="fa-solid fa-arrow-left"></i> Go to Sessions</Link>
      </div>
      <div className="container">
        <div className="details-image-section">
          <img src={session.image_url || 'https://via.placeholder.com/1200x800'} alt={session.name} />
        </div>
        <div className="details-info-section">
          <div className="details-card">
            <h1>{session.name}</h1>
            <p className="main-desc">{session.description}</p>
            <div className="details-meta">
              <div className="meta-item"><label>Duration</label><p>{session.duration || '1-2 hours'}</p></div>
              <div className="meta-item"><label>Price</label><p>${session.price}</p></div>
            </div>
            <Link to={`/Booking/${session.id}`} className="book-session-btn">Book This Session</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;