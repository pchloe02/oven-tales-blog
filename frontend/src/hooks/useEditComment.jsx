import { useState } from "react";
import axios from "axios";

export default function useEditComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editComment = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      // send both french and english keys to satisfy backend controller and model
      const body = {
        // english
        content: payload.content ?? payload.contenu ?? "",
        author: payload.author ?? payload.auteur ?? undefined,
        // french equivalents
        contenu: payload.contenu ?? payload.content ?? undefined,
        auteur: payload.auteur ?? payload.author ?? undefined,
        email: payload.email ?? undefined,
      };

      const res = await axios.patch(`/api/comments/${id}`, body, {
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

  return { editComment, loading, error };
}
