import moment from 'moment';
import { OrderData } from './types';

const Mailgun = require('mailgun-js')({
    apiKey: process.env.REACT_APP_MAILGUN,
    domain: process.env.REACT_APP_MAILGUN_DOMAIN
});
export const primaryColor = '#511c1f';
export const secondaryColor = '#a41e21';

export const pricePerBox = 39.99;
export const deliveryPrice = 10;

export const fromEmail = 'kartikontrakulhadd@gmail.com';
export const emailList = ['theo.cachia@gmail.com', 'marieborg279@gmail.com', 'dgurpani@gmail.com'];
//FOR TESTING
// export const emailList = ['maurovic.cachia@gmail.com', 'theo.cachia@gmail.com'];

export const hexToRgb = (hex: string, opacity?: number | string) => {
    if (hex.includes('#')) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (_, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? 'rgba(' +
                  parseInt(result[1], 16) +
                  ',' +
                  parseInt(result[2], 16) +
                  ',' +
                  parseInt(result[3], 16) +
                  ',' +
                  (opacity ? opacity : 1) +
                  ')'
            : '';
    } else {
        return hex;
    }
};

export const submitOrderEmail = (data: OrderData) => {
    const mailGunData = {
        from: fromEmail,
        to: emailList,
        subject: 'KKK Order ' + moment().format('YYYY-MM-DD HH:mm'),
        html: `<p>Hi! </p>
            <p>A new order has just been submitted on KartiKontraKulħadd.com! Here are the details:</p>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Surname: ${data.surname}</li>
                <li>Email: ${data.email}</li>
                <li>Amount: ${data.amount}</li>
                <li>Delivery: ${data.delivery ? 'Yes' : 'No'}</li>
                ${
                    data.delivery
                        ? '<li>Full Address: ' +
                          data.addressLine1 +
                          ' ' +
                          data.addressLine2 +
                          ' ' +
                          data.localityCode +
                          '</li>'
                        : ''
                }
                <li>Price: €${data.price.toFixed(2)}</li>
            </ul>
            <p>Soo... yeah, get to it!</p>`
    };

    Mailgun.messages().send(mailGunData, (err: any, body: any) => {
        if (err) {
            console.error('Got an error: ', err);
        } else {
            return body;
        }
        return;
    });
};

export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
