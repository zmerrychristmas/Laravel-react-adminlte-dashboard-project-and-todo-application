<?php

use Illuminate\Database\Seeder;
use App\Member;

class MemberTableSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        App\Member::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('member')->delete();
        $name = 'Test member 1';
        Member::create(array(
            'name' => $name,
            'information' => 'test',
            'date_of_birth' => '1900-09-25',
            'position' => 'intern',
            'phone' => '0123456789',
            'gender' => 1,
            'avatar' => '/storage/images/default.png'
        ));

        $name = 'Test member 2';
        Member::create(array(
            'name' => $name,
            'information' => 'test',
            'date_of_birth' => '1900-09-25',
            'position' => 'intern',
            'phone' => '0123456789',
            'gender' => 1,
            'avatar' => '/storage/images/default.png'
        ));
    }
}
