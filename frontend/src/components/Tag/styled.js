import styled from "styled-components";
import { colors } from "../../utils/theme";

export const TagContainer = styled.span`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: ${colors.accent};
  color: ${colors.white};
  font-size: 0.85rem;
  margin-left: 8px;
`;

export default TagContainer;
