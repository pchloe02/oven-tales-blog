import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Input, Textarea, Button, ArticleContent } from "./index.js";
import { useNavigate } from "react-router-dom";
import useCreateArticle from "../hooks/useCreateArticle";

export default function CreateArticle() {
  const { user } = useAuth();
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [contenu, setContenu] = useState("");
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const canInteract = titre.trim().length > 0 && contenu.trim().length > 0;
  const { createArticle, loading, error } = useCreateArticle();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const payload = { titre, contenu, categorie };
      await createArticle(payload);
      navigate("/");
    } catch (err) {
      setMessage(
        error ||
          err?.response?.data?.message ||
          "Erreur lors de la publication."
      );
    }
  };

  const containerStyle = {
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    width: "100vw",
    padding: "24px",
    paddingTop: "120px",
    boxSizing: "border-box",
  };
  const fieldWrapper = { width: "100%", marginBottom: 16 };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    textAlign: "left",
    color: "#3d1f1f",
  };
  const inputStyle = { width: "100%" };
  const formInnerStyle = {
    maxWidth: 1000,
    margin: "0 auto",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <h2>Publier un article</h2>
      {!user && (
        <div style={{ color: "orange" }}>
          Vous devez être connecté pour publier.
        </div>
      )}
      <form onSubmit={handleSubmit} style={formInnerStyle}>
        <div style={fieldWrapper}>
          {!preview && <label style={labelStyle}>Titre</label>}
          {preview ? (
            <h2 style={{ textAlign: "left", margin: "0 0 12px" }}>
              {titre || ""}
            </h2>
          ) : (
            <Input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              style={inputStyle}
              required
            />
          )}
        </div>

        <div style={fieldWrapper}>
          {!preview && <label style={labelStyle}>Catégorie</label>}
          {preview ? (
            <ArticleContent content={categorie || ""} />
          ) : (
            <Input
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              style={inputStyle}
            />
          )}
        </div>

        <div style={fieldWrapper}>
          {!preview && <label style={labelStyle}>Contenu</label>}
          {preview ? (
            <ArticleContent content={contenu || ""} />
          ) : (
            <Textarea
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              rows={18}
              style={{ ...inputStyle, fontFamily: "inherit", minHeight: 420 }}
              required
            />
          )}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Button type="submit" disabled={loading || !user || !canInteract}>
            {loading ? "Envoi..." : "Publier"}
          </Button>
          <Button
            type="button"
            onClick={() => setPreview((p) => !p)}
            disabled={!canInteract}
          >
            {preview ? "Modifier" : "Aperçu"}
          </Button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
