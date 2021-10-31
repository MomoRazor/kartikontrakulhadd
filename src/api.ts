import axios from 'axios';
import { OrderData } from './types';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const generatePurchaseUnits = async (amount: number, delivery?: boolean) => {
    const result = await axiosInstance.post<any>('generatePurchaseUnits', {
        amount: amount,
        delivery: delivery
    });

    return result.data.purchaseUnits;
};

export const orderEmail = async (orderData: OrderData) => {
    await axiosInstance.post('orderEmail', {
        orderData: orderData
    });
};

export const saveEmail = async (orderData: OrderData) => {
    await axiosInstance.post('saveOrder', {
        orderData: orderData
    });
};

export const clientEmail = async (orderData: OrderData) => {
    await axiosInstance.post('clientEmail', {
        orderData: orderData
    });
};

export const getDeliveryPrice = async () => {
    const result = await axiosInstance.get<any>('getDeliveryPrice');

    return parseFloat(result.data.deliveryPrice);
};

export const getPricePerBox = async () => {
    const result = await axiosInstance.get<any>('getPricePerBox');

    return parseFloat(result.data.pricePerBox);
};

export const getStockNumber = async () => {
    const result = await axiosInstance.get<any>('stockNumber');

    return result.data.inStock;
};
