<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryModeratorController extends Controller
{
    public function  index(){
        $cate = Category::all();


        return response()->json([
            'status'=>200,
            'data'=>$cate,

        ]);


    }
}
