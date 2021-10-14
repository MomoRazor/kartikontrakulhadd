import { ReactNode } from 'react';
import styled from 'styled-components';
import { useResize } from '../hooks';

export interface IContent {
    children: ReactNode;
}

interface IBaseDiv {
    mobile: boolean;
}

const BaseDiv = styled.div<IBaseDiv>`
    display: flex;
    flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
    width: 100%;
    height: calc(100% - 100);
    padding: 120px 20px 0 20px;
    align-items: ${({ mobile }) => (mobile ? 'center' : '')};
    box-sizing: border-box;
`;

export const Content = (props: IContent) => {
    const mobile = useResize();

    return <BaseDiv mobile={mobile}>{props.children}</BaseDiv>;
};
