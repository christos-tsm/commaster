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

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface ProductTag {
    id: number;
    name: string;
    slug: string;
}

export interface ProductImage {
    id: number;
    src: string;
    // Optional properties if available
    name?: string;
    alt?: string;
}

export interface ProductAttribute {
    id: number;
    name: string;
    options: string[];
    position: number;
    slug: string;
    variation: boolean;
    visible: boolean;
}

export interface DefaultAttribute {
    // Sometimes the API may not include an id for default attributes
    id?: number;
    name: string;
    option: string;
}

export interface Dimensions {
    length: string;
    width: string;
    height: string;
}

// Assuming you already have MetaData defined in your current interfaces:
export interface MetaData {
    id: number;
    key: string;
    value: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    price_html: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    stock_status: string;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    sold_individually: boolean;
    weight: string;
    dimensions: Dimensions;
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: ProductCategory[];
    tags: ProductTag[];
    images: ProductImage[];
    attributes: ProductAttribute[];
    default_attributes: DefaultAttribute[];
    variations: number[];
    grouped_products: number[];
    meta_data: MetaData[];
    date_on_sale_from: string | null;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to: string | null;
    date_on_sale_to_gmt: string | null;
    global_unique_id: string;
    menu_order: number;
    has_options: boolean;
}
