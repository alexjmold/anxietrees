<?php

namespace App\Http\Controllers;

use App\Models\Tree;
use Illuminate\Http\Request;
use App\Services\ChatGptService;
use Illuminate\Support\Facades\Auth;
use App\Constants\Prompts;

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
    public function store()
    {
        $tree = Tree::create([
            'user_id' => Auth::id(), // assumes user is logged in
        ]);
    
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

    public function generate(Request $request, ChatGptService $chatGpt)
    {
        $messages = [
            ['role' => 'system', 'content' => Prompts::INITIAL_RESPONSE_PROMPT],
            ['role' => 'user', 'content' => $request->input('message')],
        ];

        $response = $chatGpt->generateResponse($messages);

        $decoded_response = json_decode($response);

        return response()->json([
            'response' => $decoded_response,
        ]);
    }
}
