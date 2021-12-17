import styled from 'styled-components';

export interface ISpacer {
    width?: string;
    height?: string;
}

const StyledDiv = styled.div<ISpacer>`
    width: ${({ width }) => (width ? width : '20px')};
    height: ${({ height }) => (height ? height : '20px')};
`;

export const Spacer = (props: ISpacer) => <StyledDiv {...props} />;
