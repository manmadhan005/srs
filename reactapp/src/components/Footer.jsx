import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
 return (
  <footer className="footer">
   <div className="footer-top">
    {/* About */}
    <div className="footer-section">
     <h3><b>HR Leave Tracker 👥📅 </b></h3>
     <p>
      <i>Smart, simple, and reliable leave management for HR and employees.</i>
     </p>
    </div>

    {/* Quick Links */}
    <div className="footer-section">
     <h3><b>Quick Links 🔗</b></h3>
     <ul>
      <li><Link to="/">Home 🏠 </Link></li>
      <li><Link to="/add">Add Leave ✅</Link></li>
      <li><Link to="/view">View Leaves 👁️</Link></li>
      <li><Link to="/about">About ℹ️</Link></li>
      <li><Link to="/dashboard">Dashboard 📊</Link></li>
      <li><Link to="/contact">Contact 👥</Link></li>
     </ul>
    </div>

    {/* Contact */}
    <div className="footer-section">
     <h3><b>Contact Us</b></h3>
     <p>✉️ ponmadhan1122@gmail.com</p>
     <p>📞 +91 9943244480</p>
     <p>📍 Coimbatore, India</p>
    </div>
   </div>

   {/* Bottom */}
   <div className="footer-bottom">
    <p>© 2025 HR Leave Tracker | All Rights Reserved</p>
   </div>
  </footer>
 );
};

export default Footer;

