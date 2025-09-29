import React, { useState } from "react";
import "./Auth.css";

const Login = ({ close }) => {
 const [form, setForm] = useState({ email: "", password: "" });

 const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = (e) => {
  e.preventDefault();
  alert(`Login Successful: ${form.email}`);
  close();
 };

 return (
  <div className="modal-overlay">
   <div className="modal">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
     <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
     <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
     <button type="submit">Login</button>
    </form>
    <button className="close-btn" onClick={close}>✖</button>
   </div>
  </div>
 );
};

export default Login;

