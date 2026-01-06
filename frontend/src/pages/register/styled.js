import styled from "styled-components";

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 100vh;
    padding: 32px;
    box-sizing: border-box;
`;

const FormRegister = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 500px;
    max-width: 90%;
    box-sizing: border-box;
    padding: 16px;
`;

export { RegisterContainer, FormRegister };