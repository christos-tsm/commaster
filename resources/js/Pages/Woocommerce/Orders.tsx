import { Head } from '@inertiajs/react';
import Message from '@/Components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { WooCommerceOrdersResponse } from '@/types/woocommerce';
import OrdersList from '@/Components/Woocommerce/Orders/OrdersList';

interface OrdersPageProps {
    orders: WooCommerceOrdersResponse;
}

export default function Orders({ orders }: OrdersPageProps) {
    // Check if the response is an error or an array of orders
    if ('error' in orders) {
        return (
            <AuthenticatedLayout>
                <Head title="Παραγγελίες" />
                <div className="m-10">
                    <Message message={orders.error} type="error" />
                </div>
            </AuthenticatedLayout>
        );
    }
    // console.log(orders);
    return (
        <AuthenticatedLayout>
            <Head title="Παραγγελίες" />
            <div className="m-10">
                <OrdersList orders={orders} />
            </div>
        </AuthenticatedLayout>
    );
}
