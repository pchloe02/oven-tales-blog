import React from "react";
import { Textarea as StyledTextarea } from "./styled.js";

const Textarea = ({ value, onChange, style, ...props }) => {
  return (
    <StyledTextarea
      value={value}
      onChange={onChange}
      style={style}
      {...props}
    />
  );
};

export default Textarea;
