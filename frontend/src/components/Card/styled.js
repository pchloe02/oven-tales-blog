import styled from 'styled-components';

export const CardContainer = styled.div`
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 320px;
    background: transparent;

    h2 {
        margin-top: 12px;
        font-size: 1.25rem;
        font-weight: 700;    
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
