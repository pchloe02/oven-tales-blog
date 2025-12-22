import styled from "styled-components";
import { colors, sizes } from "../../utils/theme";


const NavbarContainer = styled.nav`

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${colors.background};
    padding: 1rem 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 128px;
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

export { NavbarContainer, NavItems };