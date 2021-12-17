import { createContext } from 'react';
import { Languages } from './types';

export interface ILanguageContextConfig {
    selectedLanguage?: Languages;
    setSelectedLanguage?: (newLanguage: Languages) => void;
}

export interface ILanguageContext extends ILanguageContextConfig {}

export const defaultLanguageContext: ILanguageContext = {
    selectedLanguage: Languages.MT
};

export const LanguageContext = createContext<ILanguageContext>(defaultLanguageContext);
