<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert a user with the specified details
        DB::table('users')->insert([
            'name' => 'vance',
            'email' => 'vanceliefpedroso@gmail.com',
            'password' => Hash::make('password@2023'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
