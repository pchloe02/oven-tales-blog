import React, { useEffect } from "react";
import imgPlaceholder from "../../assets/placeholder-img.jpg";

import {
  CardContainer,
  CardsWrapper,
  ImgFrame,
  InfoContainer,
  Date,
} from "./styled";
import { mockRecettes } from "../../utils/mock.js";
import SkeletonCard from "../Skeleton/SkeletonCard";

const Card = ({ articles, loading, error }) => {
  const formatDate = (value) => {
    if (!value) return "";
    const d = new globalThis.Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  const mapArticles = () => {
    if (!Array.isArray(articles)) return null;
    return articles.map((article) => (
      <CardContainer key={article._id || article.id}>
        <ImgFrame>
          <img src={article.image || imgPlaceholder} />
        </ImgFrame>
        <InfoContainer>
          <Date>{formatDate(article.createdAt)}</Date>
          <p>{article.auteur?.name}</p>
          <p>{article.resume}</p>
          <h2>{article.titre}</h2>
        </InfoContainer>
      </CardContainer>
    ));
  };

  return (
    <CardsWrapper>
      {loading
        ? [0, 1, 2].map((i) => <SkeletonCard key={i} keyIdx={i} />)
        : mapArticles()}
    </CardsWrapper>
  );
};

export default Card;
