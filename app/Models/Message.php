<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'role', 'type', 'tree_id', 'user_id'];

    public function tree()
    {
        return $this->belongsTo(Tree::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function createForTree(Tree $tree, array $messageData)
    {
        return $tree->messages()->create([
            'user_id' => Auth::id(),
            'content' => $messageData['content'],
            'type' => $messageData['type'],
            'role' => $messageData['role'],
        ]);
    }
}
