import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("admin_token");
};

const RequireAdmin: React.FC<React.PropsWithChildren> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};

export default RequireAdmin;



