import OrdersPieChart from '@/Components/Woocommerce/Widgets/OrdersPieChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Γενικά" />
            <div className="m-4 grid grid-cols-4 gap-10">
                <OrdersPieChart />
            </div>
        </AuthenticatedLayout>
    );
}
