import { useState } from "react";
import axios from "axios";

export default function useCreateComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createComment = async (articleId, payload) => {
    setLoading(true);
    setError(null);
    try {
      // send both french and english keys to satisfy backend controller and model
      const body = {
        // english
        content: payload.content ?? payload.contenu ?? "",
        author: payload.author ?? payload.auteur ?? "",
        // french equivalents (some controllers expect these)
        contenu: payload.contenu ?? payload.content ?? "",
        auteur: payload.auteur ?? payload.author ?? "",
        email: payload.email ?? "",
      };

      const res = await axios.post(`/api/comments/${articleId}`, body, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Erreur";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createComment, loading, error };
}
