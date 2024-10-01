<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\WooCommerceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WoocommerceOrdersController extends Controller {

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
            return Inertia::render('Woocommerce/Orders', [
                'orders' => [],
                'error' => 'Τα API κλειδιά για το WooCommerce δεν έχουν συμπληρωθεί. Παρακαλούμε συμπληρώστε τα στην σελίδα των ρυθμίσεων'
            ]);
        }
        // Decrypt consumer key and consumer secret
        try {
            // Decrypt the consumer key and secret
            $consumerKey = Crypt::decryptString($encryptedConsumerKey);
            $consumerSecret = Crypt::decryptString($encryptedConsumerSecret);
            // Log the values for debugging
            Log::info('Encrypted Consumer Key: ' . $encryptedConsumerKey);
            Log::info('Encrypted Consumer Secret: ' . $encryptedConsumerSecret);
            Log::info('Decrypted Consumer Key: ' . $consumerKey);
            Log::info('Decrypted Consumer Secret: ' . $consumerSecret);
            Log::info('User URL: ' . $storeUrl);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            Log::error('Decryption failed for user: ' . $user->id);
            Log::error('Error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to decrypt WooCommerce API keys.']);
        }

        // Ensure the WooCommerce client is set before fetching orders
        $orders = $this->woocommerceService
            ->setClient($storeUrl, $consumerKey, $consumerSecret)
            ->getOrders();

        return Inertia::render('Woocommerce/Orders', [
            'orders' => $orders
        ]);
    }

    public function fetchOrders(Request $request) {
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
        $status = $request->query('status', null);
        $startDate = $request->query('start_date', null);
        $endDate = $request->query('end_date', null);

        // Build query parameters
        $query = [
            'page' => $page,
            'per_page' => $perPage,
        ];

        if ($status && $status !== 'all') {
            $query['status'] = $status;
        }

        if ($startDate) {
            $query['after'] = $startDate . 'T00:00:00';
        }

        if ($endDate) {
            $query['before'] = $endDate . 'T23:59:59';
        }

        try {
            $orders = $woocommerce->get('orders', $query);
            $responseHeaders = $woocommerce->http->getResponse()->getHeaders();
            $totalOrders = isset($responseHeaders['X-WP-Total'][0]) ? $responseHeaders['X-WP-Total'][0] : 0;
            $totalPages = isset($responseHeaders['X-WP-TotalPages'][0]) ? $responseHeaders['X-WP-TotalPages'][0] : 0;

            return response()->json([
                'orders' => $orders,
                'current_page' => $page,
                'total_pages' => (int) $totalPages,
                'total_orders' => (int) $totalOrders,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch orders: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch orders from WooCommerce'], 500);
        }
    }

    public function show(Request $request, $id) {
        $user = $request->user();
        $storeUrl = $user->website_url;

        // Check if the keys are present
        $encryptedConsumerKey = $user->getAttributes()['woocommerce_consumer_key'] ?? null;
        $encryptedConsumerSecret = $user->getAttributes()['woocommerce_consumer_secret'] ?? null;

        if (!$encryptedConsumerKey || !$encryptedConsumerSecret) {
            return back()->withErrors(['error' => 'WooCommerce API keys are missing. Please update them in your settings page.']);
        }

        // Decrypt consumer key and consumer secret
        try {
            $consumerKey = Crypt::decryptString($encryptedConsumerKey);
            $consumerSecret = Crypt::decryptString($encryptedConsumerSecret);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            Log::error('Decryption failed for user: ' . $user->id);
            return back()->withErrors(['error' => 'Failed to decrypt WooCommerce API keys.']);
        }

        try {
            // Fetch the order by ID using the WooCommerce client
            $order = $this->woocommerceService
                ->setClient($storeUrl, $consumerKey, $consumerSecret)
                ->getOrder($id);

            return Inertia::render('Woocommerce/SingleOrder', [
                'order' => $order
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch order: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to fetch order from WooCommerce.']);
        }
    }
}
