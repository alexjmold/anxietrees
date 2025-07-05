<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'role', 'tree_id', 'user_id'];

    public function tree()
    {
        return $this->belongsTo(Tree::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
