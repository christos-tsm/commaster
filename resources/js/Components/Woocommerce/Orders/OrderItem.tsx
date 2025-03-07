import React, { useState } from 'react'
import { format } from 'date-fns';
import { ArrowDownFromLine, ArrowUpFromLine, Eye, Settings } from 'lucide-react';
import OrderItemDetails from './OrderItemDetails';
import { Order } from '@/types/woocommerce'
import { ORDER_STATUSES } from '@/helpers/order-statuses';
import { Link } from '@inertiajs/react';

interface OrderItemInterface {
    order: Order;
    website_url?: string;
}

const OrderItem: React.FC<OrderItemInterface> = ({ order, website_url }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const readableOrderStatus = ORDER_STATUSES[order.status];
    const formattedDate = format(new Date(order.date_created), 'dd/MM/yyyy HH:mm:ss');
    return (
        <div data-order={order.id} className={`grid md:grid-cols-6 gap-x-4 duration-300 text-sm border border-gray-200 bg-white even:bg-theme-primary/5 hover:border-theme-primary `} >
            <div className='text-sm font-medium p-4'>
                #{order.id}
            </div>
            <div className='text-sm font-medium p-4'>
                {formattedDate}
            </div>
            <div className='text-sm font-medium p-4'>
                {order.billing.first_name} {order.billing.last_name}
            </div>
            <div className='text-sm font-medium p-4'>
                {order.total} {order.currency_symbol} / {order.total_tax} {order.currency_symbol}
            </div>
            <div className='text-sm font-medium p-4'>
                <span className={`px-2 py-1 rounded-md text-xs order-status ${order.status}`}>{readableOrderStatus}</span>
            </div>
            <div className='text-sm flex items-center gap-2 justify-end p-4'>
                <Link href={`/orders/${order.id}`}>
                    <Settings strokeWidth={1} width={20} height={20} />
                </Link>
                <a href={`${website_url}/wp-admin/admin.php?page=wc-orders&action=edit&id=${order.id}`} target='_blank' rel='noopener'><Eye strokeWidth={1} width={20} height={20} /></a>
                {detailsOpen ? <ArrowUpFromLine className='cursor-pointer' width={20} height={20} onClick={() => setDetailsOpen(!detailsOpen)} /> : <ArrowDownFromLine className='cursor-pointer' width={20} height={20} onClick={() => setDetailsOpen(!detailsOpen)} />}
            </div>
            <div className={`col-span-6 ${detailsOpen ? 'block' : 'hidden'} p-4`}>
                <div className="flex gap-4">
                    <div className="flex-col gap-4 flex-1">
                        {order.line_items && order.line_items.map((item) => (
                            <OrderItemDetails item={item} key={item.id} currency={order.currency_symbol} />
                        ))}
                    </div>
                    <div className='flex flex-col gap-4 flex-1'>
                        <div className='payment-details'>
                            <ul className='flex flex-col gap-2'>
                                <h3 className='font-bold uppercase border-b border-b-gray-400'>Στοιχεία χρέωσης</h3>
                                <li><strong>Διεύθυνση:</strong> {order.billing.address_1 ? order.billing.address_1 + ' - ' : '-'} {order.billing.city ? order.billing.city + ' - ' : ''} {order.billing.postcode ? order.billing.postcode + ' - ' : ''} {order.billing.country ? <small>{order.billing.country}</small> : ''}</li>
                                {order.billing.address_2 && <li><strong>Διεύθυνση 2:</strong> {order.billing.address_2}</li>}
                                {order.billing.company && <li><strong>Εταιρεία:</strong> {order.billing.company}</li>}
                                <li><strong>Όνομα:</strong> {order.billing.first_name} {order.billing.last_name}</li>
                                <li><strong>Τηλέφωνο:</strong> {order.billing.phone ? <a href={`tel:${order.billing.phone}`} className='text-theme-secondary font-semibold underline'>{order.billing.phone}</a> : '-'}</li>
                                <li><strong>Email:</strong> {order.billing.email ? <a href={`mailto:${order.billing.email}`} className='text-theme-secondary font-semibold underline'>{order.billing.email}</a> : '-'}</li>
                            </ul>
                        </div>
                        <div className='shipping-details'>
                            <ul className='flex flex-col gap-2'>
                                <h3 className='font-bold uppercase border-b border-b-gray-400'>Στοιχεία αποστολής</h3>
                                <li><strong>Διεύθυνση:</strong> {order.shipping.address_1 ? order.shipping.address_1 + ' - ' : '-'} {order.shipping.city ? order.shipping.city + ' - ' : ''} {order.shipping.postcode ? order.shipping.postcode + ' - ' : ''} {order.shipping.country ? <small>{order.shipping.country}</small> : ''}</li>
                                {order.shipping.address_2 && <li><strong>Διεύθυνση 2:</strong> {order.shipping.address_2}</li>}
                                {order.shipping.company && <li><strong>Εταιρεία:</strong> {order.shipping.company}</li>}
                                <li><strong>Όνομα:</strong> {order.shipping.first_name && order.shipping.last_name ? order.shipping.first_name + ' ' + order.shipping.last_name : '-'}</li>
                                <li><strong>Τηλέφωνο:</strong> {order.shipping.phone ? <a href={`tel:${order.shipping.phone}`} className='text-theme-secondary font-semibold underline'>{order.shipping.phone}</a> : '-'}</li>
                            </ul>
                        </div>
                        <div className="order-notes flex flex-col gap-2">
                            <h3 className='font-bold uppercase border-b border-b-gray-400'>Σημείωσεις</h3>
                            {order.customer_note ? <p>{order.customer_note}</p> : <p>Δεν υπάρχουν σημειώσεις</p>}
                        </div>
                        <div className='flex gap-10'>
                            <div className='flex-1 delivery-type flex flex-col gap-2'>
                                <h3 className='font-bold uppercase border-b border-b-gray-400'>Τρόπος παράδοσης</h3>
                                <p>{order.payment_method} | {order.payment_method_title}</p>
                            </div>
                            <div className='flex-1 customer-tech-details flex flex-col gap-2'>
                                <h3 className='font-bold uppercase border-b border-b-gray-400'>IP παραγγελίας</h3>
                                <p>{order.customer_ip_address}</p>
                                <p>{order.customer_user_agent}</p>
                            </div>
                        </div>
                        {order.status === 'completed' && order.date_completed ?
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-bold uppercase border-b border-b-gray-400'>Ημερομηνία ολοκληρωσης παραγγελίας</h3>
                                <p>{format(new Date(order.date_completed), 'dd/MM/yyyy HH:mm:ss')}</p>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem