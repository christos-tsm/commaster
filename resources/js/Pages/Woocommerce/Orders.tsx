// Orders.jsx

import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import { el } from 'date-fns/locale/el';
import { Head, usePage } from '@inertiajs/react';
import Message from '@/Components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import OrdersList from '@/Components/Woocommerce/Orders/OrdersList';
import { useOrders } from '@/hooks/useOrders';
import { ORDER_STATUSES } from '@/helpers/order-statuses';

export default function Orders() {
    registerLocale('el', el);
    const props = usePage().props;
    const serverError = props.error || null;
    const [page, setPage] = useState(1);

    // New state variables for filters
    const [status, setStatus] = useState('all');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [filters, setFilters] = useState({
        status: 'all',
        startDate: null,
        endDate: null,
    });

    const { data, isError, isLoading, error, isFetching, isPending } = useOrders(page, filters, !serverError);
    const user = usePage().props.auth.user;

    // Reset page to 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [filters]);

    if (isLoading || isFetching || isPending) {
        return (
            <AuthenticatedLayout>
                <Head title="Παραγγελίες" />
                <div className="m-10">
                    <Skeleton count={10} height={30} />
                </div>
            </AuthenticatedLayout>
        );
    }

    if (serverError) {
        return (
            <AuthenticatedLayout>
                <Head title="Παραγγελίες" />
                <div className="m-10">
                    <Message message={serverError as string} type="error" />
                </div>
            </AuthenticatedLayout>
        );
    }

    const handleApplyFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFilters({
            status,
            // @ts-ignore
            startDate,
            // @ts-ignore
            endDate,
        });
    };

    const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFilters({
            status: 'all',
            startDate: null,
            endDate: null,
        })
        setStatus('all');
        setDateRange([null, null]);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Παραγγελίες" />
            <div className="m-10">
                <div className='grid grid-cols-1 lg:grid-cols-5 mb-10 gap-5 items-end'>
                    <div className='filter-input__container flex flex-col gap-2'>
                        <label htmlFor="order-status" className='text-sm'>Κατάσταση Παραγγελίας</label>
                        <select
                            name="order-status"
                            id="order-status"
                            className='cursor-pointer text-sm border !border-gray-100 rounded-md'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="all">Όλες</option>
                            {Object.entries(ORDER_STATUSES).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-input__container flex flex-col gap-2">
                        <label htmlFor="date-from" className='text-sm'>Εύρος Ημερομηνιών</label>
                        <DatePicker
                            className="w-full"
                            id="date-from"
                            dateFormat="dd/MM/yyyy"
                            locale="el"
                            selectsRange={true}
                            startDate={startDate || undefined}
                            endDate={endDate || undefined}
                            onChange={(update: [Date | null, Date | null]) => {
                                setDateRange(update);
                            }}
                            withPortal
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleApplyFilters}
                            className="bg-theme-secondary text-white text-sm px-4 py-0 h-[38px] inline-flex items-center rounded-md"
                        >
                            Εφαρμογή
                        </button>
                        {status !== 'all' || dateRange[0] && dateRange[1] ?
                            <button
                                onClick={handleClearFilters}
                                className="bg-gray-200 text-theme-primary text-sm px-4 py-0 h-[38px] inline-flex items-center rounded-md"
                            >
                                Εκκαθάριση
                            </button>
                            : null
                        }
                    </div>
                </div>
                {isError && error ? <Message message={error.message} type="error" /> : null}
                {data && data.orders && <OrdersList orders={data.orders} user={user} />}
                {data && data.total_pages > 1 ? (
                    <div className='flex gap-2 mt-10'>
                        {Array.from({ length: data.total_pages }, (_, i) => (
                            <button
                                key={i}
                                className={`w-7 h-7 text-xs duration-150 rounded-md ${page === i + 1 ? 'bg-theme-primary text-white' : 'bg-white hover:bg-theme-primary/80 hover:text-white'}`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>
        </AuthenticatedLayout>
    );
}
