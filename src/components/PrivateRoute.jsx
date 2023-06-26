import React from "react";
import Spinner from "./Spinner";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/SignIn" />;
}

export default PrivateRoute;
