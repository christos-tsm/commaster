<?php

namespace App\Http\Controllers;

use App\Services\WooCommerceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WoocommerceProductsController extends Controller {
    protected $woocommerceService;

    public function __construct(WooCommerceService $wooCommerceService) {
        $this->woocommerceService = $wooCommerceService;
    }

    public function index(Request $request) {
        $user = $request->user();
        $storeUrl = $user->website_url;
        // Check if the keys are present
        $encryptedConsumerKey = $user->getAttributes()['woocommerce_consumer_key'] ?? null;
        $encryptedConsumerSecret = $user->getAttributes()['woocommerce_consumer_secret'] ?? null;

        if (!$encryptedConsumerKey || !$encryptedConsumerSecret) {
            // If keys are missing, return a message to the user
            return Inertia::render('Woocommerce/Products', [
                'products' => [],
                'error' => 'Τα API κλειδιά για το WooCommerce δεν έχουν συμπληρωθεί. Παρακαλούμε συμπληρώστε τα στην σελίδα των ρυθμίσεων'
            ]);
        }
        // Decrypt consumer key and consumer secret
        try {
            // Decrypt the consumer key and secret
            $consumerKey = Crypt::decryptString($encryptedConsumerKey);
            $consumerSecret = Crypt::decryptString($encryptedConsumerSecret);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            Log::error('Decryption failed for user: ' . $user->id);
            Log::error('Error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to decrypt WooCommerce API keys.']);
        }

        // Ensure the WooCommerce client is set before fetching products
        $products = $this->woocommerceService
            ->setClient($storeUrl, $consumerKey, $consumerSecret)
            ->getProducts();

        return Inertia::render('Woocommerce/Products', [
            'products' => $products
        ]);
    }

    public function fetchProducts(Request $request) {
        $user = Auth::user();
        $storeUrl = $user->website_url;

        // Decrypt consumer key and consumer secret
        try {
            $consumerKey = Crypt::decryptString($user->woocommerce_consumer_key);
            $consumerSecret = Crypt::decryptString($user->woocommerce_consumer_secret);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return response()->json(['error' => 'Failed to decrypt WooCommerce API keys'], 403);
        }

        // Initialize WooCommerce client
        $woocommerce = new \Automattic\WooCommerce\Client(
            $storeUrl,
            $consumerKey,
            $consumerSecret,
            [
                'version' => 'wc/v3',
            ]
        );

        // Handle pagination and filters
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 20);
        $startDate = $request->query('start_date', null);
        $endDate = $request->query('end_date', null);

        // Build query parameters
        $query = [
            'page' => $page,
            'per_page' => $perPage,
        ];

        if ($startDate) {
            $query['after'] = $startDate . 'T00:00:00';
        }

        if ($endDate) {
            $query['before'] = $endDate . 'T23:59:59';
        }

        try {
            $products = $woocommerce->get('products', $query);
            $responseHeaders = $woocommerce->http->getResponse()->getHeaders();
            $totalProducts = isset($responseHeaders['X-WP-Total'][0]) ? $responseHeaders['X-WP-Total'][0] : 0;
            $totalPages = isset($responseHeaders['X-WP-TotalPages'][0]) ? $responseHeaders['X-WP-TotalPages'][0] : 0;

            return response()->json([
                'products' => $products,
                'current_page' => $page,
                'total_pages' => (int) $totalPages,
                'total_products' => (int) $totalProducts,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch products: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch products from WooCommerce'], 500);
        }
    }
}
