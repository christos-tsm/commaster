import React from 'react'

const OrdersTableHeader = () => {
    return (
        <div className='hidden md:grid md:grid-cols-6 gap-x-4'>
            <div className="p-4 text-sm font-semibold">
                ID / Αναγνωριστικό
            </div>
            <div className="p-4 text-sm font-semibold">
                Ημερομηνία
            </div>
            <div className="p-4 text-sm font-semibold">
                Πελάτης
            </div>
            <div className="p-4 text-sm font-semibold">
                Συνολικό Ποσό / Φόρος
            </div>
            <div className="p-4 text-sm font-semibold">
                Κατάσταση
            </div>
            <div className="p-4 text-sm font-semibold">
                Περισσότερα
            </div>
        </div>
    )
}

export default OrdersTableHeader