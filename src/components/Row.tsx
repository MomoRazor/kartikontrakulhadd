import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IRow {
    justifyContent?: string;
    width?: string;
    children: ReactNode;
}

const StyledDiv = styled.div<IRow>`
    display: flex;
    flex-direction: row;
    justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : '')};
    align-items: center;
    width: ${({ width }) => (width ? width : '100%')};
`;

export const Row = (props: IRow) => <StyledDiv {...props} />;
