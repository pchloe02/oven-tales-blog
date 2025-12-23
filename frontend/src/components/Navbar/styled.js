import styled from "styled-components";
import { colors, sizes } from "../../utils/theme";


const NavbarContainer = styled.nav`

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${colors.background};
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid ${colors.border};
`;

const NavItems = styled.div`
    display: flex;
    gap: 50px;
    font-size: ${sizes.subtitle};
    font-family: 'Alegreya Sans';
    font-weight: 800;
    text-transform: uppercase;  
    .nav-link {
        text-decoration: none;
        color: ${colors.text};
        font-weight: 500;
        &:hover {
            color: ${colors.accent};
        }
    }
`;

const ButtonsSection = styled.div`
    display: flex;
    gap: 16px;
`;

const LeftSideNav = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`

export { NavbarContainer, NavItems, ButtonsSection, LeftSideNav };