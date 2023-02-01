import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  const { pathname } = useLocation();

  if (!loggedIn && (pathname === "/signin" || pathname === "/signup")) {
    return <Navigate to="/movies" replace />;
  }

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
