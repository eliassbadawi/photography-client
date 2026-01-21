import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/Booking.css';

const BookingPage = ({ user }) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState(null);
  const [bookingData, setBookingData] = useState({ date: '', time: '' });
  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:30', '16:00'];

  useEffect(() => {
    axios.get("http://localhost:5000/api/sessions")
      .then(res => {
        const found = res.data.find(s => s.id === parseInt(sessionId));
        setSelectedSession(found);
      })
      .catch(err => console.error("Session load error:", err));
  }, [sessionId]);

  const handleConfirm = async () => {
    if (!user) return navigate("/login");
    if (!bookingData.date || !bookingData.time) return alert("Select date and time");

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        email: user.email,
        session_id: sessionId,
        date: bookingData.date,
        time: bookingData.time
      });
      alert("Booking confirmed!");
      navigate("/"); // Landing home as requested
    } catch { alert("Booking failed"); }
  };

  return (
    <div className="booking-wrapper">
      <header className="booking-header"><h1>Confirm {selectedSession?.name}</h1></header>
      <div className="booking-container">
        <div className="booking-form-area">
          <div className="booking-section">
            <h3>Select Date</h3>
            <input type="date" className="native-date-input" min={new Date().toISOString().split("T")[0]} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} />
          </div>
          <div className="booking-section">
            <h3>Select Time</h3>
            <div className="time-button-grid">
              {timeSlots.map((slot) => (
                <button key={slot} className={`time-choice-btn ${bookingData.time === slot ? 'selected' : ''}`} onClick={() => setBookingData({...bookingData, time: slot})}>{slot}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="booking-summary-sidebar">
          <div className="summary-box">
            <h2>Booking Summary</h2>
            <div className="summary-line"><span>Package:</span><strong>{selectedSession?.name || 'Loading...'}</strong></div>
            {/* PRICE DISPLAY RE-ADDED BELOW */}
            <div className="summary-line"><span>Price:</span><strong className="price-tag">${selectedSession?.price || '0'}</strong></div>
            <div className="summary-line"><span>Date:</span><strong>{bookingData.date || 'Not selected'}</strong></div>
            <div className="summary-line"><span>Time:</span><strong>{bookingData.time || 'Not selected'}</strong></div>
            <hr />
            <button className="confirm-booking-btn" onClick={handleConfirm}>Confirm Booking</button>
            <Link to="/sessions" className="cancel-link">Back to Sessions</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;