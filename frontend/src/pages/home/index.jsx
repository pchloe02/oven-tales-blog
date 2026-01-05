import React, { useMemo } from "react";
import { HomeContainer, Banner } from "./styled.js";

const bannerImg =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";
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
      <Banner bg={bannerImg} />
      <h2>Dernière recette publiée</h2>
      <Card articles={latestArticles} loading={loading} error={error} />
    </HomeContainer>
  );
};

export default Home;
