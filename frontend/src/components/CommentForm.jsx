import React, { useState } from "react";
import Textarea from "./Textarea";
import Button from "./Button";

const CommentForm = ({
  onCreate,
  initial = { contenu: "" },
  submitLabel = "Poster",
}) => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onCreate(form);
      setForm(initial);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Erreur lors de l'envoi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <Textarea
          name="contenu"
          placeholder="Écrire un commentaire..."
          value={form.contenu}
          onChange={handleChange}
          rows={4}
          style={{ minHeight: 120 }}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
        {loading ? "Envoi..." : submitLabel}
      </Button>
    </form>
  );
};

export default CommentForm;
