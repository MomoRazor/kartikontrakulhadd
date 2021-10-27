import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IColumn {
    height?: string;
    width?: string;
    justifyContent?: string;
    alignItems?: string;
    minWidth?: string;
    children: ReactNode;
}

const StyledDiv = styled.div<IColumn>`
    display: flex;
    flex-direction: column;
    justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : '')};
    align-items: ${({ alignItems }) => (alignItems ? alignItems : '')};
    width: ${({ width }) => (width ? width : '')};
    height: ${({ height }) => (height ? height : '')};
    min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
`;

export const Column = (props: IColumn) => <StyledDiv {...props} />;
