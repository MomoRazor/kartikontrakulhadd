import { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContext, Languages } from './language';

export interface ITypography extends IP {
    englishText?: string;
    malteseText?: string;
    children?: string;
}

interface IP {
    margin?: string;
    padding?: string;
}

const StyledP = styled.p<IP>`
    color: white;
    font-family: 'Crete Round', serif;
    margin: ${({ margin }) => margin || 0};
    padding: ${({ padding }) => padding || 0};
`;

export const Typography = (props: ITypography) => {
    const language = useContext(LanguageContext);

    return (
        <StyledP margin={props.margin} padding={props.padding}>
            {language.selectedLanguage === Languages.EN
                ? props.englishText
                : language.selectedLanguage === Languages.MT
                ? props.malteseText
                : props.children}
        </StyledP>
    );
};
