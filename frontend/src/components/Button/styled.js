import styled from "styled-components";
import { colors } from "../../utils/theme.js";

const StyledButton = styled.button`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.25;
    border-radius: 30px;
    background-color: ${colors.accent};
    color: ${colors.background};
    border: 1px solid ${colors.accent};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export default StyledButton;
