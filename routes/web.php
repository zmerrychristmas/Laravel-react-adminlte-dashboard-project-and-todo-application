<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/members', 'MemberController@members');
Route::get('/members/new', 'MemberController@members');
Route::get('/members/edit/{id}', 'MemberController@members');

Route::get('/projects', 'ProjectController@projects');
Route::get('/projects/new', 'ProjectController@projects');
Route::get('/projects/edit/{id}', 'ProjectController@projects');
Route::get('/projects/assign', 'ProjectController@projects');
Route::get('/projects/detail/{id}', 'ProjectController@projects');