import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('Booking Requests');
  const [sessions, setSessions] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Bind edit form data separately to allow editing
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
    description: '',
    duration: '',
    image_url: ''
  });

  // Bind new session form
  const [newSession, setNewSession] = useState({
    name: '',
    price: '',
    description: '',
    duration: '',
    image_url: ''
  });

  // Fetch sessions and booking requests
  const fetchInitialData = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/sessions`)
      .then(res => setSessions(res.data))
      .catch(err => console.error("Fetch sessions failed:", err));

    axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/all`)
      .then(res => setAllRequests(res.data))
      .catch(err => console.error("Fetch bookings failed:", err));
  };

  useEffect(() => {
    fetchInitialData();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to backend with admin role in headers
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/sessions/${editingId}`,
        {
          ...editFormData,
          price: Number(editFormData.price) // Ensure price is numeric
        },
        { headers: { "x-role": user.role } }
      );

      setEditingId(null); // Exit edit mode
      fetchInitialData();  // Refresh sessions
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      alert("Update failed. Check console for details.");
    }
  };


  const handleCreate = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newSession.name || !newSession.price) {
      alert("Name and Price are required");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sessions`,
        {
          ...newSession,
          price: Number(newSession.price) // Convert price to number
        },
        { headers: { "x-role": user.role } }
      );

      // Clear form after successful creation
      setNewSession({ name: '', price: '', description: '', duration: '', image_url: '' });
      fetchInitialData(); 
    } catch (err) {
      console.error("Create Error:", err.response?.data || err.message);
      alert("Create failed. Check console for details.");
    }
  };


  const handleDeleteSession = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/sessions/${id}`,
        { headers: { "x-role": user.role } }
      );
      fetchInitialData(); 
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      alert("Delete failed. Check console for details.");
    }
  };


  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bookings/${id}/status`,
        { status },
        { headers: { "x-role": user.role } }
      );
      fetchInitialData(); 
    } catch (err) {
      console.error("Booking Status Update Error:", err.response?.data || err.message);
      alert("Status update failed. Check console for details.");
    }
  };

  return (
    <div className="dash-container">
      <header className="dash-header">
        <h1>Photographer Admin</h1>
        <p>Logged in as: {user?.email}</p>
      </header>

      {/* TABS */}
      <nav className="dash-tabs">
        {['Booking Requests', 'Sessions'].map(tab => (
          <button
            key={tab}
            className={`tab-link ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="dash-section">

        {/* BOOKINGS */}
        {activeTab === 'Booking Requests' && (
          <div className="list">
            <h2>Client Requests</h2>
            {allRequests.length > 0 ? allRequests.map(req => (
              <div key={req.id} className="request-item">
                <div className="item-info">
                  <strong>{req.session_name}</strong>
                  <div className="meta-info">
                    <span> {req.user_email}</span>
                    <span> {new Date(req.booking_date).toLocaleDateString()} at {req.booking_time?.split('.')[0]}</span>
                    <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
                  </div>
                </div>

                {req.status === "Pending" && (
                  <div className="item-actions">
                    <button
                      className="dash-btn dark"
                      onClick={() => updateBookingStatus(req.id, "Approved")}
                    >
                      Accept
                    </button>
                    <button
                      className="dash-btn outline"
                      onClick={() => updateBookingStatus(req.id, "Rejected")}
                    >
                      Deny
                    </button>
                  </div>
                )}
              </div>
            )) : <p>No booking requests found.</p>}
          </div>
        )}

        {/* SESSIONS */}
        {activeTab === 'Sessions' && (
          <div className="sessions-manager">
            <h2>Add New Session</h2>
            <form onSubmit={handleCreate} className="admin-form">
              <input
                placeholder="Name"
                value={newSession.name}
                onChange={e => setNewSession({ ...newSession, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newSession.price}
                onChange={e => setNewSession({ ...newSession, price: e.target.value })}
                required
              />
              <input
                placeholder="Duration"
                value={newSession.duration}
                onChange={e => setNewSession({ ...newSession, duration: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newSession.description}
                onChange={e => setNewSession({ ...newSession, description: e.target.value })}
              ></textarea>
              <input
                placeholder="Image URL"
                value={newSession.image_url}
                onChange={e => setNewSession({ ...newSession, image_url: e.target.value })}
              />
              <button type="submit" className="dash-btn dark">Add Session</button>
            </form>
            <div className='spacer'></div>
            <h2>Existing Options</h2>
            {sessions.map(s => (
              <div key={s.id} className="booking-item">
                {editingId === s.id ? (
                  <form onSubmit={handleUpdate} className="admin-form">
                    <input
                      value={editFormData.name}
                      onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                    />
                    <input
                      type="number"
                      value={editFormData.price}
                      onChange={e => setEditFormData({ ...editFormData, price: e.target.value })}
                    />
                    <textarea
                      value={editFormData.description}
                      onChange={e => setEditFormData({ ...editFormData, description: e.target.value })}
                    ></textarea>
                    <button type="submit" className="dash-btn dark">Save</button>
                    <button type="button" className="dash-btn outline" onClick={() => setEditingId(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <div className="item-info">
                      <strong>{s.name}</strong>
                      <span>${s.price}</span>
                    </div>
                    <div className="item-actions">
                      <button
                        className="dash-btn outline"
                        onClick={() => {
                          setEditingId(s.id);
                          setEditFormData(s); // prefill form for editing
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="dash-btn outline-danger"
                        onClick={() => handleDeleteSession(s.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

      </section>
    </div>
  );
};

export default AdminDashboard;
