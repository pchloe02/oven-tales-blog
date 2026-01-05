import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArticles } from "../../../hooks/useArticles.jsx";
import imgPlaceholder from "../../../assets/placeholder-img.jpg";
import { ArticleContent, Dropdown } from "../../../components/index.js";
import SettingIcon from "../../../components/Icons/SettingIcon";
import UseDeleteArticle from "../../../hooks/UseDeleteArticle.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../utils/theme.js";

const ArticleDetail = () => {
  const { id } = useParams();
  const { articles, loading, error } = useArticles();

  const article = useMemo(() => {
    if (!Array.isArray(articles)) return null;
    return articles.find((a) => (a._id || a.id) === id);
  }, [articles, id]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { deleteArticle, loading: deleting } = UseDeleteArticle();

  const isOwner =
    !!user &&
    !!article &&
    ((article.auteur &&
      (article.auteur._id === user._id || article.auteur === user._id)) ||
      (article.auteurId && article.auteurId === user._id) ||
      article.auteur === user._id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  const contenuIsHtml =
    typeof article.contenu === "string" && /<[^>]+>/.test(article.contenu);

  return (
    <div style={{ padding: 20, marginTop: 40 }}>
      <h1>{article.titre}</h1>
      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          <strong>By:</strong> {article.auteur?.name}
        </span>
        {isOwner && (
          <Dropdown
            label={<SettingIcon color={colors.borderDarker} />}
            items={[
              {
                label: "Modifier",
                action: () =>
                  navigate(`/recipes/${article._id || article.id}/edit`),
              },
              {
                label: "Supprimer",
                action: () => {
                  if (!window.confirm("Delete this article?")) return;
                  deleteArticle(article._id || article.id)
                    .then(() => navigate("/profile"))
                    .catch((err) => {
                      const msg =
                        err?.response?.data?.message ||
                        err.message ||
                        "Failed to delete";
                      alert(msg);
                    });
                },
              },
            ]}
          />
        )}
      </p>

      <img
        src={article.image || imgPlaceholder}
        alt={article.titre}
        style={{ maxWidth: "100%", height: "auto", margin: "16px 0" }}
      />

      <div>
        {article.contenu ? (
          typeof article.contenu === "string" ? (
            contenuIsHtml ? (
              <ArticleContent
                asHtml={true}
                content={article.contenu}
                style={{ marginTop: 16 }}
              />
            ) : (
              <ArticleContent
                content={article.contenu}
                style={{ marginTop: 16 }}
              />
            )
          ) : (
            <ArticleContent
              content={JSON.stringify(article.contenu, null, 2)}
              style={{ marginTop: 16, whiteSpace: "pre-wrap" }}
            />
          )
        ) : (
          <p>No full content available.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
