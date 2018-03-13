<?php

use Illuminate\Database\Seeder;
use App\Project;

class ProjectTableSeeder extends Seeder{

    public function run(){
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        App\Project::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('project')->delete();
        $name = 'Project A';
        Project::create(array(
            'name' => $name ,
            'information' => 'test1',
            'deadline' => '2018-09-27',
            'type' => 'lab',
            'status' => 1,
            'created_at' => '1990-09-27',
            'updated_at' => '1990-09-27'
        ));

        $name = 'Project B';
        Project::create(array(
            'name' => $name ,
            'information' => 'test2',
            'deadline' => '2018-09-27',
            'type' => 'lab',
            'status' => 1,
            'created_at' => '1990-09-27',
            'updated_at' => '1990-09-27'
        ));
    }
}