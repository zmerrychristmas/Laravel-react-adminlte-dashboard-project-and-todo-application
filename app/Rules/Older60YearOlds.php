<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Older60YearOlds implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $year = date('Y', strtotime($value));
        $today = date('Y', time());
        return ($today - $year) <= 60;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'We are expect with day have year no longer 60year with today';
    }
}
