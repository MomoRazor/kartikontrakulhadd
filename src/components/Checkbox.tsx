import styled from 'styled-components';
import X from '../assets/x.png';
import { primaryColor } from '../config';
import { FlexImage } from './FlexImage';

export interface ICheckbox {
    value: boolean;
    onChange: (newValue: boolean) => void;
}

const StyledBox = styled.div`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: white;
    cursor: pointer;
    justify-content: center;
    align-items: center;
`;

export const Checkbox = (props: ICheckbox) => (
    <StyledBox
        onClick={() => {
            props.onChange(!props.value);
        }}
    >
        {props.value ? (
            <FlexImage color={primaryColor} src={X} alt="X!" width="30px" borderRadius="4px" />
        ) : (
            <></>
        )}
    </StyledBox>
);
