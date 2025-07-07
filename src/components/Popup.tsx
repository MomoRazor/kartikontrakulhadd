import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { getErrorMsg, hexToRgb, primaryColor, secondaryColor } from '../config';
import { useResize } from '../hooks';
import { FlexImage } from './FlexImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import TitlePNG from '../assets/title.png';
import BrokenHeart from '../assets/soldout-11.png';
import Heart from '../assets/success-06.png';
import MobileSoldOut from '../assets/soldoutnew2.png';
import SoldOut from '../assets/soldoutnew1.png';
import { Column } from './Column';
import { Row } from './Row';
import { saveOrder } from '../api';
import { OrderData } from '../types';
import { PaypalAccountPay } from './PaypalAccountPay';
import { useCallback, useContext, useState } from 'react';
import { LanguageContext } from './language';
import { PAYPAL_CLIENT_ID } from '../enviornment';

export interface IPopup {
    popupError: string;
    purchase: boolean;
    setPurchase: (newBoolean: boolean) => void;
    thankyou: boolean;
    inStock: number;
    setThankyou: (newBoolean: boolean) => void;
    failedPurchase: boolean;
    setFailedPurchase: (newBoolean: boolean) => void;
    onClose: () => void;
    clearOrder: () => void;
    orderData: OrderData;
}

const StyledBackground = styled.div`
    position: fixed;
    width: 100%;
    height: calc(100% - 68px);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 68px;
    z-index: 20;
    background-color: ${hexToRgb(primaryColor, 0.8)};
`;

interface IStyledDiv {
    minHeight?: string;
    width?: string;
    maxWidth?: string;
    backgroundColor?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    background-color: ${({ backgroundColor }) =>
        backgroundColor ? backgroundColor : secondaryColor};
    width: ${({ width }) => (width ? width : '')};
    min-height: ${({ minHeight }) => (minHeight ? minHeight : '')};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
    border-radius: 20px;
    padding: 20px;
    box-shadow: -1px 0px 21px 3px rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    max-height: 70vh;
    flex-direction: column;
`;

export const Popup = ({ setPurchase, setThankyou, clearOrder, orderData, ...props }: IPopup) => {
    const mobile = useResize();
    const { selectedLanguage } = useContext(LanguageContext);

    const [afterOrderError, setAfterOrderError] = useState('');

    const sendEmails = useCallback(async () => {
        if (orderData) {
            try {
                await saveOrder(orderData);
                setPurchase(false);
                setThankyou(true);
                clearOrder();
            } catch (e) {
                console.error('Test', e);
                setPurchase(false);
                setAfterOrderError(
                    getErrorMsg(
                        selectedLanguage,
                        "We've had a problem saving you order! Contact us so you can be sure we've got your order!",
                        'Inqalat xi nejka waqt li konna qed nieħdu l-ordni! Għidilna ħalli tkun ċerti li nafu bik!'
                    )
                );
            }
        }
    }, [clearOrder, orderData, selectedLanguage, setPurchase, setThankyou]);

    return props.failedPurchase ||
        props.purchase ||
        props.thankyou ||
        props.inStock <= 0 ||
        props.popupError !== '' ||
        afterOrderError !== '' ? (
        <StyledBackground
            onClick={
                props.inStock > 0 && props.popupError === '' && afterOrderError === ''
                    ? props.onClose
                    : undefined
            }
        >
            <StyledDiv
                width={mobile ? '80%' : '40%'}
                minHeight="300px"
                onClick={(e) => e.stopPropagation()}
                backgroundColor={props.purchase ? 'white' : undefined}
            >
                {props.purchase ? (
                    <>
                        <PayPalScriptProvider
                            options={{
                                clientId: PAYPAL_CLIENT_ID as string,
                                currency: 'EUR'
                            }}
                        >
                            <PaypalAccountPay
                                sendEmails={sendEmails}
                                onFailedPayment={() => {
                                    setPurchase(false);
                                    props.setFailedPurchase(true);
                                }}
                                orderData={orderData}
                            />
                        </PayPalScriptProvider>
                    </>
                ) : props.thankyou ? (
                    <>
                        {mobile ? (
                            <Column justifyContent="space-between" height="100%" width="100%">
                                <FlexImage
                                    alt="Title"
                                    src={TitlePNG}
                                    width="100px"
                                    padding="10px"
                                />
                                <Column justifyContent="flex-end" height="100%">
                                    <Row justifyContent="flex-end">
                                        <Typography
                                            fontSize="18px"
                                            malteseText="L-ordni tiegħek"
                                            englishText="Your order"
                                        />
                                    </Row>
                                    <Row justifyContent="flex-end">
                                        <Typography
                                            fontSize="18px"
                                            malteseText="qed tiġi proċessata!"
                                            englishText="is being processed"
                                        />
                                    </Row>
                                    <Spacer height="20px" />
                                    <Row justifyContent="flex-end">
                                        <Typography
                                            fontSize="18px"
                                            malteseText="Grazzi ħafna"
                                            englishText="Thanks a lot"
                                        />
                                        <Spacer width="10px" />
                                        <FlexImage src={Heart} width="15px" alt="Heart" />
                                    </Row>
                                </Column>
                            </Column>
                        ) : (
                            <>
                                <Spacer height="40px" />
                                <Row justifyContent="space-around">
                                    <Column width="50%">
                                        <Typography
                                            textAlign="end"
                                            fontSize="23px"
                                            malteseText="L-ordni tiegħek"
                                            englishText="Your order"
                                        />
                                        <Typography
                                            textAlign="end"
                                            fontSize="23px"
                                            malteseText="qed tiġi proċessata!"
                                            englishText="is being processed"
                                        />
                                        <Row>
                                            <Typography
                                                fontSize="23px"
                                                textAlign="end"
                                                malteseText="Grazzi ħafna"
                                                englishText="Thanks a lot"
                                            />
                                            <Spacer width="10px" />
                                            <FlexImage src={Heart} width="15px" alt="Heart" />
                                        </Row>
                                    </Column>
                                    <FlexImage
                                        alt="Title"
                                        src={TitlePNG}
                                        width="30%"
                                        padding="20px"
                                    />
                                </Row>
                                <Spacer height="40px" />
                            </>
                        )}
                    </>
                ) : props.failedPurchase ? (
                    <>
                        <Typography>ERROR!</Typography>
                    </>
                ) : props.inStock <= 0 ? (
                    <>
                        {mobile ? (
                            <Column
                                justifyContent="center"
                                alignItems="center"
                                height="fit-content"
                                width="100%"
                            >
                                <FlexImage
                                    alt="Title"
                                    src={MobileSoldOut}
                                    width="150px"
                                    padding="10px"
                                />
                                <Typography
                                    fontSize="15px"
                                    malteseText="...għalissa."
                                    englishText="...for now."
                                />
                                <Spacer height="20px" />
                                <Row justifyContent="center">
                                    <FlexImage src={BrokenHeart} width="15px" alt="Break" />
                                    <Spacer width="10px" />
                                    <Typography
                                        textAlign="center"
                                        width="80%"
                                        fontSize="15px"
                                        malteseText="Ibatilna fuq kartikontrakulħadd@gmail.com ħalli naqduk malli jkollna kaxxi"
                                        englishText="Drop us a line on kartikontrakulħadd@gmail.com so that you'll know as soon as we restock"
                                    />
                                    <Spacer width="10px" />
                                    <FlexImage src={BrokenHeart} width="15px" alt="Break" />
                                </Row>
                            </Column>
                        ) : (
                            <>
                                <Spacer height="40px" />
                                <Column alignItems="center" width="70%">
                                    <FlexImage
                                        alt="Title"
                                        src={SoldOut}
                                        width="100%"
                                        padding="20px"
                                    />
                                    <Typography
                                        fontSize="15px"
                                        malteseText="...għalissa."
                                        englishText="...for now."
                                    />
                                    <Spacer height="20px" />
                                    <Row justifyContent="center">
                                        <FlexImage src={BrokenHeart} width="20px" alt="Break" />
                                        <Spacer width="10px" />
                                        <Typography
                                            textAlign="center"
                                            width="80%"
                                            fontSize="15px"
                                            malteseText="Ibatilna fuq kartikontrakulħadd@gmail.com ħalli naqduk malli jkollna kaxxi"
                                            englishText="Drop us a line on kartikontrakulħadd@gmail.com so that you'll know as soon as we restock"
                                        />
                                        <Spacer width="10px" />
                                        <FlexImage src={BrokenHeart} width="20px" alt="Break" />
                                    </Row>
                                </Column>
                                <Spacer height="40px" />
                            </>
                        )}
                    </>
                ) : props.popupError !== '' || afterOrderError !== '' ? (
                    <>
                        <Spacer height="40px" />
                        <Row justifyContent="space-around">
                            <Typography fontSize="23px" textAlign="center">
                                {props.popupError || afterOrderError}
                            </Typography>
                        </Row>
                        <Spacer height="40px" />
                    </>
                ) : (
                    <></>
                )}
            </StyledDiv>
        </StyledBackground>
    ) : (
        <></>
    );
};
