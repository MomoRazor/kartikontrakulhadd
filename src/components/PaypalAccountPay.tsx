import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import { generatePurchaseUnits } from '../api';
import { primaryColor } from '../config';
import { OrderData } from '../types';
import { Typography } from './Typography';

export interface IPaypalAccountPay {
    sendEmails: () => void;
    onFailedPayment: () => void;
    orderData: OrderData;
}

const StyledPayPalButtons = styled(PayPalButtons)`
    display: flex;
    width: 100%;
    max-height: 40vh;
    margin: auto;
`;

export const PaypalAccountPay = ({ sendEmails, ...props }: IPaypalAccountPay) => {
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
                const payer: any = {
                    name: {
                        given_name: props.orderData.name,
                        surname: props.orderData.surname
                    },
                    email_address: props.orderData.email,
                    address: {
                        address_line_1: props.orderData.addressLine1,
                        address_line_2: props.orderData.addressLine2,
                        country_code: 'MT',
                        admin_area_1: '',
                        admin_area_2: props.orderData.locality,
                        postal_code: props.orderData.postCode
                    },
                    phone: {
                        phone_number: {
                            national_number: props.orderData.mobileNumber
                        }
                    }
                };

                return actions.order.create({
                    purchase_units: await generatePurchaseUnits(
                        props.orderData.amount,
                        props.orderData.delivery
                    ),
                    payer,
                    intent: 'CAPTURE'
                });
            }}
            onApprove={async (_, actions) => {
                try {
                    await actions.order?.capture();
                    sendEmails();
                } catch (e) {
                    props.onFailedPayment();
                }
            }}
        />
    ) : (
        <Typography color={primaryColor}>Loading</Typography>
    );
};
