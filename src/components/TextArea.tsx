import { useContext } from 'react';
import styled from 'styled-components';
import { primaryColor } from '../config';
import { LanguageContext, Languages } from './language';
import { Spacer } from './Spacer';

export interface ITextArea extends IStyledTextArea {
    placeholder?: string;
    placeholderEn?: string;
    placeholderMt?: string;
    value: string;
    error?: string;
    rows?: number;
    onChange?: (newString: string) => void;
}

interface IStyledTextArea {
    width?: string;
}

const StyledTextArea = styled.textarea<IStyledTextArea>`
    width: ${({ width }) => (width ? width + ' ! important' : '')};
    display: flex;
    border-radius: 5px;
    background-color: white;
    border: none;
    font-family: 'Crete Round', serif;
    color: ${primaryColor};
    padding: 10px;
    box-sizing: border-box;

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

export const TextArea = (props: ITextArea) => {
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
            <StyledTextArea
                rows={props.rows}
                width={props.width}
                value={props.value}
                readOnly={!props.onChange}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
                placeholder={getPlaceHolder()}
            />
            <Spacer height="5px" />
            {props.error ? <StyledSmall>{props.error}</StyledSmall> : <></>}
        </>
    );
};
