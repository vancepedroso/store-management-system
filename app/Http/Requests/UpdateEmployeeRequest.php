<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if(request()->isMethod('post'))
        {
            return [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'phone' => 'required|string|max:15',
                'email' => 'required|email|unique:employees,email,' . $this->route('employee'), // Ignore current employee
                'store' => 'required|string|max:255',
                // Add other rules as needed
            ];
        } else {
            return [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'phone' => 'required|string|max:15',
                'email' => 'required|email|unique:employees,email,' . $this->route('employee'), // Ignore current employee
                'store' => 'required|string|max:255',
                // Add other rules as needed
            ];
        }
        
    }
}
