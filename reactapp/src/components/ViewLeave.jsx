import React, { useEffect, useState } from "react";
import { getAllLeaves, deleteLeave } from "../services/leaveService";
import { Link } from "react-router-dom";
import "./ViewLeave.css";
function ViewLeave() {
 const [leaves, setLeaves] = useState([]);
 const [loading, setLoading] = useState(false);
 const fetchLeaves = async () => {
  setLoading(true);
  try {
   const response = await getAllLeaves();
   setLeaves(response.data || []);
  } catch (error) {
   console.error("Error fetching leaves:", error);
  } finally {
   setLoading(false);
  }
 };
 useEffect(() => {
  fetchLeaves();
 }, []);
 const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this leave?")) {
   try {
    const success = await deleteLeave(id);
    if (success) {
     alert("Leave deleted successfully ✅");
     setLeaves(leaves.filter((leave) => leave.id !== id));
    }
   } catch (error) {
    console.error("Error deleting leave:", error);
    alert("Failed to delete leave ❌");
   } }};
 return (
  <div className="view-leave-container">
   <h2>Leave Records 🗂</h2>
   <button onClick={fetchLeaves} className="refresh-btn">
    🔄 Refresh
   </button>
   {loading ? (
    <div className="loader"></div>
   ) : (
    <table>
     <thead>
      <tr>
       <th>ID</th>
       <th>Employee</th>
       <th>StartDate</th>
       <th>EndDate</th>
       <th>Reason</th>
       <th>Status</th>
       <th>Actions</th>
      </tr>
     </thead>
     <tbody>
      {leaves.length === 0 ? null : leaves.map((leave) => (
       <tr key={leave.id}>
        <td>{leave.id}</td>
        <td>{leave.employeeName}</td>
        <td>{leave.startDate}</td>
        <td>{leave.endDate}</td>
        <td>{leave.reason}</td>
        <td>{leave.status}</td>
        <td>
         <Link to={`/update/${leave.id}`} className="update-btn">
          Update
         </Link>
         <button
          onClick={() => handleDelete(leave.id)}
          className="delete-btn"
         >
          Delete
         </button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   )}
  </div>
 );}
export default ViewLeave;

