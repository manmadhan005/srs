import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
    const [form, setForm] = useState({ username: "", password: "", confirmPassword: "", role: "employee" });
    const [loading, setLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                    role: form.role
                }),
            });

            if (response.ok) {
                setSignupSuccess(true);
            } else {
                // Correctly parse the plain text error message from the backend
                const errorText = await response.text();
                setError(errorText || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError("An error occurred during signup. Please check your network connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (signupSuccess) {
        return (
            <div className="auth-container">
                <div className="auth-form-wrapper">
                    <h2 className="auth-title">Account Created Successfully!</h2>
                    <p className="auth-switch-link">
                        You can now <Link to="/">Sign in</Link>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2 className="auth-title">Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="auth-error-new">{`Error: ${error}`}</p>}
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
