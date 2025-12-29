import React from "react";
import { useGetMyArticles } from "../../hooks/useGetMyArticles";
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const { user, loading: userLoading } = useAuth();
  const { myArticles, loading: myArticlesLoading, error } = useGetMyArticles();
  console.log("My Articles:", myArticles);
  return (
    <>
      <h2>Informations</h2>
      {userLoading ? (
        <p>Loading user...</p>
      ) : (
        user && (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.createdAt && (
              <p>
                <strong>Member since:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        )
      )}
      <h2>Articles</h2>
      {myArticlesLoading ? (
        <p>Loading publications...</p>
      ) : (
        (() => {
          const getId = (a) => a._id || a.id;
          const getTitle = (a) => a.title || a.titre || a.resume || "Untitled";
          const getContent = (a) => a.content || a.contenu || a.resume || "";
          const isPublished = (a) =>
            typeof a.published !== "undefined" ? a.published : !!a.publie;
          const getAuthorName = (a) =>
            a.author?.name || a.auteur?.name || a.auteur?.nom || "";

          const published = myArticles?.filter((a) => isPublished(a)) || [];
          const drafts = myArticles?.filter((a) => !isPublished(a)) || [];
          return (
            <>
              <h3>Published</h3>
              {published.length > 0 ? (
                <ul>
                  {published.map((article) => (
                    <li key={getId(article)}>
                      <h3>{getTitle(article)}</h3>
                      <p>{getContent(article)}</p>
                      <p>
                        Status: {isPublished(article) ? "Published" : "Draft"}
                      </p>
                      {getAuthorName(article) && (
                        <p>Author: {getAuthorName(article)}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No publications found.</p>
              )}
              {drafts.length > 0 && (
                <>
                  <h3>Drafts</h3>
                  <ul>
                    {drafts.map((article) => (
                      <li key={getId(article)}>
                        <h3>{getTitle(article)}</h3>
                        <p>{getContent(article)}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          );
        })()
      )}
    </>
  );
};

export default Profile;
