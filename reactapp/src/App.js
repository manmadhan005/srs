import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddLeave from "./components/AddLeave";
import ViewLeaves from "./components/ViewLeaves";
import UpdateLeave from "./components/UpdateLeave";
import Notifications from "./components/Notifications";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="app-container">
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/about"
            element={<ProtectedRoute component={About} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="/add-leave"
            element={<ProtectedRoute component={AddLeave} />}
          />
          <Route
            path="/view-leaves"
            element={<ProtectedRoute component={ViewLeaves} />}
          />
          <Route
            path="/update-leave/:id"
            element={<ProtectedRoute component={UpdateLeave} />} // Corrected route
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute component={Notifications} />}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminRoute component={AdminDashboard} />}
          />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useAuth();
  return user ? <Component /> : <Navigate to="/login" />;
};

const AdminRoute = ({ component: Component }) => {
  const { user, isAdmin } = useAuth();
  return user && isAdmin() ? <Component /> : <Navigate to="/" />;
};

export default App;
