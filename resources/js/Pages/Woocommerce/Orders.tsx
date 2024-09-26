import { Head, usePage } from '@inertiajs/react';
import Message from '@/Components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { WooCommerceOrdersResponse } from '@/types/woocommerce';
import OrdersList from '@/Components/Woocommerce/Orders/OrdersList';
import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';

interface OrdersPageProps {
    orders: WooCommerceOrdersResponse;
}

export default function Orders() {
    const [page, setPage] = useState(1);
    const { data: orders, isError, isLoading, error, isFetching } = useOrders(page);
    const user = usePage().props.auth.user;

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <Message message={error.message} type="error" />;
    console.log(orders);
    return (
        <AuthenticatedLayout>
            <Head title="Παραγγελίες" />
            <div className="m-10">
                {/* @ts-ignore */}
                {isLoading ? <p>Loading...</p> : null}
                {isError && error ? <Message message={error.message} type="error" /> : null}
                <OrdersList orders={orders} user={user} />
            </div>
        </AuthenticatedLayout>
    );
}
