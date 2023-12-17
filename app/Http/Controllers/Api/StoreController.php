<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // Fix the namespace for the base controller
use Illuminate\Http\Request;
use App\Http\Models\Store; // Correct namespace for the Store model

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
        return response()->json(['store' => $store], 201);
    }

    public function update(Request $request, Store $store)
    {
        // Update a specific store
        $store->update($request->all());
        return response()->json(['store' => $store]);
    }

    public function destroy(Store $store)
    {
        // Delete a specific store
        $store->delete();
        return response()->json(null, 204);
    }
}
