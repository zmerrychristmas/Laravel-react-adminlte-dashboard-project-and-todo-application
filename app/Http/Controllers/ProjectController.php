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
            $members = [];
            if ($request->get('pid')) {
                $projects = Project::find($request->get('pid'));
                $members = $projects->members->pluck('id')->toArray();
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
            'messages' => $messages,
            'members' => $members
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
            $request->validate(self::RULES);
            $project = new Project([
                'name' => $request->get('name'),
                'information' => $request->get('information'),
                'deadline' => $request->get('deadline'),
                'type' => $request->get('type'),
                'status' => $request->get('status')
                ]);
            $save = $project->save();
            if ($save) {
                return response()->json(['status' => true, 'message' => 'Project Added Successfully.']);
            }
            return response()->json(['status' => false, 'message' => 'Project Added Failed.']);
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
            $member_roles = Project::project_members($id);
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
            $request->validate(self::RULES);
            $project = Project::find($id);
            if ($project) {
                $project->name = $request->get('name');
                $project->information = $request->get('information');
                $project->deadline = $request->get('deadline');
                $project->type = $request->get('type');
                $project->status = $request->get('status');
                if ($project->save()) {
                    return response()->json(['status' => true, 'message' => 'Product Updated Successfully.']);
                } else {
                    return response()->json(['status' => false, 'message' => 'Product Updated Fail.']);
                }
            } else {
                return response()->json(['status' => false, 'message' => 'Project Do not exists.']);
            }

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
            if($project->delete()) {
                return response()->json(['status' => true, 'message' => 'Project Deleted Successfully.']);
            } else {
                return response()->json(['status' => false, 'message' => 'Project Deleted Fail.']);
            }

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
                Project::addMember($idProject, $idMember, $request->get('role'));
                return response()->json(['status' => true, 'message' => 'Assign Successfully.']);
            }
            return response()->json(['status' => false, 'message' => "Faild to assign, need give correct information about project and member."]);
        }

        public function detach(Request $request)
        {
            $member_role = false;
            if ($request->get('pm_id')) {
                $member_role = Project::deleteMemberRoleId($request->get('pm_id'));
                if ($member_role) {
                    return response()->json(['status' => true, 'messages' => 'Unassign Successfully.']);
                }
            }
            if ($request->get('member_id') && $request->get('project_id')) {
                $member_role = Project::deleteProjectMember($request->get('project_id'), $request->get('member_id'));
                if ($member_role) {
                    return response()->json(['status' => true, 'messages' => 'Unassign Successfully.']);
                }
            }
            return response()->json(['status' => false, 'messages' => 'Failed to unassign Successfully.']);
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

        const RULES = [
        'name' => 'regex:/^[a-zA-Z0-9-. ]+$/u|max:10',
        'information' => 'max:300',
        'deadline' => 'date',
        'type' => 'required|in:lab,single,acceptance',
        'status' => 'required|in:1,2,3,4,5',
        ];
    }
