<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;

class SettingController extends Controller
{
   public function index(){
       $setting = Setting::all();

       return response()->json([
           'status'=>200,
           'setting'=> $setting->flatMap(function ($setting){
               return  [$setting->key => $setting->value];
           })
       ]);
   }
    public function update(Request $request)
    {
//        $user = User::findOrFail($id);
//        if($user->status ==1)
//        {
//        }  else{
//            return response()->json([
//                'status'=>400,
//                'blocked_message'=>'Sorry You Are Blocked'
//            ]);
//        }
        foreach ($request->all() as $key=>$value)
        {
            Setting::where('key',$key)->update(['value'=>$value]);
        }
        return response()->json([
            'status'=>200,
            'message'=>'Setting Updated Successfully'
        ]);
    }
}
