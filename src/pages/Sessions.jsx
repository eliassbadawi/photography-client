import React, { useState, useEffect } from 'react';
import '../styling/Sessions.css';
import { Link } from 'react-router-dom';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/sessions`)
      .then(res => res.json())
      .then(data => setSessions(data));
  }, []);

  return (
    <div className="sessions-page">
      <div className="sessions-header">
        <h1>Photography Sessions</h1>
        <p>Real-time packages from our studio</p>
      </div>

      <div className="sessions-detail-grid">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <div className="card-top">
              <h3>{session.name}</h3>
              <p>{session.description}</p>
              <div className="Session-info">
                <span>{session.duration || '1-2 hours'}</span>
                <span className="price-tag">${session.price}</span>
              </div>
            </div>
            <div className="card-actions">
              <Link to={`/SessionDetails/${session.id}`} className="view-btn">View Details</Link>
              <Link to={`/Booking/${session.id}`} className="book-now-btn">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;