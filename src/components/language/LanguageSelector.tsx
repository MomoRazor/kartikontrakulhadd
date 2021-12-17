import { useContext } from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { LanguageContext } from './context';
import { Languages } from './types';

const StyledLanguageSelector = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

export const LanguageSelector = () => {
    const ctx = useContext(LanguageContext);

    return (
        <StyledLanguageSelector
            onClick={() => {
                if (ctx.setSelectedLanguage) {
                    if (ctx.selectedLanguage === Languages.EN) {
                        ctx.setSelectedLanguage(Languages.MT);
                    } else {
                        ctx.setSelectedLanguage(Languages.EN);
                    }
                } else {
                    console.error('Context not found!');
                }
            }}
        >
            {ctx.selectedLanguage === Languages.EN ? (
                <>
                    <Typography>MT</Typography>
                    <Typography underline>EN</Typography>
                </>
            ) : (
                <>
                    <Typography underline>MT</Typography>
                    <Typography>EN</Typography>
                </>
            )}
        </StyledLanguageSelector>
    );
};
