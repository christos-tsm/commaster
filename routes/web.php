<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WoocommerceController;
use App\Http\Controllers\WoocommerceOrdersController;
use App\Http\Controllers\WoocommerceProductsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $error = null;

    if (is_null($user->website_url) || is_null($user->woocommerce_consumer_key) || is_null($user->woocommerce_consumer_secret)) {
        $error = "Τα API κλειδιά για το WooCommerce δεν έχουν συμπληρωθεί. Παρακαλούμε συμπληρώστε τα στην σελίδα των ρυθμίσεων";
    }

    return Inertia::render('Dashboard', [
        'wooConnectError' => $error
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/woocommerce-details', [WoocommerceController::class, 'updateWoocommerceDetails'])->name('woocommerce.update');
    // Orders Routes
    Route::get('/orders', [WoocommerceOrdersController::class, 'index'])->name('orders');
    Route::get('/fetch-orders', [WoocommerceOrdersController::class, 'fetchOrders'])->name('orders.fetch'); // Fetch Orders
    Route::get('/orders/{id}', [WoocommerceOrdersController::class, 'show'])->name('orders.show'); // Show Order
    Route::put('/orders/{id}', [WoocommerceOrdersController::class, 'update'])->name('orders.update'); // Update Order
    // Products Routes
    Route::get('/products', [WoocommerceProductsController::class, 'index'])->name('products');
    Route::get('/fetch-products', [WoocommerceProductsController::class, 'fetchProducts'])->name('products.fetch');
});

require __DIR__ . '/auth.php';
