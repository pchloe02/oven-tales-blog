import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArticles } from "../../../hooks/useArticles.jsx";
import imgPlaceholder from "../../../assets/placeholder-img.jpg";
import { ArticleContent, Dropdown } from "../../../components/index.js";
import SettingIcon from "../../../components/Icons/SettingIcon.jsx";
import { colors } from "../../../utils/theme.js";
import UseDeleteArticle from "../../../hooks/UseDeleteArticle.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { CommentsList, Tag } from "../../../components";
import CommentForm from "../../../components/CommentForm";
import useGetComments from "../../../hooks/useGetComments.jsx";
import useCreateComment from "../../../hooks/useCreateComment.jsx";

const ArticleDetail = () => {
  const { id } = useParams();
  const { articles, loading, error } = useArticles();

  const article = useMemo(() => {
    if (!Array.isArray(articles)) return null;
    return articles.find((a) => (a._id || a.id) === id);
  }, [articles, id]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const auth = useAuth();
  const { deleteArticle, loading: deleting } = UseDeleteArticle();

  const isOwner =
    !!user &&
    !!article &&
    ((article.auteur &&
      (article.auteur._id === user._id || article.auteur === user._id)) ||
      (article.auteurId && article.auteurId === user._id) ||
      article.auteur === user._id);
  const articleId = article?._id || article?.id;
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useGetComments(articleId);
  const { createComment } = useCreateComment();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  const contenuIsHtml =
    typeof article.contenu === "string" && /<[^>]+>/.test(article.contenu);

  return (
    <div style={{ padding: 20, marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 style={{ marginBottom: "2px", marginRight: 8, flex: 1 }}>
          {article.titre}
        </h1>
        {isOwner && (
          <Dropdown
            style={{ marginTop: "20px" }}
            label={<SettingIcon color={colors.borderDarker} />}
            items={[
              {
                label: "Modifier",
                action: () => navigate(`/recipes/${articleId}/edit`),
              },
              {
                label: deleting ? "Suppression..." : "Supprimer",
                action: () => {
                  if (!confirm("Supprimer cet article ?")) return;
                  deleteArticle(articleId).then(() => navigate("/recipes"));
                },
              },
            ]}
          />
        )}
      </div>
      <p
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          justifyContent: "space-evenly",
          marginTop: 0,
        }}
      >
        <span>
          Publié par {article.auteur?.name} le{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </span>
        {(article.categorie || article.category) && (
          <Tag>{article.categorie || article.category}</Tag>
        )}
      </p>
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

      {auth.user && (
        <div style={{ marginTop: 24 }}>
          <h2>Commentaires</h2>
          {auth.loading ? (
            <p>Chargement...</p>
          ) : (
            <>
              <CommentForm
                onCreate={async (payload) => {
                  const body = {
                    contenu: payload.contenu,
                    auteur:
                      auth.user.name ||
                      auth.user.username ||
                      auth.user.email ||
                      "",
                    email: auth.user.email || "",
                  };
                  await createComment(article._id || article.id, body);
                  await refetchComments();
                }}
              />

              {commentsLoading ? (
                <p>Chargement des commentaires...</p>
              ) : (
                <CommentsList
                  comments={comments}
                  onDeleted={async () => {
                    await refetchComments();
                  }}
                  onEdited={async () => {
                    await refetchComments();
                  }}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
