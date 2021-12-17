import styled from 'styled-components';
import { primaryColor } from '../config';
import { Typography } from './Typography';

export interface IButton extends IStyledDiv {
    onClick: () => void;
    malteseText: string;
    englishText: string;
    textColor?: string;
}

interface IStyledDiv {
    backgroundColor?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'white')};
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
`;

export const Button = (props: IButton) => (
    <StyledDiv onClick={props.onClick} backgroundColor={props.backgroundColor}>
        <Typography
            color={props.textColor ? props.textColor : primaryColor}
            englishText={props.englishText}
            malteseText={props.malteseText}
        />
    </StyledDiv>
);
