import styled from 'styled-components';

export interface IHr {
    color?: string;
    width?: string;
}

const StyledHr = styled.hr<IHr>`
    margin: 10px 0 0 0;
    display: flex;
    border-color: ${({ color }) => (color ? color : 'rgba(255, 255, 255, 0.2)')};
    width: ${({ width }) => (width ? width : '100%')};
`;

export const Hr = (props: IHr) => <StyledHr {...props} />;
