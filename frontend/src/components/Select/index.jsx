import React from "react";
import { SelectStyled } from "./styled.js";

const Select = ({ children, ...props }) => {
  return <SelectStyled {...props}>{children}</SelectStyled>;
};

export default Select;
