import React, { useEffect } from "react";
import { useArticles } from "../../hooks/useArticles.jsx";
import {
  CardContainer,
  CardsWrapper,
  ImgFrame,
  InfoContainer,
  Date,
} from "./styled";
import { mockRecettes } from "../../utils/mock.js";

const Card = () => {
  const { articles, loading, error } = useArticles();
  console.log("Articles from hook:", articles);
  console.log("Mock recettes:", mockRecettes);

  const mapArticles = () => {
    if (!Array.isArray(mockRecettes)) return null;
    return mockRecettes.map((article) => (
      <CardContainer key={article._id || article.id}>
        <ImgFrame>
          <img src={article.image} />
        </ImgFrame>
        <InfoContainer>
          <Date>1 décembre, 2025</Date>
          <h2>{article.titre || article.title}</h2>
        </InfoContainer>
      </CardContainer>
    ));
  };

  return (
    <CardsWrapper>
      {loading ? <p>Loading articles...</p> : mapArticles()}
    </CardsWrapper>
  );
};

export default Card;
