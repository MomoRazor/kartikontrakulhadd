import axios from 'axios';
import { OrderData } from './types';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const generatePurchaseUnits = async (amount: number, delivery?: boolean) => {
    try {
        const result = await axiosInstance.post<any>('generatePurchaseUnits', {
            amount: amount,
            delivery: delivery
        });

        return result.data.purchaseUnits;
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const orderEmail = async (orderData: OrderData) => {
    try {
        await axiosInstance.post('orderEmail', {
            orderData: orderData
        });
    } catch (e) {
        console.error(e);
    }
};

export const clientEmail = async (orderData: OrderData) => {
    try {
        await axiosInstance.post('clientEmail', {
            orderData: orderData
        });
    } catch (e) {
        console.error(e);
    }
};

export const getDeliveryPrice = async () => {
    try {
        const result = await axiosInstance.get<any>('getDeliveryPrice');

        return parseFloat(result.data.deliveryPrice);
    } catch (e) {
        console.error(e);
        return 0;
    }
};

export const getPricePerBox = async () => {
    try {
        const result = await axiosInstance.get<any>('getPricePerBox');

        return parseFloat(result.data.pricePerBox);
    } catch (e) {
        console.error(e);
        return 0;
    }
};
