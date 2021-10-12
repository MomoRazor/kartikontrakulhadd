import { Fonts, FullPage, LanguageProvider, Typography } from './components';
import { primaryColor } from './config';
import './css/fullPage.css';

const App = () => (
    <LanguageProvider>
        <Fonts />
        <FullPage backgroundColor={primaryColor}>
            <Typography englishText="Hi" malteseText="Aw" />
        </FullPage>
    </LanguageProvider>
);

export default App;
