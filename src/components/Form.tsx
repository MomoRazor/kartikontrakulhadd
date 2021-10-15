import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { deliveryPrice, pricePerBox, submitOrderEmail, validateEmail } from '../config';
import { useResize } from '../hooks';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Hr } from './Hr';
import { Input } from './Input';
import { LanguageContext, Languages } from './language';
import { Spacer } from './Spacer';
import { Typography } from './Typography';

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

export const Form = () => {
    const mobile = useResize();
    const language = useContext(LanguageContext);

    const [submitted, setSubmitted] = useState(false);

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [surname, setSurname] = useState('');
    const [errorSurname, setErrorSurname] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [errorAmount, setErrorAmount] = useState('');
    const [price, setPrice] = useState('0.00');
    const [delivery, setDelivery] = useState(true);
    const [pickup, setPickup] = useState(false);

    const [addressLine1, setAddressLine1] = useState('');
    const [errorAddressLine1, setErrorAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [errorAddressLine2, setErrorAddressLine2] = useState('');
    const [localityCode, setLocalityCode] = useState('');
    const [errorLocalityCode, setErrorLocalityCode] = useState('');

    const tickDelivery = (value: boolean) => {
        setDelivery(value);
        setPickup(!value);
    };

    const tickPickup = (value: boolean) => {
        setDelivery(!value);
        setPickup(value);
    };

    const totalPrice = () => {
        if (delivery) {
            if (price !== '') {
                let newPrice = parseFloat(price);
                if (newPrice > 0) {
                    return (newPrice + deliveryPrice).toFixed(2);
                } else {
                    return price;
                }
            } else {
                return '';
            }
        } else {
            return price;
        }
    };

    const getErrorMsg = useCallback(() => {
        if (language.selectedLanguage === Languages.EN) {
            return 'Required';
        } else if (language.selectedLanguage === Languages.MT) {
            return 'Insejt din';
        } else {
            return '';
        }
    }, [language.selectedLanguage]);

    const submitPayment = () => {
        let error = validate();

        setSubmitted(true);

        if (!error) {
            submitOrderEmail({
                name,
                surname,
                email,
                amount: parseInt(amount),
                price: parseInt(totalPrice()),
                delivery,
                addressLine1,
                addressLine2,
                localityCode
            });
        }
    };

    const validate = useCallback(() => {
        let error = false;

        if (name === '') {
            error = true;
            setErrorName(getErrorMsg());
        } else {
            setErrorName('');
        }

        if (surname === '') {
            error = true;
            setErrorSurname(getErrorMsg());
        } else {
            setErrorSurname('');
        }

        if (email === '') {
            error = true;
            setErrorEmail(getErrorMsg());
        } else {
            if (!validateEmail(email)) {
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

        if (amount === '') {
            error = true;
            setErrorAmount(getErrorMsg());
        } else {
            setErrorAmount('');
        }

        if (addressLine1 === '') {
            error = true;
            setErrorAddressLine1(getErrorMsg());
        } else {
            setErrorAddressLine1('');
        }

        if (addressLine2 === '') {
            error = true;
            setErrorAddressLine2(getErrorMsg());
        } else {
            setErrorAddressLine1('');
        }

        if (localityCode === '') {
            error = true;
            setErrorLocalityCode(getErrorMsg());
        } else {
            setErrorLocalityCode('');
        }

        return error;
    }, [
        addressLine1,
        addressLine2,
        amount,
        email,
        getErrorMsg,
        language.selectedLanguage,
        localityCode,
        name,
        surname
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
                value={name}
                onChange={setName}
                placeholderEn="Name"
                placeholderMt="Isem"
                error={errorName}
            />
            <Spacer height="10px" />
            <Input
                value={surname}
                onChange={setSurname}
                placeholderEn="Surname"
                placeholderMt="Kunjom"
                error={errorSurname}
            />
            <Spacer height="10px" />
            <Input value={email} onChange={setEmail} placeholder="Email" error={errorEmail} />
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
                        value={amount}
                        width="65px"
                        onChange={(value) => {
                            setAmount(value);
                            if (value !== '') {
                                setPrice((pricePerBox * parseInt(value)).toFixed(2));
                            } else {
                                setPrice('');
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
                    <Checkbox value={delivery} onChange={tickDelivery} />
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
                    <Checkbox value={pickup} onChange={tickPickup} />
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
            {delivery ? (
                <>
                    <Typography fontSize="20px" englishText="Address" malteseText="Indirizz" />
                    <Spacer height="10px" />
                    <Input
                        error={errorAddressLine1}
                        value={addressLine1}
                        onChange={setAddressLine1}
                        placeholderMt="Indirizz 1"
                        placeholderEn="Address line 1"
                    />
                    <Spacer height="10px" />
                    <Input
                        error={errorAddressLine2}
                        value={addressLine2}
                        onChange={setAddressLine2}
                        placeholderMt="Indirizz 2"
                        placeholderEn="Address line 2"
                    />
                    <Spacer height="10px" />
                    <Input
                        error={errorLocalityCode}
                        value={localityCode}
                        onChange={setLocalityCode}
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
            <StyledRow>
                <Typography
                    fontSize="20px"
                    englishText={'Total price: €' + totalPrice()}
                    malteseText={'Ħsara totali: €' + totalPrice()}
                />
                <Button onClick={submitPayment} englishText="Checkout" malteseText="Ħallas" />
            </StyledRow>
            <Spacer height="40px" />
        </StyledForm>
    );
};
