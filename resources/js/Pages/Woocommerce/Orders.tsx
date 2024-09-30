import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { el } from 'date-fns/locale/el';
import { Head, usePage } from '@inertiajs/react';
import Message from '@/Components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { WooCommerceOrdersResponse } from '@/types/woocommerce';
import OrdersList from '@/Components/Woocommerce/Orders/OrdersList';
import { useOrders } from '@/hooks/useOrders';
import { ORDER_STATUSES } from '@/helpers/order-statuses';

interface OrdersPageProps {
    orders: WooCommerceOrdersResponse;
}

export default function Orders() {
    registerLocale('el', el)
    const [page, setPage] = useState(1);
    const { data, isError, isLoading, error, isFetching, isPending } = useOrders(page);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const user = usePage().props.auth.user;
    // console.log(data);

    if (isLoading || isFetching || isPending) {
        return (
            <AuthenticatedLayout>
                <Head title="Παραγγελίες" />
                <div className="m-10">
                    <Skeleton count={10} height={30} />
                </div>
            </AuthenticatedLayout>
        )
    }

    return (
        <AuthenticatedLayout>
            <Head title="Παραγγελίες" />
            <div className="m-10">
                {/* @ts-ignore */}
                {isError && error ? <Message message={error.message} type="error" /> : null}
                <div className='grid grid-cols-1 lg:grid-cols-5 mb-10 gap-5'>
                    <div className='filter-input__container flex flex-col gap-2'>
                        <label htmlFor="order-status" className='text-sm'>Κατάσταση Παραγγελίας</label>
                        <select name="order-status" id="order-status" className='cursor-pointer text-sm border !border-gray-100 rounded-md'>
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
                            dateFormat="dd/MM/yyyy"
                            locale="el"
                            selectsRange={true}
                            startDate={startDate || undefined}
                            endDate={endDate || undefined}
                            onChange={(update: [Date | null, Date | null]) => {
                                setDateRange(update);
                                console.log(update)
                            }}
                            withPortal
                        />
                    </div>
                </div>
                <OrdersList orders={data.orders} user={user} />
                {data.total_pages > 1 ? (
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
