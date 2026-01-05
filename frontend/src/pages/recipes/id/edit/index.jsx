import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArticles } from "../../../../hooks/useArticles.jsx";
import useEditArticle from "../../../../hooks/useEditArticle.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import {
  Input,
  Textarea,
  Button,
  Select,
} from "../../../../components/index.js";

export default function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, loading: articlesLoading } = useArticles();
  const { editArticle, loading: saving, error } = useEditArticle();
  const { user } = useAuth();

  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [contenu, setContenu] = useState("");

  useEffect(() => {
    if (!Array.isArray(articles)) return;
    const a = articles.find((x) => (x._id || x.id) === id);
    if (a) {
      setTitre(a.titre || "");
      setCategorie(a.categorie || "");
      setContenu(
        typeof a.contenu === "string"
          ? a.contenu
          : JSON.stringify(a.contenu || "", null, 2)
      );
    }
  }, [articles, id]);

  if (articlesLoading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { titre, categorie, contenu };
      await editArticle(id, payload);
      navigate(`/recipes/${id}`);
    } catch (err) {
      alert(error || err?.message || "Failed to save");
    }
  };

  if (!user) return <p>You must be logged in to edit.</p>;

  return (
    <div style={{ padding: 20, marginTop: 40 }}>
      <h2>Modifier l'article</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Titre</label>
          <Input value={titre} onChange={(e) => setTitre(e.target.value)} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Catégorie</label>
          <Select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="Apéros">Apéros</option>
            <option value="Entrées">Entrées</option>
            <option value="Plats">Plats</option>
            <option value="Desserts">Desserts</option>
            <option value="Astuces">Astuces</option>
          </Select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Contenu</label>
          <Textarea
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            rows={12}
          />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
