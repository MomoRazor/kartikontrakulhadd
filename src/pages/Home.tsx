import { useContext, useEffect, useState } from 'react';
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
    Popup
} from '../components';
import { primaryColor } from '../config';
import Image from '../assets/nolabels.png';
import styled from 'styled-components';
import MalteseImage from '../assets/mt.png';
import EnglishImage from '../assets/en.png';

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Home = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('0.00');
    const [delivery, setDelivery] = useState(true);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [localityCode, setLocalityCode] = useState('');

    const mobile = useResize();
    const { selectedLanguage } = useContext(LanguageContext);

    const [imageSrc, setImageSrc] = useState('');

    const [paymentPopup, setPaymentPopup] = useState(false);
    const [thankyouPopup, setThankyouPopup] = useState(false);
    const [failedPurchase, setFailedPurchase] = useState(false);

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
            //TODO CLEAR ORDER
            setThankyouPopup(false);
        } else if (failedPurchase) {
            setFailedPurchase(false);
        }
    };

    return (
        <>
            <Fonts />
            <FullPage backgroundColor={primaryColor}>
                <TopBar />
                <Content>
                    <StyledColumn>
                        <FlexImage src={Image} width="65vw" minWidth="600px" alt="Main Image">
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
                    </StyledColumn>
                    <Form
                        name={name}
                        setName={setName}
                        surname={surname}
                        setSurname={setSurname}
                        email={email}
                        setEmail={setEmail}
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
                        localityCode={localityCode}
                        setLocalityCode={setLocalityCode}
                        setPaymentPopup={setPaymentPopup}
                    />
                </Content>
                <Popup
                    amount={parseInt(amount)}
                    delivery={delivery}
                    purchase={paymentPopup}
                    thankyou={thankyouPopup}
                    setThankyou={setThankyouPopup}
                    failedPurchase={failedPurchase}
                    setFailedPurchase={setFailedPurchase}
                    onClose={onPopupClose}
                />
            </FullPage>
        </>
    );
};
