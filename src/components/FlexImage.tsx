import styled from 'styled-components';

export interface IFlexImage extends IStyledDiv {
    src: any;
    alt: string;
}

interface IStyledDiv {
    width: string;
    maxWidth?: string;
    padding?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    width: ${({ width }) => width};
    max-width: ${({ maxWidth }) => maxWidth};
    padding: ${({ padding }) => padding};
`;

const StyledImage = styled.img`
    width: 100%;
    object-fit: contain;
`;

export const FlexImage = ({ src, alt, ...props }: IFlexImage) => (
    <StyledDiv {...props}>
        <StyledImage src={src} alt={alt} />
    </StyledDiv>
);
