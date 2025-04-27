import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { AuthContext } from "./hooks";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.token) {
          authService.setAuthToken(storedUser.token);
          const userData = await authService.getCurrentUser();
          setUser({ ...userData, firstLogin: storedUser.firstLogin });
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signup = async (userData) => {
    const response = await authService.signup(userData);
    const { token, userId, firstLogin = true } = response;
    const userDataToStore = { token, id: userId, firstLogin };
    localStorage.setItem("user", JSON.stringify(userDataToStore));
    authService.setAuthToken(token);
    setUser(userDataToStore);
    return response;
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    const { token, userId, firstLogin, ...rest } = response;
    const userDataToStore = { token, id: userId, firstLogin, ...rest };
    localStorage.setItem("user", JSON.stringify(userDataToStore));
    authService.setAuthToken(token);
    setUser(userDataToStore);
    return response;
  };

  const logout = async () => {
    localStorage.removeItem("user");
    authService.setAuthToken(null);
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
