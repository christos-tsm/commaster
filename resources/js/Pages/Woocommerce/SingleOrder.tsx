import React, { useState } from 'react';
import { Order } from '@/types/woocommerce';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MoveLeft } from 'lucide-react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import OrderItemDetails from '@/Components/Woocommerce/Orders/OrderItemDetails';
import TextInput from '@/Components/TextInput';

interface OrderDetailProps {
    order: Order;
}

// Strictly define the sections as either 'billing' or 'shipping'
type Section = 'billing' | 'shipping';

// Define the fields that can be updated
type BillingShippingField = 'first_name' | 'last_name' | 'address_1' | 'address_2' | 'city' | 'postcode' | 'phone' | 'email';

const SingleOrder: React.FC<OrderDetailProps> = ({ order }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [singleOrderData, setSingleOrderData] = useState(order);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const section = e.target.dataset.section as Section;
        const fieldName = name as BillingShippingField;

        setSingleOrderData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [fieldName]: value,
            },
        }));
    };

    // Greek translations for the labels
    const labels = {
        first_name: 'Όνομα',
        last_name: 'Επώνυμο',
        address_1: 'Διεύθυνση 1',
        address_2: 'Διεύθυνση 2',
        city: 'Πόλη',
        postcode: 'Τ.Κ.',
        phone: 'Τηλέφωνο',
        email: 'Email',
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Παραγγελία ${order.id} - ${order.billing.first_name} ${order.billing.last_name}`} />
            <div className="m-10">
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <PrimaryButton>
                            <Link href={route('orders')} className='flex items-center gap-2'>
                                <MoveLeft width={20} height={20} />
                            </Link>
                        </PrimaryButton>
                        <h1 className='p-4 font-semibold text-base'>
                            Παραγγελία {order.id} - {order.billing.first_name} {order.billing.last_name}
                        </h1>
                    </div>
                    <div className='flex gap-2'>
                        {isEditMode ? (
                            <>
                                <PrimaryButton onClick={() => setIsEditMode(false)} className='bg-theme-secondary hover:bg-theme-secondary-darken'>Αποθήκευση</PrimaryButton>
                                <SecondaryButton onClick={() => setIsEditMode(false)}>Ακύρωση</SecondaryButton>
                            </>
                        ) : (
                            <PrimaryButton onClick={() => setIsEditMode(true)}>Επεξεργασία παραγγελίας</PrimaryButton>
                        )}
                    </div>
                </div>

                {/* Billing Details Section */}
                <div className='single-order__billing-details mt-10'>
                    <h2 className="font-semibold text-lg mb-5 flex items-center gap-5">Στοιχεία Χρέωσης  <span className="h-[1px] bg-gray-300 flex-1"></span></h2>
                    <div className="grid grid-cols-2 gap-4">
                        {['first_name', 'last_name', 'address_1', 'address_2', 'city', 'postcode', 'phone', 'email'].map((field) => (
                            <div className="flex flex-col gap-1" key={field}>
                                <label htmlFor={`billing-${field}`} className="font-medium text-sm">
                                    {labels[field as keyof typeof labels]}
                                </label>
                                <TextInput
                                    type="text"
                                    id={`billing-${field}`}
                                    name={field}
                                    data-section="billing"
                                    className="read-only:border-transparent read-only:hover:border-transparent read-only:focus:border-transparent read-only:cursor-auto"
                                    readOnly={!isEditMode}
                                    value={singleOrderData.billing[field as keyof typeof singleOrderData.billing]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Details Section */}
                <div className='single-order__shipping-details mt-10'>
                    <h2 className="font-semibold text-lg mb-5 flex items-center gap-5">Στοιχεία Αποστολής <span className="h-[1px] bg-gray-300 flex-1"></span></h2>
                    <div className="grid grid-cols-2 gap-4">
                        {['first_name', 'last_name', 'address_1', 'address_2', 'city', 'postcode', 'phone'].map((field) => (
                            <div className="flex flex-col gap-1" key={field}>
                                <label htmlFor={`shipping-${field}`} className="font-medium text-sm">
                                    {labels[field as keyof typeof labels]}
                                </label>
                                <TextInput
                                    type="text"
                                    id={`shipping-${field}`}
                                    name={field}
                                    data-section="shipping"
                                    className="read-only:border-transparent read-only:hover:border-transparent read-only:focus:border-transparent read-only:cursor-auto"
                                    readOnly={!isEditMode}
                                    value={singleOrderData.shipping[field as keyof typeof singleOrderData.shipping]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order line items */}
                <div className="mt-10">
                    <h2 className="font-semibold text-lg flex items-center gap-5">Προϊόντα Παραγγελίας <span className="h-[1px] bg-gray-300 flex-1"></span></h2>
                    <div className="flex-col gap-4 flex-1">
                        {order.line_items && order.line_items.map((item) => (
                            <OrderItemDetails item={item} key={item.id} currency={order.currency_symbol} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default SingleOrder;
