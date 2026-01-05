import { useState } from "react";
import axios from "axios";

export default function useDeleteComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteComment = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`/api/comments/${id}`);
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Erreur";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteComment, loading, error };
}
