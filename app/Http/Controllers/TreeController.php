<?php

namespace App\Http\Controllers;

use App\Models\Tree;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'messages' => 'sometimes|array|min:1',
            'messages.*.content' => 'required|string|max:1000',
            'messages.*.type' => 'required|string',
            'messages.*.role' => 'required|string|in:assistant,user',
        ]);

        return DB::transaction(function () use ($validated) {
            $tree = Tree::create([
                'user_id' => Auth::id(),
            ]);

            if (isset($validated['messages'])) {
                $messagesData = collect($validated['messages'])->map(function ($message) use ($tree) {
                    return [
                        'tree_id' => $tree->id,
                        'user_id' => Auth::id(),
                        'content' => $message['content'],
                        'role' => $message['role'],
                        'type' => $message['type'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                })->toArray();

                Message::insert($messagesData);
            }

            return response()->json([
                'id' => $tree->id,
                'tree' => $tree->load('messages')
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Tree $tree)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tree $tree)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tree $tree)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tree $tree)
    {
        //
    }
}
