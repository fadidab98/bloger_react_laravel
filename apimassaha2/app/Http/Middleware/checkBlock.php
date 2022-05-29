<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class checkBlock
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->status == 1){
            return $next($request);
        }else{
            return response()->json([
                'message'=>'Sorry You Are Blocked'
            ],401);
        }
    }
}
