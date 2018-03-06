<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('products', 'ProductController');

// Project CRUD
Route::get('projects', 'ProjectController@index');
Route::get('projects/{project}', 'ProjectController@show');
Route::post('projects','ProjectController@store');
Route::post('projects/{project}','ProjectController@update');
Route::delete('projects/{project}', 'ProjectController@destroy');
Route::get('projects/detail/{project}', 'ProjectController@show');
Route::delete('project/detach/{member_role}', 'ProjectController@detach');

// Member CRUD
Route::get('members', 'MemberController@index');
Route::get('members/{member}', 'MemberController@show');
Route::post('members','MemberController@store');
Route::post('members/{member}','MemberController@update');
Route::delete('members/{member}', 'MemberController@destroy');
// assign to project
Route::post('project/assign', 'ProjectController@assignMember');
