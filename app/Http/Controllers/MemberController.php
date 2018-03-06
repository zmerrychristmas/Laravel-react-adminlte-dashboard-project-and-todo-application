<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Member;
use App\Project;

class MemberController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->get('pid')) {
            $project = Project::find($request->get('pid'));
            $inProjects = $project->members->pluck('id')->toArray();
            $members = Member::whereNotIn('id', $inProjects)->get();
        } else {
            $members = Member::all();
        }
        $messages = [];
        $action = $request->get('ACTION');
        switch($action) {
            case 1: {
                $messages[] = 'Create member successfully !';
                break;
            }
            case 2: {
                $messages[] = 'Update member successfully !';
                break;
            }
            default: {
                break;
            }
        }
        $result = [
            'members' => $members,
            'messages' => $messages
        ];
        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:member|regex:/^[a-zA-Z0-9-. ]+$/u|max:50',
            'dob' => 'required',
            'information' => 'max:300',
            'position' => 'required|in:intern,junior,senior,pm,ceo,cto,bo',
            'phone' => 'required|max:20|regex:/^[0-9-.\/\+\(\) ]+$/u',
            'gender' => 'required|in:1,2',
        ];
        $request->validate($rules);
        $member = new Member([
          'name' => $request->get('name'),
          'information' => $request->get('information') ? $request->get('information') : '',
          'date_of_birth' => date($request->get('dob')),
          'position' => $request->get('position'),
          'phone' => $request->get('phone'),
          'gender' => $request->get('gender'),
          'avatar' => 'images/default.png'
        ]);
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $path = $request->file('avatar')->store('public/images');
            if ($path) {
                $path = explode('/', $path);
                $path = isset($path[2]) ? $path[2] : '';
                if ($path) {
                    $member->avatar = '/storage/images/' . $path;
                }
            }
        }
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
        $rules = [
            'name' => 'required|unique:member,id,'.$id.'|regex:/^[a-zA-Z0-9-. ]+$/u|max:50',
            'dob' => 'required',
            'information' => 'max:300',
            'position' => 'required|in:intern,junior,senior,pm,ceo,cto,bo',
            'phone' => 'required|max:20|regex:/^[0-9-.\/\+\(\) ]+$/u',
            'gender' => 'required|in:1,2',
        ];
        $request->validate($rules);
        $member = Member::find($id);
        $member->name = $request->get('name');
        $member->information = $request->get('information');
        $member->date_of_birth =date($request->get('dob'));
        $member->position = $request->get('position');
        $member->phone = $request->get('phone');
        $member->gender = $request->get('gender');
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            // remove old images
            $avatar_old = $member->avatar;
            if ($avatar_old) {
                $avatar_old = explode('/', $avatar_old);
                $avatar_old = isset($avatar_old[3]) ? $avatar_old[3] : $avatar_old[0];
                if (file_exists(storage_path() . '/app/public/images/' . $avatar_old)) {
                    unlink(storage_path() . '/app/public/images/' . $avatar_old);
                }
            }
            // add new images
            $path = $request->file('avatar')->store('public/images');
            if ($path) {
                $path = explode('/', $path);
                $path = isset($path[2]) ? $path[2] : $path[0];
                if ($path) {
                    $member->avatar = '/storage/images/' . $path;
                }
            }
        }
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
      $member->projects()->detach();
      $member->delete();

      return response()->json('Member Deleted Successfully.');
    }

    public function members()
    {
        return view('member/index', ['title' => 'Members']);
    }

    public function newMember()
    {
        return view('member/index', ['title' => 'Create  Member']);
    }
    public function editMember()
    {
        return view('member/index', ['title' => 'Edit  Member']);
    }
}
