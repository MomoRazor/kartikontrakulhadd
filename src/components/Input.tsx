import styled from 'styled-components';

export interface IInput {
    value: string;
    onChange: (newString: string) => void;
}

const StyledInput = styled.input`
    display: flex;
    border-radius: 5px;
    background-color: white;
    border: none;
`;

export const Input = (props: IInput) => {
    return <StyledInput value={props.value} onChange={(e) => props.onChange(e.target.value)} />;
};
