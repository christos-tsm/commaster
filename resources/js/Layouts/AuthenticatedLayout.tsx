import { useState, PropsWithChildren, ReactNode } from 'react';
import { ChevronDown, LayoutDashboard, ListOrdered, PackageSearch, Power, UserPen } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <nav className="bg-white border-b border-gray-100 min-w-[250px] flex flex-col">
                <Link href={route('dashboard')} className="flex px-2 py-4">
                    <ApplicationLogo className="w-[150px] h-auto" />
                </Link>
                <ul className='flex-1 border-b border-b-gray-100'>
                    <li>
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            <LayoutDashboard strokeWidth={1.2} />
                            Πίνακας ελέγχου
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('dashboard')} active={route().current('orders')}>
                            <ListOrdered strokeWidth={1.2} />
                            Παραγγελίες
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('dashboard')} active={route().current('products')}>
                            <PackageSearch strokeWidth={1.2} />
                            Προϊόντα
                        </NavLink>
                    </li>
                </ul>
                <ul className=''>
                    <li>
                        <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                            <UserPen strokeWidth={1.2} />
                            Προφίλ & Ρυθμίσεις
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('logout')} method="post" as="button" active={route().current('logout')}>
                            <Power strokeWidth={1.2} />
                            Αποσύνδεση
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <main className="h-screen overflow-y-auto flex-1">
                {children}
            </main>
        </div>
    );
}
