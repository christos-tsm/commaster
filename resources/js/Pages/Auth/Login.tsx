import { FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className='flex flex-col gap-6'>
                <div className='flex flex-col gap-1'>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full"
                        autoComplete="email"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="flex flex-col gap-1">
                    <InputLabel htmlFor="password" value="Κωδικός" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Μείνετε συνδεδεμένοι</span>
                    </label>
                </div>
                <div className="flex items-center justify-between mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-theme-primary hover:text-theme-primary-darken duraion-150 rounded-md focus:outline-none"
                        >
                            Ξεχάσατε τον κωδικό σας;
                        </Link>
                    )}
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Συνδεση
                    </PrimaryButton>
                </div>
                <div className="flex">
                    <p className='text-sm'>
                        Δεν έχετε λογαριασμό; Πατήστε <Link href={route('register')} className="text-sm text-theme-secondary duration-150 opacity-80 rounded-md font-semibold"> εδώ  </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
