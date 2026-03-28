<?php

use App\Http\Controllers\ExamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudyController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\StudyItemController;

Route::get('/', function () {
    return redirect()->route('login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::middleware(['auth'])->group(function () {
    // Rute untuk halaman belajar
    Route::get('/study', [StudyController::class, 'index'])->name('study.index');

    // Rute untuk memproses jawaban flashcard
    Route::post('/study/{flashcardId}/review', [StudyController::class, 'review'])->name('study.review');

    // Rute untuk Modul Ujian CBT
    Route::get('/exams', [ExamController::class, 'index'])->name('exams.index');
    Route::get('/exams/{id}', [ExamController::class, 'show'])->name('exams.show');
    Route::post('/exams/{id}/submit', [ExamController::class, 'submit'])->name('exams.submit');
    Route::get('/exams/{id}/result', [ExamController::class, 'result'])->name('exams.result');

    // Rute untuk Profil dan Target Belajar
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
});


// Rute khusus Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    
    // Rute CRUD Master Materi (Otomatis membuat rute index, create, store, destroy dll)
    Route::resource('study-items', StudyItemController::class)->except(['show']);
    
});
