import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        tel: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Εγγραφή" />
            <form onSubmit={submit} className='flex flex-col gap-6'>
                <div className="flex gap-4">
                    <div className='flex flex-col gap-1 flex-1'>
                        <InputLabel htmlFor="first_name" value="Όνομα" />
                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <InputLabel htmlFor="last_name" value="Επίθετο" />
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <InputLabel htmlFor="tel" value="Τηλέφωνο" />
                        <TextInput
                            id="tel"
                            type="tel"
                            name="tel"
                            value={data.tel}
                            className="w-full"
                            autoComplete="telephone"
                            onChange={(e) => setData('tel', e.target.value)}
                        />
                        <InputError message={errors.tel} className="mt-2" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <InputLabel htmlFor="password" value="Κωδικός" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="flex flex-col gap-1">
                    <InputLabel htmlFor="password_confirmation" value="Επιβεβαίωση κωδικού" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                <div className="flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-theme-secondary duration-150 opacity-80 rounded-md focus:!outline-none font-semibold"
                    >
                        Είστε ήδη εγγεγραμένος;
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Εγγραφη
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
