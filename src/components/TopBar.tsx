import styled from 'styled-components';
import { FlexImage } from './FlexImage';
import Logo from '../assets/logo.png';
import { LanguageSelector } from './language';
import { Hr } from './Hr';
import { primaryColor } from '../config';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    position: fixed;
    top: 0;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    z-index: 5;
    background-color: ${primaryColor};
`;

const StyledTopbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const TopBar = () => (
    <StyledContainer>
        <StyledTopbar>
            <FlexImage width="75px" src={Logo} alt="Logo" />
            <LanguageSelector />
        </StyledTopbar>
        <Hr />
    </StyledContainer>
);
