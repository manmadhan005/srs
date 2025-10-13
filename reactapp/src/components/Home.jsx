import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaPlusCircle, FaHistory } from 'react-icons/fa';
import "./Home.css";

const Home = () => {
 return (
  <div className="home-container">
   <header className="home-hero">
    <div className="hero-content">
     <h1 className="hero-title">Leave Management Made Easy</h1>
     <p className="hero-subtitle">
      A streamlined solution for requesting, tracking, and managing your leave.
     </p>
    </div>
    <div className="hero-image-container">
     <img src="/hr.png" alt="HR" className="hero-image" />
    </div>
   </header>

   <main className="home-main">
    <div className="features-grid">
     <div className="feature-card">
      <div className="feature-icon"><FaPlusCircle /></div>
      <h2 className="feature-title">Request Leave</h2>
      <p className="feature-description">
       Quickly submit new leave requests with our simple and intuitive form.
      </p>
      <Link to="/add" className="primary-cta">New Request</Link>
     </div>

     <div className="feature-card">
      <div className="feature-icon"><FaHistory /></div>
      <h2 className="feature-title">View History</h2>
      <p className="feature-description">
       Access your complete leave history and check the status of your requests.
      </p>
      <Link to="/view" className="primary-cta">My Leaves</Link>
     </div>

     <div className="feature-card">
      <div className="feature-icon"><FaCalendarAlt /></div>
      <h2 className="feature-title">Dashboard</h2>
      <p className="feature-description">
       Get a clear overview of your leave balance and upcoming time off.
      </p>
      <Link to="/dashboard" className="primary-cta">My Dashboard</Link>
     </div>
    </div>
   </main>
  </div>
 );
};

export default Home;
