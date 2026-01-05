import styled from "styled-components";
import { colors } from "../../utils/theme.js";

const StyledButton = styled.button`
    padding: ${props => (props.page ? "0.2rem 0.45rem" : "0.75rem 1rem")};
    font-size: ${props => (props.page ? "0.85rem" : "1rem")};
    line-height: 1.25;
    border-radius: ${props => (props.page ? "6px" : "30px")};
    background-color: ${props => (props.active ? colors.accent : (props.page ? "transparent" : colors.accent))};
    color: ${props => (props.active ? colors.background : (props.page ? colors.text : colors.background))};
    border: 1px solid ${props => (props.page ? colors.border : colors.accent)};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 150ms ease;
    &:hover {
        transform: translateY(-1px);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        filter: grayscale(10%);
        transform: none;
    }
`;

export default StyledButton;
