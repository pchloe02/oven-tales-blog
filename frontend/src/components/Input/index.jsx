import React from "react";
import { InputStyled } from "./styled.js";

const Input = ({ placeholder, type, value, onChange, ...props }) => (
  <InputStyled
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    {...props}
  />
);

export default Input;
