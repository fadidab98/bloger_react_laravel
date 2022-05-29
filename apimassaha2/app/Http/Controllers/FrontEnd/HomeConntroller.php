<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class HomeConntroller extends Controller
{
    public function   navs(){
        $nav = Category::select('id','name')->where('status','1')->get();
        return response()->json([
            'status'=>200,
            'data'=>$nav
        ]);

    }
    public function newData(){
        $post = DB::table('posts')
            ->join('categories', 'posts.category_id', '=', 'categories.id')

            ->join('users', 'users.id', '=', 'posts.user_id')
            ->select('posts.*', 'categories.id As categoryId', 'categories.name As categoryName')

            ->orderBy('created_at','desc')
            ->where('posts.status' , '1')
            ->take(3)->get();
        $postCategory=DB::table('posts')
            ->join('categories', 'posts.category_id', '=', 'categories.id')

            ->join('users', 'users.id', '=', 'posts.user_id')
            ->select('posts.*', 'users.name As userName', 'users.id AS userId', 'categories.id As categoryId', 'categories.name As categoryName')
            ->where('posts.status' , '1')
            ->orderBy('created_at','desc')
            ->get()
            ->groupBy('categoryName')->map(function($q){
                return $q->take(4);
            });
        $cities = new Collection($postCategory);
        $newpost = DB::table('posts')
            ->join('categories', 'posts.category_id', '=', 'categories.id')

            ->join('users', 'users.id', '=', 'posts.user_id')
            ->select('posts.*', 'categories.id As categoryId', 'categories.name As categoryName')

            ->orderBy('posts.viewed','desc')
            ->where('posts.status' ,'=', '1')
            ->take(3)->get();
        return response()->json([
            'status'=>200,
            'newData'=>$post,
            'postCategory'=>$cities,
            'newposts'=>$newpost

        ]);
    }
    public function postCategory($category){
        $community = DB::table('posts')
            ->join('categories', 'posts.category_id', '=', 'categories.id')

            ->join('users', 'users.id', '=', 'posts.user_id')
            ->select('posts.*', 'users.name As userName', 'users.id AS userId', 'categories.id As categoryId', 'categories.name As categoryName')
            ->where('categories.name',$category)
            ->where('posts.status','1')
            ->orderBy('created_at','desc')

            ->paginate(4);


        return response($community,200);
    }
    public function viewPost($id){
        $post = Post::findOrFail($id);
        $viewed = $post->viewed +1 ;
        $post->update([
            'viewed'=>$viewed
        ]);
        $ditPost =  DB::table('posts')

            ->whereRaw('created_at in (select max(created_at) from posts group by (category_id))')
            ->where('status' , '1')
            ->get();
        $postCategory= DB::table('posts')
            ->join('categories', 'posts.category_id', '=', 'categories.id')
            ->join('users', 'users.id', '=', 'posts.user_id')
            ->select('posts.*', 'users.name As userName', 'users.id AS userId', 'categories.name As categoryName')
            ->where('posts.id', $id)
            ->get();
        return response()->json([
            'status'=>200,
            'data'=>$postCategory
        ]);
    }
    public function search(){
        $Post=DB::table('posts')
            ->join('categories', 'posts.category_id', '=', 'categories.id')


            ->select('posts.*', 'categories.id As categoryId', 'categories.name As categoryName')


            ->where('posts.status' , '1')
             ->get();
        return response()->json([
            'status'=>200,
            'data'=>$Post
        ]);
    }
    public function  category(){


            $cate = Category::orderBy('created_at','desc')->get();


            return response()->json([
                'status'=>200,
                'data'=>$cate,

            ]);


    }
}
