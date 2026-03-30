<?php

use App\Http\Controllers\Admin\StudyItemController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Controllers\Admin\VideoFolderController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudyController;
use App\Http\Controllers\VideoLearningController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::middleware(['auth'])->group(function () {
    // Rute untuk halaman belajar
    Route::get('/study', [StudyController::class, 'index'])->name('study.index');
    Route::get('/study/practice', [StudyController::class, 'practice'])->name('study.practice');

    // Rute Video Learning (User)
    Route::get('/video-learning', [VideoLearningController::class, 'index'])->name('videos.user.index');
    Route::get('/video-learning/{id}', [VideoLearningController::class, 'show'])->name('videos.user.show');
    Route::post('/video-learning/save-vocab', [VideoLearningController::class, 'saveVocab'])->name('videos.user.save-vocab');

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
    
    // Rute Modul Video Learning
    Route::resource('video-folders', VideoFolderController::class);
    Route::resource('videos', VideoController::class);
    
});
