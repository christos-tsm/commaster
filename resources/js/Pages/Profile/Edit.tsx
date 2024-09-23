import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import UpdateWoocommerceDetailsForm from './Partials/UpdateWoocommerceDetailsForm';

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Προφίλ & Ρυθμίσεις" />
            <div className="m-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg lg:col-span-2">
                    <UpdateWoocommerceDetailsForm />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg lg:col-span-2">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
