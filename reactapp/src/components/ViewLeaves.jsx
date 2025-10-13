import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllLeaves, deleteLeave } from "../services/leaveService";
import "./ViewLeaves.css";

const ViewLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setIsLoading(true);
    let allLeaves = [];
    let page = 0;
    let hasMore = true;

    try {
      while (hasMore) {
        const response = await getAllLeaves(page);
        const data = response.data.content || [];
        allLeaves = [...allLeaves, ...data];
        hasMore = !response.data.last;
        page++;
      }
      setLeaves(allLeaves);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      setLeaves([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      try {
        await deleteLeave(id);
        fetchLeaves();
      } catch (error) {
        console.error("Failed to delete leave:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="view-leaves-container blurry-background">
      <div className="view-leaves-header">
        <h1 className="view-leaves-title">All Leave Requests</h1>
        <Link to="/add-leave" className="btn-add-leave">Apply for Leave</Link>
      </div>

      {isLoading ? (
        <div className="loading-container">Fetching your leave data...</div>
      ) : leaves.length > 0 ? (
        <div className="leaves-grid">
          {leaves.map((leave) => (
            <div key={leave.id} className="leave-card">
              <div className="leave-card-header">
                <span className="leave-dates">
                  {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                </span>
                <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                  {leave.status}
                </span>
              </div>
              <div className="leave-card-body">
                <p className="leave-reason">{leave.reason}</p>
              </div>
              <div className="leave-card-footer">
                <Link to={`/update-leave/${leave.id}`} className="btn-action btn-edit">Edit</Link>
                <button onClick={() => handleDelete(leave.id)} className="btn-action btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-leaves-container">
          <h2>No Leave Requests Found</h2>
          <p>It looks like there are no leave requests to display at the moment.</p>
          <Link to="/add-leave" className="btn-add-leave">Create a New Request</Link>
        </div>
      )}
    </div>
  );
};

export default ViewLeaves;
