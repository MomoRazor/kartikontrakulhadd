import { useCallback, useEffect, useState } from 'react';

export interface ISize {
    width: number;
    height: number;
}

export type SizeHandler = (size: ISize) => void;

export const useResize = () => {
    const isClient = typeof window === 'object';

    const [mobile, setMobile] = useState(false);

    const mobileLimit = 1000;

    const handleResize = useCallback(() => {
        if ((isClient ? window.innerWidth : 0) <= mobileLimit) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [isClient]);

    useEffect(() => {
        if (!isClient) {
            return;
        }
        handleResize();
        window.removeEventListener('resize', handleResize);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize, isClient]);

    return mobile;
};
