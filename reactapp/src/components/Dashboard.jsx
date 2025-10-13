import React, { useState, useEffect } from 'react';
import { getAllLeaves } from '../services/leaveService';
import { FaCalendarAlt, FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import './Dashboard.css';

const Dashboard = () => {
 const { user } = useAuth();
 const [stats, setStats] = useState({
 total: 0,
 approved: 0,
 pending: 0,
 rejected: 0,
 });
 const [allLeaves, setAllLeaves] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchAllLeaves = async () => {
        setLoading(true);
        try {
            let leaves = [];
            let currentPage = 0;
            let totalPages = 1;

            while (currentPage < totalPages) {
                const { data } = await getAllLeaves(currentPage);
                if (data.content) {
                    leaves = leaves.concat(data.content);
                }
                totalPages = data.totalPages;
                currentPage++;
            }
            
            const total = leaves.length;
            const approved = leaves.filter(leave => leave.status === 'Approved').length;
            const pending = leaves.filter(leave => leave.status === 'Pending').length;
            const rejected = leaves.filter(leave => leave.status === 'Rejected').length;
            
            setStats({ total, approved, pending, rejected });

            const sortedLeaves = leaves.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            
            setAllLeaves(sortedLeaves);

        } catch (error) {
            console.error("Error fetching leaves:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchAllLeaves();
 }, []);

 if (loading) {
 return <div className="loading-message">Loading your dashboard...</div>;
 }

 return (
 <div className="dashboard-container blurry-background">
  <ul className="background">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
 </ul>
 <div className="dashboard-header">
 <h2 className="dashboard-title">{user ? `${user.username}'s Leave Dashboard` : 'Your Leave Dashboard'}</h2>
 <p className="dashboard-subtitle">A summary of your leave activity.</p>
 </div>

 <div className="stats-grid">
 <div className="stat-card">
  <div className="stat-icon total"><FaCalendarAlt /></div>
  <div className="stat-info">
  <h3>Total Leaves</h3>
  <p>{stats.total}</p>
  </div>
 </div>
 <div className="stat-card">
  <div className="stat-icon approved"><FaCheckCircle /></div>
  <div className="stat-info">
  <h3>Approved</h3>
  <p>{stats.approved}</p>
  </div>
 </div>

 <div className="stat-card">
  <div className="stat-icon pending"><FaExclamationCircle /></div>
  <div className="stat-info">
  <h3>Pending</h3>
  <p>{stats.pending}</p>
  </div>
 </div>
 <div className="stat-card">
  <div className="stat-icon rejected"><FaTimesCircle /></div>
  <div className="stat-info">
  <h3>Rejected</h3>
  <p>{stats.rejected}</p>
  </div>
 </div>
 </div>
{allLeaves.length > 0 && (
 <div className="upcoming-leaves">
  <h3 className="upcoming-leaves-title">All Leaves</h3>
  <ul className="leaves-list">
  {allLeaves.map(leave => (
  <li key={leave.id} className="leave-item">
  <div className="leave-details">
   <p className="leave-employee-name">{leave.employeeName}</p>
   <p className="leave-reason">{leave.reason}</p>
   <p className="leave-dates">
   {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
   </p>
  </div>
  <span className={`leave-status status-${leave.status.toLowerCase()}`}>
   {leave.status}
  </span>
  </li>
  ))}
  </ul>
 </div>
 )}
 </div>
 );
};

export default Dashboard;
