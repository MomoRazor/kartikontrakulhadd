import { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContext, Languages } from './language';

export interface ITypography extends IP {
    englishText?: string;
    malteseText?: string;
    children?: string;
}

interface IP {
    underline?: boolean;
    margin?: string;
    padding?: string;
    fontSize?: string;
    color?: string;
}

const StyledP = styled.p<IP>`
    margin: 0;
    padding: 0;
    display: flex;
    color: ${({ color }) => (color ? color : 'white')};
    font-family: 'Crete Round', serif;
    font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
    margin: ${({ margin }) => margin || 0};
    padding: ${({ padding }) => padding || 0};
    text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

export const Typography = ({ children, englishText, malteseText, ...props }: ITypography) => {
    const language = useContext(LanguageContext);

    return (
        <StyledP {...props}>
            {children
                ? children
                : language.selectedLanguage === Languages.EN
                ? englishText
                : language.selectedLanguage === Languages.MT
                ? malteseText
                : 'No Text Entered'}
        </StyledP>
    );
};
