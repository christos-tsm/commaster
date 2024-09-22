import ApplicationLogoVertical from '@/Components/ApplicationLogoVertical';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen h-screen flex pt-6 sm:pt-0 bg-white">
            <div className='flex-1 p-5 flex flex-col items-center justify-center'>
                <div className='mb-10'>
                    <Link href="/">
                        <ApplicationLogoVertical className='w-[220px] h-[145px]' />
                    </Link>
                </div>
                <div className="bg-white p-10 rounded-lg min-w-full lg:min-w-[475px]">
                    {children}
                </div>
            </div>
            <div className='flex-1'>
                <img src="/assets/images/auth.jpg" alt="" className='h-full w-full object-cover' />
            </div>
        </div>
    );
}
