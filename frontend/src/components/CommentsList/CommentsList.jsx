import React, { useState } from "react";
import useEditComment from "../../hooks/useEditComment.jsx";
import useDeleteComment from "../../hooks/useDeleteComment.jsx";
import CommentForm from "../CommentForm";
import Dropdown from "../Dropdown";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  Container,
  CommentItem,
  Header,
  AuthorBlock,
  AuthorName,
  DateText,
  ActionsWrapper,
  Content,
  EditWrapper,
} from "./styled.js";

const CommentsList = ({
  comments = [],
  onDeleted = () => {},
  onEdited = () => {},
}) => {
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();
  const [editingId, setEditingId] = useState(null);
  const auth = useAuth();

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce commentaire ?")) return;
    try {
      await deleteComment(id);
      onDeleted(id);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  const handleEdit = async (id, payload) => {
    try {
      const res = await editComment(id, payload);
      setEditingId(null);
      onEdited(res?.data?.comment || res);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification");
    }
  };

  return (
    <Container>
      <h3>Commentaires ({comments.length})</h3>
      {comments.length === 0 && <p>Aucun commentaire pour l'instant.</p>}
      {comments.map((c) => (
        <CommentItem key={c._id || c.id}>
          <Header>
            <AuthorBlock>
              <AuthorName>{c.author || c.auteur || "Anonyme"}</AuthorName>
              <DateText>
                {new Date(c.createdAt).toLocaleString?.() || c.createdAt}
              </DateText>
            </AuthorBlock>
            <ActionsWrapper>
              {(() => {
                const userId = auth?.user?._id ?? auth?.user?.id;
                const isAdmin = auth?.user?.role === "admin";
                const isAuthor =
                  userId &&
                  (c.authorId
                    ? String(c.authorId) === String(userId)
                    : c.author &&
                      (c.author === auth.user?.name ||
                        c.author === auth.user?.username ||
                        c.author === auth.user?.email));
                if (!auth?.user) return null;
                if (!isAdmin && !isAuthor) return null;
                return (
                  <Dropdown
                    label={
                      <span style={{ fontSize: 20, padding: "4px 8px" }}>
                        ⋯
                      </span>
                    }
                    items={[
                      {
                        label:
                          editingId === (c._id || c.id)
                            ? "Annuler"
                            : "Modifier",
                        action: () =>
                          setEditingId(
                            editingId === (c._id || c.id) ? null : c._id || c.id
                          ),
                      },
                      {
                        label: "Supprimer",
                        action: () => handleDelete(c._id || c.id),
                      },
                    ]}
                  />
                );
              })()}
            </ActionsWrapper>
          </Header>
          {editingId === (c._id || c.id) ? (
            <EditWrapper>
              <CommentForm
                initial={{
                  auteur: c.author ?? c.auteur ?? "",
                  email: c.email ?? "",
                  contenu: c.content ?? c.contenu ?? "",
                }}
                submitLabel="Enregistrer"
                onCreate={(payload) => handleEdit(c._id || c.id, payload)}
              />
            </EditWrapper>
          ) : (
            <Content>{c.content ?? c.contenu}</Content>
          )}
        </CommentItem>
      ))}
    </Container>
  );
};

export default CommentsList;
