import { Link } from "react-router-dom";
import '../styling/Navbar.css'; 

const Navbar = ({ user, onLogout }) => (
  <nav>
    <div className="nav-left">
      <Link to="/" className="logo">PhotoBook</Link>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/sessions" className="nav-link">Sessions</Link>

      {user && (
        <Link 
          to={user.role === "admin" ? "/AdminDashboard" : "/Dashboard"} 
          className="nav-link"
        >
          {user.role === "admin" ? "Admin Panel" : "My Bookings"}
        </Link>
      )}
    </div>

    <div className="nav-right">
      {!user ? (
        <Link to="/login" className="login-btn">Login</Link>
      ) : (
        <button onClick={onLogout} className="logout-btn">Logout</button>
      )}
    </div>
  </nav>
);

export default Navbar;