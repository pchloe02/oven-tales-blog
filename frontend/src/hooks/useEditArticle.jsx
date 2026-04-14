import { useState } from "react";
import axios from "axios";

export default function useEditArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editArticle = async (id, payload) => {
    if (!id) throw new Error("article id is required");
    setLoading(true);
    setError(null);
    try {
      // Envoyer directement les données (imageUrl est l'URL Cloudinary)
      const res = await axios.patch(`/api/articles/${id}`, {
        titre: payload.titre,
        contenu: payload.contenu,
        categorie: payload.categorie,
        ...(payload.imageUrl && { imageUrl: payload.imageUrl }),
      });
      setLoading(false);
      return res.data;
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Failed to edit";
      setError(msg);
      setLoading(false);
      throw err;
    }
  };

  return { editArticle, loading, error };
}
