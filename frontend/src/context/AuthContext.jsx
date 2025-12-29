import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const applyToken = (t) => {
    if (t) axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    else delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    applyToken(token);
    if (!token) {
      setLoading(false);
      return;
    }
    // optional: fetch current user profile
    axios
      .get("/api/auth/me")
      .then((res) => setUser(res.data?.data?.user || null))
      .catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        applyToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = ({ token: t, user: u }) => {
    localStorage.setItem("token", t);
    setToken(t);
    setUser(u || null);
    applyToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    applyToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
