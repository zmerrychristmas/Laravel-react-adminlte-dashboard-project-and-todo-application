<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'information', 'date_of_birth', 'avatar', 'position', 'gender'
    ];

    public function projects()
    {

    }
}
