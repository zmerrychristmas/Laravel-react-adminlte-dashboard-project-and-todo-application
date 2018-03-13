<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ApiTest extends TestCase
{
    function testGetAllMembers()
    {
        $response = $this->json('GET', '/api/members');
        $response->assertStatus(200);
        $string = '{"members":[{"id":1,"name":"Nguyen Thien Kim","information":"test","phone":"0965841492","date_of_birth":"1992-09-27 00:00:00","avatar":"images\/default.png","position":"intern","gender":1,"created_at":null,"updated_at":null},{"id":2,"name":"Nguyen Thien Phuc","information":"test","phone":"0965841492","date_of_birth":"1992-09-27 00:00:00","avatar":"images\/default.png","position":"intern","gender":1,"created_at":null,"updated_at":null}],"messages":[]}';
        $this->assertSame($string, $response->getContent());
    }

    function testCreateMember()
    {
        $name = 'Nguyen Hai Minh';
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => $name ,
            'information' => 'test',
            'dob' => '1992-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 1,
            ]);
        $response->assertStatus(200)
        ->assertJson(['status' => true, 'message' => 'Member Added Successfully.']);
        return DB::getPdo()->lastInsertId();
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
            'name' => $name ,
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
            'name' => $name ,
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
    function testCreateMemberFailDateFormat()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'g_test' . $name ,
            'information' => '1234567891',
            'dob' => '1992-09-270',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            ]);
        $response->assertStatus(422)
        ->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => ['dob' => ['The dob is not a valid date.']]
            ]);
    }

    function testCreateMemberFailDateOlderThan60years1()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'g_test' . $name ,
            'information' => '1234567891',
            'dob' => '1900-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            ]);
        $response->assertStatus(422)
        ->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => ['dob' => ['The date should not older than 60 years old']]
            ]);
    }
    function testCreateMemberFailDateOlderThan60years2()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'g_test' . $name ,
            'information' => '1234567891',
            'dob' => '1957-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            ]);
        $response->assertStatus(422)
        ->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => ['dob' => ['The date should not older than 60 years old']]
            ]);
    }
    function testCreateMemberDateClose60years()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'g-test' . $name ,
            'information' => '1234567891',
            'dob' => '1958-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            ]);
        $response->assertStatus(200)
        ->assertJson(['status' => true, 'message' => 'Member Added Successfully.']);
        $id = DB::getPdo()->lastInsertId();
        $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('DELETE', '/api/members/' . $id);
    }

    function testCreateFailDateTooYoung()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'g_test' . $name ,
            'information' => '1234567891',
            'dob' => '2018-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            ]);
        $response->assertStatus(422)
        ->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => ['dob' => ['The date canot early than today']]
            ]);
    }

    /**
     * @depends testCreateMember
     */
    function testUpdateMember($id)
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members/' . $id, [
            'name' => $name ,
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

    /**
     * @depends testCreateMember
     */
    function testUpdateFailNameDatePhoneGenderPositionMember($id)
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members/' . $id, [
            'name' => 'test_' . $name ,
            'information' => '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
            'dob' => '1992-09-270',
            'position' => 'intern1',
            'phone' => '0965841492@',
            'gender' => 3,
            '_method' => 'PUT'
            ]);
        $response->assertStatus(422)
        ->assertJson([
            'message' => 'The given data was invalid.',
            'errors' => ['name' => ['The name format is invalid.'],
            'dob' => ['The dob is not a valid date.'],
            'position' => ['The selected position is invalid.'],
            'phone' => ['The phone format is invalid.'],
            'gender' => ['The selected gender is invalid.']
            ]
            ]);
    }

    function testGetAllProjects()
    {
        $response = $this->json('GET', '/api/projects');
        $response->assertStatus(200);
        $string = '{"projects":[{"id":1,"name":"Project A","information":"test1","deadline":"2018-09-27 00:00:00","type":"lab","status":"1","created_at":"1990-09-27 00:00:00","updated_at":"1990-09-27 00:00:00"},{"id":2,"name":"Project B","information":"test2","deadline":"2018-09-27 00:00:00","type":"lab","status":"1","created_at":"1990-09-27 00:00:00","updated_at":"1990-09-27 00:00:00"}],"messages":[],"members":[]}';
        $this->assertSame($string, $response->getContent());
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
        $response->assertStatus(200)
        ->assertJson(['status' => true, 'message' => 'Project Added Successfully.']);
        return DB::getPdo()->lastInsertId();
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
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["name"=>["The name may not be greater than 10 characters."]]]);
    }

    function testCreateProjectFailOverTenCharacterName()
    {
        $name = "123456789+";
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/projects', [
            'name' => $name ,
            'information' => 'test',
            'deadline' => '2018-09-27',
            'type' => 'lab',
            'status' => 1
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["name"=>["The name format is invalid."]]]);
    }

    function testCreateFailInformation()
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/projects', [
            'name' => $name ,
            'information' => '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123123123123123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123123123123',
            'deadline' => '2018-09-27',
            'type' => 'lab',
            'status' => 1
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["information"=>["The information may not be greater than 300 characters."]]]);
    }

    function testCreateProjectFailDeadline()
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/projects', [
            'name' => $name ,
            'information' => '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012',
            'deadline' => '2018-09-270',
            'type' => 'lab',
            'status' => 1
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["deadline"=>["The deadline is not a valid date."]]]);
    }

    function testCreateProjectFailType()
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/projects', [
            'name' => $name ,
            'information' => '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012',
            'deadline' => '2018-09-27',
            'type' => 'lab1',
            'status' => 1
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["type"=>["The selected type is invalid."]]]);
    }

    function testCreateProjectFailStatus()
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/projects', [
            'name' => $name ,
            'information' => '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012',
            'deadline' => '2018-09-27',
            'type' => 'lab',
            'status' => 6
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["status"=>["The selected status is invalid."]]]);
    }

    function testUpdateProjectFailNameDeadlineTypeStatus()
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/projects', [
            'name' => '+' . $name ,
            'information' => '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890121234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901212345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890121234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012',
            'deadline' => '2018-09-270',
            'type' => 'lab1',
            'status' => 6
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["name"=>["The name format is invalid."], "information"=>["The information may not be greater than 300 characters."], "deadline"=>["The deadline is not a valid date."], "type"=>["The selected type is invalid."], "status"=>["The selected status is invalid."]]]);
    }

    /**
     * @depends testCreateProject
     */
    function testUpdateProject($id)
    {
        $name = rand(0, 9999999999);
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/projects/' . $id, [
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

    /**
    * @depends testCreateMember
    * @depends testCreateProject
    */
    function assign($m_id, $p_id)
    {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/project/assign',['project_id' => $p_id,
            'member_id' => $m_id,
            'role' => 'dev'
            ]);
        $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Assign Successfully.'
            ]);
    }

    /**
     * @depends testCreateMember
     * @depends testCreateProject
     */
    function unassign($m_id, $p_id)
    {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('DELETE', '/api/project/detach',['project_id' => $p_id,'member_id' => $m_id]);
        $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Unassign Successfully.'
            ]);
    }

    /**
     * @depends testCreateMember
     */
    function testDeleteMember($id)
    {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('DELETE', '/api/members/' . $id);
        $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Member Deleted Successfully.'
            ]);
    }

    /**
     * @depends testCreateProject
     */
    function testDeleteProject($id)
    {
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('DELETE', '/api/projects/' . $id);
        $response->assertStatus(200)
        ->assertJson([
            'status' => true,
            'message' => 'Project Deleted Successfully.'
            ]);
    }

    function testUploadFile()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'upload' . $name ,
            'information' => '1234567891',
            'dob' => '1992-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            'avatar' =>  new UploadedFile(base_path('tests/data') . '/thank_you_3.jpg', 'thank_you_3.jpg', "image/jpg", 70, null, true)
            ]);
        $response->assertStatus(200)
        ->assertJson(['status' => true, 'message' => 'Member Added Successfully.']);
        $id = DB::getPdo()->lastInsertId();
        $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('DELETE', '/api/members/' . $id);
    }
    function testFailUploadFileByFileType()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'upload' . $name ,
            'information' => '1234567891',
            'dob' => '1992-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            'avatar' =>  new UploadedFile(base_path('tests/data') . '/53604.pdf', '53604.pdf', "application/pdf", 70, null, true)
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["avatar"=>["The file must have an extendsion jpg, png, gif"]]]);
    }

    function testFailUploadFileByFileChangeType()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'upload' . $name ,
            'information' => '1234567891',
            'dob' => '1992-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            'avatar' =>  new UploadedFile(base_path('tests/data') . '/53604.pdf', '53604.jpg', "application/pdf", 70, null, true)
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["avatar"=>["The file must have an extendsion jpg, png, gif"]]]);
    }

    /**
     * @depends testCreateMember
     */
    function testFailUploadFileByFileSizeOver10Mb()
    {
        $name = time();
        $response = $this->withHeaders(['X-Requested-With', 'XMLHttpRequest'])
        ->json('POST', '/api/members', [
            'name' => 'upload' . $name ,
            'information' => '1234567891',
            'dob' => '1992-09-27',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 2,
            'avatar' =>  new UploadedFile(base_path('tests/data') . '/Chartley_Castle-1.jpg', 'Chartley_Castle-1.jpg', "image/jpg", 70, null, true)
            ]);
        $response->assertStatus(422)
        ->assertJson(["message"=>"The given data was invalid.","errors"=>["avatar"=>["The avatar may not be greater than 10240 kilobytes."]]]);
    }
}
