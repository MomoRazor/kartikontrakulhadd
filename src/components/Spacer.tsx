import styled from 'styled-components';

export interface ISpacer {
    width?: string;
    height?: string;
}

const StyledDiv = styled.div<ISpacer>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export const Spacer = (props: ISpacer) => <StyledDiv {...props} />;
