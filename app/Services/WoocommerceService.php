<?php

namespace App\Services;

use Automattic\WooCommerce\Client;
use Automattic\WooCommerce\HttpClient\HttpClientException;

class WooCommerceService {
    protected $woocommerce;

    public function setClient($storeUrl, $consumerKey, $consumerSecret) {
        // Set the WooCommerce client dynamically
        $this->woocommerce = new Client(
            $storeUrl,
            $consumerKey,
            $consumerSecret,
            [
                'version' => 'wc/v3',
                'timeout' => 15,
                'verify_ssl' => true,
            ]
        );

        // Return this for method chaining
        return $this;
    }

    public function getOrders() {
        if (!$this->woocommerce) {
            throw new \Exception('WooCommerce client not initialized.');
        }

        try {
            // Fetch orders using the WooCommerce client
            return $this->woocommerce->get('orders');
        } catch (HttpClientException $e) {
            // Handle errors
            return ['error' => $e->getMessage()];
        }
    }

    public function getOrder($id) {
        if (!$this->woocommerce) {
            throw new \Exception('WooCommerce client not initialized.');
        }

        try {
            return $this->woocommerce->get('orders/' . $id);
        } catch (HttpClientException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
