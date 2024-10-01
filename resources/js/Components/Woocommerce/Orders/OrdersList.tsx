import { Order, WooCommerceOrdersResponse } from '@/types/woocommerce';
import React from 'react'
import OrderItem from './OrderItem';
import OrdersTableHeader from './OrdersTableHeader';
import { User } from '@/types';
import { ORDER_STATUSES } from '@/helpers/order-statuses';
import Message from '@/Components/Message';

interface OrdersListProps {
    orders: Order[];
    user: User;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, user }) => {
    const { website_url } = user;
    return (
        <>
            {orders.length === 0 ? <Message message='Δεν βρέθηκαν παραγγελίες' type='info' /> : null}
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