<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'project';
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
}
