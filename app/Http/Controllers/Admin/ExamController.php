<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\ExamQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index()
    {
        $exams = Exam::withCount('questions')->latest()->paginate(10);
        return Inertia::render('Admin/Exams/Index', [
            'exams' => $exams
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Exams/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
        ]);

        Exam::create($request->all());

        return redirect()->route('admin.exams.index')->with('success', 'Ujian berhasil ditambahkan.');
    }

    public function show($id)
    {
        $exam = Exam::with('questions')->findOrFail($id);
        return Inertia::render('Admin/Exams/Show', [
            'exam' => $exam
        ]);
    }

    public function edit($id)
    {
        $exam = Exam::findOrFail($id);
        return Inertia::render('Admin/Exams/Edit', [
            'exam' => $exam
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
        ]);

        $exam = Exam::findOrFail($id);
        $exam->update($request->all());

        return redirect()->route('admin.exams.index')->with('success', 'Ujian berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Exam::findOrFail($id)->delete();
        return redirect()->route('admin.exams.index')->with('success', 'Ujian berhasil dihapus.');
    }

    // Question Management
    public function storeQuestion(Request $request, $examId)
    {
        $request->validate([
            'question_text' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
        ]);

        $exam = Exam::findOrFail($examId);
        $exam->questions()->create([
            'question_text' => $request->question_text,
            'options' => array_values(array_filter($request->options, fn($val) => !is_null($val) && $val !== '')),
            'correct_answer' => $request->correct_answer,
            'explanation' => $request->explanation,
        ]);

        return back()->with('success', 'Soal berhasil ditambahkan.');
    }

    public function destroyQuestion($examId, $questionId)
    {
        ExamQuestion::where('exam_id', $examId)->where('id', $questionId)->delete();
        return back()->with('success', 'Soal berhasil dihapus.');
    }
}

