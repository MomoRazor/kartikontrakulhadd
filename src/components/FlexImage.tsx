import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IFlexImage extends IStyledDiv {
    src: any;
    alt: string;
    children?: ReactNode;
    newTab?: boolean;
}

interface IStyledDiv {
    to?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    padding?: string;
    color?: string;
    position?: string;
    top?: string;
    left?: string;
    margin?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    width: ${({ width }) => width};
    max-width: ${({ maxWidth }) => maxWidth};
    min-width: ${({ minWidth }) => minWidth};
    padding: ${({ padding }) => padding};
    margin: ${({ margin }) => margin};
    top: ${({ top }) => top};
    left: ${({ left }) => left};
    color: ${({ color }) => color};
    position: ${({ position }) => (position ? position : 'relative')};
    justify-content: center;
`;

const StyledImage = styled.img`
    width: 100%;
`;

export const FlexImage = ({ src, alt, ...props }: IFlexImage) => {
    const restOfStuff = () => (
        <>
            <StyledImage src={src} alt={alt} />
            {props.children}
        </>
    );

    return (
        <StyledDiv {...props}>
            {props.to ? (
                <a href={props.to} target={props.newTab ? '_blank' : undefined} rel="noreferrer">
                    {restOfStuff()}
                </a>
            ) : (
                restOfStuff()
            )}
        </StyledDiv>
    );
};
