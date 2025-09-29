import React, { useEffect, useState } from "react";
import { getAllLeaves, deleteLeave } from "../services/leaveService";
import { Link } from "react-router-dom";
import "./ViewLeave.css";

function ViewLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

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
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      try {
        const success = await deleteLeave(id);
        if (success) {
          alert("Leave request deleted successfully ✅");
          setLeaves(leaves.filter((leave) => leave.id !== id));
        }
      } catch (error) {
        console.error("Error deleting leave:", error);
        alert("Failed to delete leave request ❌");
      }
    }
  };

  const filteredLeaves = filter === "All" 
    ? leaves 
    : leaves.filter(leave => leave.status === filter);

  const getStatusBadge = (status) => {
    const statusClasses = {
      Pending: "status-pending",
      Approved: "status-approved",
      Rejected: "status-rejected"
    };
    
    const statusIcons = {
      Pending: "⏳",
      Approved: "✅",
      Rejected: "❌"
    };

    return (
      <span className={`status-badge ${statusClasses[status] || ''}`}>
        <span className="status-icon">{statusIcons[status] || '❓'}</span>
        {status}
      </span>
    );
  };

  return (
    <div className="view-leave-container">
      <div className="view-leave-background">
        <div className="view-leave-overlay"></div>
      </div>
      
      <div className="view-leave-content">
        <div className="page-header">
          <div className="header-content">
            <div className="page-title-section">
              <div className="page-icon">📋</div>
              <div>
                <h2 className="page-title">Leave Records</h2>
                <p className="page-subtitle">Manage and track all leave requests</p>
              </div>
            </div>
            
            <div className="header-actions">
              <button onClick={fetchLeaves} className="refresh-btn" disabled={loading}>
                <span className="btn-icon">🔄</span>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              
              <Link to="/add" className="add-btn">
                <span className="btn-icon">➕</span>
                New Request
              </Link>
            </div>
          </div>
          
          <div className="filter-section">
            <div className="filter-label">Filter by status:</div>
            <div className="filter-buttons">
              {["All", "Pending", "Approved", "Rejected"].map(status => (
                <button
                  key={status}
                  className={`filter-btn ${filter === status ? 'active' : ''}`}
                  onClick={() => setFilter(status)}
                >
                  {status === "All" ? "📊" : 
                   status === "Pending" ? "⏳" :
                   status === "Approved" ? "✅" : "❌"}
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading leave records...</p>
          </div>
        ) : filteredLeaves.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Leave Records Found</h3>
            <p>
              {filter === "All" 
                ? "No leave requests have been submitted yet." 
                : `No ${filter.toLowerCase()} leave requests found.`}
            </p>
            <Link to="/add" className="empty-action-btn">
              <span className="btn-icon">➕</span>
              Submit Your First Request
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <div className="table-wrapper">
              <table className="leaves-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Duration</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave, index) => {
                    const startDate = new Date(leave.startDate);
                    const endDate = new Date(leave.endDate);
                    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                    
                    return (
                      <tr key={leave.id} className="table-row" style={{animationDelay: `${index * 0.1}s`}}>
                        <td className="id-cell">#{leave.id}</td>
                        <td className="employee-cell">
                          <div className="employee-info">
                            <div className="employee-avatar">
                              {leave.employeeName?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="employee-name">{leave.employeeName}</span>
                          </div>
                        </td>
                        <td className="date-cell">{leave.startDate}</td>
                        <td className="date-cell">{leave.endDate}</td>
                        <td className="duration-cell">
                          <span className="duration-badge">{duration} day{duration !== 1 ? 's' : ''}</span>
                        </td>
                        <td className="reason-cell">
                          <div className="reason-text" title={leave.reason}>
                            {leave.reason}
                          </div>
                        </td>
                        <td className="status-cell">
                          {getStatusBadge(leave.status)}
                        </td>
                        <td className="actions-cell">
                          <div className="action-buttons">
                            <Link 
                              to={`/update/${leave.id}`} 
                              className="action-btn update-btn"
                              title="Edit leave request"
                            >
                              <span className="btn-icon">✏️</span>
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(leave.id)}
                              className="action-btn delete-btn"
                              title="Delete leave request"
                            >
                              <span className="btn-icon">🗑️</span>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="table-footer">
              <div className="results-info">
                Showing {filteredLeaves.length} of {leaves.length} leave requests
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewLeave;