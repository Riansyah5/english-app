<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\ExamAttempt;
use Illuminate\Support\Facades\Auth;

class ExamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Menampilkan daftar ujian yang tersedia
    public function index()
    {
        $exams = Exam::all();
        return view('exams.index', compact('exams'));
    }

    // Menampilkan lembar soal CBT
    public function show($id)
    {
        // Ambil ujian beserta soalnya (diacak urutannya agar seperti CBT asli)
        $exam = Exam::with(['questions' => function($query) {
            $query->inRandomOrder();
        }])->findOrFail($id);

        return view('exams.show', compact('exam'));
    }

    // Memproses jawaban dan menghitung skor
    public function submit(Request $request, $id)
    {
        $exam = Exam::with('questions')->findOrFail($id);
        $answers = $request->input('answers', []); // array jawaban dari user
        
        $correctCount = 0;
        $totalQuestions = $exam->questions->count();

        // Proses koreksi
        foreach ($exam->questions as $question) {
            if (isset($answers[$question->id]) && $answers[$question->id] === $question->correct_answer) {
                $correctCount++;
            }
        }

        // Hitung nilai akhir (skala 100)
        $score = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * 100) : 0;

        // Simpan riwayat ujian
        ExamAttempt::create([
            'user_id' => Auth::id(),
            'exam_id' => $exam->id,
            'score' => $score,
            'total_correct' => $correctCount,
            'total_questions' => $totalQuestions,
        ]);

        return redirect()->route('exams.result', $id)->with('success', 'Ujian selesai!');
    }

    // Menampilkan hasil ujian
    public function result($id)
    {
        $exam = Exam::findOrFail($id);
        
        // Ambil attempt terakhir dari user ini
        $attempt = ExamAttempt::where('user_id', Auth::id())
                    ->where('exam_id', $id)
                    ->latest()
                    ->firstOrFail();

        return view('exams.result', compact('exam', 'attempt'));
    }
}