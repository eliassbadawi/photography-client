import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/Auth.css';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Connects to your backend signup route
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      onLogin(data.user); // Updates App.jsx state
      navigate(data.user.role === 'admin' ? '/AdminDashboard' : '/');
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">PhotoBook</div>
        <h2>Create Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="email@example.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label>I am a...</label>
            <select 
              className="input-group input" 
              style={{ width: '100%', backgroundColor: 'white' }}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="user">Client (Booking Sessions)</option>
              <option value="admin">Photographer (Admin Panel)</option>
            </select>
          </div>
          <button type="submit" className="auth-btn">Create Account</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;