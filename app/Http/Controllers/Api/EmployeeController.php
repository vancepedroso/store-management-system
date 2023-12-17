<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // Correct namespace for base controller
use App\Http\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateEmployeeRequest;
//use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Resources\EmployeeResources;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::all();
        return response()->json(['employees' => $employees], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         // Since you are using a form request, you don't need to call validated() explicitly
         $data = $request->all();

         $employee = Employee::create($data);
 
         if ($employee) {
             // Employee successfully created
             return response()->json(['message' => 'Employee created successfully'], 201);
         } else {
             // Failed to create employee
             return response()->json(['message' => 'Failed to create employee'], 500);
         }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new EmployeeResource($users);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmployeeRequest $request, $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
    
        $data = $request->validated();
    
        // Attempt to update the employee
        $updateResult = $employee->update($data);
    
        if ($updateResult) {
            // Employee successfully updated
            return response()->json(['message' => 'Employee updated successfully', 'data' => $employee], 200);
        } else {
            // Failed to update employee
            return response()->json(['message' => 'Failed to update employee'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
    
        $employee->delete();
    
        return response()->json(['message' => 'Employee deleted successfully'], 200);
    
    }
}
