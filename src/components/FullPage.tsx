import { ReactNode } from 'react';
import styled from 'styled-components';
import { QuadSpinner } from './QuadSpinner';

export interface IFullPage extends IStyledDiv {
    children: ReactNode;
    loading: boolean;
}

export interface IStyledDiv {
    backgroundColor: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    min-width: 100vw;
    min-height: 100vh;
    background-color: ${({ backgroundColor }) => backgroundColor};
    justify-content: center;
    box-sizing: border-box;
    overflow-x: none;
`;

export const FullPage = (props: IFullPage) => (
    <StyledDiv backgroundColor={props.backgroundColor}>
        {props.loading ? <QuadSpinner /> : props.children}
    </StyledDiv>
);
