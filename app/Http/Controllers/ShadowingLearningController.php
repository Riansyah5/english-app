<?php

namespace App\Http\Controllers;

use App\Models\ShadowingTopic;
use Illuminate\Http\Request;

class ShadowingLearningController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Tampilkan semua topik yang sudah diterbitkan
        $topics = ShadowingTopic::where('is_published', true)
            ->withCount('lines')
            ->latest()
            ->get();

        return view('shadowing.index', compact('topics'));
    }

    public function show($slug)
    {
        // Muat topik beserta baris dialognya
        $topic = ShadowingTopic::where('slug', $slug)
            ->where('is_published', true)
            ->with('lines')
            ->firstOrFail();

        return view('shadowing.show', compact('topic'));
    }
}