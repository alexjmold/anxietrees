<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatGptService
{
  public function generateResponse(array $messages): string
  {
    try {
      $response = Http::withToken(config('services.openai.key'))
        ->post('https://api.openai.com/v1/chat/completions', [
          'model' => 'gpt-4',
          'messages' => $messages,
        ]);

    $content = $response->json('choices.0.message.content');

    if (!$content) {
      Log::error('GPT response missing expected structure', [
        'response_body' => $response->body(),
      ]);

      return 'Oops! Something went wrong, please try again.';
    }

    return $content;
    } catch (\Throwable $e) {
      Log::error('GPT call failed', [
        'exception' => $e,
        'messages' => $messages,
      ]);

      return 'Oops! Something went wrong. Please try again.';
    }
  }
}