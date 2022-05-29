<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $dateFormat = 'Y/m/d H:i:s';
    protected  $fillable=[
        'name','image','description','status'


        ];
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
