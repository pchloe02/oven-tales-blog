import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useArticles } from "../../../hooks/useArticles.jsx";
import imgPlaceholder from "../../../assets/placeholder-img.jpg";
import { ArticleContent } from "../../../components/index.js";

const ArticleDetail = () => {
  const { id } = useParams();
  const { articles, loading, error } = useArticles();

  const article = useMemo(() => {
    if (!Array.isArray(articles)) return null;
    return articles.find((a) => (a._id || a.id) === id);
  }, [articles, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  const contenuIsHtml =
    typeof article.contenu === "string" && /<[^>]+>/.test(article.contenu);

  return (
    <div style={{ padding: 20, marginTop: 40 }}>
      <h1>{article.titre}</h1>
      <p>
        <strong>By:</strong> {article.auteur?.name}
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
