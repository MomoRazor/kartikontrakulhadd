import { Languages } from './components';

export const primaryColor = '#511c1f';
export const secondaryColor = '#a41e21';

export const hexToRgb = (hex: string, opacity?: number | string) => {
    if (hex.includes('#')) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (_, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? 'rgba(' +
                  parseInt(result[1], 16) +
                  ',' +
                  parseInt(result[2], 16) +
                  ',' +
                  parseInt(result[3], 16) +
                  ',' +
                  (opacity ? opacity : 1) +
                  ')'
            : '';
    } else {
        return hex;
    }
};

export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const getErrorMsg = (
    selectedLanguage?: Languages,
    englishText?: string,
    malteseText?: string
) => {
    if (selectedLanguage === Languages.EN) {
        return englishText || 'Required';
    } else if (selectedLanguage === Languages.MT) {
        return malteseText || 'Insejt din';
    } else {
        return '';
    }
};

// export const soldOut = false;

// //TODO to remove
// export const createPaypalOrder = async (amount: number, delivery: boolean) => {
//     const request = new paypal.orders.OrderCreateRequest();

//     request.prefer('return=representation');
//     request.requestBody({
//         intent: 'CAPTURE',
//         purchase_units: generatePurchaseUnits(amount, delivery)
//     });

//     let order;
//     try {
//         order = await paypalCore.client().execute(request);

//         return order;
//     } catch (err) {
//         console.error(err);
//     }
// };
