import { Order, WooCommerceOrdersResponse } from '@/types/woocommerce';
import React from 'react'
import OrderItem from './OrderItem';
import OrdersTableHeader from './OrdersTableHeader';
import { User } from '@/types';
import { ORDER_STATUSES } from '@/helpers/order-statuses';

interface OrdersListProps {
    orders: Order[];
    user: User;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, user }) => {
    const { website_url } = user;
    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-5 mb-10'>
                <div className='filter-input__container flex flex-col gap-2'>
                    <label htmlFor="order-status" className='text-sm'>Κατάσταση Παραγγελίας</label>
                    <select name="order-status" id="order-status" className='cursor-pointer text-sm border !border-gray-100 rounded-md'>
                        <option value="all">Όλες</option>
                        {Object.entries(ORDER_STATUSES).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
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