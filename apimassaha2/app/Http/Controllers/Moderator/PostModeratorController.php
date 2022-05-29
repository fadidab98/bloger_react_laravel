<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PostModeratorController extends Controller
{
    public function  index($id){
        $user=User::findOrFail($id);
        if($user->status==1) {
            $post = DB::table('posts')
                ->join('categories', 'posts.category_id', '=', 'categories.id')
                ->join('users', 'users.id', '=', 'posts.user_id')
                ->select('posts.*', 'users.name As userName', 'users.id AS userId', 'categories.name As categoryName')
                ->where('posts.user_id', '=', $id)
                ->get();
            $tableCol = ['Post Name', 'Post Image', 'Category Name', 'User Name', 'created_at'];
            return response()->json([
                'status' => 200,
                'data' => $post,
                'col' => $tableCol
            ]);

        }else{
            return response()->json([
                'status'=>400,
                'block_message'=>'Sorry You Are Blocked'

            ]);
        }
    }
    public function  create(Request $request){
        $user=User::findOrFail($request->userId);
        if($user->status==1)
        {


            $validation= Validator::make($request->all(),[
            'name'=>'required|max:191',
            'description'=>'required|min:10',

            'image'=>'image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'category_id'=>'required',

        ]);
        if($validation->fails())
        {
            return response()->json([
                'message_error'=>$validation->messages()
            ]);
        }
        else{
            $img = array();
            $imageName='';
            $imagesName='';
            if ($request->hasFile('image')) {
                $image =  $request->image;
                $imageExtension = $image->extension();
                $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                $image->move(public_path("../../my-app/public/uploads/share/Posts"), $imageName);


            }
            if ($request->hasFile("many_image")) {
                $images = $request->many_image;
                foreach ($images  as $image1) {
                    $imageExtension = $image1->getClientOriginalExtension();
                    $imagesName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                    $img[] = $imagesName;
                    $image1->move(public_path("../../my-app/public/uploads/share/Posts"), $imagesName);

                }


            }
            $post = Post::create([
                'name'=>$request->name,
                'description'=>$request->description,
                'status'=>$request->status,
                'images'=> $imageName,
                'main_images'=>  implode(",", $img) ,
                'category_id'=>$request->category_id,
                'user_id'=>$request->userId

            ]);

            return  response()->json([
                'status'=>200,
                "image"=>implode(",", $img)
            ]);




        }}
    else{
            return  response()->json([
                'status'=>400,
                'block_message'=>'Sorry You Are Blocked'
            ]);
        }
    }
    public function  edit(Request $request,$id){

        $validation= Validator::make($request->all(),[
            'name'=>'required|max:191',
            'description'=>'required|min:10',


            'category_id'=>'required',

        ]);
        if($validation->fails())
        {
            return response()->json([
                'message_error'=>$validation->messages()
            ]);
        }
        else{
            $post= Post::findOrFail($id);
            if($post){
                $img = array();
                $imageName='';
                $imagesName='';
                if ($request->hasFile('image')) {
                    $image_path = "../../my-app/public/uploads/share/Posts/" . $post->image;
                    if (File::exists($image_path)) {
                        File::delete($image_path);
                    }
                    $image =  $request->image;
                    $imageExtension = $image->extension();
                    $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                    $image->move(public_path("../../my-app/public/uploads/share/Posts"), $imageName);
                    $post->update([
                        'name'=>$request->name,
                        'description'=>$request->description,
                        'status'=>$request->status,
                        'images'=> $imageName,

                        'category_id'=>$request->category_id,
                        'user_id'=>$request->userId

                    ]);

                }
                if ($request->hasFile("many_image")) {

                    $manyImages= explode(',',$post->main_images);
                    foreach ($manyImages as $imex){
                        $image_path = "../../my-app/public/uploads/share/Posts/" . $imex;
                        if (File::exists($image_path)) {
                            File::delete($image_path);
                        }
                    }

                    $images = $request->many_image;
                    foreach ($images  as $image1) {
                        $imageExtension = $image1->getClientOriginalExtension();
                        $imagesName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                        $img[] = $imagesName;
                        $image1->move(public_path("../../my-app/public/uploads/share/Posts"), $imagesName);

                    }
                    $post->update([
                        'name'=>$request->name,
                        'description'=>$request->description,
                        'status'=>$request->status,

                        'main_images'=>  implode(",", $img) ,
                        'category_id'=>$request->category_id,
                        'user_id'=>$request->userId

                    ]);

                }

                $post->update([
                    'name'=>$request->name,
                    'description'=>$request->description,
                    'status'=>$request->status,


                    'category_id'=>$request->category_id,
                    'user_id'=>$request->userId

                ]);
                return  response()->json([
                    'status'=>200,
                    "message"=>"Post Updated Successfully"
                ]);

            }
            else{
                return  response()->json([
                    'status'=>404,
                    "error_message"=>"No Post Founded"
                ]);
            }




        }

    }
    public function  delete($id){
        $post = Post::findOrFail($id);
        if($post)
        {
            $manyImages= explode(',',$post->main_images);
            foreach($manyImages as $img)
            {
                $image_path = "../../my-app/public/uploads/share/Posts/" . $img;
                if (File::exists($image_path)) {
                    File::delete($image_path);
                }
            }
            $image_path = "../../my-app/public/uploads/share/Posts/".$post->images;
            if (File::exists($image_path)) {
                File::delete($image_path);

            }

            $post->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Post Deleted Successfully'

            ]);


        }
        else{
            return response()->json([
                'status'=>404,
                "message"=>'Post Didnt founded'
            ]);
        }


    }

}
