import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Input, Textarea, Button, ArticleContent, Select } from "./index.js";
import { useNavigate } from "react-router-dom";
import useCreateArticle from "../hooks/useCreateArticle";
import useCloudinaryUpload from "../hooks/useCloudinaryUpload";

export default function CreateArticle() {
  const { user } = useAuth();
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [contenu, setContenu] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const canInteract = titre.trim().length > 0 && contenu.trim().length > 0;
  const { createArticle, loading, error } = useCreateArticle();
  const {
    uploadImage,
    loading: uploadingImage,
    error: uploadError,
  } = useCloudinaryUpload();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const payload = { titre, contenu, categorie, imageUrl };
      await createArticle(payload);
      navigate("/");
    } catch (err) {
      setMessage(
        error ||
          err?.response?.data?.message ||
          "Erreur lors de la publication.",
      );
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageUrl(null);
    setMessage(null);
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
          {!preview && <label style={labelStyle}>Image</label>}
          {preview && imagePreview ? (
            <img
              src={imagePreview}
              alt="Aperçu"
              style={{ maxWidth: "100%", height: "auto", marginBottom: 12 }}
            />
          ) : !preview ? (
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={inputStyle}
                disabled={uploadingImage}
              />
              {uploadingImage && (
                <div
                  style={{
                    marginTop: 12,
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
                      borderRadius: 8,
                      animation: "pulse 2s infinite",
                    }}
                  />
                </div>
              )}
              {imageUrl && (
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "fit-content",
                      marginBottom: 8,
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="Image uploadée"
                      style={{
                        maxWidth: "400px",
                        height: "auto",
                        borderRadius: 8,
                        display: "block",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
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
            </div>
          ) : null}
        </div>

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
            <Select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              style={inputStyle}
            >
              <option value="">-- Choisir --</option>
              <option value="Apéros">Apéros</option>
              <option value="Entrées">Entrées</option>
              <option value="Plats">Plats</option>
              <option value="Desserts">Desserts</option>
              <option value="Astuces">Astuces</option>
            </Select>
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
