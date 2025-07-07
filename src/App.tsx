import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { LanguageProvider } from './components';
import { NODE_ENV, RECAPTCHA_KEY } from './enviornment';
import { Home } from './pages';

const App = () => {
    const restOfStuff = () => (
        <LanguageProvider>
            <Home />
        </LanguageProvider>
    );

    return NODE_ENV === 'production' ? (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY as string}>
            {restOfStuff()}
        </GoogleReCaptchaProvider>
    ) : (
        restOfStuff()
    );
};

export default App;
