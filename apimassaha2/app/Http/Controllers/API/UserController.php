<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function edit(Request $request,$id){
        $usercheck = User::findOrFail($id);

        if($usercheck->status ==1)
        {
            $user= User::findOrFaiL($request->id);
            if($user){
                $valiation = Validator::make($request->all(),[
                    'name'=>'required|min:5',
                    'email'=> 'required|min:10',




                ]);
                if($valiation->fails())
                {
                    return response()->json([
                        'message_error'=>$valiation->messages()
                    ]);
                }
                else{

                    if($request->role_as != $user->role_as)
                    {
                        $user->tokens()->delete();
                      
                    }


                    /////// with image
                    $imageName='';
                    if ($request->hasFile('image')) {

                        $image_path = "../../my-app/public/uploads/admin/user-image" . $user->image;
                        if (File::exists($image_path)) {
                            File::delete($image_path);
                        }
                        $valiation = Validator::make($request->all(),[

                            'image'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                        ]);
                        if($valiation->fails())
                        {
                            return response()->json([
                                'message_error'=>$valiation->messages()
                            ]);
                        }
                        else{
                            $image =  $request->image;
                            $imageExtension = $image->extension();
                            $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                            $image->move(public_path("../../my-app/public/uploads/admin/user-image"), $imageName);
                            $user->update([
                                'name'=>$request->name,
                                'email'=> $request->email,
                                'status'=>$request->status,
                                'role_as'=>$request->role,
                                'image'=>$imageName
                            ]);
                        }

                    }
                    else{

                        $user->update([
                            'name'=>$request->name,
                            'email'=> $request->email,
                            'status'=>$request->status,
                            'role_as'=>$request->role,

                        ]);

                    }

                    return response()->json([
                        'status'=>200,
                        'message'=>'User Updated Successfully'
                    ]);


                }
            }
            else{
                return  response()->json([
                    'status'=>404,
                    "error_message"=>"No Post Founded"
                ]);
            }

        }
        return response()->json([
            'status'=>400,
            'blocked_message'=>'Sorry You Are Blocked'
        ]);

    }





   public  function profile(Request $request,$id){
       $usercheck = User::findOrFail($id);

       if($usercheck->status ==1)
       {
           $user= User::findOrFaiL($request->id);
           if($user){
               $valiation = Validator::make($request->all(),[
                   'name'=>'required|min:5',
                   'email'=> 'required|min:10',




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
                       $image_path = "../../my-app/public/uploads/admin/user-image" . $user->image;
                       if (File::exists($image_path)) {
                           File::delete($image_path);
                       }
                       $valiation = Validator::make($request->all(),[

                           'image'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                       ]);
                       if($valiation->fails())
                       {
                           return response()->json([
                               'message_error'=>$valiation->messages()
                           ]);
                       }
                       else{
                           $image =  $request->image;
                           $imageExtension = $image->extension();
                           $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                           $image->move(public_path("../../my-app/public/uploads/admin/user-image"), $imageName);
                           $user->update([
                               'name'=>$request->name,
                               'email'=> $request->email,
                               'image'=>$imageName
                           ]);
                           return response()->json([
                               'status'=>200,
                               'message'=>'User Updated Successfully1'
                           ]);
                       }

                   }
                   else{
                       $user->update([
                           'name'=>$request->name,
                           'email'=> $request->email,


                       ]);
                       return response()->json([
                           'status'=>200,
                           'message'=>'User Updated Successfully2'
                       ]);

                   }




               }
           }
           else{
               return  response()->json([
                   'status'=>404,
                   "error_message"=>"No User Founded"
               ]);
           }

       }
       return response()->json([
           'status'=>400,
           'blocked_message'=>'Sorry You Are Blocked'
       ]);

   }
   public function changepassword(Request $request,$id){

        $user = User::findOrFaiL($id);
        if(Hash::check($request->oldPassword,$user->password))
        {
            $user->update([
                'password'=>Hash::make($request->newPassword)
            ]);
            return response()->json([
               'status'=>200,
               'message'=>'Password Updated Successfully'
            ]);
        }
        else{
            return response()->json([
                'status'=>401,
                'error_message'=>'InValid Data'
            ]);
        }

   }
    public function index($id){
        $user = User::findOrFail($id);
        if($user->status ==1)
        {

        $user =User::where('id','!=',$id)->get();
        $col = ['image','name','email','role'];

            return response()->json([
                'status'=>200,
                'data'=>$user,
                'col'=>$col
            ]);
        }  else{
            return response()->json([
                'status'=>400,
                'blocked_message'=>'Sorry You Are Blocked'
            ]);
        }

    }
    public function login(Request $request){
        $validation = Validator::make($request->all(),[
           'email'=>'required|email',
           'password'=>'required|min:7'
        ]);
        if($validation->fails())
        {
            return response()->json([
               'message_error'=>$validation->messages()

            ]);
        }
        else{
           $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
               return response()->json([
                   'status'=>401,
                  'message'=>'InValid Data'
               ]);

            }
            else if($user->status ==0){
                return response()->json([
                    'status'=>400,
                    'block_message'=>'Sorry You Are Blocked'
                ]);
            }
            else{
                if($user->role_as ==1) //1= admin
                    {
                        $role="admin";
                        $token =   $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else // 0 = moderator
                {
                    $role="moderator";
                    $token = $user->createToken($user->email.'_token',['server:moderator'])->plainTextToken;
                }

                return response()->json([
                   'status'=>200,
                   'token'=>$token,
                    'username'=>$user->name,
                    'userId'=>$user->id,
                    'role'=>$role,
                    'image'=>$user->image,
                    'message'=>"Logged In Successfully"
                ]);


            }

        }

    }
    public function create(Request $request){

                  $validation= Validator::make($request->all(),[
                     'name'=>'required|max:191',
                     'email'=>'required|email|unique:users,email',
                      'password'=>'required|min:7',

                      'image'=>'image|mimes:jpg,png,jpeg,gif,svg|max:2048'
                  ]);
                  if($validation->fails())
                  {
                      return response()->json([
                          'message_error'=>$validation->messages()
                      ]);
                  }
                  else{
                      if ($request->hasFile('image')) {
                          $image =  $request->image;
                          $imageExtension = $image->extension();
                          $imageName = time() . "-" . rand(0, 10000) .  "." . $imageExtension;
                          $image->move(public_path("../../my-app/public/uploads/admin/user-image"), $imageName);

                          $user = User::create([
                              'name'=>$request->name,
                              'email'=>$request->email,
                              'password'=>Hash::make($request->password),
                              'status'=>$request->status,
                              'image'=> $imageName,
                              'role_as'=>$request->role

                          ]);
                      }else{
                          $user = User::create([
                              'name'=>$request->name,
                              'email'=>$request->email,
                              'password'=>Hash::make($request->password),
                              'status'=>$request->status,
                              'image'=> "",
                              'role_as'=>$request->role

                          ]);
                      }

                      return response( ['status'=>200, 'message'=>'User Has Been Added Successfully']);
                  }

    }
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
           'status'=>200,
           'message'=>'Logged Out Successfully'
        ]);



    }
    public function show($id){
        $user =User::findOrFail($id);
        if($user)
        {
            return response()->json([
               'status'=>200,
               'data'=>$user

            ]);
        }

    }
    public function  delete($id){
        $user = User::findOrFail($id);


        $image_path = "../../my-app/public/uploads/share/Category/".$user->image;
//        if (File::exists($image_path)) {
        File::delete($image_path);
//            unlink($image_path);
//        }

        $user->delete();
        return response()->json([
            'status'=>200,
            'message'=>'User Deleted Successfully'

        ]);



    }
}
