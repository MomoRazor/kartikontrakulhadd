import moment from 'moment';
import { OrderData } from './types';

const Mailgun = require('mailgun-js')({
    apiKey: process.env.REACT_APP_MAILGUN,
    domain: process.env.REACT_APP_MAILGUN_DOMAIN
});
export const primaryColor = '#511c1f';

export const pricePerBox = 39.99;
export const deliveryPrice = 10;

export const fromEmail = 'site@kartikontrakulhadd.com';
// export const emailList = ['theo.cachia@gmail.com', 'marieborg279@gmail.com', 'dgurpani@gmail.com'];
export const emailList = ['maurovic.cachia@gmail.com'];

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
    console.log(process.env.REACT_APP_MAILGUN_DOMAIN);

    const mailGunData = {
        from: fromEmail,
        to: emailList,
        subject: 'KKK Order ' + moment().format('YYYY-MM-DD HH:mm'),
        html: `Hi! A new order has just been submitted on KartiKontraKulhadd.com! Here are the details:\n
         - Name: ${data.name}\n
         - Surname: ${data.surname}\n
         - Email: ${data.email}\n
         - Amount: ${data.amount}\n
         - Price: €${data.price.toFixed(2)}\n
         - Delivery: ${data.delivery ? 'Yes' : 'No'}\n
         ${
             data.delivery
                 ? '- Full Address: ' +
                   data.addressLine1 +
                   ' ' +
                   data.addressLine2 +
                   ' ' +
                   data.localityCode +
                   '\n'
                 : ''
         }
         
        Soo... yeah, get to it!`
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
