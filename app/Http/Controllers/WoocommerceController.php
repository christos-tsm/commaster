<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;

class WoocommerceController extends Controller {
    public function updateWoocommerceDetails(Request $request) {
        // Validate the form inputs
        $validated = $request->validate([
            'website_url' => ['required', 'url'],
            'woocommerce_consumer_key' => ['required', 'string'],
            'woocommerce_consumer_secret' => ['required', 'string'],
        ]);

        // Prepend 'https://' to the website URL if it's not present
        $websiteUrl = $validated['website_url'];
        if (!preg_match('/^https?:\/\//', $websiteUrl)) {
            $websiteUrl = 'https://' . $websiteUrl;
        }

        // Remove the trailing slash from the website URL if it exists
        $websiteUrl = rtrim($websiteUrl, '/');

        // Encrypt the API keys
        $encryptedConsumerKey = Crypt::encryptString($validated['woocommerce_consumer_key']);
        $encryptedConsumerSecret = Crypt::encryptString($validated['woocommerce_consumer_secret']);

        // Update the user's WooCommerce details
        $user = $request->user();
        $user->update([
            'website_url' => $websiteUrl,
            'woocommerce_consumer_key' => $encryptedConsumerKey,
            'woocommerce_consumer_secret' => $encryptedConsumerSecret,
        ]);

        // Log the saved values for immediate debugging after save
        Log::info('Saved Encrypted Consumer Key: ' . $user->woocommerce_consumer_key);
        Log::info('Saved Encrypted Consumer Secret: ' . $user->woocommerce_consumer_secret);

        try {
            // Decrypt and log immediately to ensure decryption works correctly after save
            $decryptedConsumerKey = Crypt::decryptString($user->woocommerce_consumer_key);
            $decryptedConsumerSecret = Crypt::decryptString($user->woocommerce_consumer_secret);
            Log::info('Decrypted Consumer Key: ' . $decryptedConsumerKey);
            Log::info('Decrypted Consumer Secret: ' . $decryptedConsumerSecret);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            Log::error('Decryption failed right after saving');
            Log::error('Error: ' . $e->getMessage());
        }

        // Redirect back with a success message
        return back()->with('success', 'Your WooCommerce details have been updated.');
    }
}
