<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TreeController;
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
});

Route::get('/worry-tree', function () {
    return Inertia::render('WorryTree');
})->middleware(['auth', 'verified'])->name('worrytree');

Route::middleware('auth')->group(function () {
    Route::post('/trees', [TreeController::class, 'store'])->name('trees.store');
    Route::post('/trees/{tree}/generate', [TreeController::class, 'generate'])->name('trees.generate');
});

require __DIR__.'/auth.php';
