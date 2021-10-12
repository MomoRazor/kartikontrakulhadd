import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IFullPage extends IStyledDiv {
    children: ReactNode;
}

export interface IStyledDiv {
    backgroundColor: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    width: 100vw;
    height: 100vh;
    background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const FullPage = (props: IFullPage) => (
    <StyledDiv backgroundColor={props.backgroundColor}>{props.children}</StyledDiv>
);
