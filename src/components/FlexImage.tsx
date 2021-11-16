import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IFlexImage extends IStyledDiv {
    src: any;
    alt: string;
    children?: ReactNode;
    newTab?: boolean;
}

interface IStyledDiv extends IStyledImage {
    to?: string;
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
    height: ${({ height }) => height};
    border-radius: ${({ borderRadius }) => borderRadius};
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

interface IStyledImage {
    width?: string;
    height?: string;
    borderRadius?: string;
}

const StyledImage = styled.img<IStyledImage>`
    width: ${({ width }) => (width ? '100%' : undefined)};
    height: ${({ height }) => (height ? '100%' : undefined)};
    border-radius: ${({ borderRadius }) => borderRadius};
`;

export const FlexImage = ({ src, alt, ...props }: IFlexImage) => {
    const restOfStuff = () => (
        <>
            <StyledImage
                borderRadius={props.borderRadius}
                src={src}
                alt={alt}
                width={props.width}
                height={props.height}
            />
            {props.children}
        </>
    );

    return (
        <StyledDiv {...props}>
            {props.to ? (
                <a
                    href={props.to}
                    target={props.newTab ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    {restOfStuff()}
                </a>
            ) : (
                restOfStuff()
            )}
        </StyledDiv>
    );
};
