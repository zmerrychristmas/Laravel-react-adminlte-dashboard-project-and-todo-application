<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ProjectTableSeeder::class);
        $this->call(MemberTableSeeder::class);
    }
}
