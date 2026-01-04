import { useState } from "react";
import axios from "axios";

export default function useCreateArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createArticle = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/articles", payload);
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Erreur";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createArticle, loading, error };
}
