import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { generatePurchaseUnits } from '../api';
import { Typography } from './Typography';

export interface IPaypalAccountPay {
    sendEmails: () => void;
    onClose: () => void;
    amount: number;
    delivery?: boolean;
    setThankyou: (newBoolean: boolean) => void;
    setFailedPurchase: (newBoolean: boolean) => void;
}

const StyledPayPalButtons = styled(PayPalButtons)`
    display: flex;
    width: 100%;
    max-height: 40vh;
    margin: auto;
`;

export const PaypalAccountPay = (props: IPaypalAccountPay) => {
    const [{ isResolved }] = usePayPalScriptReducer();

    return isResolved ? (
        <StyledPayPalButtons
            style={{
                shape: 'pill',
                color: 'white',
                height: 37,
                tagline: false
            }}
            createOrder={async (_, actions) => {
                return actions.order.create({
                    purchase_units: await generatePurchaseUnits(props.amount, props.delivery)
                });
            }}
            onApprove={async (_, actions) => {
                try {
                    await actions.order.capture();
                    props.sendEmails();
                    props.onClose();
                    props.setThankyou(true);
                } catch (e) {
                    props.onClose();
                    props.setFailedPurchase(true);
                }
            }}
        />
    ) : (
        <Typography>Loading</Typography>
    );
};
