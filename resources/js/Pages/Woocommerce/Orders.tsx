import { Head, usePage } from '@inertiajs/react';
import Message from '@/Components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { WooCommerceOrdersResponse } from '@/types/woocommerce';
import OrdersList from '@/Components/Woocommerce/Orders/OrdersList';
import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import Skeleton from 'react-loading-skeleton';

interface OrdersPageProps {
    orders: WooCommerceOrdersResponse;
}

export default function Orders() {
    const [page, setPage] = useState(1);
    const { data, isError, isLoading, error, isFetching, isPending } = useOrders(page);
    const user = usePage().props.auth.user;
    console.log(data);

    if (isLoading || isFetching) {
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
