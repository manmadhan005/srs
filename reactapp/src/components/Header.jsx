import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">🏢</div>
          <span>HR Leave Tracker</span>
        </div>
        
        <nav className="nav-links">
          <Link to="/dashboard" className="nav-link">
            <span className="nav-icon">📊</span>
            Dashboard
          </Link>
          <Link to="/add" className="nav-link">
            <span className="nav-icon">➕</span>
            Add Leave
          </Link>
          <Link to="/view" className="nav-link">
            <span className="nav-icon">👁️</span>
            View Leaves
          </Link>
          <Link to="/about" className="nav-link">
            <span className="nav-icon">ℹ️</span>
            About
          </Link>
        </nav>

        <div className="header-actions">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="user-name">Welcome, {user?.name || 'User'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;