import { PayPalButtons } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { generatePurchaseUnits, secondaryColor } from '../config';
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

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 50%;
`;

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: 'center';
    align-items: center;
    width: 100%;
`;

const StyledPayPalButtons = styled(PayPalButtons)`
    width: 100%;
    max-height: 40vh;
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
`;

interface IStyledDiv {
    width?: string;
}

const StyledDiv = styled.div<IStyledDiv>`
    display: flex;
    background-color: ${secondaryColor};
    width: ${({ width }) => (width ? width : '')};
    border-radius: 20px;
    padding: 20px;
    box-shadow: -1px 0px 21px 3px rgba(0, 0, 0, 0.76);
    justify-content: center;
    align-items: center;
    max-height: 50vh;
    overflow: scroll;
`;

export const Popup = (props: IPopup) => {
    const mobile = useResize();

    return props.failedPurchase || props.purchase || props.thankyou ? (
        <StyledBackground onClick={props.onClose}>
            <StyledDiv width={mobile ? '80%' : '40%'}>
                {props.purchase ? (
                    <>
                        <StyledPayPalButtons
                            style={{ shape: 'pill', color: 'white' }}
                            createOrder={(_, actions) => {
                                console.log(generatePurchaseUnits(props.amount, props.delivery));
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
                    <StyledRow>
                        <StyledColumn>
                            <Typography
                                textAlign="end"
                                fontSize="25px"
                                malteseText="L-ordni tiegħek qed tiġi proċessata!"
                                englishText="Your order is being processed"
                            />
                            <Spacer height="10px" />
                            <Typography
                                fontSize="25px"
                                textAlign="end"
                                malteseText="Grazzi ħafna ❤"
                                englishText="Thanks a lot ❤"
                            />
                        </StyledColumn>
                        <Spacer width="40px" />
                        <FlexImage alt="Title" src={TitlePNG} width="60%" />
                    </StyledRow>
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
