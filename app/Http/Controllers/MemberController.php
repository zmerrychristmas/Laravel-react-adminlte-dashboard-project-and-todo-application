<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Member;

class MemberController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $members = Member::all();
        return response()->json($members);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $member = new Member([
          'name' => $request->get('name'),
          'information' => $request->get('information'),
          'date_of_birth' => $request->get('date_of_birth'),
          'position' => $request->get('position'),
          'phone' => $request->get('phone'),
          'gender' => $request->get('gender'),
          'avatar' => ''
        ]);
        $member->save();

        return response()->json('Member Added Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $member = Member::find($id);
        return response()->json($member);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $member = Member::find($id);
        return response()->json($member);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $member = Member::find($id);
        $member->name = $request->get('name');
        $member->information = $request->get('information');
        $member->date_of_birth = $request->get('date_of_birth');
        $member->position = $request->get('position');
        $member->phone = $request->get('phone');
        $member->gender = $request->get('gender');
        $member->save();

        return response()->json('Member Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $member = Member::find($id);
      $member->delete();

      return response()->json('Member Deleted Successfully.');
    }

    public function members()
    {
        return view('member/index', []);
    }
}
