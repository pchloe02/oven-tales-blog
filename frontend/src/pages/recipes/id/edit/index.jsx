import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArticles } from "../../../../hooks/useArticles.jsx";
import useEditArticle from "../../../../hooks/useEditArticle.jsx";
import useCloudinaryUpload from "../../../../hooks/useCloudinaryUpload.jsx";
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
  const {
    uploadImage,
    loading: uploadingImage,
    error: uploadError,
  } = useCloudinaryUpload();
  const { user } = useAuth();

  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [contenu, setContenu] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!Array.isArray(articles)) return;
    const a = articles.find((x) => (x._id || x.id) === id);
    if (a) {
      setTitre(a.titre || "");
      setCategorie(a.categorie || "");
      setContenu(
        typeof a.contenu === "string"
          ? a.contenu
          : JSON.stringify(a.contenu || "", null, 2),
      );
      if (a.image?.url) {
        setExistingImage(a.image);
      }
    }
  }, [articles, id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setExistingImage(null);
      setImageUrl(null);

      try {
        setMessage("Uploading...");
        const result = await uploadImage(file);

        if (result?.url) {
          setImageUrl(result.url);
          setMessage(null);
        }
      } catch (err) {
        setMessage(uploadError || "Erreur lors de l'upload de l'image");
        setImage(null);
        setImagePreview(null);
      }
    }
  };

  const clearNewImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageUrl(null);
    const a = articles.find((x) => (x._id || x.id) === id);
    if (a?.image?.url) {
      setExistingImage(a.image);
    }
  };

  if (articlesLoading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = null;

      if (imageUrl) {
        finalImageUrl = imageUrl;
      } else if (existingImage && !image) {
        finalImageUrl = existingImage.url;
      }

      const payload = { titre, categorie, contenu, imageUrl: finalImageUrl };
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
        <div
          style={{
            marginBottom: 20,
            padding: 12,
            borderRadius: 4,
          }}
        >
          <label
            style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}
          >
            Image
          </label>

          {existingImage && !imagePreview && !imageUrl && (
            <div style={{ marginBottom: 12 }}>
              <img
                src={existingImage.url}
                alt="Article"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: 200,
                  borderRadius: 4,
                }}
              />
            </div>
          )}

          {imagePreview && !imageUrl && uploadingImage && (
            <div
              style={{
                marginBottom: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "400px",
                  height: "300px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: 4,
                  animation: "pulse 2s infinite",
                }}
              />
            </div>
          )}

          {imagePreview && !imageUrl && !uploadingImage && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
                Nouvelle image (prête à uploader)
              </p>
              <img
                src={imagePreview}
                alt="Aperçu"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: 200,
                  borderRadius: 4,
                }}
              />
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <Button
                  type="button"
                  onClick={clearNewImage}
                  style={{ fontSize: 12 }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {imageUrl && (
            <div
              style={{
                marginBottom: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ position: "relative", width: "fit-content" }}>
                <img
                  src={imageUrl}
                  alt="Image uploadée"
                  style={{
                    maxWidth: "400px",
                    height: "auto",
                    maxHeight: 250,
                    borderRadius: 4,
                    display: "block",
                  }}
                />
                <button
                  type="button"
                  onClick={clearNewImage}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {!imagePreview && !imageUrl && (
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ width: "100%" }}
              />
              {existingImage && (
                <p style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
                  Sélectionnez une nouvelle image pour remplacer l'actuelle
                </p>
              )}
            </div>
          )}

          {message && (
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                color: message.includes("✓")
                  ? "green"
                  : message.includes("Uploading") || message.includes("Upload")
                    ? "#333"
                    : "red",
              }}
            >
              {message}
            </div>
          )}
        </div>

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
            Sauvegarder
          </Button>
          <Button type="button" onClick={() => navigate(-1)}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
