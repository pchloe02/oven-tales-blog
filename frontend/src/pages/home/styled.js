import styled from "styled-components";
import { colors } from "../../utils/theme.js";

const HomeContainer = styled.div`
	margin-top: 120px;
	padding: 0 16px;
`;

const Banner = styled.section`
	width: 100%;
	height: 220px;
	border-radius: 12px;
	background: ${props =>
        props.bg
            ? `url(${props.bg}) center/cover no-repeat`
            : `linear-gradient(135deg, ${colors.accent.trim()} 0%, ${colors.cta.trim()} 100%)`} ;
	background-size: cover;
	position: relative;
	margin-bottom: 16px;
	box-shadow: 0 6px 18px rgba(0,0,0,0.08);
	overflow: hidden;

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0.12));
	}
`;

export { HomeContainer, Banner };