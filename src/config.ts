export const primaryColor = '#511c1f';

export const pricePerBox = 39.99;
export const deliveryPrice = 10;

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
