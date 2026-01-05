import styled from "styled-components";
import { colors } from "../../utils/theme";

export const Container = styled.div`
  margin-top: 24px;
`;

export const CommentItem = styled.div`
  border-top: 1px solid ${colors.border};
  padding: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AuthorBlock = styled.div``;

export const AuthorName = styled.strong``;

export const DateText = styled.div`
  font-size: 12px;
  color: ${colors.textMuted || '#666'};
`;

export const ActionsWrapper = styled.div``;

export const Content = styled.p`
  margin-top: 8px;
  white-space: pre-wrap;
`;

export const EditWrapper = styled.div`
  margin-top: 8px;
`;

export default Container;
