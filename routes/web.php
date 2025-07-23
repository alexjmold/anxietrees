<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TreeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use OpenAI\Laravel\Facades\OpenAI;
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

Route::post('/chat', function() {
    return response()->stream(function (): Generator {
        $messages = [
            // ['role' => 'system', 'content' => Prompts::INITIAL_RESPONSE_PROMPT],
            ['role' => 'user', 'content' => 'Tell me a short story'],
        ];

        $stream = OpenAI::chat()->createStreamed([
            'model' => 'gpt-4o-mini',
            'messages' => $messages,
        ]);

        foreach ($stream as $response) {
            yield $response->choices[0]->delta->content;
        }
    });
});


require __DIR__.'/auth.php';
