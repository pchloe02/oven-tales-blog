import styled from 'styled-components';

export const CardContainer = styled.div`
    
    padding: 0;
    margin: 16px;
    width: 450px;
    heigth: 545px;
    overflow: hidden;



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
    margin-top: 150px;
    display: flex;
    gap: 16px;
`;

export const InfoContainer = styled.div`
    text-align: left;
`

export const Date = styled.span`
    text-transform: uppercase;
`
