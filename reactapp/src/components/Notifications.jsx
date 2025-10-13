import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notifications = () => {
 const [notifications, setNotifications] = useState([]);

 useEffect(() => {
  const fetchNotifications = async () => {
   try {
    const response = await axios.get('/notifications');
    setNotifications(response.data);
   } catch (error) {
    console.error('Error fetching notifications:', error);
   }
  };

  fetchNotifications();
 }, []);

 return (
  <div className="notifications-container">
   <h1 className="notifications-title">Notifications</h1>
   {notifications.length > 0 ? (
    <ul className="notifications-list">
     {notifications.map((notification) => (
      <li key={notification.id} className="notification-item">
       <p className="notification-message">{notification.message}</p>
       <span className="notification-date">
        {new Date(notification.date).toLocaleString()}
       </span>
      </li>
     ))}
    </ul>
   ) : (
    <p className="no-notifications">No new notifications.</p>
   )}
  </div>
 );
};

export default Notifications;
