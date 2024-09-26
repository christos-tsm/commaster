import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize QueryClient
const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(
                el,
                <QueryClientProvider client={queryClient}>
                    <App {...props} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            );
            return;
        }

        createRoot(el).render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#45d2b0',
    },
});
