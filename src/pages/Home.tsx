import { useContext, useEffect, useState } from 'react';
import { useResize } from '../hooks';
import {
    LanguageContext,
    Fonts,
    FullPage,
    TopBar,
    Content,
    FlexImage,
    Form,
    Languages
} from '../components';
import { primaryColor } from '../config';
import Image from '../assets/nolabels.png';
import styled from 'styled-components';
import MalteseImage from '../assets/mt.png';
import EnglishImage from '../assets/en.png';

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Home = () => {
    const mobile = useResize();
    const { selectedLanguage } = useContext(LanguageContext);

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (selectedLanguage === Languages.EN) {
            setImageSrc(EnglishImage);
        } else if (selectedLanguage === Languages.MT) {
            setImageSrc(MalteseImage);
        }
    }, [mobile, selectedLanguage]);

    return (
        <>
            <Fonts />
            <FullPage backgroundColor={primaryColor}>
                <TopBar />
                <Content>
                    <StyledColumn>
                        <FlexImage src={Image} width="65vw" minWidth="600px" alt="Main Image">
                            <FlexImage
                                src={imageSrc}
                                width="35%"
                                minWidth="280px"
                                maxWidth="380px"
                                alt="Labels"
                                position="absolute"
                                margin={mobile ? '0 0 0 30px' : '0 0 0 50px'}
                                top={mobile ? '48%' : '53%'}
                            />
                        </FlexImage>
                    </StyledColumn>
                    <Form />
                </Content>
            </FullPage>
        </>
    );
};
