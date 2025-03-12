import OrdersPieChart from '@/Components/Woocommerce/Widgets/OrdersPieChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { wooConnectError } = usePage().props;

    if (wooConnectError) {
        return (
            <AuthenticatedLayout>
                <Head title="Γενικά" />
                <div className="m-10">
                    <p className="text-sm w-full px-4 py-2 rounded-md text-center bg-red-400 text-red-100">{wooConnectError}</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Γενικά" />
            <div className="m-4 grid grid-cols-4 gap-10">
                <OrdersPieChart />
            </div>
        </AuthenticatedLayout>
    );
}
