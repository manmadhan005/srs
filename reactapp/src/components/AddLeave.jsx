import React, { useState } from "react";
import { addLeave } from "../services/leaveService";
import { useAuth } from "./AuthContext";
import "./AddLeave.css";

function AddLeave() {
  const [leave, setLeave] = useState({
    employeeName: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addLeave(leave);
      alert("Leave request submitted successfully! ✅");
      setLeave({
        employeeName: "",
        startDate: "",
        endDate: "",
        reason: "",
        status: "Pending",
      });
    } catch (error) {
      alert("Failed to submit leave request. Please try again. ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-leave-container">
      <div className="add-leave-background">
        <div className="add-leave-overlay"></div>
      </div>
      
      <div className="add-leave-content">
        <div className="form-header">
          <div className="form-icon">📝</div>
          <h2 className="form-title">Submit Leave Request</h2>
          <p className="form-subtitle">Fill out the form below to request time off</p>
        </div>

        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employeeName">
                <span className="label-icon">👤</span>
                Employee Name
              </label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                placeholder="Enter your full name"
                value={leave.employeeName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">
                <span className="label-icon">📅</span>
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">
                <span className="label-icon">📅</span>
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reason">
                <span className="label-icon">📋</span>
                Reason for Leave
              </label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Please provide the reason for your leave request..."
                value={leave.reason}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">
                <span className="label-icon">⏳</span>
                Status
              </label>
              <select
                id="status"
                name="status"
                value={leave.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Submitting...
              </>
            ) : (
              <>
                <span className="btn-icon">✅</span>
                Submit Leave Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLeave;