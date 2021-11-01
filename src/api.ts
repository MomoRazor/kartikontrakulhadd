import axios from 'axios';
import { REACT_APP_API_URL, REACT_APP_KEY } from './enviornment';
import { OrderData } from './types';

export const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL
});

export const generatePurchaseUnits = async (amount: number, delivery?: boolean) => {
    const result = await axiosInstance.post<any>(
        'generatePurchaseUnits',
        {
            amount: amount,
            delivery: delivery
        },
        {
            headers: {
                authorization: REACT_APP_KEY as string
            }
        }
    );

    return result.data.purchaseUnits;
};

export const orderEmail = async (orderData: OrderData) => {
    await axiosInstance.post(
        'orderEmail',
        {
            orderData: orderData
        },
        {
            headers: {
                authorization: REACT_APP_KEY as string
            }
        }
    );
};

export const saveEmail = async (orderData: OrderData) => {
    await axiosInstance.post(
        'saveOrder',
        {
            orderData: orderData
        },
        {
            headers: {
                authorization: REACT_APP_KEY as string
            }
        }
    );
};

export const clientEmail = async (orderData: OrderData) => {
    await axiosInstance.post(
        'clientEmail',
        {
            orderData: orderData
        },
        {
            headers: {
                authorization: REACT_APP_KEY as string
            }
        }
    );
};

export const getDeliveryPrice = async () => {
    const result = await axiosInstance.get<any>('getDeliveryPrice', {
        headers: {
            authorization: REACT_APP_KEY as string
        }
    });

    return parseFloat(result.data.deliveryPrice);
};

export const getPricePerBox = async () => {
    const result = await axiosInstance.get<any>('getPricePerBox', {
        headers: {
            authorization: REACT_APP_KEY as string
        }
    });

    return parseFloat(result.data.pricePerBox);
};

export const getStockNumber = async () => {
    const result = await axiosInstance.get<any>('stockNumber', {
        headers: {
            authorization: REACT_APP_KEY as string
        }
    });

    return result.data.inStock;
};
