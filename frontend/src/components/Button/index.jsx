import React from "react";
import StyledButton from "./styled.js";

const Button = ({ children, ...props }) => {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
