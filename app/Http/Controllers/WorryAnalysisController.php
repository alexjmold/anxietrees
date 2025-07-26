<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MessageBuilderService;
use App\Constants\Prompts;
use App\Http\Controllers\AIResponseController;
use Illuminate\Support\Facades\Log;

class WorryAnalysisController extends Controller
{
    public function validateWorry(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string'
        ]);

        $messages = MessageBuilderService::buildChatMessages(Prompts::VALIDATE_WORRY_PROMPT, $validated['message']);

        return AIResponseController::jsonResponse($messages);
    }

    /**
     * The first streamed response when a new worry is created
     */
    public function streamInitialResponse(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $messages = MessageBuilderService::buildChatMessages(Prompts::INITIAL_STREAM_PROMPT, $validated['message']);

        return AIResponseController::streamResponse($messages);
    }

    /**
     * Get the user's initial worries as an array of worries.
     */
    public function getInitialWorries(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $messages = MessageBuilderService::buildChatMessages(Prompts::INITIAL_JSON_PROMPT, $validated['message']);

        return AIResponseController::jsonResponse($messages);
    }
}
