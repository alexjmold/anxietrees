<?php

namespace App\Http\Controllers;

use App\Models\Tree;
use Illuminate\Http\Request;
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
        $tree = Tree::create([
            'user_id' => Auth::id(),
        ]);

        if ($request->has('messages')) {
            foreach ($request->input('messages') as $messageData) {
                $tree->messages()->create([
                    'user_id' => Auth::id(),
                    'content' => $messageData['content'],
                    'type' => $messageData['type'],
                    'role' => $messageData['role'],
                ]);
            }
        }

        return response()->json([
            'id' => $tree->id,
            'tree' => $tree,
        ]);
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
