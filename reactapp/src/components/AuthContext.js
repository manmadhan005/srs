import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 const login = (userData) => {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
 };

 const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
 };

 const isAdmin = () => {
  return user && user.role === "admin";
 };

 const isEmployee = () => {
  return user && user.role === "employee";
 };

 React.useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
   setUser(JSON.parse(savedUser));
  }
 }, []);

 return (
  <AuthContext.Provider value={{ user, login, logout, isAdmin, isEmployee }}>
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);
