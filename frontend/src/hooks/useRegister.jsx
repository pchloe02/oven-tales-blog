import { useState, useCallback } from "react";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const register = useCallback(
    async (payload, options = { autoLogin: true }) => {
      setLoading(true);
      setError(null);
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${base}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) {
          const message =
            json.message || json.error || "Error during registration";
          throw new Error(message);
        }
        setData(json);
        if (options.autoLogin && json.token) {
          try {
            localStorage.setItem("token", json.token);
          } catch (e) {
            // ignore localStorage errors
          }
        }
        return json;
      } catch (err) {
        setError(err.message || "Error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { register, loading, error, data };
}
