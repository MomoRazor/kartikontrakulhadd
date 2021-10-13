import { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { Typography } from './Typography';

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Form = () => {
    const [name, setName] = useState('');

    return (
        <StyledForm>
            <Typography englishText="Hey you." malteseText="Aw int." />
            <Typography englishText="What's your name?" malteseText="X'jismek?" />
            <Input value={name} onChange={setName} />
        </StyledForm>
    );
};
