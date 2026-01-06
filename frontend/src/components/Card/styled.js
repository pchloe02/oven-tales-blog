import styled from 'styled-components';
import { colors } from '../../utils/theme';

export const CardContainer = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 320px;
    max-height: 320px;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 16px;
    box-shadow: 0 4px 6px ${colors.shadow};
    transition: background 0.3s ease;

    h2 {
        margin-top: 12px;
        font-size: 1.25rem;
        font-weight: 700;    
    }

    &:hover {
        background: ${colors.border};
        transition: background 0.3s ease;
        cursor: pointer;
    }
`;

export const ImgFrame = styled.div`
    border-radius: 16px;
    max-height: 400px;
    max-width: 450px;
    overflow: hidden;

    img {
        display: block;
        width: 100%;
        height: 400px;
        object-fit: cover;
    
    }
`

export const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    align-items: start;

`;

export const InfoContainer = styled.div`
    text-align: left;
    margin-top: 12px;
`

export const Date = styled.span`
    text-transform: uppercase;
`
