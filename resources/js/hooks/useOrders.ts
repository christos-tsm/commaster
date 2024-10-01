import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Filters {
    status: string;
    startDate: Date | null;
    endDate: Date | null;
}

const fetchOrders = async (page: number, filters: Filters) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());

    if (filters.status && filters.status !== 'all') {
        params.append('status', filters.status);
    }
    if (filters.startDate) {
        params.append('start_date', filters.startDate.toISOString().split('T')[0]);
    }
    if (filters.endDate) {
        params.append('end_date', filters.endDate.toISOString().split('T')[0]);
    }

    const { data } = await axios.get(`/fetch-orders?${params.toString()}`);
    return data;
};

export const useOrders = (page: number, filters: Filters, enabled?: boolean) => {
    return useQuery({
        queryKey: ['orders', page, filters],
        queryFn: () => fetchOrders(page, filters),
        placeholderData: [],
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled,
    });
};
