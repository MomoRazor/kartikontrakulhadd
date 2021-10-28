import {
    PayPalScriptProvider
    // PayPalHostedField,
    // PayPalHostedFieldsProvider,
    // PAYPAL_HOSTED_FIELDS_TYPES
    // usePayPalHostedFields
} from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { hexToRgb, primaryColor, secondaryColor } from '../config';
import { useResize } from '../hooks';
import { FlexImage } from './FlexImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import TitlePNG from '../assets/title.png';
import BrokenHeart from '../assets/soldout-11.png';
import MobileSoldOut from '../assets/soldoutnew2.png';
import SoldOut from '../assets/soldoutnew1.png';
import { Column } from './Column';
import { Row } from './Row';
// import { Button } from './Button';
import { clientEmail, orderEmail } from '../api';
import { OrderData } from '../types';
import { PaypalAccountPay } from './PaypalAccountPay';
import { Hr } from './Hr';

export interface IPopup {
    popupError: string;
    amount: number;
    delivery: boolean;
    purchase: boolean;
    thankyou: boolean;
    soldOut: boolean;
    setThankyou: (newBoolean: boolean) => void;
    failedPurchase: boolean;
    setFailedPurchase: (newBoolean: boolean) => void;
    onClose: () => void;
    clearOrder: () => void;
    orderData?: OrderData;
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
    height?: string;
    width?: string;
    maxWidth?: string;
    backgroundColor?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    background-color: ${({ backgroundColor }) =>
        backgroundColor ? backgroundColor : secondaryColor};
    width: ${({ width }) => (width ? width : '')};
    height: ${({ height }) => (height ? height : '')};
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

export const Popup = (props: IPopup) => {
    const mobile = useResize();

    // const hostedFields = usePayPalHostedFields();

    // const submitPayment = () => {
    //     sendEmails();
    // };

    // const [purchaseUnits, setPurchaseUnits] = useState<any[]>([]);

    const sendEmails = () => {
        if (props.orderData) {
            orderEmail(props.orderData);
            clientEmail(props.orderData);
            props.clearOrder();
        }
    };

    // const regen = useCallback(async () => {
    //     if (props.purchase) {
    //         setPurchaseUnits(await generatePurchaseUnits(props.amount, props.delivery));
    //     }
    // }, [props.amount, props.delivery, props.purchase]);

    // useEffect(() => {
    //     regen();
    // }, [regen]);

    return props.failedPurchase ||
        props.purchase ||
        props.thankyou ||
        props.soldOut ||
        props.popupError !== '' ? (
        <StyledBackground
            onClick={!props.soldOut && props.popupError === '' ? props.onClose : undefined}
        >
            <StyledDiv
                maxWidth={mobile ? '200px' : undefined}
                width={mobile ? '80%' : '40%'}
                height={mobile ? '300px' : ''}
                onClick={(e) => e.stopPropagation()}
                backgroundColor={props.purchase ? 'white' : undefined}
            >
                {props.purchase ? (
                    <>
                        <PayPalScriptProvider
                            options={{
                                'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID as string
                            }}
                        >
                            <PaypalAccountPay
                                sendEmails={sendEmails}
                                amount={props.amount}
                                delivery={props.delivery}
                                onClose={props.onClose}
                                setFailedPurchase={props.setFailedPurchase}
                                setThankyou={props.setThankyou}
                            />
                        </PayPalScriptProvider>
                        {/* <Spacer />
                        <Row justifyContent="space-around">
                            <Column width="40%">
                                <Hr />
                            </Column>
                            <Column width="40%" justifyContent="center" alignItems="center">
                                <Typography englishText="OR" malteseText="JEW" />
                            </Column>
                            <Column width="40%">
                                <Hr />
                            </Column>
                        </Row>
                        <Spacer /> */}
                        {/* <PayPalScriptProvider
                            // TODO get actual data-client-token
                            options={{
                                'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID as string,
                                'data-client-token': '',
                                components: 'hosted-fields'
                            }}
                        >
                            <PayPalHostedFieldsProvider
                                createOrder={async () => {
                                    const result = await axiosInstance.post<any>(
                                        'createPaypalOrder'
                                    );
                                    return result.data.order;
                                }}
                            >
                                <PayPalHostedField
                                    id="card-number"
                                    hostedFieldType={PAYPAL_HOSTED_FIELDS_TYPES.NUMBER}
                                    options={{ selector: '#card-number' }}
                                />
                                <PayPalHostedField
                                    id="cvv"
                                    hostedFieldType={PAYPAL_HOSTED_FIELDS_TYPES.CVV}
                                    options={{ selector: '#card-number' }}
                                />
                                <PayPalHostedField
                                    id="expiration-date"
                                    hostedFieldType={PAYPAL_HOSTED_FIELDS_TYPES.EXPIRATION_DATE}
                                    options={{
                                        selector: '#expiration-date',
                                        placeholder: 'MM/YY'
                                    }}
                                />
                                <Spacer />
                                <Button
                                    onClick={submitPayment}
                                    englishText="Confirm Payment"
                                    malteseText="Ikkonferma l-hlas"
                                />
                            </PayPalHostedFieldsProvider>
                        </PayPalScriptProvider> */}
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
                                            malteseText="Grazzi ħafna ❤"
                                            englishText="Thanks a lot ❤"
                                        />
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
                                        <Typography
                                            fontSize="23px"
                                            textAlign="end"
                                            malteseText="Grazzi ħafna ❤"
                                            englishText="Thanks a lot ❤"
                                        />
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
                ) : props.soldOut ? (
                    <>
                        {mobile ? (
                            <Column
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                                width="100%"
                            >
                                <FlexImage
                                    alt="Title"
                                    src={MobileSoldOut}
                                    width="150px"
                                    padding="10px"
                                />
                                <Hr />
                                <Spacer height="20px" />
                                <Row justifyContent="center">
                                    <FlexImage src={BrokenHeart} width="15px" alt="Break" />
                                    <Spacer width="10px" />
                                    <Typography
                                        fontSize="15px"
                                        malteseText="Għal darb' oħra xbin"
                                        englishText="Better luck next time"
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
                                    <Hr />
                                    <Spacer height="20px" />
                                    <Row justifyContent="center">
                                        <FlexImage src={BrokenHeart} width="20px" alt="Break" />
                                        <Spacer width="10px" />
                                        <Typography
                                            fontSize="23px"
                                            malteseText="Għal darb' oħra xbin"
                                            englishText="Better luck next time"
                                        />
                                        <Spacer width="10px" />
                                        <FlexImage src={BrokenHeart} width="20px" alt="Break" />
                                    </Row>
                                </Column>
                                <Spacer height="40px" />
                            </>
                        )}
                    </>
                ) : props.popupError !== '' ? (
                    <>
                        <Spacer height="40px" />
                        <Row justifyContent="space-around">
                            <Typography fontSize="23px" textAlign="center">
                                {props.popupError}
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
