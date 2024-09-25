<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\WooCommerceService;
use Illuminate\Http\Request;
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

        // Decrypt consumer key and consumer secret
        try {
            $encryptedConsumerKey = $user->getAttributes()['woocommerce_consumer_key'];
            $encryptedConsumerSecret = $user->getAttributes()['woocommerce_consumer_secret'];

            // Decrypt the consumer key and secret
            $consumerKey = Crypt::decryptString($encryptedConsumerKey);
            $consumerSecret = Crypt::decryptString($encryptedConsumerSecret);
            // Log the values for debugging
            Log::info('Encrypted Consumer Key: ' . $encryptedConsumerKey);
            Log::info('Encrypted Consumer Secret: ' . $encryptedConsumerSecret);
            Log::info('Decrypted Consumer Key: ' . $consumerKey);
            Log::info('Decrypted Consumer Secret: ' . $consumerSecret);
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
}
