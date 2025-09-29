import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-overlay"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">🏢</div>
              <h3>HR Leave Tracker</h3>
            </div>
            <p className="footer-description">
              Streamline your leave management process with our intuitive and powerful HR solution.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <span>📧</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/dashboard">📊 Dashboard</Link></li>
              <li><Link to="/add">➕ Add Leave</Link></li>
              <li><Link to="/view">👁️ View Leaves</Link></li>
              <li><Link to="/about">ℹ️ About</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Features</h4>
            <ul className="footer-links">
              <li><span className="feature-icon">⚡</span> Quick Requests</li>
              <li><span className="feature-icon">📈</span> Analytics</li>
              <li><span className="feature-icon">🔒</span> Secure</li>
              <li><span className="feature-icon">📱</span> Mobile Friendly</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>ponmadhan1122@gmail.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 9943244480</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Coimbatore, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 HR Leave Tracker. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;