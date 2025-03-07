import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ isAuthenticated, ...rest }) {
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export default PrivateRoute;
