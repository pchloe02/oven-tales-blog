import styled from "styled-components";
import { colors } from "../../utils/theme";

const Textarea = styled.textarea`
	width: 100%;
	box-sizing: border-box;
	min-height: 400px;
	border: 1px solid ${colors.border};
	border-radius: 18px;

	font-size: 1rem;
	line-height: 1.5;
	padding: 1rem 1rem;
	font-family: inherit;
	box-shadow: 0 1px 2px ${colors.shadow};
	outline: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	resize: none;
	overflow-wrap: break-word;
	word-break: break-word;
	white-space: pre-wrap;
	overflow-x: hidden;

    &::placeholder {
		color: ${colors.borderDarker};
		font-weight: 400;
	}

	&:focus {
		border-color: ${colors.accent};
		box-shadow: 0 6px 18px ${colors.shadow}; ;
	}
	`

export { Textarea };