<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'project';
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'name', 'information', 'deadline', 'type', 'status'
    ];

    public function members()
    {
        return $this->belongsToMany('App\Member', 'project_member');
    }

    public static function project_members($id)
    {
        $member_roles = DB::table('project_member')
        ->join('member', 'member.id', '=', 'project_member.member_id')
        ->select('project_member.member_id', 'project_member.project_id', 'member.name', 'project_member.role', 'project_member.id as pm_id')
        ->where('project_id', '=', $id)->get();
        return $member_roles;
    }

    public static function addMember($p_id, $m_id, $role)
    {
        $result = DB::table('project_member')->insert(
            [
            'project_id' => $p_id,
            'member_id' => $m_id,
            'role' => $role,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
            ]);
        return $result;
    }

    public static function deleteMemberRoleId($pm_id)
    {
        return DB::table('project_member')->where('id', '=', $pm_id)->delete();
    }

    public static function deleteProjectMember($pid, $mid)
    {
        return DB::table('project_member')->where('member_id', '=', $mid)
                ->where('project_id', '=', $pid)->delete();
    }
}
