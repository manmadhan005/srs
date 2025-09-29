import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllLeaves } from "../services/leaveService";
import { useAuth } from "./AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

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
      <div className="dashboard-background">
        <div className="dashboard-overlay"></div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1 className="dashboard-title">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="dashboard-subtitle">
              Here's your leave management overview
            </p>
          </div>
          
          <div className="quick-actions">
            <Link to="/add" className="quick-action-btn primary">
              <span className="action-icon">➕</span>
              New Leave Request
            </Link>
            <Link to="/view" className="quick-action-btn secondary">
              <span className="action-icon">📋</span>
              View All Leaves
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>Total Requests</h3>
                  <div className="stat-value">{total}</div>
                  <div className="stat-label">All time</div>
                </div>
              </div>
              
              <div className="stat-card pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>Pending</h3>
                  <div className="stat-value">{pending}</div>
                  <div className="stat-percentage">{pendingPercentage}%</div>
                </div>
              </div>
              
              <div className="stat-card approved">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>Approved</h3>
                  <div className="stat-value">{approved}</div>
                  <div className="stat-percentage">{approvedPercentage}%</div>
                </div>
              </div>
              
              <div className="stat-card rejected">
                <div className="stat-icon">❌</div>
                <div className="stat-content">
                  <h3>Rejected</h3>
                  <div className="stat-value">{rejected}</div>
                  <div className="stat-percentage">{rejectedPercentage}%</div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-sections">
              <div className="section-card">
                <h3 className="section-title">
                  <span className="section-icon">📈</span>
                  Leave Status Overview
                </h3>
                <div className="progress-bars">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span className="progress-label">Pending Requests</span>
                      <span className="progress-value">{pending} ({pendingPercentage}%)</span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-fill pending-fill" 
                        style={{ width: `${pendingPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="progress-item">
                    <div className="progress-header">
                      <span className="progress-label">Approved Requests</span>
                      <span className="progress-value">{approved} ({approvedPercentage}%)</span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-fill approved-fill" 
                        style={{ width: `${approvedPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="progress-item">
                    <div className="progress-header">
                      <span className="progress-label">Rejected Requests</span>
                      <span className="progress-value">{rejected} ({rejectedPercentage}%)</span>
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

              <div className="section-card">
                <h3 className="section-title">
                  <span className="section-icon">🚀</span>
                  Quick Actions
                </h3>
                <div className="action-grid">
                  <Link to="/add" className="action-card">
                    <div className="action-icon">📝</div>
                    <h4>Submit Leave</h4>
                    <p>Request new leave application</p>
                  </Link>
                  
                  <Link to="/view" className="action-card">
                    <div className="action-icon">👀</div>
                    <h4>View History</h4>
                    <p>Check all leave records</p>
                  </Link>
                  
                  <button onClick={fetchLeaves} className="action-card">
                    <div className="action-icon">🔄</div>
                    <h4>Refresh Data</h4>
                    <p>Update dashboard info</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;