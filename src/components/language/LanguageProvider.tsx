import { ReactNode, useState } from 'react';
import { LanguageContext } from './context';
import { Languages } from './types';

export interface ILanguageProvider {
    children: ReactNode;
}

export const LanguageProvider = (props: ILanguageProvider) => {
    const [selectedLanguage, setSelectedLanguage] = useState(Languages.MT);

    return (
        <LanguageContext.Provider
            value={{
                selectedLanguage,
                setSelectedLanguage
            }}
        >
            {props.children}
        </LanguageContext.Provider>
    );
};
