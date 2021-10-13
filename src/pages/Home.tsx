import { useContext, useEffect, useState } from 'react';
import { useResize } from '../hooks';
import {
    LanguageContext,
    // Languages,
    Fonts,
    FullPage,
    TopBar,
    Content,
    FlexImage,
    Form,
    Spacer
} from '../components';
import { primaryColor } from '../config';
// import MobileImageMT from '../assets/mob-mt.png';
// import MobileImageEN from '../assets/mob-en.png';
// import DeskImageMT from '../assets/desk-mt.png';
// import DeskImageEN from '../assets/desk-en.png';
import DeskImage from '../assets/desk.png';
import MobileImage from '../assets/mob.png';

export const Home = () => {
    const mobile = useResize();
    const { selectedLanguage } = useContext(LanguageContext);

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (mobile) {
            setImageSrc(MobileImage);
            // if (selectedLanguage === Languages.EN) {
            //     setImageSrc(MobileImageEN);
            // } else if (selectedLanguage === Languages.MT) {
            //     setImageSrc(MobileImageMT);
            // }
        } else {
            setImageSrc(DeskImage);
            // if (selectedLanguage === Languages.EN) {
            //     setImageSrc(DeskImageEN);
            // } else if (selectedLanguage === Languages.MT) {
            //     setImageSrc(DeskImageMT);
            // }
        }
    }, [mobile, selectedLanguage]);

    return (
        <>
            <Fonts />
            <FullPage backgroundColor={primaryColor}>
                <TopBar />
                <Content>
                    <FlexImage
                        src={imageSrc}
                        width={mobile ? '80%' : '75%'}
                        maxWidth="800px"
                        alt="Main Image"
                    />
                    <Spacer width="50px" />
                    <Form />
                </Content>
            </FullPage>
        </>
    );
};
