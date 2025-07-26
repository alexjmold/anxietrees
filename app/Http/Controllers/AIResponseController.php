<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class AIResponseController extends Controller
{
    /**
     * Generic streaming function
     */
    public static function streamResponse(array $messages)
    {
        return response()->stream(function () use ($messages) {
            $stream = OpenAI::chat()->createStreamed([
                'model' => 'gpt-4o-mini',
                'messages' => $messages,
            ]);

            foreach ($stream as $response) {
                yield $response->choices[0]->delta->content;
            }
        });
    }

    /**
     * Generic AI response function when you're expecting JSON
     */
    public static function jsonResponse(array $messages, bool $raw = false)
    {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => $messages,
        ]);

        $result = $response->choices[0]->message->content;

        $parsedResult = json_decode($result, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['error' => 'Invalid JSON response from AI'], 500);
        }

        return response()->json($parsedResult);
    }
}
