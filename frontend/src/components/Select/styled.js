import styled from "styled-components";
import { colors } from "../../utils/theme";

const SelectStyled = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.25;
  font-family: inherit;
  border-radius: 30px;
  border: 1px solid ${colors.border};
  background: ${colors.white};

  box-shadow: 0 1px 2px ${colors.shadow};
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  overflow-x: hidden;

  &::placeholder {
    color: ${colors.borderDarker};
    font-weight: 400;
  }

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 6px 18px ${colors.shadow};
  }
`;

export { SelectStyled };
