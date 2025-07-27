<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Tree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Tree $tree)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'type' => 'required|string',
            'role' => 'required|string|in:assistant,user',
        ]);

        if ($tree->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $message = Message::createForTree($tree, $validated);

        return response()->json($message);
    }
}
