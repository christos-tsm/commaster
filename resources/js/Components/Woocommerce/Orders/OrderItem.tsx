import { Order } from '@/types/woocommerce'
import React from 'react'

interface OrderItemInterface {
    order: Order;
}

const OrderItem: React.FC<OrderItemInterface> = ({ order }) => {
    return (
        <div>
            {order.id}
            {order.billing.address_1}
        </div>
    )
}

export default OrderItem