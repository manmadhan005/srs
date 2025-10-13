import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import { useAuth } from "./AuthContext";
import "./Auth.css";
import "./Erase.css";

const Login = () => {
 const [form, setForm] = useState({ email: "", password: "", role: "employee" });
 const [loading, setLoading] = useState(false);
 const [isExiting, setIsExiting] = useState(false);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 setIsExiting(true);

 setTimeout(() => {
  login({
  email: form.email,
  name: form.email.split('@')[0],
  role: form.role
  });
  navigate('/');
 }, 1000); // Corresponds to animation duration
 };

 return (
 <div className={`auth-container ${isExiting ? 'slide-out-top' : ''}`}>
  <div className="auth-animation-container">
  <Spline scene="https://prod.spline.design/DQgIFhDmeF2vxO1m/scene.splinecode" />
  </div>
  <div className="auth-form-wrapper">
  <h2 className="auth-title">Welcome Back!</h2>
  <form onSubmit={handleSubmit}>
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
   <label htmlFor="role">Role</label>
   <select
    id="role"
    name="role"
    value={form.role}
    onChange={handleChange}
   >
    <option value="employee">Employee</option>
    <option value="admin">Admin</option>
   </select>
   </div>
   <button type="submit" className="auth-btn" disabled={loading}>
   {loading ? "Signing In..." : "Sign In"}
   </button>
  </form>
  <p className="auth-switch-link">
   Don't have an account? <Link to="/signup">Sign up</Link>
  </p>
  </div>
 </div>
 );
};

export default Login;

