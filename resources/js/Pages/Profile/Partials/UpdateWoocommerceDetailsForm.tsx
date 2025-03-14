import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateWoocommerceDetailsForm({ className = '' }: { className?: string }) {
    const websiteUrlInput = useRef<HTMLInputElement>(null);
    const consumerKeyInput = useRef<HTMLInputElement>(null);
    const consumerSecretInput = useRef<HTMLInputElement>(null);
    const user = usePage().props.auth.user;

    const { data, setData, errors, put, processing, recentlySuccessful } = useForm({
        website_url: user.website_url ?? '',
        woocommerce_consumer_key: '', // Start empty for editing
        woocommerce_consumer_secret: '', // Start empty for editing
    });

    const updateWoocommerceDetails: FormEventHandler = (e) => {
        e.preventDefault();
        // Trim any trailing slash from the website URL
        let sanitizedUrl = data.website_url.trim();
        if (sanitizedUrl.endsWith('/')) {
            sanitizedUrl = sanitizedUrl.slice(0, -1); // Remove the trailing slash
        }
        // Set the sanitized URL back to the form data
        setData('website_url', sanitizedUrl);
        put(route('woocommerce.update'), {
            preserveScroll: true,
            onSuccess: () => {
                location.reload();
            },
            onError: (errors) => {
                // Handle errors if needed
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Σύνδεση στο Woocommerce</h2>

                <p className="mt-1 text-sm text-gray-600">
                    <Link className="font-bold text-theme-secondary" href='#!'>
                        Εδω
                    </Link>{' '}
                    θα βρείτε τον οδηγό για να συνδέσετε το κατάστημα σας με την εφαρμογή μας. <br />
                    Βεβαιωθείτε ότι το e-shop σας χρησιμοποιεί το SSL /TLS πρωτόκολλο (https).
                </p>
            </header>

            <form onSubmit={updateWoocommerceDetails} className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col gap-1">
                    <InputLabel htmlFor="website_url" value="URL του e-shop σας" />
                    <TextInput
                        id="website_url"
                        ref={websiteUrlInput}
                        value={data.website_url}
                        onChange={(e) => setData('website_url', e.target.value)}
                        type="text"
                        className="w-full"
                    />
                    <InputError message={errors.website_url} className="mt-2" />
                </div>
                <div className="flex flex-col gap-1">
                    <InputLabel htmlFor="woocommerce_consumer_key" value="Consumer Key" />
                    <TextInput
                        id="woocommerce_consumer_key"
                        ref={consumerKeyInput}
                        placeholder={user.masked_woocommerce_consumer_key} // Show masked key if available
                        value={data.woocommerce_consumer_key} // Use the reactive form data
                        onChange={(e) => setData('woocommerce_consumer_key', e.target.value)} // Update form data
                        type="text"
                        className="w-full"
                    />
                    <InputError message={errors.woocommerce_consumer_key} className="mt-2" />
                </div>
                <div className="flex flex-col gap-1">
                    <InputLabel htmlFor="woocommerce_consumer_secret" value="Consumer Secret Key" />
                    <TextInput
                        id="woocommerce_consumer_secret"
                        ref={consumerSecretInput}
                        placeholder={user.masked_woocommerce_consumer_secret} // Show masked secret if available
                        value={data.woocommerce_consumer_secret} // Use the reactive form data
                        onChange={(e) => setData('woocommerce_consumer_secret', e.target.value)} // Update form data
                        type="text"
                        className="w-full"
                    />
                    <InputError message={errors.woocommerce_consumer_secret} className="mt-2" />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Αποθηκευση</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Τα στοιχεία σύνδεσης με το Woocommerce ενημερώθηκαν.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
