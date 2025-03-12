import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Filters {
    startDate: Date | null;
    endDate: Date | null;
}

const fetchProducts = async (page: number, filters: Filters) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());

    if (filters.startDate) {
        params.append('start_date', filters.startDate.toISOString().split('T')[0]);
    }
    if (filters.endDate) {
        params.append('end_date', filters.endDate.toISOString().split('T')[0]);
    }

    const { data } = await axios.get(`/fetch-products?${params.toString()}`);
    return data;
};

export const useProducts = (page: number, filters: Filters, enabled?: boolean) => {
    return useQuery({
        queryKey: ['products', page, filters],
        queryFn: () => fetchProducts(page, filters),
        placeholderData: [],
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled,
    });
};
