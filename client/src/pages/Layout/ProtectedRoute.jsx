import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { isCancelledError } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Loading/Loading";

const ProtectedRoutes = () => {
  const isAuthenticated = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  console.log(isAuthenticated);
  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
