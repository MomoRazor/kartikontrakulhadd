import { useCallback, useContext, useEffect, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import styled from 'styled-components';
import { getDeliveryPrice, getPricePerBox } from '../api';
import { validateEmail } from '../config';
import { useResize } from '../hooks';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Column } from './Column';
import { FlexImage } from './FlexImage';
import { Hr } from './Hr';
import { Input } from './Input';
import { LanguageContext, Languages } from './language';
import { Row } from './Row';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import Facebook from '../assets/socials-07.png';
import Instagram from '../assets/socials-08.png';
import { TextArea } from './TextArea';

interface IForm {
    setPopupError: (newError: string) => void;
    setPaymentPopup: (newBoolean: boolean) => void;
    name: string;
    setName: (newString: string) => void;
    surname: string;
    setSurname: (newString: string) => void;
    email: string;
    setEmail: (newString: string) => void;
    mobileNumber: string;
    setMobileNumber: (newString: string) => void;
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
    deliveryNote: string;
    setDeliveryNote: (newString: string) => void;
    price: string;
    setPrice: (newString: string) => void;
    submitted: boolean;
    setSubmitted: (newBoolean: boolean) => void;
}

interface IStyledForm {
    mobile: boolean;
}

const StyledForm = styled.div<IStyledForm>`
    margin-top: ${({ mobile }) => (!mobile ? '40px' : '')};
    margin-left: ${({ mobile }) => (!mobile ? '-100px' : '')};
    display: flex;
    flex-direction: column;
    width: ${({ mobile }) => (mobile ? '80%' : '25%')};
    z-index: 4;
`;

export const Form = ({ setPopupError, ...props }: IForm) => {
    const mobile = useResize();
    const language = useContext(LanguageContext);

    const [verified, setVerified] = useState(process.env.NODE_ENV === 'production' ? false : true);

    const [errorName, setErrorName] = useState('');
    const [errorSurname, setErrorSurname] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMobileNumber, setErrorMobileNumber] = useState('');
    const [errorAmount, setErrorAmount] = useState('');

    const [errorAddressLine1, setErrorAddressLine1] = useState('');
    const [errorAddressLine2, setErrorAddressLine2] = useState('');
    const [errorLocalityCode, setErrorLocalityCode] = useState('');

    const [globalError, setGlobalError] = useState(false);

    const [generalError, setGeneralError] = useState('');

    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [pricePerBox, setPricePerBox] = useState(0);

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

    useEffect(() => {
        if (globalError) {
            setPopupError(
                getErrorMsg(
                    "We've hit a snag! Tell us so we can fix it!",
                    'Inqalat xi nejka! Għidilna ħa nirranġaw malajr!'
                )
            );
        } else {
            setPopupError('');
        }
    }, [getErrorMsg, globalError, setPopupError]);

    const getData = useCallback(async () => {
        try {
            const result = await getDeliveryPrice();
            await setDeliveryPrice(result);
            const result2 = await getPricePerBox();
            await setPricePerBox(result2);
            setGlobalError(false);
        } catch (e) {
            console.error(e);
            setGlobalError(true);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

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
                return '0.00';
            }
        } else {
            return props.price;
        }
    };

    const submitPayment = () => {
        let error = validate();

        props.setSubmitted(true);

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

        if (props.mobileNumber === '') {
            error = true;
            setErrorMobileNumber(getErrorMsg());
        } else {
            if (props.mobileNumber.length < 8) {
                error = true;
                setErrorMobileNumber(
                    language.selectedLanguage === Languages.EN
                        ? 'Invalid Number'
                        : language.selectedLanguage === Languages.MT
                        ? 'Numru Invalidu'
                        : ''
                );
            } else {
                setErrorMobileNumber('');
            }
        }

        if (props.amount === '') {
            error = true;
            setErrorAmount(getErrorMsg());
        } else {
            if (parseFloat(props.amount) < 0) {
                error = true;
                setErrorAmount(
                    language.selectedLanguage === Languages.EN
                        ? 'Invalid Number'
                        : language.selectedLanguage === Languages.MT
                        ? 'Numru Invalidu'
                        : ''
                );
            } else {
                setErrorAmount('');
            }
        }

        if (props.delivery) {
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
        }

        return error;
    }, [
        props.name,
        props.surname,
        props.email,
        props.mobileNumber,
        props.amount,
        props.delivery,
        props.addressLine1,
        props.addressLine2,
        props.localityCode,
        getErrorMsg,
        language.selectedLanguage
    ]);

    useEffect(() => {
        if (props.submitted) {
            validate();
        } else {
            clearErrors();
        }
    }, [validate, props.submitted]);

    const clearErrors = () => {
        setErrorName('');
        setErrorSurname('');
        setErrorEmail('');
        setErrorMobileNumber('');
        setErrorAmount('');

        setErrorAddressLine1('');
        setErrorAddressLine2('');
        setErrorLocalityCode('');
    };

    return (
        <StyledForm mobile={mobile}>
            <Typography fontSize="20px" englishText="Hey you." malteseText="Haw' int." />
            <Typography
                fontSize="20px"
                englishText="Heard you want Karti Kontra Kulħadd."
                malteseText="Smajna li trid Karti Kontra Kulħadd."
            />
            <Spacer height="15px" />
            <Typography
                fontSize="20px"
                englishText="Who the f*ck are you?"
                malteseText="Min iż-ż*bb int?"
            />
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
            <Input
                value={props.mobileNumber}
                onChange={props.setMobileNumber}
                placeholderEn="Mobile Number (WhatsApp)"
                placeholderMt="Numru tal-Mobile (WhatsApp)"
                error={errorMobileNumber}
                type="number"
            />
            <Spacer height="10px" />
            <Hr />
            <Spacer height="10px" />
            <Row justifyContent="space-between">
                <Column width="75%" justifyContent="center">
                    <Typography
                        fontSize="20px"
                        englishText="How many boxes in your order?"
                        malteseText="Kemm trid kaxxi fl-ordni tiegħek?"
                    />
                </Column>
                <Column width="auto" justifyContent="center">
                    <Input
                        error={errorAmount}
                        type="number"
                        placeholder="69..."
                        value={props.amount}
                        min={0}
                        width="65px"
                        onChange={(value) => {
                            props.setAmount(value);
                            if (value !== '') {
                                const totalPrice = pricePerBox * parseInt(value);
                                if (totalPrice >= 0) {
                                    props.setPrice(totalPrice.toFixed(2));
                                } else {
                                    props.setPrice('0.00');
                                }
                            } else {
                                props.setPrice('0.00');
                            }
                        }}
                    />
                </Column>
            </Row>
            <Spacer height="10px" />
            <Hr />
            <Spacer height="10px" />
            <Row justifyContent="flex-left">
                <Column width="25%" minWidth="50px">
                    <Checkbox value={props.delivery} onChange={props.setDelivery} />
                </Column>
                <Column width="75%">
                    <Row justifyContent="space-between">
                        <Typography
                            fontSize="20px"
                            malteseText={`Nġibuh aħna? (+€${deliveryPrice})`}
                            englishText={`Delivery? (+€${deliveryPrice})`}
                        />
                    </Row>
                    <Row justifyContent="space-between">
                        <Typography
                            malteseText="Jekk tagħżel din, il-logħba ħa tassallek fi żmien ftit jiem. Il-konsenni is-soltu niproċessawhom matul il-ġimgħa filgħaxija jew is-Sibt filgħodu. Aħna nżommukom infurmati bil-WhatsApp."
                            englishText="Ordering with delivery means the game will come to you in a matter of days. Deliveries are usually processed on weekday evenings or Saturday mornings. We will keep you updated via WhatsApp."
                        />
                    </Row>
                </Column>
            </Row>
            <Spacer height="20px" />
            <Row justifyContent="flex-left">
                <Column width="25%" minWidth="50px">
                    <Checkbox
                        value={!props.delivery}
                        onChange={(value) => {
                            props.setDelivery(!value);
                        }}
                    />
                </Column>
                <Column width="75%">
                    <Row justifyContent="space-between">
                        <Typography
                            fontSize="20px"
                            malteseText="Tinżel għalih? (B'xejn)"
                            englishText="Pickup? (Free)"
                        />
                    </Row>
                    <Row justifyContent="space-between">
                        <Typography
                            malteseText="Jekk tagħżel din, il-logħba trid tiġi għaliha int. Meta u fejn (ħafna drabi in-Naxxar, l-Imqabba jew is-Siġġiewi) tista tiġi ngħidulek aħna fuq il-media soċjali tagħna u anke fuq WhatsApp."
                            englishText="Ordering with pickup means you must pick up the game yourself. Pickup days and locations (usually Naxxar, Mqabba or Siġġiewi) will be communicated in advance on our socials and via WhatsApp."
                        />
                    </Row>
                </Column>
            </Row>
            <Spacer height="10px" />
            <Hr />
            <Spacer height="15px" />
            {props.delivery ? (
                <>
                    <Typography fontSize="20px" englishText="Address" malteseText="Indirizz" />
                    <Spacer height="10px" />
                    <Input
                        error={errorAddressLine1}
                        value={props.addressLine1}
                        onChange={props.setAddressLine1}
                        placeholderMt="L-ewwel linja tal-indirizz"
                        placeholderEn="Address line 1"
                    />
                    <Spacer height="10px" />
                    <Input
                        error={errorAddressLine2}
                        value={props.addressLine2}
                        onChange={props.setAddressLine2}
                        placeholderMt="It-tieni linja tal-Indirizz"
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
                    <Spacer height="15px" />
                    <Typography
                        fontSize="20px"
                        englishText="Special Requests"
                        malteseText="Talbiet Speċjali"
                    />
                    <Spacer height="10px" />
                    <TextArea
                        width="100%"
                        rows={2}
                        value={props.deliveryNote}
                        onChange={props.setDeliveryNote}
                        placeholderMt='"Delivery bla kuntatt", "Ħallih wara il-bieb l-isfar", "Extra pepperoni" etc.'
                        placeholderEn='"Contactless delivery", "Leave it at the yellow door", "Extra pepperoni" etc.'
                    />
                    <Spacer height="10px" />
                    <Hr />
                    <Spacer height="10px" />
                </>
            ) : (
                <></>
            )}
            {generalError ? <Typography color="red">{generalError}</Typography> : <></>}
            <Row justifyContent="space-between">
                <Typography
                    fontSize="20px"
                    englishText={'Total price: €' + totalPrice()}
                    malteseText={'Ħsara totali: €' + totalPrice()}
                />
                <Button onClick={submitPayment} englishText="Checkout" malteseText="Ħallas" />
            </Row>
            {process.env.NODE_ENV === 'production' ? (
                <GoogleReCaptcha
                    onVerify={() => {
                        setVerified(true);
                    }}
                />
            ) : (
                <></>
            )}
            <Spacer height="10px" />
            <Hr />
            <Spacer height="20px" />
            <Row justifyContent="flex-end">
                <FlexImage
                    alt="FacebookImg"
                    width="30px"
                    to="https://www.instagram.com/kartikontrakulhaddofficial"
                    src={Instagram}
                />
                <Spacer width="20px" />
                <FlexImage
                    alt="InstagramImg"
                    width="30px"
                    to="https://www.facebook.com/kartikontrakulhadd"
                    src={Facebook}
                />
            </Row>
            <Spacer height="40px" />
        </StyledForm>
    );
};
