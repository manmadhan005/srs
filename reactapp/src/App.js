import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AddLeave from "./components/AddLeave";
import ViewLeaves from "./components/ViewLeaves";
import UpdateLeave from "./components/UpdateLeave";
import About from "./components/About";
import Dashboard from "./components/Dashboard";

import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider, useAuth } from "./components/AuthContext";

function ProtectedRoute({ children }) {
 const { isAuthenticated } = useAuth();
 return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
 return (
  <ThemeProvider>
   <AuthProvider>
    <Router>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={
       <ProtectedRoute>
        <Header />
        <div style={{ paddingBottom: "60px" }}>
         <Home />
        </div>
        <Footer />
       </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
       <ProtectedRoute>
        <Header />
        <div style={{ paddingBottom: "60px" }}>
         <Dashboard />
        </div>
        <Footer />
       </ProtectedRoute>
      } />
      <Route path="/add" element={
       <ProtectedRoute>
        <Header />
        <div style={{ paddingBottom: "60px" }}>
         <AddLeave />
        </div>
        <Footer />
       </ProtectedRoute>
      } />
      <Route path="/view" element={
       <ProtectedRoute>
        <Header />
        <div style={{ paddingBottom: "60px" }}>
         <ViewLeaves />
        </div>
        <Footer />
       </ProtectedRoute>
      } />
      <Route path="/update/:id" element={
       <ProtectedRoute>
        <Header />
        <div style={{ paddingBottom: "60px" }}>
         <UpdateLeave />
        </div>
        <Footer />
       </ProtectedRoute>
      } />
      <Route path="/about" element={
       <ProtectedRoute>
        <Header />
        <div style={{ paddingBottom: "60px" }}>
         <About />
        </div>
        <Footer />
       </ProtectedRoute>
      } />
      {/* Add a catch-all route to redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
     </Routes>
    </Router>
   </AuthProvider>
  </ThemeProvider>
 );
}

export default App;
