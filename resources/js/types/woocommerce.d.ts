export interface Order {
    error?: string;
    id: number;
    number: string;
    status: string;
    total: string;
    total_tax: string;
    currency: string;
    currency_symbol: string;
    payment_method: string;
    payment_method_title: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    customer_id: number;
    customer_note: string;
    billing: {
        first_name: string;
        last_name: string;
        company: string;
        address_1: string;
        address_2: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        email: string;
        phone: string;
    };
    shipping: {
        first_name: string;
        last_name: string;
        company: string;
        address_1: string;
        address_2: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        phone: string;
    };
    line_items: LineItem[];
    shipping_lines: ShippingLine[];
    tax_lines: TaxLine[];
    meta_data: MetaData[];
    cart_tax: string;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    date_paid?: string | null;
    date_paid_gmt?: string | null;
    date_completed?: string | null;
    date_completed_gmt?: string | null;
    customer_ip_address: string;
    customer_user_agent: string;
    cart_hash: string;
}

export interface LineItem {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    price: number;
    sku: string;
    tax_class: string;
    taxes: Tax[];
    image: {
        id: string;
        src: string;
    };
    meta_data: MetaData[];
}

export interface ShippingLine {
    id: number;
    method_id: string;
    method_title: string;
    total: string;
    total_tax: string;
    taxes: Tax[];
    meta_data: MetaData[];
}

export interface TaxLine {
    id: number;
    rate_code: string;
    rate_id: number;
    label: string;
    compound: boolean;
    tax_total: string;
    shipping_tax_total: string;
    rate_percent: number;
    meta_data: MetaData[];
}

export interface Tax {
    id: number;
    total: string;
    subtotal: string;
}

export interface MetaData {
    id: number;
    key: string;
    value: string;
}

export interface WooCommerceErrorResponse {
    error: string;
}

// Union type for the response
export type WooCommerceOrdersResponse = Order[] | WooCommerceErrorResponse;