<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MessageBuilderService;
use App\Constants\Prompts;
use App\Constants\ResponseCodes;
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

        $response = AIResponseController::jsonResponse($messages, true);

        if (!$response || isset($response['error']) || !isset($response['valid']) || !isset($response['furtherInformation'])) {
            $errorMessage = $response['error'] ?? 'Something went wrong when validating this worry.';
            return response()->json(['error' => $errorMessage], 500);
        }

        Log::debug($response);

        if (!$response['valid']) {
            return response(ResponseCodes::INVALID_WORRY_CODE, 422);
        }

        return $this->streamInitialResponse($validated['message'], $response['furtherInformation']);
    }

    /**
     * The first streamed response when a new worry is created
     */
    public function streamInitialResponse(string $userMessage, bool $furtherInformation)
    {
        $systemPrompt = Prompts::INITIAL_STREAM_PROMPT;

        if ($furtherInformation) {
            $systemPrompt .= Prompts::INITIAL_STREAM_PROMPT_FURTHER_INFORMATION;
        }

        $messages = MessageBuilderService::buildChatMessages($systemPrompt, $userMessage);

        $headers = ['X-Further-Information' => $furtherInformation ? 'true' : 'false'];

        return AIResponseController::streamResponse($messages, $headers);
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
