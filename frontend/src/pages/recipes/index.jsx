import React from "react";
import useGetRecipes from "../../hooks/useGetRecipes";
import { Tag } from "../../components";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const {
    recipes,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    pagination,
  } = useGetRecipes({ initialPage: 1, initialLimit: 9 });
  const navigate = useNavigate();

  if (loading) return <p>Loading recipes…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
            alignItems: "start",
            marginTop: 16,
            marginBottom: 40,
          }}
        >
          {recipes.map((r) => (
            <div
              key={r._id || r.id}
              onClick={() => navigate(`/recipes/${r._id || r.id}`)}
              role="button"
              tabIndex={0}
              style={{
                padding: 16,
                border: "1px solid #e6e6e6",
                borderRadius: 8,
                cursor: "pointer",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 8,
                boxSizing: "border-box",
                height: 160,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    lineHeight: "1.2",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {r.titre}
                </h3>
                <div style={{ marginLeft: 8 }}>
                  <Tag>{r.categorie}</Tag>
                </div>
              </div>

              <div style={{ marginTop: 8, color: "#666" }}>
                {r.auteur?.name || "Unknown"}
              </div>
            </div>
          ))}
        </div>
      )}
      {pagination && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 16,
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <Button
            page
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={!pagination.hasPrevPage}
          >
            Précédent
          </Button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <Button
                key={p}
                page
                active={p === page}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            )
          )}
          <Button
            page
            onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
            disabled={!pagination.hasNextPage}
          >
            Suivant
          </Button>
        </div>
      )}
    </>
  );
};

export default Recipes;
