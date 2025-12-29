import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const auth = useAuth();

  const register = useCallback(
    async (payload, options = { autoLogin: true }) => {
      setLoading(true);
      setError(null);
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const res = await axios.post(`${base}/api/auth/register`, payload, {
          headers: { "Content-Type": "application/json" },
        });
        const json = res.data;
        setData(json);
        if (options.autoLogin && json.token) {
          try {
            auth.login({ token: json.token, user: json.data?.user || null });
          } catch (e) {
            try {
              localStorage.setItem("token", json.token);
            } catch (err) {
              // ignore localStorage errors
            }
          }
        }
        return json;
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Error during registration";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { register, loading, error, data };
}
