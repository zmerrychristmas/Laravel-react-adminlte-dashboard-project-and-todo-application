<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Project;
use App\Member;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->get('pid')) {
            $projects = Project::find(16);
            $projects->members->pluck('id')->toArray();
        }
        $projects = Project::all();
        $messages = [];
        $action = $request->get('ACTION');
        switch($action) {
            case 1: {
                $messages[] = 'Create project successfully !';
                break;
            }
            case 2: {
                $messages[] = 'Update project successfully !';
                break;
            }
            default: {
                break;
            }
        }
        $result = [
            'projects' => $projects,
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
            'name' => 'required|unique:member|regex:/^[a-zA-Z0-9-. ]+$/u|max:10',
            'information' => 'max:300',
            'type' => 'required|in:lab,single,acceptance',
            'status' => 'required|in:1,2,3,4,5',
        ];
        $request->validate($rules);
        $project = new Project([
          'name' => $request->get('name'),
          'information' => $request->get('information'),
          'deadline' => $request->get('deadline'),
          'type' => $request->get('type'),
          'status' => $request->get('status')
        ]);
        $project->save();

        return response()->json('Project Added Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::find($id);
        $member_roles = DB::table('project_member')
                    ->join('member', 'member.id', '=', 'project_member.member_id')
                    ->select('member.id', 'member.name', 'project_member.role', 'project_member.id as pm_id')
                    ->where('project_id', '=', $id)->get();
        return response()->json(['project' => $project, 'member_roles' => $member_roles]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $project = Project::find($id);
        return response()->json($project);
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
            'name' => 'required|unique:member,id,'.$id.'|regex:/^[a-zA-Z0-9-. ]+$/u|max:10',
            'information' => 'max:300',
            'type' => 'required|in:lab,single,acceptance',
            'status' => 'required|in:1,2,3,4,5',
        ];
        $request->validate($rules);
        $project = Project::find($id);
        $project->name = $request->get('name');
        $project->information = $request->get('information');
        $project->deadline = $request->get('deadline');
        $project->type = $request->get('type');
        $project->status = $request->get('status');
        $project->save();

        return response()->json('Product Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $project = Project::find($id);
      $project->members()->detach();
      $project->delete();

      return response()->json('Project Deleted Successfully.');
    }

    public function assignMember(Request $request)
    {
        $rules = [
            'project_id' => 'required',
            'member_id' => 'required',
            'role' => 'required'
        ];
        $result = $request->validate($rules);
        $idMember = $request->get('member_id');
        $idProject = $request->get('project_id');
        $project = Project::find($idProject);
        $member = Member::find($idMember);
        if ($member && $project) {
            DB::table('project_member')->insert(
            [
                'project_id' => $idProject,
                'member_id' => $idMember,
                'role' => $request->get('role'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            return response()->json('Assign Successfully.');
        }
        return response()->json("Faild to assign, check your's input");
    }

    public function detach($member_role_id)
    {
        $member_role = DB::table('project_member')->where('id', '=', $member_role_id)->delete();
        if ($member_role) {
            return response()->json(['status' => 'true', 'messages' => 'Assign Successfully.']);
        }
        return response()->json(['status' => 'false', 'messages' => 'Failed to unassign Successfully.']);
    }

    public function projects()
    {
        return view('project/index', ['title' => 'Projects']);
    }

    public function newProject()
    {
        return view('project/index', ['title' => 'Create  Project']);
    }

    public function editProject()
    {
        return view('project/index', ['title' => 'Edit  Project']);
    }
    public function assign()
    {
        return view('project/index', ['title' => 'Assign Member To Project']);
    }

    public function detail()
    {
        return view('project/detail', ['title' => 'Detail Project']);
    }
}
