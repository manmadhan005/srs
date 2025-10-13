import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";

const Signup = () => {
 const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
 const [loading, setLoading] = useState(false);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (form.password !== form.confirmPassword) {
   alert("Passwords don't match!");
   return;
  }

  setLoading(true);
  
  setTimeout(() => {
   login({ email: form.email, name: form.name });
   navigate('/home');
   setLoading(false);
  }, 1000);
 };

 return (
  <div className="auth-container">
   <div className="auth-form-wrapper">
    <h2 className="auth-title">Create Your Account</h2>
    <form onSubmit={handleSubmit}>
     <div className="form-group">
      <label htmlFor="name">Full Name</label>
      <input
       type="text"
       id="name"
       name="name"
       placeholder="John Doe"
       value={form.name}
       onChange={handleChange}
       required
      />
     </div>
     <div className="form-group">
      <label htmlFor="email">Email Address</label>
      <input
       type="email"
       id="email"
       name="email"
       placeholder="you@example.com"
       value={form.email}
       onChange={handleChange}
       required
      />
     </div>
     <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
       type="password"
       id="password"
       name="password"
       placeholder="••••••••"
       value={form.password}
       onChange={handleChange}
       required
      />
     </div>
     <div className="form-group">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
       type="password"
       id="confirmPassword"
       name="confirmPassword"
       placeholder="••••••••"
       value={form.confirmPassword}
       onChange={handleChange}
       required
      />
     </div>
     <button type="submit" className="auth-btn" disabled={loading}>
      {loading ? "Creating Account..." : "Create Account"}
     </button>
    </form>
    <p className="auth-switch-link">
     Already have an account? <Link to="/">Sign in</Link>
    </p>
   </div>
  </div>
 );
};

export default Signup;

