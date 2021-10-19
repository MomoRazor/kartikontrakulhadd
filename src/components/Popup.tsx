import { PayPalButtons } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { generatePurchaseUnits, hexToRgb, primaryColor, secondaryColor } from '../config';
import { useResize } from '../hooks';
import { FlexImage } from './FlexImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import TitlePNG from '../assets/title.png';
import { Hr } from './Hr';
import { Button } from './Button';
import { useState } from 'react';
import { Column } from './Column';
import { Row } from './Row';

export interface IPopup {
    amount: number;
    delivery: boolean;
    purchase: boolean;
    thankyou: boolean;
    setThankyou: (newBoolean: boolean) => void;
    failedPurchase: boolean;
    setFailedPurchase: (newBoolean: boolean) => void;
    onClose: () => void;
}

const StyledPayPalButtons = styled(PayPalButtons)`
    display: flex;
    max-height: 70vh;
`;

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
    width?: string;
    backgroundColor?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    background-color: ${({ backgroundColor }) =>
        backgroundColor ? backgroundColor : secondaryColor};
    width: ${({ width }) => (width ? width : '')};
    border-radius: 20px;
    padding: 20px;
    box-shadow: -1px 0px 21px 3px rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
    max-height: 70vh;
    overflow: scroll;
    flex-direction: column;
`;

export const Popup = (props: IPopup) => {
    const mobile = useResize();

    const [creditCardForm, setCreditCardForm] = useState(false)

    return props.failedPurchase || props.purchase || props.thankyou ? (
        <StyledBackground onClick={props.onClose}>
            <StyledDiv
                width={mobile ? '80%' : '40%'}
                backgroundColor={props.purchase ? 'white' : undefined}
            >
                {props.purchase ? (
                    <>
                        <StyledPayPalButtons
                            style={{ shape: 'pill', color: 'white', layout: 'horizontal' }}
                            createOrder={(_, actions) => {
                                return actions.order.create({
                                    purchase_units: generatePurchaseUnits(
                                        props.amount,
                                        props.delivery
                                    )
                                });
                            }}
                            onApprove={async (_, actions) => {
                                try {
                                    await actions.order.capture();

                                    props.onClose();
                                    props.setThankyou(true);
                                } catch (e) {
                                    props.onClose();
                                    props.setFailedPurchase(true);
                                }
                            }}
                        />
                        <Row justifyContent="space-around">
                            <Column width="40%">
                                <Hr/>
                            </Column>
                            <Column width="40%">
                                <Typography>OR</Typography>
                            </Column>
                            <Column width="40%">
                                <Hr/>
                            </Column>
                        </Row>
                        {
                            !creditCardForm ? (
                                <Button onClick={() => {
                                    setCreditCardForm(true)
                                }} englishText="Pay with Credit Card" malteseText="Hallas b'Credit Card" />
                            ) : (
                                <></>
                            )
                        }
                    </>
                ) : props.thankyou ? (
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
                            <FlexImage alt="Title" src={TitlePNG} width="30%" padding="20px" />
                        </Row>
                        <Spacer height="40px" />
                    </>
                ) : props.failedPurchase ? (
                    <>
                        <Typography>ERROR!</Typography>
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
