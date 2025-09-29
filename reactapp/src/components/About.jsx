import React from "react";
import "./About.css";

const About = () => {
 return (
  <div className="about-container">
   <h2>About HR Leave Tracker</h2>
   <p>
    The <strong>HR Leave Tracker</strong> is a web-based application that allows 
    employees to apply for leave and HR managers to manage requests 
    efficiently.
   </p>
   <h3>📨 Features..</h3>
   <ul>
    <li>Add, View, Update, and Delete leave requests</li>
    <li>Dashboard with leave summary</li>
   </ul>
   <h3>🛠 Technologies Used</h3>
   <p>React, Spring Boot, MySQL, REST APIs</p>
  </div>
 );
};

export default About;

