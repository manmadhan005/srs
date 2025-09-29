import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div
      className="home-container"
      style={{
    //backgroundImage: "url('/hr.png')",
    //backgroundSize: "20%",    
    //backgroundRepeat: "no-repeat",
    //backgroundPosition: "middle",
    //minHeight: "100vh",
    //width: "95%",
  }}
    >
      {/* Top-right login/signup */}
      <div className="auth-buttons">
        <button
          className="btn btn-outline"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className="btn btn-outline"
          onClick={() => setShowSignup(true)}
        >
          Sign Up
        </button>
      </div>

      {/* Hero Section */}
      <div className="hero-content">
        <h1 className="hero-title">HR LEAVE TRACKER📋</h1>
        <p><i>Manage employee leave requests efficiently and easily.</i></p>

        <div className="home-buttons">
          <Link to="/add" className="btn btn-primary">
            Add Leave ➕
          </Link>
          <Link to="/view" className="btn btn-secondary">
            View Leaves 👀
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Easy Request</h3>
          <p><i>Submit leave requests in just a few clicks</i></p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⏱️</div>
          <h3>Quick Approval</h3>
          <p><i>Managers can review and approve requests faster</i></p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Track History</h3>
          <p><i>Maintain complete records of all leave transactions</i></p>
        </div>
      </div>


      {/* Stats */}
      <div className="stats">
        <div className="stat">
          <span className="stat-number">125+</span>
          <span className="stat-label"><i>Leaves Processed</i></span>
        </div>
        <div className="stat">
          <span className="stat-number">95%</span>
          <span className="stat-label"><i>Satisfaction Rate</i></span>
        </div>
        <div className="stat">
          <span className="stat-number">50+</span>
          <span className="stat-label">A<i>vailability</i></span>
        </div>
      </div>

      {/* Popup Modals */}
      {showLogin && <Login close={() => setShowLogin(false)} />}
      {showSignup && <Signup close={() => setShowSignup(false)} />}
    </div>
  );
};

export default Home;
