import { useState } from "react";
import axios from "axios";

export default function UseDeleteArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteArticle = async (id) => {
    if (!id) throw new Error("article id is required");
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`/api/articles/${id}`);
      setLoading(false);
      return res.data;
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Failed to delete";
      setError(msg);
      setLoading(false);
      throw err;
    }
  };

  return { deleteArticle, loading, error };
}
