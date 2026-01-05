import React from "react";
import { TagContainer } from "./styled";

const Tag = ({ children }) => {
  if (!children) return null;
  return <TagContainer>{children}</TagContainer>;
};

export default Tag;
