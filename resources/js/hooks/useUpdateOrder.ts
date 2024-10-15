import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface OrderUpdatePayload {
    id: number;
    billing: {
        first_name: string;
        last_name: string;
        address_1: string;
        address_2: string;
        city: string;
        postcode: string;
        phone: string;
        email: string;
    };
    shipping: {
        first_name: string;
        last_name: string;
        address_1: string;
        address_2: string;
        city: string;
        postcode: string;
    };
}

const updateOrder = async (orderData: OrderUpdatePayload): Promise<any> => {
    const { data } = await axios.put(`/orders/${orderData.id}`, orderData);
    return data;
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error: unknown) => {
            console.error('Error updating order:', error);
        },
    });
};
