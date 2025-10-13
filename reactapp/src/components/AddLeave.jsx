import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLeave } from "../services/leaveService";
import "./LeaveForm.css";

const AddLeave = () => {
 const [form, setForm] = useState({ employeeName: "", reason: "", startDate: "", endDate: "" });
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const newLeave = { ...form, status: "Pending" };
  try {
   await addLeave(newLeave);
   navigate("/view");
  } catch (error) {
   console.error("Error adding leave:", error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="leave-form-container">
   <form className="leave-form" onSubmit={handleSubmit}>
    <h2 className="form-title">Apply for Leave</h2>
    <div className="form-group full-width">
     <label htmlFor="employeeName">Employee Name</label>
     <input
      type="text"
      id="employeeName"
      name="employeeName"
      value={form.employeeName}
      onChange={handleChange}
      placeholder="Enter your name"
      required
     />
    </div>
    <div className="form-group full-width">
     <label htmlFor="reason">Reason for Leave</label>
     <textarea
      id="reason"
      name="reason"
      value={form.reason}
      onChange={handleChange}
      placeholder="e.g., Family vacation, Personal appointment"
      required
     />
    </div>
    <div className="form-grid">
     <div className="form-group">
      <label htmlFor="startDate">Start Date</label>
      <input
       type="date"
       id="startDate"
       name="startDate"
       value={form.startDate}
       onChange={handleChange}
       required
      />
     </div>
     <div className="form-group">
      <label htmlFor="endDate">End Date</label>
      <input
       type="date"
       id="endDate"
       name="endDate"
       value={form.endDate}
       onChange={handleChange}
       required
      />
     </div>
    </div>
    <button type="submit" className="btn-submit" disabled={loading}>
     {loading ? "Submitting..." : "Submit Request"}
    </button>
   </form>
  </div>
 );
};

export default AddLeave;

