import React from "react";
import { CardContainer, ImgFrame, InfoContainer, Date } from "../Card/styled";
import "./skeleton.css";

const SkeletonCard = ({ keyIdx }) => (
  <CardContainer key={`skeleton-${keyIdx}`} aria-hidden>
    <ImgFrame>
      <div className="skeleton skeleton-img" />
    </ImgFrame>
    <InfoContainer>
      <Date className="skeleton skeleton-line" style={{ width: 120 }} />
      <div className="skeleton skeleton-line large" style={{ width: "60%" }} />
      <div className="skeleton skeleton-line" style={{ width: "80%" }} />
      <div className="skeleton skeleton-line title" />
    </InfoContainer>
  </CardContainer>
);

export default SkeletonCard;
