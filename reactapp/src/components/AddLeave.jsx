import React, { useState } from "react";
import { addLeave } from "../services/leaveService";
import "./AddLeave.css";

function AddLeave() {
 const [leave, setLeave] = useState({
  employeeName: "",
  startDate: "",
  endDate: "",
  reason: "",
  status: "Pending",
 });

 const handleChange = (e) => {
  setLeave({ ...leave, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  await addLeave(leave);
  alert("Leave added successfully ✅");
  setLeave({
   employeeName: "",
   startDate: "",
   endDate: "",
   reason: "",
   status: "Pending",
  });
 };

 return (
  <div className="add-leave-container">
   <h2 className="form-title">➕ Add Leave</h2>
   <form onSubmit={handleSubmit} className="leave-form">
    <input
     type="text"
     name="employeeName"
     placeholder="Employee Name"
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
     placeholder="Reason"
     value={leave.reason}
     onChange={handleChange}
     required
    />
    <input
     type="text"
     name="status"
     placeholder="Status"
     value={leave.status}
     onChange={handleChange}
     required
    />
    <button type="submit" className="submit-btn">
     Add Leave
    </button>
   </form>
  </div>
 );
}

export default AddLeave;

