import { LineItem } from '@/types/woocommerce'
import React from 'react'

interface OrderItemDetailsProps {
    item: LineItem
    currency: string
    customer_note?: string
}

const OrderItemDetails: React.FC<OrderItemDetailsProps> = ({ item, currency, customer_note }) => {
    return (
        <div className='grid grid-cols-3 odd:bg-gray-100 p-4 rounded-md gap-x-4'>
            <div className='flex gap-2 items-start'>
                {item.image && <img src={item.image.src} alt={item.name} width={40} height={40} className='border border-theme-primary/70 object-contain mix-blend-darken' />}
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm'>{item.name}</h3>
                    <p className='text-xs'>SKU: <strong>{item.sku ? item.sku : 'N/A'}</strong></p>
                    <p className='text-xs'> Ποσότητα: <strong>x{item.quantity}</strong></p>
                </div>
            </div>
            <div className='text-sm'>
                <h3>Υποσύνολο - Υποσύνολο φόρου</h3>
                <p>{item.subtotal} {currency} - {item.subtotal_tax} {currency} </p>
            </div>
            <div className='text-sm'>
                <h3 className='flex justify-between'>Σύνολο - Σύνολο φόρου</h3>
                <p>{item.total} {currency} - {item.total_tax} {currency} </p>
            </div>
        </div>
    )
}

export default OrderItemDetails