import styled from 'styled-components';
import { primaryColor } from '../config';
import { Typography } from './Typography';

export interface IButton {
    onClick: () => void;
    malteseText: string;
    englishText: string;
}

const StyledDiv = styled.div`
    background-color: white;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
`;

export const Button = (props: IButton) => (
    <StyledDiv onClick={props.onClick}>
        <Typography
            color={primaryColor}
            englishText={props.englishText}
            malteseText={props.malteseText}
        />
    </StyledDiv>
);
