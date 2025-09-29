import React, { useEffect, useState } from "react";
import { getAllLeaves } from "../services/leaveService";
import "./Dashboard.css";

const Dashboard = () => {
 const [leaves, setLeaves] = useState([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  fetchLeaves();
 }, []);

 const fetchLeaves = async () => {
  try {
   setIsLoading(true);
   const response = await getAllLeaves();
   setLeaves(response.data);
  } catch (error) {
   console.error("Error fetching leaves:", error);
  } finally {
   setIsLoading(false);
  }
 };

 const total = leaves.length;
 const pending = leaves.filter((l) => l.status === "Pending").length;
 const approved = leaves.filter((l) => l.status === "Approved").length;
 const rejected = leaves.filter((l) => l.status === "Rejected").length;
 
 const pendingPercentage = total > 0 ? Math.round((pending / total) * 100) : 0;
 const approvedPercentage = total > 0 ? Math.round((approved / total) * 100) : 0;
 const rejectedPercentage = total > 0 ? Math.round((rejected / total) * 100) : 0;

 return (
  <div className="dashboard-container">
   <h2 className="dashboard-title">Leave Management Dashboard</h2>
   
   
   
   {isLoading ? (
    <div className="loading-container">
     <div className="loading-spinner"></div>
     <p>Loading leave data...</p>
    </div>
   ) : (
    <>
     <div className="cards">
      <div className="card total animate-card">
       <div className="card-icon">📊</div>
       <div className="card-content">
        <h3>Total Leaves</h3>
        <span className="card-value">{total}</span>
       </div>
      </div>
      
  
      
      <div className="card pending animate-card">
       <div className="card-icon">⏳</div>
       <div className="card-content">
        <h3>Pending</h3>
        <span className="card-value">{pending}</span>
        <div className="card-percentage">{pendingPercentage}%</div>
       </div>
      </div>
      
      <div className="card approved animate-card">
       <div className="card-icon">✅</div>
       <div className="card-content">
        <h3>Approved</h3>
        <span className="card-value">{approved}</span>
        <div className="card-percentage">{approvedPercentage}%</div>
       </div>
      </div>
      
      <div className="card rejected animate-card">
       <div className="card-icon">❌</div>
       <div className="card-content">
        <h3>Rejected</h3>
        <span className="card-value">{rejected}</span>
        <div className="card-percentage">{rejectedPercentage}%</div>
       </div>
      </div>
     </div>
     
     <div className="dashboard-summary">
      <h3>Leave Status Distribution</h3>
      <div className="progress-bars">
       <div className="progress-bar">
        <div className="progress-label">
         <span>Pending ⏳</span>
         <span>{pending} ({pendingPercentage}%)</span>
        </div>
        <div className="progress-track">
         <div 
          className="progress-fill pending-fill" 
          style={{ width: `${pendingPercentage}%` }}
         ></div>
        </div>
       </div>
       
       <div className="progress-bar">
        <div className="progress-label">
         <span>Approved ✅</span>
         <span>{approved} ({approvedPercentage}%)</span>
        </div>
        <div className="progress-track">
         <div 
          className="progress-fill approved-fill" 
          style={{ width: `${approvedPercentage}%` }}
         ></div>
        </div>
       </div>
       
       
       
       <div className="progress-bar">
        <div className="progress-label">
         <span>Rejected ❌</span>
         <span>{rejected} ({rejectedPercentage}%)</span>
        </div>
        <div className="progress-track">
         <div 
          className="progress-fill rejected-fill" 
          style={{ width: `${rejectedPercentage}%` }}
         ></div>
        </div>
       </div>
      </div>
     </div>
     
     <button className="refresh-btn" onClick={fetchLeaves}>
      ↻ Refresh Data
     </button>
    </>
   )}
  </div>
 );
};

export default Dashboard;
