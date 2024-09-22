import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-2 py-4 text-sm font-medium transition duration-150 ease-in-out focus:outline-none w-full gap-2 hover:text-theme-secondary ' +
                (active
                    ? 'bg-gray-100 text-theme-secondary '
                    : 'bg-white ') +
                className
            }
        >
            {children}
        </Link>
    );
}
