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
        return response()->json($project);
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
      $project->delete();

      return response()->json('Project Deleted Successfully.');
    }

    public function assignMember(Request $request)
    {
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
}
