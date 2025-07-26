<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TreeController;
use App\Http\Controllers\WorryAnalysisController;
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
    return Inertia::render('WorryTree', [
        'csrf_token' => csrf_token(),
    ]);
})->middleware(['auth', 'verified'])->name('worrytree');

Route::middleware('auth')->group(function () {
    Route::post('/trees', [TreeController::class, 'store'])->name('trees.store');
});

Route::middleware('auth')->group(function () {
    Route::post('/worries/validate', [WorryAnalysisController::class, 'validateWorry'])->name('worries.validate');
    Route::post('/worries/initial-stream', [WorryAnalysisController::class, 'streamInitialResponse'])->name('worries.initial-stream');
    Route::post('/worries/initial-worries', [WorryAnalysisController::class, 'getInitialWorries'])->name('worries.initial-worries');
});

require __DIR__ . '/auth.php';
