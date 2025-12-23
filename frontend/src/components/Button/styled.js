import styled from "styled-components";
import { colors } from "../../utils/theme.js";

const StyledButton = styled.button`
    padding: 10px 20px;
    background-color: ${colors.accent};
    color: ${colors.background};
    border: none;
    border-radius: 8px;
`
export default StyledButton;
