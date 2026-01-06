import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: 24px 0;
  margin-top: 100px;
`;

export const FooterInner = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Copy = styled.div`
  font-size: 0.9rem;
  color: var(--color-text);
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;

  a {
    color: var(--color-text);
    text-decoration: none;
    font-weight: 500;
  }
`;

export const Legal = styled.div`
  display: flex;
  gap: 12px;

  a {
    color: var(--color-text);
    text-decoration: none;
    font-size: 0.9rem;
  }
`;
