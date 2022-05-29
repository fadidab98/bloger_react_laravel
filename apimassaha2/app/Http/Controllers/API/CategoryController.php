<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{


    public function  index($id){
        $user = User::findOrFail($id);
        if($user->status ==1)
        {
        $cate = Category::orderBy('created_at','desc')->get();


            return response()->json([
               'status'=>200,
               'data'=>$cate,

            ]);
        }  else{
            return response()->json([
                'status'=>400,
                'blocked_message'=>'Sorry You Are Blocked'
            ]);
        }

    }
    public function  create(Request $request){
        $valiation = Validator::make($request->all(),[
           'name'=>'required|min:5',
           'description'=> 'required|min:10',
           'image'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048'
        ]);
        if($valiation->fails())
        {
            return response()->json([
                'message_error'=>$valiation->messages()
            ]);
        }
        else{
            if ($request->hasFile('image')) {
                $image =  $request->image;
                $imageExtension = $image->extension();
                $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                $image->move(public_path("../../my-app/public/uploads/share/Category"), $imageName);
            }
            $category = Category::create([
                'name'=>$request->name,
                'description'=> $request->description,
                'status'=>$request->status,
                'image'=>$imageName
            ]);
            return response()->json([
                'status'=>200,
                'message'=>'Category Added Successfully'
            ]);
        }

    }
    public function  show($id){
        $category = Category::findOrFail($id);
        if($category)
        {
            return response()->json([
                'status'=>200,
                'data'=>$category
            ]);
        }
        else{
            return  response()->json([
                'status'=>404,
                "error_message"=>"No Category Founded"
            ]);
        }

    }    public function  edit(Request $request,$id){
        $category = Category::findOrFail($id);
        if($category)
        {
            $valiation = Validator::make($request->all(),[
                'name'=>'required|min:5',
                'description'=> 'required|min:10',


            ]);
            if($valiation->fails())
            {
                return response()->json([
                    'message_error'=>$valiation->messages()
                ]);
            }
            else{
                $imageName='';
                if ($request->hasFile('image')) {
                    $image_path = "../../my-app/public/uploads/share/Category/" . $category->image;
                    if (File::exists($image_path)) {
                        File::delete($image_path);
                    }
                    $image =  $request->image;
                    $imageExtension = $image->extension();
                    $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                    $image->move(public_path("../../my-app/public/uploads/share/Category"), $imageName);
                    $category->update([
                        'name'=>$request->name,
                        'description'=> $request->description,
                        'status'=>$request->status,
                        'image'=>$imageName
                    ]);
                }
                $category->update([
                    'name'=>$request->name,
                    'description'=> $request->description,
                    'status'=>$request->status,

                ]);
                return response()->json([
                   'status'=>200,
                   'message'=>'Category Updated Successfully'
                ]);
            }
        }

    }
    public function  delete($id){
        $category = Category::findOrFail($id);


        $image_path = "../../my-app/public/uploads/share/Category/".$category->image;
//        if (File::exists($image_path)) {
            File::delete($image_path);
//            unlink($image_path);
//        }

            $category->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Category Deleted Successfully'

            ]);



    }

}
