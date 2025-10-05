import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About HR Leave Tracker</h1>
        <p className="about-subtitle">A streamlined solution for managing employee leave requests.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2 className="section-title">Key Features</h2>
          <ul className="features-list">
            <li>
              <strong>Dashboard:</strong> A comprehensive overview of leave statistics, including total, approved, and rejected leaves.
            </li>
            <li>
              <strong>Leave Management:</strong> Easily add, view, update, and delete leave requests with an intuitive interface.
            </li>
            <li>
              <strong>User Authentication:</strong> Secure login and signup functionality to protect user data.
            </li>
            <li>
              <strong>Modern UI:</strong> A clean and modern user interface for a seamless user experience.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-item"><strong>Frontend:</strong> React.js</div>
            <div className="tech-item"><strong>Backend:</strong> Spring Boot</div>
            <div className="tech-item"><strong>Database:</strong> MySQL</div>
            <div className="tech-item"><strong>API:</strong> RESTful APIs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
