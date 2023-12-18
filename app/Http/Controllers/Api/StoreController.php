<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // Fix the namespace for the base controller
use Illuminate\Http\Request;
use App\Http\Models\Store; // Correct namespace for the Store model
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    public function index()
    {
        // Retrieve all stores
        $stores = Store::all();
        return response()->json(['stores' => $stores]);
    }

    public function show(Store $store)
    {
        // Retrieve a specific store
        return response()->json(['store' => $store]);
    }

    public function store(Request $request)
    {
        // Create a new store
        $store = Store::create($request->all());
        return response()->json(['status' => 1, 'message' => 'Successfully created'], 200);
    }

    public function update(Request $request, $id)
    {
        // Find the store by ID
        $store = Store::find($id);

        if (!$store) {
            return response()->json(['message' => 'Store not found'], 404);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            // Add other validation rules for other fields
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'message' => $validator->errors()], 422);
        }

        // Use the fill method for better control
        $store->fill($request->all());
        $updateResult = $store->save();

        if ($updateResult) {
            return response()->json(['status' => 1, 'message' => 'Successfully edited'], 200);
        } else {
            return response()->json(['status' => 0, 'message' => 'Failed to edit Store'], 500);
        }
    }


    public function destroy($id)
    {
        $store = Store::find($id);

        if (!$store) {
            return response()->json(['message' => 'Store not found'], 404);
        }

        $store->delete();

        return response()->json(['message' => 'Store deleted successfully'], 200);

    }
}
