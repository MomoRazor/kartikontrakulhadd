import { useContext } from 'react';
import styled from 'styled-components';
import { primaryColor } from '../config';
import { LanguageContext, Languages } from './language';
import { Spacer } from './Spacer';

export interface IInput extends IStyledInput {
    placeholder?: string;
    placeholderEn?: string;
    placeholderMt?: string;
    value: string;
    type?: string;
    error?: string;
    onChange?: (newString: string) => void;
    min?: number;
}

interface IStyledInput {
    width?: string;
}

const StyledInput = styled.input<IStyledInput>`
    width: ${({ width }) => (width ? width : '')};
    height: 20px;
    display: flex;
    border-radius: 5px;
    background-color: white;
    border: none;
    font-family: 'Crete Round', serif;
    color: ${primaryColor};
    padding: 10px;

    :focus {
        outline: none;
        border: none;
    }

    ::placeholder {
        color: ${primaryColor};
        opacity: 0.6;
    }

    :-ms-input-placeholder {
        color: ${primaryColor};
    }

    ::-ms-input-placeholder {
        color: ${primaryColor};
    }
`;

const StyledSmall = styled.small`
    color: red;
`;

export const Input = (props: IInput) => {
    const language = useContext(LanguageContext);

    const getPlaceHolder = () => {
        if (props.placeholder) {
            return props.placeholder;
        } else if (language.selectedLanguage === Languages.EN) {
            return props.placeholderEn;
        } else if (language.selectedLanguage === Languages.MT) {
            return props.placeholderMt;
        } else {
            return props.placeholder;
        }
    };

    return (
        <>
            <StyledInput
                min={props.min}
                width={props.width}
                type={props.type}
                value={props.value}
                readOnly={!props.onChange}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
                placeholder={getPlaceHolder()}
            />

            {props.error ? (
                <>
                    <Spacer height="5px" />
                    <StyledSmall>{props.error}</StyledSmall>{' '}
                </>
            ) : (
                <></>
            )}
        </>
    );
};
