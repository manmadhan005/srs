import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaDoorOpen, FaUserCircle, FaBuilding, FaBell } from 'react-icons/fa';
import './Header.css';

const Header = () => {
 const { user, logout, isAdmin } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
  logout();
  navigate('/login');
 };

 return (
  <header className="app-header">
   <NavLink to="/" className="logo-container">
    <div className="logo-icon"><FaBuilding /></div>
    <h1 className="logo-text">LeaveApp</h1>
   </NavLink>

   <nav className="main-nav">
    <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
    {isAdmin() ? (
     <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin Dashboard</NavLink>
    ) : (
     <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
    )}
    <NavLink to="/view" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Leaves</NavLink>
    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
   </nav>

   <div className="auth-section">
    {user ? (
     <>
      <NavLink to="/notifications" className="nav-link">
       <FaBell />
      </NavLink>
      <span style={{ marginRight: '15px' }}>Welcome, {user.name} ({user.role})</span>
      <button onClick={handleLogout} className="auth-button logout">
       <FaDoorOpen style={{ marginRight: '5px' }} />
       Logout
      </button>
     </>
    ) : (
     <NavLink to="/login" className="auth-button">
      <FaUserCircle style={{ marginRight: '5px' }} />
      Login
     </NavLink>
    )}
   </div>
  </header>
 );
};

export default Header;

