<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ValidatorServiceProvider extends ServiceProvider {

    public function boot()
    {
        $this->app['validator']->extend('Older60YearOlds', function ($attribute, $value, $parameters)
        {
            $year = date('Y', strtotime($value));
            $today = date('Y', time());
            return ($today - $year) <= 60;
        });
        $this->app['validator']->extend('notEarlyThanToday', function ($attribute, $value, $parameters)
        {
            if (\DateTime::createFromFormat('Y-m-d', $value) !== FALSE) {
                $now = new \DateTime();
                $value = new \DateTime($value);
                return $now > $value;
            }
            return true;
        });
        $this->app['validator']->extend('avatarFile', function ($attribute, $value, $parameters)
        {
            if (is_object($value) && $value->isValid()) {
                $ext = $value->getClientMimeType();
                $ext = explode('/', $ext);
                $ext = isset($ext[1]) ? $ext[1] : $ext[0];
                return in_array($ext, $parameters);
            }
            return true;
        });
    }

    public function register()
    {
        //
    }
}