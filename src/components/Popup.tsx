import { ReactNode } from 'react';
import styled from 'styled-components';
import { secondaryColor } from '../config';
import { useResize } from '../hooks';

export interface IPopup {
    children: ReactNode;
}

const StyledBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    z-index: 20;
`;

interface IStyledDiv {
    width?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    background-color: ${secondaryColor};
    width: ${({ width }) => (width ? width : '')};
    border-radius: 20px;
    padding: 20px;
    box-shadow: -1px 0px 21px 3px rgba(0, 0, 0, 0.76);
`;

export const Popup = (props: IPopup) => {
    const mobile = useResize();

    return (
        <StyledBackground>
            <StyledDiv width={mobile ? '80%' : '40%'}>{props.children}</StyledDiv>
        </StyledBackground>
    );
};
