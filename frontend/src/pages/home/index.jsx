import React, { useEffect, useMemo } from "react";
import { HomeContainer } from "./styled.js";
import { Card } from "../../components/index.js";
import { useArticles } from "../../hooks/useArticles.jsx";

const Home = () => {
  const { articles, loading, error } = useArticles();

  const latestArticles = useMemo(() => {
    if (!Array.isArray(articles)) return [];
    return [...articles]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [articles]);

  return (
    <HomeContainer>
      <h2>Latest recipes</h2>
      <Card articles={latestArticles} loading={loading} error={error} />
    </HomeContainer>
  );
};

export default Home;
