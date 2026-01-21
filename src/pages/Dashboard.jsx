import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import '../styling/Dashboard.css';

const Dashboard = ({ user }) => {
  const [weather, setWeather] = useState(null);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    axios.get("https://api.open-meteo.com/v1/forecast?latitude=31.9552&longitude=35.945&current=temperature_2m")
      .then((res) => setWeather(res.data.current))
      .catch((err) => console.error("Weather failed:", err));

    //Fetch Bookings from Backend 
    axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/user/${user.email}`)
      .then(res => {
        setMyBookings(res.data);
      })
      .catch(err => console.error("Booking fetch failed:", err));
  }, [user.email]);

  return (
    <div className="dash-container">
      <div className="dash-header">
        <div className="header-text">
          <h1>My Dashboard</h1>
          <p>Welcome back, {user.email}! Here is your schedule.</p>
        </div>
        {weather && (
          <div className="weather-pill">
            <i className={weather.temperature_2m > 15 ? "fa-solid fa-sun" : "fa-solid fa-cloud"}></i>
            <div className="weather-data">
              <strong>{weather.temperature_2m}°C</strong>
              <span>Amman Sky</span>
            </div>
          </div>
        )}
      </div>

      <div className="dash-section">
        <div className="section-header">
          <h2>Upcoming Bookings</h2>
          <Link to="/sessions" className="dash-btn dark">Browse Sessions</Link>
        </div>
        
        <div className="bookings-list">
          {myBookings.length > 0 ? myBookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <div className="item-info">
                <strong>{booking.name}</strong>
                {/* Note: booking_date comes from the SQL CURRENT_DATE */}
                <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
              </div>
              <div className="item-actions">
                <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                <Link to={`/SessionDetails/${booking.session_id}`} className="dash-btn outline">View Details</Link>
              </div>
            </div>
          )) : <p>No bookings found. Start by browsing sessions!</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;