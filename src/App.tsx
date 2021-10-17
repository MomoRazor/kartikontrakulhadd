import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { LanguageProvider } from './components';
import './css/fullPage.css';
import { Home } from './pages';

const App = () => {
    const restOfStuff = () => (
        <PayPalScriptProvider
            options={{
                'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID as string
            }}
        >
            <LanguageProvider>
                <Home />
            </LanguageProvider>
        </PayPalScriptProvider>
    );

    return process.env.NODE_ENV === 'production' ? (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY as string}>
            {restOfStuff()}
        </GoogleReCaptchaProvider>
    ) : (
        restOfStuff()
    );
};

export default App;
