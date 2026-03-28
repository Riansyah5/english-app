<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit()
    {
        $user = Auth::user();
        return view('profile.edit', compact('user'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'daily_goal' => 'required|integer|min:5|max:100', // Target tidak boleh terlalu sedikit atau berlebihan
        ]);

        /** @var User $user */
        $user = Auth::user();
        $user->update([
            'name' => $request->name,
            'daily_goal' => $request->daily_goal,
        ]);

        return redirect()->route('profile.edit')->with('success', 'Profil dan Target Belajar berhasil diperbarui!');
    }
}