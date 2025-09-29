import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import "./Header.css";

const Header = () => {
 const { darkMode, toggleTheme } = useTheme();

 return (
  <header className="header">
   <div className="logo">HR Leave Tracker</div>
   <nav>
    <ul className="nav-links">
     <li><Link to="/">Home</Link></li>
     <li><Link to="/add">Add Leave</Link></li>
     <li><Link to="/view">View Leaves</Link></li>
     <li><Link to="/dashboard">Dashboard</Link></li>
     <li><Link to="/about">About</Link></li>
    </ul>
   </nav>
  </header>
 );
};

export default Header;

