import { PayPalButtons } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { generatePurchaseUnits, hexToRgb, primaryColor, secondaryColor } from '../config';
import { useResize } from '../hooks';
import { FlexImage } from './FlexImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import TitlePNG from '../assets/title.png';

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

interface IStyledColumn {
    width?: string;
}

const StyledColumn = styled.div<IStyledColumn>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: ${({ width }) => (width ? width : '')};
`;

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`;

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

    return props.failedPurchase || props.purchase || props.thankyou ? (
        <StyledBackground onClick={props.onClose}>
            <StyledDiv
                width={mobile ? '80%' : '40%'}
                backgroundColor={props.purchase ? 'white' : undefined}
            >
                {props.purchase ? (
                    <>
                        <StyledPayPalButtons
                            style={{ shape: 'pill', color: 'white' }}
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
                    </>
                ) : props.thankyou ? (
                    <>
                        <Spacer height="40px" />
                        <StyledRow>
                            <StyledColumn>
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
                            </StyledColumn>
                            <FlexImage alt="Title" src={TitlePNG} width="30%" padding="20px" />
                        </StyledRow>
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
