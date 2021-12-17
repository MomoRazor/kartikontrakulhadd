import { useCallback, useContext, useEffect, useState } from 'react';
import { useResize } from '../hooks';
import {
    LanguageContext,
    Fonts,
    FullPage,
    TopBar,
    Content,
    FlexImage,
    Form,
    Languages,
    Popup,
    Column
} from '../components';
import { getErrorMsg, primaryColor } from '../config';
import Image from '../assets/nolabels.png';
import MalteseImage from '../assets/mt.png';
import EnglishImage from '../assets/en.png';
import { getDeliveryPrice, getPricePerBox, getStockNumber } from '../api';

export const Home = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [price, setPrice] = useState('0.00');
    const [delivery, setDelivery] = useState(true);
    const [loading, setLoading] = useState(true);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [locality, setLocality] = useState('');
    const [postCode, setPostCode] = useState('');
    const [deliveryNote, setDeliveryNote] = useState('');

    const mobile = useResize();
    const { selectedLanguage } = useContext(LanguageContext);

    const [imageSrc, setImageSrc] = useState('');

    const [paymentPopup, setPaymentPopup] = useState(false);
    const [thankyouPopup, setThankyouPopup] = useState(false);
    const [failedPurchase, setFailedPurchase] = useState(false);

    const [submitted, setSubmitted] = useState(false);

    const [popupError, setPopupError] = useState('');

    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [pricePerBox, setPricePerBox] = useState(0);
    const [inStock, setInStock] = useState(1);
    const [globalError, setGlobalError] = useState(false);

    useEffect(() => {
        if (globalError) {
            setPopupError(
                getErrorMsg(
                    selectedLanguage,
                    "We've hit a snag! Tell us so we can fix it!",
                    'Inqalat xi nejka! Għidilna ħa nirranġaw malajr!'
                )
            );
        } else {
            setPopupError('');
        }
    }, [globalError, selectedLanguage]);

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getDeliveryPrice();
            await setDeliveryPrice(result);
            const result2 = await getPricePerBox();
            await setPricePerBox(result2);
            const result3 = await getStockNumber();
            await setInStock(result3);
            setGlobalError(false);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setGlobalError(true);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        if (selectedLanguage === Languages.EN) {
            setImageSrc(EnglishImage);
        } else if (selectedLanguage === Languages.MT) {
            setImageSrc(MalteseImage);
        }
    }, [mobile, selectedLanguage]);

    const onPopupClose = () => {
        if (paymentPopup) {
            setPaymentPopup(false);
        } else if (thankyouPopup) {
            setThankyouPopup(false);
        } else if (failedPurchase) {
            setFailedPurchase(false);
        }
    };

    const clearOrder = () => {
        setSubmitted(false);
        setName('');
        setSurname('');
        setEmail('');
        setMobileNumber('');
        setAmount('');
        setDelivery(true);
        setAddressLine1('');
        setAddressLine2('');
        setLocality('');
        setPostCode('');
        setDeliveryNote('');
        setPrice('0.00');
    };

    return (
        <>
            <Fonts />
            <FullPage backgroundColor={primaryColor}>
                <TopBar />
                <Content>
                    <Column>
                        <FlexImage
                            src={Image}
                            width="65vw"
                            minWidth="600px"
                            margin={mobile ? '0 0 0 20px' : '0'}
                            alt="Main Image"
                        >
                            <FlexImage
                                src={imageSrc}
                                width="35%"
                                minWidth="280px"
                                maxWidth="380px"
                                alt="Labels"
                                position="absolute"
                                margin={mobile ? '0 0 0 30px' : '0 0 0 50px'}
                                top={mobile ? '48%' : '53%'}
                            />
                        </FlexImage>
                    </Column>
                    <Form
                        loading={loading}
                        inStock={inStock}
                        deliveryPrice={deliveryPrice}
                        pricePerBox={pricePerBox}
                        setPopupError={setPopupError}
                        submitted={submitted}
                        setSubmitted={setSubmitted}
                        name={name}
                        setName={setName}
                        surname={surname}
                        setSurname={setSurname}
                        email={email}
                        setEmail={setEmail}
                        mobileNumber={mobileNumber}
                        setMobileNumber={setMobileNumber}
                        amount={amount}
                        setAmount={setAmount}
                        price={price}
                        setPrice={setPrice}
                        delivery={delivery}
                        setDelivery={setDelivery}
                        addressLine1={addressLine1}
                        setAddressLine1={setAddressLine1}
                        addressLine2={addressLine2}
                        setAddressLine2={setAddressLine2}
                        locality={locality}
                        setLocality={setLocality}
                        postCode={postCode}
                        setPostCode={setPostCode}
                        deliveryNote={deliveryNote}
                        setDeliveryNote={setDeliveryNote}
                        setPaymentPopup={setPaymentPopup}
                    />
                </Content>
                <Popup
                    inStock={inStock}
                    popupError={popupError}
                    purchase={paymentPopup}
                    setPurchase={setPaymentPopup}
                    thankyou={thankyouPopup}
                    setThankyou={setThankyouPopup}
                    failedPurchase={failedPurchase}
                    setFailedPurchase={setFailedPurchase}
                    onClose={onPopupClose}
                    clearOrder={clearOrder}
                    orderData={{
                        name,
                        surname,
                        email,
                        mobileNumber,
                        amount: parseInt(amount),
                        delivery,
                        addressLine1,
                        addressLine2,
                        locality,
                        postCode,
                        deliveryNote
                    }}
                />
            </FullPage>
        </>
    );
};
