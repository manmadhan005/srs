import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AddLeave from "./components/AddLeave";
import ViewLeave from "./components/ViewLeave";
import UpdateLeave from "./components/UpdateLeave";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

import { ThemeProvider } from "./components/ThemeContext";
function App() {
 return (
  <ThemeProvider>
  <Router>
   <Header />
   <div style={{ paddingBottom: "60px" }}> {/* space for footer */}
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/add" element={<AddLeave />} />
     <Route path="/view" element={<ViewLeave />} />
     <Route path="/update/:id" element={<UpdateLeave />} />
     <Route path="/Dashboard" element={<Dashboard/>}/>

     <Route path="/About" element={<About/>}/>

    </Routes>
   </div>
   <Footer />
  </Router>
  </ThemeProvider>
 );
}

export default App;

