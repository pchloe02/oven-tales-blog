import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useGetComments = (articleId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(Boolean(articleId));
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!articleId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/comments/${articleId}`);
      const payload = res.data?.data?.comments ?? res.data;
      setComments(payload);
    } catch (err) {
      setError(err?.message || "Erreur lors du chargement des commentaires");
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, loading, error, refetch: fetchComments };
};

export default useGetComments;
