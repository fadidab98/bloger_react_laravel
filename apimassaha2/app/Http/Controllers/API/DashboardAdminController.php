<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardAdminController extends Controller
{
    public function CountData(){
        $Posts = Post::all();
        $Category = Category::all();
        $Users = User::all();
        return response()->json([
            'status'=>200,
            'post'=>$Posts->count(),
            'category'=>$Category->count(),
            'user'=>$Users->count(),

        ]);
    }
    function getAllMonths(){

        $month_array = array();
        $posts_dates = Post::orderBy( 'created_at', 'ASC' )->pluck( 'created_at' );
        $posts_dates = json_decode( $posts_dates );

        if ( ! empty( $posts_dates ) ) {
            foreach ( $posts_dates as $unformatted_date ) {
                $date = new \DateTime( $unformatted_date );
                $month_no = $date->format( 'm' );
                $month_name = $date->format( 'M' );
                $month_array[ $month_no ] = $month_name;
            }
        }
        return $month_array;
    }

    function getMonthlyPostCount( $month ) {
        $monthly_post_count = Post::whereMonth( 'created_at', $month )->get()->count();
        return $monthly_post_count;
    }

    function getMonthlyPostData($id) {
        $user = User::findOrFail($id);
        if($user->status ==1)
        {


            $monthly_post_count_array = array();
            $month_array = $this->getAllMonths();
            $month_name_array = array();
            if ( ! empty( $month_array ) ) {
                foreach ( $month_array as $month_no => $month_name ){
                    $monthly_post_count = $this->getMonthlyPostCount( $month_no );
                    array_push( $monthly_post_count_array, $monthly_post_count );
                    array_push( $month_name_array, $month_name );
                }
            }

            $max_no = max( $monthly_post_count_array );
            $max = round(( $max_no + 10/2 ) / 10 ) * 10;


            return response()->json([
                'status'=>200,
                'months' => $month_name_array,
                'post_count_data' => $monthly_post_count_array,
                'max' => $max,

            ]);

        }  else{
            return response()->json([
                'status'=>400,
                'blocked_message'=>'Sorry You Are Blocked'
            ]);
        }}
}
