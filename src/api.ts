import axios from 'axios';
import { API_URL, KEY } from './enviornment';
import { OrderData } from './types';

export const axiosInstance = axios.create({
    baseURL: API_URL
});

export const generatePurchaseUnits = async (amount: number, delivery?: boolean) => {
    const result = await axiosInstance.post<any>(
        '/generate/purchase-units',
        {
            amount: amount,
            delivery: delivery
        },
        {
            headers: {
                authorization: KEY || ''
            }
        }
    );

    return result.data.purchaseUnits;
};

export const saveOrder = async (orderData: OrderData) => {
    await axiosInstance.post(
        '/create/orders',
        {
            data: orderData
        },
        {
            headers: {
                authorization: KEY || ''
            }
        }
    );
};

export const getDeliveryPrice = async () => {
    const result = await axiosInstance.get<any>('/get/delivery-price', {
        headers: {
            authorization: KEY || ''
        }
    });

    return parseFloat(result.data.deliveryPrice);
};

export const getPricePerBox = async () => {
    const result = await axiosInstance.get<any>('/get/box-price', {
        headers: {
            authorization: KEY || ''
        }
    });

    return parseFloat(result.data.pricePerBox);
};

export const getStockNumber = async () => {
    const result = await axiosInstance.get<any>('/get/stock-number', {
        headers: {
            authorization: KEY || ''
        }
    });

    return result.data.inStock;
};
