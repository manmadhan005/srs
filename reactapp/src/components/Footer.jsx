import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
 return (
  <footer className="app-footer">
   <div className="footer-content">
    <h2 className="footer-logo">LeaveApp</h2>
    
    <div className="footer-links">
     <Link to="/" className="footer-link">Home</Link>
     <Link to="/dashboard" className="footer-link">Dashboard</Link>
     <Link to="/view" className="footer-link">My Leaves</Link>
     <Link to="/about" className="footer-link">About</Link>
    </div>

    <div className="footer-socials">
     <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook /></a>
     <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
     <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
    </div>

    <p className="footer-copy">
     &copy; {new Date().getFullYear()} LeaveApp. All Rights Reserved.
    </p>
   </div>
  </footer>
 );
};

export default Footer;

