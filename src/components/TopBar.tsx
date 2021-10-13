import styled from 'styled-components';
import { FlexImage } from './FlexImage';
import Logo from '../assets/logo.png';
import { LanguageSelector } from './language';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    position: fixed;
    top: 0;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
`;

const StyledTopbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const StyledHr = styled.hr`
    display: flex;
    border-color: rgba(255, 255, 255, 0.2);
    width: 100%;
`;

export const TopBar = () => (
    <StyledContainer>
        <StyledTopbar>
            <FlexImage width="75px" src={Logo} alt="Logo" />
            <LanguageSelector />
        </StyledTopbar>
        <StyledHr />
    </StyledContainer>
);
