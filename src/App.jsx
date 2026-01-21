import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sessions from './pages/Sessions';
import SessionDetails from './pages/SessionDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState(null);

  // 1. On load, check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 2. Global login handler passed to Login/Signup components
  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // 3. Global logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* Pass user and logout to Navbar so it can show "Logout" or "Login" buttons */}
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sessions" element={<Sessions />} />
        <Route path="/SessionDetails/:sessionId" element={<SessionDetails />} />
        
        {/* Pass handleLogin as a prop so Login/Signup can update the App state */}
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/Signup" element={<Signup onLogin={handleLogin} />} />

        {/* PROTECTED ROUTES: Only accessible if logged in */}
        <Route 
          path="/Dashboard" 
          element={user ? <Dashboard user={user} /> : <Navigate to="/Login" />} 
        />
        
        {/* ADMIN ROUTE: Only accessible if role is 'admin' */}
        <Route 
          path="/AdminDashboard" 
          element={user?.role === "admin" ? <AdminDashboard user={user} /> : <Navigate to="/Login" />} 
        />

        <Route path="/Booking" element={<Booking user={user} />} />
        <Route path="/Booking/:sessionId" element={<Booking user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;