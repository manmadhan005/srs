import React, { useState, useEffect } from 'react';
import { getAllLeaves, approveLeave, rejectLeave } from '../services/leaveService';
import './AdminDashboard.css';

const AdminDashboard = () => {
 const [leaveRequests, setLeaveRequests] = useState([]);
 const [currentPage, setCurrentPage] = useState(0);
 const [totalPages, setTotalPages] = useState(0);

 useEffect(() => {
  fetchLeaveRequests(currentPage);
 }, [currentPage]);

 const fetchLeaveRequests = async (page) => {
  try {
   const response = await getAllLeaves(page);
   setLeaveRequests(response.data.content);
   setTotalPages(response.data.totalPages);
  } catch (error) {
   console.error('Error fetching leave requests:', error);
  }
 };

 const handleApprove = async (id) => {
  try {
   await approveLeave(id);
   fetchLeaveRequests(currentPage);
  } catch (error) {
   console.error('Error approving leave request:', error);
  }
 };

 const handleReject = async (id) => {
  try {
   await rejectLeave(id);
   fetchLeaveRequests(currentPage);
  } catch (error) {
   console.error('Error rejecting leave request:', error);
  }
 };

 const handlePageChange = (page) => {
  setCurrentPage(page);
 };

 return (
  <div className="admin-dashboard">
   <h2>Admin Dashboard</h2>
   <div className="leave-requests">
    <h3>Leave Requests</h3>
    <table>
     <thead>
      <tr>
       <th>ID</th>
       <th>Employee</th>
       <th>From</th>
       <th>To</th>
       <th>Status</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {leaveRequests.map(request => (
       <tr key={request.id}>
        <td>{request.id}</td>
        <td>{request.employeeName}</td>
        <td>{request.startDate}</td>
        <td>{request.endDate}</td>
        <td>{request.status}</td>
        <td>
         {request.status === 'Pending' && (
          <>
           <button className="approve" onClick={() => handleApprove(request.id)}>Approve</button>
           <button className="reject" onClick={() => handleReject(request.id)}>Reject</button>
          </>
         )}
        </td>
       </tr>
      ))}
     </tbody>
    </table>
    <div className="pagination">
     {Array.from({ length: totalPages }, (_, i) => i).map(page => (
      <button
       key={page}
       onClick={() => handlePageChange(page)}
       className={currentPage === page ? 'active' : ''}
      >
       {page + 1}
      </button>
     ))}
    </div>
   </div>
  </div>
 );
};

export default AdminDashboard;

