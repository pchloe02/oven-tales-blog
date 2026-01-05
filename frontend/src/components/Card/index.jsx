import React from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../../assets/placeholder-img.jpg";

import {
  CardContainer,
  CardsWrapper,
  ImgFrame,
  InfoContainer,
  Date,
} from "./styled";
import { Tag } from "../index.js";
import { mockRecettes } from "../../utils/mock.js";
import SkeletonCard from "../Skeleton/SkeletonCard";

const Card = ({ articles, loading, error }) => {
  const navigate = useNavigate();
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
      <CardContainer
        key={article._id || article.id}
        onClick={() => navigate(`/recipes/${article._id || article.id}`)}
        role="link"
        tabIndex={0}
      >
        <ImgFrame>
          <img src={article.image || imgPlaceholder} />
        </ImgFrame>
        <InfoContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>{article.titre}</h2>
            <Tag children={article.categorie} />
          </div>
          <p>{article.resume}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Date>{formatDate(article.createdAt)}</Date>
            <p>{article.auteur?.name}</p>
          </div>
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
