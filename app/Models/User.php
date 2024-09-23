<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Crypt;

class User extends Authenticatable {
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'tel',
        'website_url',
        'woocommerce_consumer_key',
        'woocommerce_consumer_secret',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'woocommerce_consumer_key',
        'woocommerce_consumer_secret',
    ];

    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Accessor to return masked woocommerce_consumer_key
    public function getWoocommerceConsumerKeyAttribute($value) {
        if (empty($value)) {
            return ''; // Return empty if not set
        }

        try {
            $decryptedValue = Crypt::decryptString($value);
            return $this->maskKey($decryptedValue);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return ''; // If decryption fails, return empty string
        }
    }

    // Accessor to return masked woocommerce_consumer_secret
    public function getWoocommerceConsumerSecretAttribute($value) {
        if (empty($value)) {
            return ''; // Return empty if not set
        }

        try {
            $decryptedValue = Crypt::decryptString($value);
            return $this->maskKey($decryptedValue);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return ''; // If decryption fails, return empty string
        }
    }

    // Helper method to mask the key
    private function maskKey($key) {
        // Show only the last 4 characters of the key, rest is masked
        return str_repeat('*', strlen($key) - 4) . substr($key, -4);
    }
}
