import { LanguageProvider } from './components';
import './css/fullPage.css';
import { Home } from './pages';

const App = () => (
    <LanguageProvider>
        <Home />
    </LanguageProvider>
);

export default App;
