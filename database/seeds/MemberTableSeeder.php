<?php

use Illuminate\Database\Seeder;
use App\Member;

class MemberTableSeeder extends Seeder{

    public function run(){
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        App\Member::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('member')->delete();
        $name = 'Nguyen Thien Kim';
        Member::create(array(
            'name' => $name ,
            'information' => 'test',
            'date_of_birth' => '1992-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 1,
            'avatar' => 'storage/images/default.png'
        ));

        $name = 'Nguyen Thien Phuc';
        Member::create(array(
            'name' => $name ,
            'information' => 'test',
            'date_of_birth' => '1992-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 1,
            'avatar' => 'storage/images/default.png'
        ));
    }
}