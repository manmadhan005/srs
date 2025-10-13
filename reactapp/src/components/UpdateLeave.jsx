import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeaveById, updateLeave } from "../services/leaveService";
import "./LeaveForm.css";

const UpdateLeave = () => {
  const [form, setForm] = useState({ reason: "", startDate: "", endDate: "", status: "" });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const { data } = await getLeaveById(id);
        setForm({
          reason: data.reason,
          startDate: new Date(data.startDate).toISOString().split("T")[0],
          endDate: new Date(data.endDate).toISOString().split("T")[0],
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching leave:", error);
      }
    };
    fetchLeave();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateLeave(id, form);
      navigate("/view-leaves"); // Corrected navigation
    } catch (error) {
      console.error("Error updating leave:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-form-container">
      <form className="leave-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Update Leave Request</h2>
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
        <div className="form-group full-width">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Updating..." : "Update Request"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLeave;
