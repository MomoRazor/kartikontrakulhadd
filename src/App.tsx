import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { LanguageProvider } from './components';
import './css/fullPage.css';
import { Home } from './pages';

const App = () => {
    const restOfStuff = () => (
        <LanguageProvider>
            <Home />
        </LanguageProvider>
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
