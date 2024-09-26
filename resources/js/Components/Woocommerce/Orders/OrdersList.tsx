import { Order, WooCommerceOrdersResponse } from '@/types/woocommerce';
import React from 'react'
import OrderItem from './OrderItem';
import OrdersTableHeader from './OrdersTableHeader';
import { User } from '@/types';

interface OrdersListProps {
    orders: Order[];
    user: User;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, user }) => {
    const { website_url } = user;
    return (
        <>
            {orders.length >= 1 ? <OrdersTableHeader /> : null}
            <div className='flex flex-col'>
                {orders && orders?.map((order: Order) => (
                    <OrderItem order={order} key={order.id} website_url={website_url} />
                ))}
            </div>
        </>
    )
}

export default OrdersList