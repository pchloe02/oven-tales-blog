import styled from "styled-components";
import { colors } from "../../utils/theme.js";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const ToggleButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

export const Menu = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 6px;
  min-width: 160px;
  box-shadow: 0 6px 18px ${colors.shadow};
  padding: 0.25rem 0;
  z-index: 50;
  /* animation */
  transform-origin: top right;
  transition: opacity 180ms ease, transform 180ms ease, max-height 200ms ease;
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  max-height: 0;
  overflow: hidden;
  pointer-events: none;

  &[data-open="true"] {
    opacity: 1;
    transform: translateY(0) scale(1);
    max-height: 400px;
    pointer-events: auto;
  }
`;

export const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background: transparent;
  border: 0;
  text-align: left;
  color: inherit;
  &:hover {
    background: #f5f5f5;
  }
`;
export default DropdownContainer;