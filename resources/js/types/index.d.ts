import { Config } from 'ziggy-js';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    website_url?: string;
    woocommerce_consumer_key?: string;
    woocommerce_consumer_secret?: string;
    masked_woocommerce_consumer_key?: string;
    masked_woocommerce_consumer_secret?: string;
    tel?: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    wooConnectError?: string;
};
