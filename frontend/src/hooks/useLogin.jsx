import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function useLogin({ minLoading = 1000 } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();

  const login = async (credentials, { timeout = 10000 } = {}) => {
    setLoading(true);
    setError(null);
    const start = Date.now();
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const res = await axios.post("/api/auth/login", credentials, {
        signal: controller.signal,
      });
      clearTimeout(id);
      const token = res.data?.token;
      const user = res.data?.data?.user || null;
      auth.login({ token, user });
      const elapsed = Date.now() - start;
      if (elapsed < minLoading)
        await new Promise((r) => setTimeout(r, minLoading - elapsed));
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { login, loading, error };
}
