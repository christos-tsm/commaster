import { Order, WooCommerceOrdersResponse } from '@/types/woocommerce';
import React from 'react'
import OrderItem from './OrderItem';

interface OrdersListProps {
    orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
    return (
        <div>
            {orders && orders?.map((order: Order) => (
                <OrderItem order={order} key={order.id} />
            ))}
        </div>
    )
}

export default OrdersList