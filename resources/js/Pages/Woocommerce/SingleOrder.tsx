import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { MoveLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

import { Order } from '@/types/woocommerce';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import OrderItemDetails from '@/Components/Woocommerce/Orders/OrderItemDetails';
import TextInput from '@/Components/TextInput';
import Message from '@/Components/Message';
import { useUpdateOrder } from '@/hooks/useUpdateOrder';
import { ORDER_STATUSES } from '@/helpers/order-statuses';

interface OrderDetailProps {
    order: Order;
}

type Section = 'billing' | 'shipping';
type BillingShippingField = 'first_name' | 'last_name' | 'address_1' | 'address_2' | 'city' | 'postcode' | 'phone' | 'email';

const SingleOrder: React.FC<OrderDetailProps> = ({ order }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [singleOrderData, setSingleOrderData] = useState(order);
    const { mutate: updateOrder, isPending } = useUpdateOrder();

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

    const handleSingleOrderUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const payload = {
            id: singleOrderData.id,
            billing: singleOrderData.billing,
            shipping: singleOrderData.shipping,
            line_items: singleOrderData.line_items,
            shipping_lines: singleOrderData.shipping_lines,
            status: singleOrderData.status, // Include the updated status
            total: singleOrderData.total, // Include the total and tax information
            total_tax: singleOrderData.total_tax,
            currency: singleOrderData.currency,
            payment_method: singleOrderData.payment_method,
            payment_method_title: singleOrderData.payment_method_title,
        };
        console.log(singleOrderData.status);

        updateOrder(payload, {
            onSuccess: () => {
                setIsEditMode(false); // Disable edit mode after successful update
                toast.success('Η παραγγελία ανανεώθηκε επιτυχώς');
            },
            onError: (error) => {
                console.error('Error updating order:', error);
                toast.error('Υπήρξε σφαλμα κατά την ανανεωση της παραγγελίας, δοκιμάστε ξανά αργότερα');
            },
        });
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

    if (!order) {
        return (
            <AuthenticatedLayout>
                <div className="mt-10">
                    <Skeleton count={15} />
                </div>
            </AuthenticatedLayout>
        );
    }

    if (order.error) {
        return (
            <AuthenticatedLayout>
                <div className="mt-10">
                    <Message type='error' message={order.error} />
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Παραγγελία ${order?.id} - ${order?.billing?.first_name} ${order?.billing?.last_name}`} />
            <div className="m-10">
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <Link href={route('orders')} className='gap-2 inline-flex items-center px-4 py-2 bg-theme-primary hover:bg-theme-primary-darken border border-transparent rounded-md font-medium text-xs text-white transition ease-in-out duration-150 '>
                            <MoveLeft width={20} height={20} />
                        </Link>
                        <h1 className='p-4 font-semibold text-base'>
                            Παραγγελία {order.id} - {order.billing.first_name} {order.billing.last_name}
                        </h1>
                    </div>
                    <div className='flex gap-2'>
                        {isEditMode ? (
                            <>
                                <PrimaryButton onClick={handleSingleOrderUpdate} disabled={isPending} className='bg-theme-secondary hover:bg-theme-secondary-darken'>
                                    {isPending ? 'Αποθήκευση...' : 'Αποθήκευση'}
                                </PrimaryButton>
                                <SecondaryButton onClick={() => setIsEditMode(false)}>Ακύρωση</SecondaryButton>
                            </>
                        ) : (
                            <PrimaryButton onClick={() => setIsEditMode(true)}>Επεξεργασία παραγγελίας</PrimaryButton>
                        )}
                    </div>
                </div>

                {/* Order Status Selection */}
                <div className='single-order__billing-details mt-10'>
                    <h2 className="font-semibold text-lg mb-5 flex items-center gap-5">Κατάσταση παραγγελίας  <span className="h-[1px] bg-gray-300 flex-1"></span></h2>
                    <select
                        name="order-status"
                        id="order-status"
                        className='cursor-pointer text-sm border !border-gray-100 rounded-md w-full'
                        value={singleOrderData.status} // Use state value
                        onChange={(e) => setSingleOrderData((prevData) => ({
                            ...prevData,
                            status: e.target.value, // Update the status in state
                        }))}
                        disabled={isPending || !isEditMode} // Disable when not in edit mode
                    >
                        {Object.entries(ORDER_STATUSES).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
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

                <div className='single-order__billing-details mt-10'>
                    <h2 className="font-semibold text-lg mb-5 flex items-center gap-5">Σημειώσεις Παραγγελίας  <span className="h-[1px] bg-gray-300 flex-1"></span></h2>
                    <div>
                        {order.customer_note ? order.customer_note : '-'}
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
