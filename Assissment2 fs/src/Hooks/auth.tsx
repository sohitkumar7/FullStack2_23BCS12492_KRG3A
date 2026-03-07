import { useState, useCallback } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("auth_token"));

  const login = useCallback(() => {
    localStorage.setItem("auth_token", "fake-token-123");
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, login, logout };
};
