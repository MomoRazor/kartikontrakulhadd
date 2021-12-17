import { config } from 'dotenv';

config();

export const {
    PORT,
    REACT_APP_API_URL,
    NODE_ENV,
    REACT_APP_PAYPAL_CLIENT_ID,
    REACT_APP_KEY,
    REACT_APP_RECAPTCHA_KEY
} = process.env;
