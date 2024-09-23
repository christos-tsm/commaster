<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

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

        // Redirect back with a success message
        return back()->with('success', 'Your WooCommerce details have been updated.');
    }
}
