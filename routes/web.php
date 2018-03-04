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
Route::get('/members/new', 'MemberController@newMember');
Route::get('/members/edit/{id}', 'MemberController@editMember');

Route::get('/projects', 'ProjectController@projects');
Route::get('/projects/new', 'ProjectController@newProject');
Route::get('/projects/edit/{id}', 'ProjectController@editProject');