import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { LanguageProvider } from './components';
import './css/fullPage.css';
import { NODE_ENV, REACT_APP_RECAPTCHA_KEY } from './enviornment';
import { Home } from './pages';

const App = () => {
    const restOfStuff = () => (
        <LanguageProvider>
            <Home />
        </LanguageProvider>
    );

    return NODE_ENV === 'production' ? (
        <GoogleReCaptchaProvider reCaptchaKey={REACT_APP_RECAPTCHA_KEY as string}>
            {restOfStuff()}
        </GoogleReCaptchaProvider>
    ) : (
        restOfStuff()
    );
};

export default App;
