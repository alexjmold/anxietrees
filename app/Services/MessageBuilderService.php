<?php

namespace App\Services;

class MessageBuilderService
{
  public static function buildChatMessages(string $systemPrompt, string $userMessage)
  {
    return [
      [
        'role' => 'system',
        'content' => $systemPrompt,
      ],
      [
        'role' => 'user',
        'content' => $userMessage
      ],
    ];
  }
}
