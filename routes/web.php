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
use App\Http\Controllers\Admin\LessonCategoryController;
use App\Http\Controllers\Admin\LessonController;    
use App\Http\Controllers\LessonLearningController;    
use App\Http\Controllers\Admin\ShadowingController;
use App\Http\Controllers\ShadowingLearningController;



Route::get('/', function () {
    return \Inertia\Inertia::render('Welcome', [
        'auth' => [
            'user' => Auth::user()
        ]
    ]);
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::middleware(['auth'])->group(function () {
    // Rute untuk halaman belajar
    Route::get('/study', [StudyController::class, 'index'])->name('study.index');
    Route::get('/study/practice', [StudyController::class, 'practice'])->name('study.practice');
    Route::get('/study/listening', [StudyController::class, 'listening'])->name('study.listening');
    Route::get('/study/listening/session', [StudyController::class, 'listeningSession'])->name('study.listening.session');

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

    // Rute Materi Pelajaran (User)
    Route::get('/lessons', [LessonLearningController::class, 'index'])->name('lessons.user.index');
    Route::get('/lessons/{slug}', [LessonLearningController::class, 'show'])->name('lessons.user.show');
    Route::post('/lessons/{id}/complete', [LessonLearningController::class, 'markAsDone'])->name('lessons.user.complete');
    Route::post('/lessons/{id}/save-note', [LessonLearningController::class, 'saveNote'])->name('lessons.user.save-note');

    // Rute Modul Shadowing (Sisi Pengguna)
    Route::get('/shadowing', [ShadowingLearningController::class, 'index'])->name('shadowing.user.index');
    Route::get('/shadowing/{slug}', [ShadowingLearningController::class, 'show'])->name('shadowing.user.show');
});


// Rute khusus Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    
    // Rute CRUD Master Materi (Otomatis membuat rute index, create, store, destroy dll)
    Route::post('study-items/import', [StudyItemController::class, 'import'])->name('study-items.import');
    Route::resource('study-items', StudyItemController::class)->except(['show']);
    
    // Rute Modul Video Learning
    Route::resource('video-folders', VideoFolderController::class);
    Route::resource('videos', VideoController::class);

    // Rute Materi Pelajaran (Buku Digital)
    Route::resource('lesson-categories', LessonCategoryController::class);
    Route::resource('lessons', LessonController::class);


    // Admin: Modul Shadowing
    Route::resource('shadowing', ShadowingController::class);
    // Rute khusus untuk memanipulasi baris naskah
    Route::post('shadowing/{shadowing}/lines', [ShadowingController::class, 'storeLine'])->name('shadowing.lines.store');
    Route::delete('shadowing/lines/{line}', [ShadowingController::class, 'destroyLine'])->name('shadowing.lines.destroy');
    
    // Admin: Modul Exams
    Route::resource('exams', \App\Http\Controllers\Admin\ExamController::class);
    Route::post('exams/{exam}/questions', [\App\Http\Controllers\Admin\ExamController::class, 'storeQuestion'])->name('exams.questions.store');
    Route::delete('exams/{exam}/questions/{question}', [\App\Http\Controllers\Admin\ExamController::class, 'destroyQuestion'])->name('exams.questions.destroy');

});
