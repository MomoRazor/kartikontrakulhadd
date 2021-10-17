import { useCallback, useContext, useEffect, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import styled from 'styled-components';
import { deliveryPrice, pricePerBox, validateEmail } from '../config';
import { useResize } from '../hooks';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Hr } from './Hr';
import { Input } from './Input';
import { LanguageContext, Languages } from './language';
import { Spacer } from './Spacer';
import { Typography } from './Typography';

interface IForm {
    setPaymentPopup: (newBoolean: boolean) => void;
    name: string;
    setName: (newString: string) => void;
    surname: string;
    setSurname: (newString: string) => void;
    email: string;
    setEmail: (newString: string) => void;
    amount: string;
    setAmount: (newString: string) => void;
    delivery: boolean;
    setDelivery: (newBoolean: boolean) => void;
    addressLine1: string;
    setAddressLine1: (newString: string) => void;
    addressLine2: string;
    setAddressLine2: (newString: string) => void;
    localityCode: string;
    setLocalityCode: (newString: string) => void;
    price: string;
    setPrice: (newString: string) => void;
}

interface IStyledForm {
    mobile: boolean;
}

const StyledForm = styled.div<IStyledForm>`
    margin-left: ${({ mobile }) => (!mobile ? '-100px' : '')};
    display: flex;
    flex-direction: column;
    width: ${({ mobile }) => (mobile ? '80%' : '25%')};
    z-index: 4;
`;

interface IStyledRow {
    justifyContent?: string;
}

const StyledRow = styled.div<IStyledRow>`
    display: flex;
    flex-direction: row;
    justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'space-between')};
    align-items: center;
    width: 100%;
`;

interface IStyledColumn {
    width?: string;
    minWidth?: string;
}

const StyledColumn = styled.div<IStyledColumn>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: ${({ width }) => (width ? width : '50%')};
    min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
`;

export const Form = (props: IForm) => {
    const mobile = useResize();
    const language = useContext(LanguageContext);

    const [submitted, setSubmitted] = useState(false);
    const [verified, setVerified] = useState(false);

    const [errorName, setErrorName] = useState('');
    const [errorSurname, setErrorSurname] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorAmount, setErrorAmount] = useState('');

    const [errorAddressLine1, setErrorAddressLine1] = useState('');
    const [errorAddressLine2, setErrorAddressLine2] = useState('');
    const [errorLocalityCode, setErrorLocalityCode] = useState('');

    const [generalError, setGeneralError] = useState('');

    const totalPrice = () => {
        if (props.delivery) {
            if (props.price !== '') {
                let newPrice = parseFloat(props.price);
                if (newPrice > 0) {
                    return (newPrice + deliveryPrice).toFixed(2);
                } else {
                    return props.price;
                }
            } else {
                return '';
            }
        } else {
            return props.price;
        }
    };

    const getErrorMsg = useCallback(
        (englishText?: string, malteseText?: string) => {
            if (language.selectedLanguage === Languages.EN) {
                return englishText || 'Required';
            } else if (language.selectedLanguage === Languages.MT) {
                return malteseText || 'Insejt din';
            } else {
                return '';
            }
        },
        [language.selectedLanguage]
    );

    const submitPayment = () => {
        let error = validate();

        setSubmitted(true);

        if (!verified) {
            error = true;
            setGeneralError(
                getErrorMsg(
                    'Recaptcha Failed! Try again later',
                    'Problema bir-Recaptcha! Prova iktar tard!'
                )
            );
        } else {
            setGeneralError('');
        }

        if (!error) {
            props.setPaymentPopup(true);
        }
    };

    const validate = useCallback(() => {
        let error = false;

        if (props.name === '') {
            error = true;
            setErrorName(getErrorMsg());
        } else {
            setErrorName('');
        }

        if (props.surname === '') {
            error = true;
            setErrorSurname(getErrorMsg());
        } else {
            setErrorSurname('');
        }

        if (props.email === '') {
            error = true;
            setErrorEmail(getErrorMsg());
        } else {
            if (!validateEmail(props.email)) {
                error = true;
                setErrorEmail(
                    language.selectedLanguage === Languages.EN
                        ? 'Invalid Email'
                        : language.selectedLanguage === Languages.MT
                        ? 'Indirizz Invalidu'
                        : ''
                );
            } else {
                setErrorEmail('');
            }
        }

        if (props.amount === '') {
            error = true;
            setErrorAmount(getErrorMsg());
        } else {
            setErrorAmount('');
        }

        if (props.addressLine1 === '') {
            error = true;
            setErrorAddressLine1(getErrorMsg());
        } else {
            setErrorAddressLine1('');
        }

        if (props.addressLine2 === '') {
            error = true;
            setErrorAddressLine2(getErrorMsg());
        } else {
            setErrorAddressLine2('');
        }

        if (props.localityCode === '') {
            error = true;
            setErrorLocalityCode(getErrorMsg());
        } else {
            setErrorLocalityCode('');
        }

        return error;
    }, [
        props.addressLine1,
        props.addressLine2,
        props.amount,
        props.email,
        getErrorMsg,
        language.selectedLanguage,
        props.localityCode,
        props.name,
        props.surname
    ]);

    useEffect(() => {
        if (submitted) {
            validate();
        }
    }, [validate, submitted]);

    return (
        <StyledForm mobile={mobile}>
            <Typography fontSize="20px" englishText="Hey you." malteseText="Haw' int." />
            <Typography fontSize="20px" englishText="What's your name?" malteseText="X'jismek?" />
            <Spacer height="10px" />
            <Input
                value={props.name}
                onChange={props.setName}
                placeholderEn="Name"
                placeholderMt="Isem"
                error={errorName}
            />
            <Spacer height="10px" />
            <Input
                value={props.surname}
                onChange={props.setSurname}
                placeholderEn="Surname"
                placeholderMt="Kunjom"
                error={errorSurname}
            />
            <Spacer height="10px" />
            <Input
                value={props.email}
                onChange={props.setEmail}
                placeholder="Email"
                error={errorEmail}
            />
            <Spacer height="10px" />
            <Hr />
            <Spacer height="10px" />
            <StyledRow>
                <StyledColumn width="75%">
                    <Typography
                        fontSize="20px"
                        englishText="How many boxes in your order?"
                        malteseText="Kemm trid kaxxi fl-ordni tiegħek?"
                    />
                </StyledColumn>
                <StyledColumn width="auto">
                    <Input
                        error={errorAmount}
                        type="number"
                        placeholderEn="69.. nice"
                        placeholderMt="69.. najs"
                        value={props.amount}
                        width="65px"
                        onChange={(value) => {
                            props.setAmount(value);
                            if (value !== '') {
                                props.setPrice((pricePerBox * parseInt(value)).toFixed(2));
                            } else {
                                props.setPrice('');
                            }
                        }}
                    />
                </StyledColumn>
            </StyledRow>
            <Spacer height="10px" />
            <Hr />
            <Spacer height="10px" />
            <StyledRow justifyContent="flex-left">
                <StyledColumn width="25%" minWidth="50px">
                    <Checkbox value={props.delivery} onChange={props.setDelivery} />
                </StyledColumn>
                <StyledColumn width="75%">
                    <StyledRow>
                        <Typography
                            fontSize="20px"
                            malteseText="Inwassluwulek? (+€10)"
                            englishText="Delivery? (+€10)"
                        />
                    </StyledRow>
                    <StyledRow>
                        <Typography
                            malteseText="(Ikun għandek ftit jiem oħra, nużaw is-servizz tal-Maltapost)"
                            englishText="(Should arrive in a matter of days. We use the Maltapost services)"
                        />
                    </StyledRow>
                </StyledColumn>
            </StyledRow>
            <Spacer height="20px" />
            <StyledRow justifyContent="flex-left">
                <StyledColumn width="25%" minWidth="50px">
                    <Checkbox
                        value={!props.delivery}
                        onChange={(value) => {
                            props.setDelivery(!value);
                        }}
                    />
                </StyledColumn>
                <StyledColumn width="75%">
                    <StyledRow>
                        <Typography
                            fontSize="20px"
                            malteseText="Tinżel għalih?"
                            englishText="Pickup?"
                        />
                    </StyledRow>
                    <StyledRow>
                        <Typography
                            malteseText="(Segwi il-midja soċjali tagħna biex tkun taf meta tista tiġi għalih. Jista' jkun għada, jista jkun ix-xahar id-dieħel)"
                            englishText="(Follow our social media profiles for the next available pickup date, could be tomorrow, could be next month)"
                        />
                    </StyledRow>
                </StyledColumn>
            </StyledRow>
            <Spacer height="10px" />
            <Hr />
            <Spacer height="10px" />
            {props.delivery ? (
                <>
                    <Typography fontSize="20px" englishText="Address" malteseText="Indirizz" />
                    <Spacer height="10px" />
                    <Input
                        error={errorAddressLine1}
                        value={props.addressLine1}
                        onChange={props.setAddressLine1}
                        placeholderMt="Indirizz 1"
                        placeholderEn="Address line 1"
                    />
                    <Spacer height="10px" />
                    <Input
                        error={errorAddressLine2}
                        value={props.addressLine2}
                        onChange={props.setAddressLine2}
                        placeholderMt="Indirizz 2"
                        placeholderEn="Address line 2"
                    />
                    <Spacer height="10px" />
                    <Input
                        error={errorLocalityCode}
                        value={props.localityCode}
                        onChange={props.setLocalityCode}
                        placeholderEn="Locality / Post Code"
                        placeholderMt="Lokalita' / Kodiċi Postali"
                    />
                    <Spacer height="10px" />
                    <Hr />
                    <Spacer height="10px" />
                </>
            ) : (
                <></>
            )}
            {generalError ? <Typography color="red">{generalError}</Typography> : <></>}
            <StyledRow>
                <Typography
                    fontSize="20px"
                    englishText={'Total price: €' + totalPrice()}
                    malteseText={'Ħsara totali: €' + totalPrice()}
                />
                <Button onClick={submitPayment} englishText="Checkout" malteseText="Ħallas" />
            </StyledRow>
            <GoogleReCaptcha
                onVerify={() => {
                    setVerified(true);
                }}
            />
            <Spacer height="40px" />
        </StyledForm>
    );
};
