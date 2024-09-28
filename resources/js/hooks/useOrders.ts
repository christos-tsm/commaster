import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Order } from '@/types/woocommerce';

const fetchOrders = async (page: number) => {
    const { data } = await axios.get(`/fetch-orders?page=${page}`);
    return data;
};

export const useOrders = (page: number) => {
    return useQuery({
        queryKey: ['orders', page],  // The query key
        queryFn: () => fetchOrders(page),  // The function that fetches the data
        placeholderData: [],  // If no data yet, return an empty array
        staleTime: 5000,
        refetchOnWindowFocus: false
    });
};
