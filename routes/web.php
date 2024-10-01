<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WoocommerceController;
use App\Http\Controllers\WoocommerceOrdersController;
use Illuminate\Foundation\Application;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/woocommerce-details', [WoocommerceController::class, 'updateWoocommerceDetails'])->name('woocommerce.update');
    Route::get('/orders', [WoocommerceOrdersController::class, 'index'])->name('orders');
    // Orders Routes
    Route::get('/fetch-orders', [WoocommerceOrdersController::class, 'fetchOrders'])->name('orders.fetch');
    Route::get('/orders/{id}', [WoocommerceOrdersController::class, 'show'])->name('orders.show');
});

require __DIR__ . '/auth.php';
