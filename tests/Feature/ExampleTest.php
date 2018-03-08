<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

class ExampleTest extends TestCase
{
    static $member_created_id;
    static $project_created_id;
    function testGetAllMembers()
    {
        $response = $this->json('GET', '/api/members');
        $response->assertStatus(200);
    }

    function testCreateMember()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/members', [
          'name' => 'test' . $name ,
          'information' => 'test',
          'dob' => '1992-09-27',
          'position' => 'intern',
          'phone' => '0965841492',
          'gender' => 1,
        ]);
         self::$member_created_id = DB::getPdo()->lastInsertId();
        $response->assertStatus(200)
                ->assertJson(['status' => true, 'message' => 'Member Added Successfully.']);
    }

    function testCreateMemberFailName()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/members', [
          'name' => 'test_' . $name ,
          'information' => 'test',
          'dob' => '1992-09-27',
          'position' => 'intern',
          'phone' => '0965841492',
          'gender' => 1,
        ]);
        $response->assertStatus(422)
                ->assertJson([
                    'message' => 'The given data was invalid.',
                    'errors' => ['name' => ['The name format is invalid.']]
                    ]);
    }
    function testCreateMemberFailPhone()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/members', [
          'name' => 'test' . $name ,
          'information' => 'test',
          'dob' => '1992-09-27',
          'position' => 'intern',
          'phone' => '0965841492@@',
          'gender' => 1,
        ]);
        $response->assertStatus(422)
                ->assertJson([
                    'message' => 'The given data was invalid.',
                    'errors' => ['phone' => ['The phone format is invalid.']]
                    ]);
    }

    function testCreateMemberFailInformation()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/members', [
          'name' => 'test' . $name ,
          'information' => '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
          'dob' => '1992-09-27',
          'position' => 'intern',
          'phone' => '0965841492@@',
          'gender' => 1,
        ]);
        $response->assertStatus(422)
                ->assertJson([
                    'message' => 'The given data was invalid.',
                    'errors' => ['phone' => ['The phone format is invalid.']]
                    ]);
    }

    function testCreateMemberFailPosition()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/members', [
          'name' => 'f_test' . $name ,
          'information' => '1234567891',
          'dob' => '1992-09-27',
          'position' => 'intern1',
          'phone' => '0965841492',
          'gender' => 1,
        ]);
        $response->assertStatus(422)
                ->assertJson([
                    'message' => 'The given data was invalid.',
                    'errors' => ['position' => ['The selected position is invalid.']]
                    ]);
    }
    function testCreateMemberFailGender()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/members', [
          'name' => 'g_test' . $name ,
          'information' => '1234567891',
          'dob' => '1992-09-27',
          'position' => 'intern',
          'phone' => '0965841492',
          'gender' => 3,
        ]);
        $response->assertStatus(422)
                ->assertJson([
                    'message' => 'The given data was invalid.',
                    'errors' => ['gender' => ['The selected gender is invalid.']]
                    ]);
    }

    function testUpdateMember()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/members/' . self::$member_created_id, [
          'name' => 'test' . $name ,
          'information' => '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
          'dob' => '1992-09-27',
          'position' => 'intern',
          'phone' => '0965841492',
          'gender' => 1,
          '_method' => 'PUT'
        ]);
        $response->assertStatus(200)
                ->assertJson([
                    'status' => true,
                    'message' => 'Member Updated Successfully.'
                    ]);
    }

    function deleteMember()
    {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('DELETE', '/api/members/' . self::$member_created_id);
        $response->assertStatus(200)
                ->assertJson([
                    'status' => true,
                    'message' => 'Member Deleted Successfully.'
                    ]);
    }

    function testGetAllProjects()
    {
        $response = $this->json('GET', '/api/projects');
        $response->assertStatus(200);
    }

    function testCreateProject()
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/projects', [
          'name' => $name ,
          'information' => 'test',
          'deadline' => '2018-09-27',
          'type' => 'lab',
          'status' => 1
        ]);
        self::$project_created_id = DB::getPdo()->lastInsertId();
        $response->assertStatus(200)
                ->assertJson(['status' => true, 'message' => 'Project Added Successfully.']);
    }

    function testCreateProjectFailName()
    {
        $name = "12345678910";
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/projects', [
          'name' => $name ,
          'information' => 'test',
          'deadline' => '2018-09-27',
          'type' => 'lab',
          'status' => 1
        ]);
        self::$project_created_id = DB::getPdo()->lastInsertId();
        $response->assertStatus(422)
                ->assertJson(["message"=>"The given data was invalid.","errors"=>["name"=>["The name may not be greater than 10 characters."]]]);
    }

    function testCreateFailInformation()
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/projects', [
          'name' => $name ,
          'information' => '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
          'deadline' => '2018-09-27',
          'type' => 'lab',
          'status' => 1
        ]);
        self::$project_created_id = DB::getPdo()->lastInsertId();
        $response->assertStatus(200)
                ->assertJson(['status' => true, 'message' => 'Project Added Successfully.']);
    }

   function testUpdateProject()
   {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/projects/' . self::$project_created_id, [
          'name' => $name ,
          'information' => 'test',
          'deadline' => '2018-09-27',
          'type' => 'lab',
          'status' => 1,
          '_method' => 'PUT'
        ]);
        $response->assertStatus(200)
                ->assertJson(['status' => true, 'message' => 'Product Updated Successfully.']);
   }

   function testDeleteProject()
   {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('DELETE', '/api/projects/' . self::$project_created_id);
        $response->assertStatus(200)
                ->assertJson([
                    'status' => true,
                    'message' => 'Project Deleted Successfully.'
                    ]);
   }

   function assign()
   {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
          ->json('POST', '/api/project/assign',['project_id' => self::$project_created_id,
                                            'member_id' => self::$member_created_id,
                                            'role' => 'dev'
                                                ]);
        $response->assertStatus(200)
                ->assertJson([
                    'status' => true,
                    'message' => 'Assign Successfully.'
                    ]);
   }

   function unassign()
   {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
                            ->json('DELETE', '/api/project/detach',['project_id' => self::$project_created_id,'member_id' => self::$member_created_id]);
        $response->assertStatus(200)
                ->assertJson([
                    'status' => true,
                    'message' => 'Unassign Successfully.'
                    ]);
   }
}
