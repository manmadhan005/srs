import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import { useAuth } from "./AuthContext";
import "./Auth.css";
import "./Erase.css";

const Login = () => {
 const [form, setForm] = useState({ username: "", password: "" });
 const [loading, setLoading] = useState(false);
 const [isExiting, setIsExiting] = useState(false);
 const [error, setError] = useState("");
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const response = await fetch("https://8080-bdecbfeafecccdbcbeeaefdcadcfebaceabaa.premiumproject.examly.io/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setIsExiting(true);
            setTimeout(() => {
                login({
                    name: form.username,
                    role: data.role
                });
                navigate("/");
            }, 1000);
        } else {
            const errorText = await response.text();
            setError(errorText || "Invalid credentials. Please try again.");
            setLoading(false);
        }
    } catch (error) {
        setError("An error occurred during login. Please try again.");
        setLoading(false);
    }
 };

 return (
 <div className={`auth-container ${isExiting ? 'slide-out-top' : ''}`}>
  <div className="auth-animation-container">
  <Spline scene="https://prod.spline.design/DQgIFhDmeF2vxO1m/scene.splinecode" />
  </div>
  <div className="auth-form-wrapper">
  <h2 className="auth-title">Welcome Back!</h2>
  <form onSubmit={handleSubmit}>
    {error && <p className="auth-error">{error}</p>}
   <div className="form-group">
   <label htmlFor="username">Username</label>
   <input
    type="text"
    id="username"
    name="username"
    placeholder="your_username"
    value={form.username}
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