import React from 'react'

const ProductsTableHeader = () => {
    return (
        <div className='hidden md:grid md:grid-cols-8 gap-x-4'>
            <div className="p-4 text-sm font-semibold">
                ID / Αναγνωριστικό
            </div>
            <div className="p-4 text-sm font-semibold">
                Όνομα
            </div>
            <div className="p-4 text-sm font-semibold">
                Εικόνα
            </div>
            <div className="p-4 text-sm font-semibold">
                Ημ/νία Καταχώρησης
            </div>
            <div className="p-4 text-sm font-semibold">
                Τιμή
            </div>
            <div className="p-4 text-sm font-semibold">
                Απόθεμα
            </div>
            <div className="p-4 text-sm font-semibold">
                Κατηγορίες
            </div>
            <div className="p-4 text-sm font-semibold text-right">
                Περισσότερα
            </div>
        </div>
    )
}

export default ProductsTableHeader