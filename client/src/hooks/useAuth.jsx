import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setIsAuthenticated(currentUser !== null ? true : false);
  }, []);

  return isAuthenticated;
};

export default useAuth;
