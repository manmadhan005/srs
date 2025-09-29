import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllLeaves, updateLeave } from "../services/leaveService";
import "./UpdateLeave.css";

function UpdateLeave() {
  const { id } = useParams();
  const navigate = useNavigate(); // for redirect after update
  const [leave, setLeave] = useState({
    employeeName: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLeaves();
        const found = response.data.find((l) => String(l.id) === String(id));
        if (found) setLeave(found);
      } catch (err) {
        console.error("Failed to fetch leave:", err);
        alert("Failed to fetch leave data ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateLeave(id, leave);
      console.log("Updated leave:", response.data);
      alert("Leave updated successfully ✅");
      navigate("/view"); // redirect to leave list after update
    } catch (err) {
      console.error("Failed to update leave:", err);
      alert("Failed to update leave ❌");
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <div className="update-leave-container">
      <h2>Update Leave</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeName"
          value={leave.employeeName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={leave.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={leave.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          value={leave.reason}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="status"
          value={leave.status}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Leave</button>
      </form>
    </div>
  );
}

export default UpdateLeave;