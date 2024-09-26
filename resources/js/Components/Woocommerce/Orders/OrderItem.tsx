import React, { useState } from 'react'
import { ArrowDownFromLine, ArrowUpFromLine, Eye } from 'lucide-react';
import { Order } from '@/types/woocommerce'

interface OrderItemInterface {
    order: Order;
    website_url?: string;
}

const OrderItem: React.FC<OrderItemInterface> = ({ order, website_url }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    return (
        <div data-order={order.id} className='grid md:grid-cols-6 text-sm even:bg-gray-100 border border-gray-200'>
            <div className='p-2 text-sm font-medium'>
                {order.id}
            </div>
            <div className='p-2 text-sm font-medium'>
                {order.date_created}
            </div>
            <div className='p-2 text-sm font-medium'>
                {order.billing.first_name} {order.billing.last_name}
            </div>
            <div className='p-2 text-sm font-medium'>
                {order.total} {order.currency_symbol} / {order.total_tax} {order.currency_symbol}
            </div>
            <div className='p-2 text-sm font-medium'>
                {order.status}
            </div>
            <div className='p-2 text-sm flex items-center gap-2 justify-end' onClick={() => setDetailsOpen(!detailsOpen)}>
                <a href={`${website_url}/wp-admin/admin.php?page=wc-orders&action=edit&id=${order.id}`} target='_blank' rel='noopener'><Eye strokeWidth={1} width={20} height={20} /></a>
                {detailsOpen ? <ArrowUpFromLine className='cursor-pointer' width={20} height={20} /> : <ArrowDownFromLine className='cursor-pointer' width={20} height={20} />}
            </div>
            <div className={`col-span-6 border-l-2 border-theme-primary p-2  ${detailsOpen ? 'block' : 'hidden'}`}>
                {order.line_items && order.line_items.map((item) => (
                    <div key={item.id}>
                        {item.image && <img src={item.image.src} alt={item.name} width={50} height={50} />}
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderItem