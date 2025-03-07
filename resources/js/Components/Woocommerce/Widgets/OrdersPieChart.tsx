import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Order } from '@/types/woocommerce';
import { useOrders } from '@/hooks/useOrders';
import { ORDER_STATUSES } from '@/helpers/order-statuses';
import Skeleton from 'react-loading-skeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersPieChart: React.FC = () => {
    const filters = { status: 'all', startDate: null, endDate: null };
    const page = 1;

    // Destructure all status flags similar to your orders table
    const { data, isError, isLoading, error, isFetching, isPending } = useOrders(page, filters);

    // Wait until data is fully loaded
    if (isLoading || isFetching || isPending) {
        return <Skeleton count={10} height={30} />;
    }

    // Check for errors coming from the query
    if (isError && error) {
        return <div>Error loading orders: {error.message}</div>;
    }

    // Normalize the data. Sometimes placeholderData might be an array and sometimes an object with an orders property.
    if (!data) {
        return <Skeleton count={10} height={30} />;
    }

    const orders: Order[] = Array.isArray(data) ? data : data.orders;

    // If orders are not available as an array, show an error message.
    if (!Array.isArray(orders)) {
        return <div>Unexpected error: orders data is missing.</div>;
    }

    // Group orders by their status
    const statusCounts = orders.reduce((acc: Record<string, number>, order: Order) => {
        const status = order.status;
        if (status) {
            acc[status] = (acc[status] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Build the chart data using friendly labels
    const chartData = {
        labels: Object.keys(statusCounts).map((status) => ORDER_STATUSES[status] || status),
        datasets: [
            {
                label: 'Αριθμός παραγγελιών',
                data: Object.values(statusCounts),
                backgroundColor: Object.keys(statusCounts).map((status) => {
                    const colorMap: { [key: string]: string } = {
                        completed: 'rgba(75, 192, 192, 0.2)',
                        pending: 'rgba(255, 206, 86, 0.2)',
                        processing: 'rgba(54, 162, 235, 0.2)',
                    };
                    return colorMap[status] || 'rgba(255, 99, 132, 0.2)';
                }),
                borderColor: Object.keys(statusCounts).map((status) => {
                    const colorMap: { [key: string]: string } = {
                        completed: 'rgba(75, 192, 192, 1)',
                        pending: 'rgba(255, 206, 86, 1)',
                        processing: 'rgba(54, 162, 235, 1)',
                    };
                    return colorMap[status] || 'rgba(255, 99, 132, 1)';
                }),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='p-4 rounded-lg shadow-lg bg-white'>
            <h3 className="font-bold text-sm border-b pb-2 mb-4">Σύνοψη παραγγελιών</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default OrdersPieChart;
