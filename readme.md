# Laravel React AdminLTE Project management example code

Admin Dashboard using Laravel, AdminLTE and ReactJs to coded a website with purpose using in Project management, due to example code for tutorial, this sample code cover case during code daily of a full stack developer. In this project, this was created from a long time project, so I using Laravel 5.x and update to React@lastest. I will update from Laravel 5.x to Laravel lastest in near future time and update in readme if possible.

## Prepare
- Working environment: Linux, MacOS, microsoft Windows
- Laravel 5.x
- ReactJs lastest
- PHP 7.4
- Node 14
## Install 
1. Install Laravel
Install Laravel via composer is more convienence than use laravel install due to maintain tool installer, certainly!, Composer is well-known package manager
```bash
composer create-project --prefer-dist laravel/laravel laravel_react_adminlte_project_todo_management "5.5.*"
cd laravel_react_adminlte_project_todo_management
composer install
```
2. Install AdminLTE
AdminLTE used in my repository is 2.x, which is stable for Laravel 5.x in 2018. For lastest support and maintain please use lastest version of adminLTE is 3.x in 2024.
```bash
composer require jeroennoten/laravel-adminlte
php artisan adminlte:install # if adminlte of lower version will not run this command `adminlte` not found
```
Register AdminLTE in service provider to booter with laravel
```php
JeroenNoten\LaravelAdminLte\ServiceProvider::class,
```
After install AdminLTE, publish vendor assests file to make css, and js file working.
```bash
php artisan vendor:publish --provider="JeroenNoten\LaravelAdminLte\ServiceProvider" --tag=asset
php artisan config:cache
php artisan view:clear
```

3. Install Node package
The version of Node is 14 and React is latest, and ReactDom is also lastest to avoid miss coparatitive with version and functions.
```bash
nvm install 14
nvm use 14
npm install 
```
To build css and js file
```bash
npm run dev
```
To watch and synchonized change code automatically 
```bash
npm run watch
```
4. Run conmand to generate key
Laravel is rich features, mean every code and feature can also have own config but before run a laravel app, laravel will look into the configure file and find out key generated which used for hash, ssl and algorithm functions. Laravel will not start without key generated.
- Make a `.env` file from `.env.local` 
```bash
php artisan key:generate
```

5. Run command to migrate
Before run migrate, make sure to config database parameters in `.env`.
There are multiplee databases support but in this repository, I use MYSQL.
```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react_sample_code
DB_USERNAME=db_usernam
DB_PASSWORD=db_pass
```
Run migrate
```sh
php artisan migrate 
```
6. Run command to make data for test
Made some data for tests and available seed by command
```sh
php artisan db:seed
```
The content is following to Seed are: *ProjectTableSeeder.php* and *MemberTableSeeder.php*
```php
<?php

use Illuminate\Database\Seeder;
use App\Project;

class ProjectTableSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        App\Project::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('project')->delete();
        $name = 'Project A';
        Project::create(array(
            'name' => $name,
            'information' => 'test1',
            'deadline' => '2018-09-27',
            'type' => 'lab',
            'status' => 1,
            'created_at' => '1990-09-27',
            'updated_at' => '1990-09-27'
        ));

        $name = 'Project B';
        Project::create(array(
            'name' => $name,
            'information' => 'test2',
            'deadline' => '2018-09-27',
            'type' => 'lab',
            'status' => 1,
            'created_at' => '1990-09-27',
            'updated_at' => '1990-09-27'
        ));
    }
}
```
and *MemberTableSeeder.php*
```php
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
        $name = 'Nguyen Kim';
        Member::create(array(
            'name' => $name,
            'information' => 'test',
            'date_of_birth' => '1992-09-25',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 1,
            'avatar' => 'storage/images/default.png'
        ));

        $name = 'Nguyen Phuc';
        Member::create(array(
            'name' => $name,
            'information' => 'test',
            'date_of_birth' => '1992-09-25',
            'position' => 'intern',
            'phone' => '0965841492',
            'gender' => 1,
            'avatar' => 'storage/images/default.png'
        ));
    }
}
```
File *DatabaseSeeder.php* will place code to call seeders
```php
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

```
7. Check variables configure
Check on folder config and locate files: `adminlte.php`, `MyGlobeSetting.php` and `app.php` to checl whether conditions and variables are setted. These variables have own defaults.
Please check config to add:
- App Name
- Database connection
- AdminLTE params: menu, plugins 
8. Fix any bugs appear and check bug math.div 
After install and run npm run dev, command is work properly but errors may be appear. Please aware to fix bugs appeard duting run at local site.
The bug come from sass compiler is math.div not found so please go in detail error notice and make change from `math.div` to function symbols `/` 	
9. Websites pictures 
Website pictures:
- Home page
- Project Page
- Member Page
10. Other

<article class="px-1">
  <header>
    <h1 data-toc-skip="">Laravel React AdminLTE Dashboard Project and todo example</h1>

    <div class="post-meta text-muted">
      <!-- published date -->
      <span>
        Posted
        <!--
  Date format snippet
  See: ${JS_ROOT}/utils/locale-dateime.js
-->




<time data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Sun, Oct 6, 2024 10:00 AM">Oct 6, 2024</time>

      </span>

      <!-- lastmod date -->
      

      

      <div class="d-flex justify-content-between">
        <!-- author(s) -->
        <span>
          

          By

          <em>
            
              <a href="https://twitter.com/username">Leo đẹp trai</a>
            
          </em>
        </span>

        <!-- read time -->
        <!-- Calculate the post's reading time, and display the word count in tooltip -->



<!-- words per minute -->










<!-- return element -->
<span class="readtime" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="842 words">
  <em>4 min</em> read</span>

      </div>
      <!-- .d-flex -->
    </div>
    <!-- .post-meta -->
  </header>

  <div class="content">
    <h1 id="laravel-react-adminlte-project-management-example-code">Laravel React AdminLTE Project management example code</h1>

<p>Admin Dashboard using Laravel, AdminLTE and ReactJs to coded a website with purpose using in Project management, due to example code for tutorial, this sample code cover case during code daily of a full stack developer. In this project, this was created from a long time project, so I using Laravel 5.x and update to React@lastest. I will update from Laravel 5.x to Laravel lastest in near future time and update in readme if possible.</p>

<h2 id="prepare"><span class="me-2">Prepare</span><a href="#prepare" class="anchor text-muted"><i class="fas fa-hashtag"></i></a></h2>
<ul>
  <li>Working environment: Linux, MacOS, microsoft Windows</li>
  <li>Laravel 5.x</li>
  <li>ReactJs lastest</li>
  <li>PHP 7.4</li>
  <li>Node 14
    <h2 id="install"><span class="me-2">Install</span><a href="#install" class="anchor text-muted"><i class="fas fa-hashtag"></i></a></h2>
    <ol>
      <li>Install Laravel
Install Laravel via composer is more convienence than use laravel install due to maintain tool installer, certainly!, Composer is well-known package manager
        <div class="language-bash highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
3
</pre></td><td class="rouge-code"><pre>composer create-project <span class="nt">--prefer-dist</span> laravel/laravel laravel_react_adminlte_project_todo_management <span class="s2">"5.5.*"</span>
<span class="nb">cd </span>laravel_react_adminlte_project_todo_management
composer <span class="nb">install</span>
</pre></td></tr></tbody></table></code></div>        </div>
      </li>
      <li>Install AdminLTE
AdminLTE used in my repository is 2.x, which is stable for Laravel 5.x in 2018. For lastest support and maintain please use lastest version of adminLTE is 3.x in 2024.
        <div class="language-bash highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
</pre></td><td class="rouge-code"><pre>composer require jeroennoten/laravel-adminlte
php artisan adminlte:install <span class="c"># if adminlte of lower version will not run this command `adminlte` not found</span>
</pre></td></tr></tbody></table></code></div>        </div>
        <p>Register AdminLTE in service provider to booter with laravel</p>
        <div class="language-php highlighter-rouge"><div class="code-header">
        <span data-label-text="PHP"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
</pre></td><td class="rouge-code"><pre><span class="nc">JeroenNoten\LaravelAdminLte\ServiceProvider</span><span class="o">::</span><span class="n">class</span><span class="p">,</span>
</pre></td></tr></tbody></table></code></div>        </div>
        <p>After install AdminLTE, publish vendor assests file to make css, and js file working.</p>
        <div class="language-bash highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
3
</pre></td><td class="rouge-code"><pre>php artisan vendor:publish <span class="nt">--provider</span><span class="o">=</span><span class="s2">"JeroenNoten</span><span class="se">\L</span><span class="s2">aravelAdminLte</span><span class="se">\S</span><span class="s2">erviceProvider"</span> <span class="nt">--tag</span><span class="o">=</span>asset
php artisan config:cache
php artisan view:clear
</pre></td></tr></tbody></table></code></div>        </div>
      </li>
    </ol>
  </li>
</ul>

<ol>
  <li>Install Node package
The version of Node is 14 and React is latest, and ReactDom is also lastest to avoid miss coparatitive with version and functions.
    <div class="language-bash highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
3
</pre></td><td class="rouge-code"><pre>nvm <span class="nb">install </span>14
nvm use 14
npm <span class="nb">install</span> 
</pre></td></tr></tbody></table></code></div>    </div>
    <p>To build css and js file</p>
    <div class="language-bash highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
</pre></td><td class="rouge-code"><pre>npm run dev
</pre></td></tr></tbody></table></code></div>    </div>
    <p>To watch and synchonized change code automatically</p>
    <div class="language-bash highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
</pre></td><td class="rouge-code"><pre>npm run watch
</pre></td></tr></tbody></table></code></div>    </div>
  </li>
  <li>Run conmand to generate key
Laravel is rich features, mean every code and feature can also have own config but before run a laravel app, laravel will look into the configure file and find out key generated which used for hash, ssl and algorithm functions. Laravel will not start without key generated.
    <ul>
      <li>Make a <code class="language-plaintext highlighter-rouge">.env</code> file from <code class="language-plaintext highlighter-rouge">.env.local</code>
        <div class="language-bash highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
</pre></td><td class="rouge-code"><pre>php artisan key:generate
</pre></td></tr></tbody></table></code></div>        </div>
      </li>
    </ul>
  </li>
  <li>Run command to migrate
Before run migrate, make sure to config database parameters in <code class="language-plaintext highlighter-rouge">.env</code>.
There are multiplee databases support but in this repository, I use MYSQL.
    <div class="language-sh highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
3
4
5
6
</pre></td><td class="rouge-code"><pre><span class="nv">DB_CONNECTION</span><span class="o">=</span>mysql
<span class="nv">DB_HOST</span><span class="o">=</span>127.0.0.1
<span class="nv">DB_PORT</span><span class="o">=</span>3306
<span class="nv">DB_DATABASE</span><span class="o">=</span>laravel_react_sample_code
<span class="nv">DB_USERNAME</span><span class="o">=</span>db_usernam
<span class="nv">DB_PASSWORD</span><span class="o">=</span>db_pass
</pre></td></tr></tbody></table></code></div>    </div>
    <p>Run migrate</p>
    <div class="language-sh highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
</pre></td><td class="rouge-code"><pre>php artisan migrate 
</pre></td></tr></tbody></table></code></div>    </div>
  </li>
  <li>Run command to make data for test</li>
</ol>

<p>Made some data for tests and available seed by command</p>
<div class="language-sh highlighter-rouge"><div class="code-header">
        <span data-label-text="Shell"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
</pre></td><td class="rouge-code"><pre>php artisan db:seed
</pre></td></tr></tbody></table></code></div></div>
<p>The content is following to Seed are: <em>ProjectTableSeeder.php</em>  and <em>MemberTableSeeder.php</em></p>

<div class="language-php highlighter-rouge"><div class="code-header">
        <span data-label-text="PHP"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
</pre></td><td class="rouge-code"><pre><span class="cp">&lt;?php</span>

<span class="kn">use</span> <span class="nc">Illuminate\Database\Seeder</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">App\Project</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">ProjectTableSeeder</span> <span class="kd">extends</span> <span class="nc">Seeder</span>
<span class="p">{</span>

    <span class="k">public</span> <span class="k">function</span> <span class="n">run</span><span class="p">()</span>
    <span class="p">{</span>
        <span class="no">DB</span><span class="o">::</span><span class="nf">statement</span><span class="p">(</span><span class="s1">'SET FOREIGN_KEY_CHECKS=0;'</span><span class="p">);</span>
        <span class="nc">App\Project</span><span class="o">::</span><span class="nf">truncate</span><span class="p">();</span>
        <span class="no">DB</span><span class="o">::</span><span class="nf">statement</span><span class="p">(</span><span class="s1">'SET FOREIGN_KEY_CHECKS=1;'</span><span class="p">);</span>
        <span class="no">DB</span><span class="o">::</span><span class="nf">table</span><span class="p">(</span><span class="s1">'project'</span><span class="p">)</span><span class="o">-&gt;</span><span class="nb">delete</span><span class="p">();</span>
        <span class="nv">$name</span> <span class="o">=</span> <span class="s1">'Project A'</span><span class="p">;</span>
        <span class="nc">Project</span><span class="o">::</span><span class="nf">create</span><span class="p">(</span><span class="k">array</span><span class="p">(</span>
            <span class="s1">'name'</span> <span class="o">=&gt;</span> <span class="nv">$name</span><span class="p">,</span>
            <span class="s1">'information'</span> <span class="o">=&gt;</span> <span class="s1">'test1'</span><span class="p">,</span>
            <span class="s1">'deadline'</span> <span class="o">=&gt;</span> <span class="s1">'2018-09-27'</span><span class="p">,</span>
            <span class="s1">'type'</span> <span class="o">=&gt;</span> <span class="s1">'lab'</span><span class="p">,</span>
            <span class="s1">'status'</span> <span class="o">=&gt;</span> <span class="mi">1</span><span class="p">,</span>
            <span class="s1">'created_at'</span> <span class="o">=&gt;</span> <span class="s1">'1990-09-27'</span><span class="p">,</span>
            <span class="s1">'updated_at'</span> <span class="o">=&gt;</span> <span class="s1">'1990-09-27'</span>
        <span class="p">));</span>

        <span class="nv">$name</span> <span class="o">=</span> <span class="s1">'Project B'</span><span class="p">;</span>
        <span class="nc">Project</span><span class="o">::</span><span class="nf">create</span><span class="p">(</span><span class="k">array</span><span class="p">(</span>
            <span class="s1">'name'</span> <span class="o">=&gt;</span> <span class="nv">$name</span><span class="p">,</span>
            <span class="s1">'information'</span> <span class="o">=&gt;</span> <span class="s1">'test2'</span><span class="p">,</span>
            <span class="s1">'deadline'</span> <span class="o">=&gt;</span> <span class="s1">'2018-09-27'</span><span class="p">,</span>
            <span class="s1">'type'</span> <span class="o">=&gt;</span> <span class="s1">'lab'</span><span class="p">,</span>
            <span class="s1">'status'</span> <span class="o">=&gt;</span> <span class="mi">1</span><span class="p">,</span>
            <span class="s1">'created_at'</span> <span class="o">=&gt;</span> <span class="s1">'1990-09-27'</span><span class="p">,</span>
            <span class="s1">'updated_at'</span> <span class="o">=&gt;</span> <span class="s1">'1990-09-27'</span>
        <span class="p">));</span>
    <span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></div></div>

<p>and <em>MemberTableSeeder.php</em></p>

<div class="language-php highlighter-rouge"><div class="code-header">
        <span data-label-text="PHP"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
</pre></td><td class="rouge-code"><pre><span class="cp">&lt;?php</span>

<span class="kn">use</span> <span class="nc">Illuminate\Database\Seeder</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">App\Member</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">MemberTableSeeder</span> <span class="kd">extends</span> <span class="nc">Seeder</span>
<span class="p">{</span>

    <span class="k">public</span> <span class="k">function</span> <span class="n">run</span><span class="p">()</span>
    <span class="p">{</span>
        <span class="no">DB</span><span class="o">::</span><span class="nf">statement</span><span class="p">(</span><span class="s1">'SET FOREIGN_KEY_CHECKS=0;'</span><span class="p">);</span>
        <span class="nc">App\Member</span><span class="o">::</span><span class="nf">truncate</span><span class="p">();</span>
        <span class="no">DB</span><span class="o">::</span><span class="nf">statement</span><span class="p">(</span><span class="s1">'SET FOREIGN_KEY_CHECKS=1;'</span><span class="p">);</span>
        <span class="no">DB</span><span class="o">::</span><span class="nf">table</span><span class="p">(</span><span class="s1">'member'</span><span class="p">)</span><span class="o">-&gt;</span><span class="nb">delete</span><span class="p">();</span>
        <span class="nv">$name</span> <span class="o">=</span> <span class="s1">'Nguyen Kim'</span><span class="p">;</span>
        <span class="nc">Member</span><span class="o">::</span><span class="nf">create</span><span class="p">(</span><span class="k">array</span><span class="p">(</span>
            <span class="s1">'name'</span> <span class="o">=&gt;</span> <span class="nv">$name</span><span class="p">,</span>
            <span class="s1">'information'</span> <span class="o">=&gt;</span> <span class="s1">'test'</span><span class="p">,</span>
            <span class="s1">'date_of_birth'</span> <span class="o">=&gt;</span> <span class="s1">'1992-09-25'</span><span class="p">,</span>
            <span class="s1">'position'</span> <span class="o">=&gt;</span> <span class="s1">'intern'</span><span class="p">,</span>
            <span class="s1">'phone'</span> <span class="o">=&gt;</span> <span class="s1">'0965841492'</span><span class="p">,</span>
            <span class="s1">'gender'</span> <span class="o">=&gt;</span> <span class="mi">1</span><span class="p">,</span>
            <span class="s1">'avatar'</span> <span class="o">=&gt;</span> <span class="s1">'storage/images/default.png'</span>
        <span class="p">));</span>

        <span class="nv">$name</span> <span class="o">=</span> <span class="s1">'Nguyen Phuc'</span><span class="p">;</span>
        <span class="nc">Member</span><span class="o">::</span><span class="nf">create</span><span class="p">(</span><span class="k">array</span><span class="p">(</span>
            <span class="s1">'name'</span> <span class="o">=&gt;</span> <span class="nv">$name</span><span class="p">,</span>
            <span class="s1">'information'</span> <span class="o">=&gt;</span> <span class="s1">'test'</span><span class="p">,</span>
            <span class="s1">'date_of_birth'</span> <span class="o">=&gt;</span> <span class="s1">'1992-09-25'</span><span class="p">,</span>
            <span class="s1">'position'</span> <span class="o">=&gt;</span> <span class="s1">'intern'</span><span class="p">,</span>
            <span class="s1">'phone'</span> <span class="o">=&gt;</span> <span class="s1">'0965841492'</span><span class="p">,</span>
            <span class="s1">'gender'</span> <span class="o">=&gt;</span> <span class="mi">1</span><span class="p">,</span>
            <span class="s1">'avatar'</span> <span class="o">=&gt;</span> <span class="s1">'storage/images/default.png'</span>
        <span class="p">));</span>
    <span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></div></div>

<p>File <em>DatabaseSeeder.php</em> will place code to call seeders</p>

<div class="language-php highlighter-rouge"><div class="code-header">
        <span data-label-text="PHP"><i class="fas fa-code fa-fw small"></i></span>
      <button aria-label="copy" data-title-succeed="Copied!"><i class="far fa-clipboard"></i></button></div><div class="highlight"><code><table class="rouge-table"><tbody><tr><td class="rouge-gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
</pre></td><td class="rouge-code"><pre><span class="cp">&lt;?php</span>

<span class="kn">use</span> <span class="nc">Illuminate\Database\Seeder</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">DatabaseSeeder</span> <span class="kd">extends</span> <span class="nc">Seeder</span>
<span class="p">{</span>
    <span class="cd">/**
     * Run the database seeds.
     *
     * @return void
     */</span>
    <span class="k">public</span> <span class="k">function</span> <span class="n">run</span><span class="p">()</span>
    <span class="p">{</span>
        <span class="nv">$this</span><span class="o">-&gt;</span><span class="nf">call</span><span class="p">(</span><span class="nc">ProjectTableSeeder</span><span class="o">::</span><span class="n">class</span><span class="p">);</span>
        <span class="nv">$this</span><span class="o">-&gt;</span><span class="nf">call</span><span class="p">(</span><span class="nc">MemberTableSeeder</span><span class="o">::</span><span class="n">class</span><span class="p">);</span>
    <span class="p">}</span>
<span class="p">}</span>

</pre></td></tr></tbody></table></code></div></div>

<ol>
  <li>Check variables configure</li>
</ol>

<p>Check on folder config and locate files: <code class="language-plaintext highlighter-rouge">adminlte.php</code>, <code class="language-plaintext highlighter-rouge">MyGlobeSetting.php</code> and <code class="language-plaintext highlighter-rouge">app.php</code> to checl whether conditions and variables are setted. These variables have own defaults.
Please check config to add:</p>
<ul>
  <li>App Name</li>
  <li>Database connection</li>
  <li>AdminLTE params: menu, plugins</li>
</ul>

<ol>
  <li>Fix any bugs appear and check bug math.div</li>
</ol>

<p>After install and run npm run dev, command is work properly but errors may be appear. Please aware to fix bugs appeard duting run at local site.
The bug come from sass compiler is math.div not found so please go in detail error notice and make change from <code class="language-plaintext highlighter-rouge">math.div</code> to function symbols <code class="language-plaintext highlighter-rouge">/</code></p>

<ol>
  <li>Websites pictures 
Website pictures:
    <ul>
      <li>Home page
<a href="/assets/img/posts/20241007/home%20page.png" class="popup img-link"><img src="/assets/img/posts/20241007/home%20page.png" alt="Home page" loading="lazy"></a></li>
      <li>Project Page
<a href="/assets/img/posts/20241007/project%20list.png" class="popup img-link"><img src="/assets/img/posts/20241007/project%20list.png" alt="Project page" loading="lazy"></a></li>
      <li>Create Project
<a href="/assets/img/posts/20241007/create%20project.png" class="popup img-link"><img src="/assets/img/posts/20241007/create%20project.png" alt="Create Project" loading="lazy"></a></li>
      <li>Member Update information
<a href="/assets/img/posts/20241007/update%20member%20infor.png" class="popup img-link"><img src="/assets/img/posts/20241007/update%20member%20infor.png" alt="Member Update information" loading="lazy"></a></li>
    </ul>
  </li>
  <li>Other
    <ul>
      <li>Data is sample for test and demo</li>
    </ul>
  </li>
</ol>

<h2 id="coding-tutorial"><span class="me-2">Coding Tutorial</span><a href="#coding-tutorial" class="anchor text-muted"><i class="fas fa-hashtag"></i></a></h2>

<h3 id="admin-by-laravel"><span class="me-2">Admin By Laravel</span><a href="#admin-by-laravel" class="anchor text-muted"><i class="fas fa-hashtag"></i></a></h3>

<h3 id="create-admin-dashboard-using-adminlte"><span class="me-2">Create Admin Dashboard using AdminLTE</span><a href="#create-admin-dashboard-using-adminlte" class="anchor text-muted"><i class="fas fa-hashtag"></i></a></h3>

<h3 id="admin-dashboard-using-reactjs"><span class="me-2">Admin Dashboard using ReactJS</span><a href="#admin-dashboard-using-reactjs" class="anchor text-muted"><i class="fas fa-hashtag"></i></a></h3>

<h2 id="reference"><span class="me-2">Reference</span><a href="#reference" class="anchor text-muted"><i class="fas fa-hashtag"></i></a></h2>

  </div>

  <div class="post-tail-wrapper text-muted">
    <!-- categories -->
    

    <!-- tags -->
    

    <div class="
        post-tail-bottom
        d-flex justify-content-between align-items-center mt-5 pb-2
      ">
      <div class="license-wrapper">
        
          

          This post is licensed under 
        <a href="https://creativecommons.org/licenses/by/4.0/">
          CC BY 4.0
        </a>
         by the author.
        
      </div>

      <!-- Post sharing snippet -->

<div class="share-wrapper d-flex align-items-center">
  <span class="share-label text-muted">Share</span>
  <span class="share-icons">
    
    
    

    

      

      <a href="https://twitter.com/AdHuybinh" target="_blank" rel="noopener" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Twitter" data-bs-original-title="Twitter">
        <i class="fa-fw fab fa-twitter"></i>
      </a>
    

      

      <a href="https://www.facebook.com/alz.ailove" target="_blank" rel="noopener" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Facebook" data-bs-original-title="Facebook">
        <i class="fa-fw fab fa-facebook-square"></i>
      </a>
    

      

      <a href="https://telegram.me/share?text=Laravel%20React%20AdminLTE%20Dashboard%20Project%20and%20todo%20example%20-%20Programmer%20From%20Zero%20To%20Mountaint&amp;url=http%3A%2F%2Flocalhost%3A4000%2Fposts%2Flaravel-react-adminlte-dashboard-project-and-todo-example%2F" target="_blank" rel="noopener" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Telegram" data-bs-original-title="Telegram">
        <i class="fa-fw fab fa-telegram"></i>
      </a>
    

      

      <a href="https://www.linkedin.com/in/b%C3%ACnh-nguy%E1%BB%85n-75312a7b/" target="_blank" rel="noopener" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Linkedin" data-bs-original-title="Linkedin">
        <i class="fa-fw fab fa-linkedin"></i>
      </a>
    

    <button id="copy-link" aria-label="Copy link" class="btn small" data-bs-toggle="tooltip" data-bs-placement="top" data-title-succeed="Link copied successfully!" data-bs-original-title="Copy link">
      <i class="fa-fw fas fa-link pe-none fs-6"></i>
    </button>
  </span>
</div>

    </div>
    <!-- .post-tail-bottom -->
  </div>
  <!-- div.post-tail-wrapper -->
</article>

## Coding Tutorial

### Admin By Laravel


### Create Admin Dashboard using AdminLTE


### Admin Dashboard using ReactJS

## Reference