import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

export default function ExamIndex({ auth, exams = [] }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Modul Evaluasi (CBT)" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Top Bar Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                        {/* Kiri: Judul, Badge, & Subjudul */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                                    Modul Evaluasi (CBT) 📝
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 whitespace-nowrap">
                                    Assessments
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
                                Uji pemahaman tata bahasa, kosakata, dan
                                struktur kalimat Anda secara terukur.
                            </p>
                        </div>

                        {/* Kanan: Pill Ringkasan & Tombol Dashboard */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-[#ff822d] animate-pulse"></span>
                                Tersedia:{" "}
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {exams.length} Paket Ujian
                                </span>
                            </div>
                            <Link
                                href="/home"
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 active:scale-95 transition whitespace-nowrap"
                            >
                                Ke Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Feature Card Banner */}
                    <div className="rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-[#ff822d] via-[#fcbf49] to-[#60f2ce] text-slate-950 shadow-[0_12px_32px_-8px_rgba(255,130,45,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="absolute top-0 right-0 w-44 h-44 bg-[#fefc7c]/40 rounded-full blur-2xl pointer-events-none" />
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/50 backdrop-blur-md text-slate-950 mb-2.5 border border-white/40">
                                Tips Evaluasi ⏱️
                            </span>
                            <h2 className="text-xl font-black leading-snug tracking-tight text-slate-950 mb-1">
                                Persiapkan Diri Sebelum Menekan Mulai
                            </h2>
                            <p className="text-slate-900/90 text-xs font-medium leading-relaxed">
                                Timer ujian akan langsung berjalan begitu sesi
                                dimulai. Pastikan koneksi internet stabil dan
                                cari tempat belajar yang kondusif.
                            </p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <span className="px-4 py-2 rounded-2xl bg-white/90 text-slate-950 text-xs font-bold shadow-sm inline-block">
                                Standar Waktu Nyata
                            </span>
                        </div>
                    </div>

                    {/* Grid Exams */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.length > 0 ? (
                            exams.map((exam) => (
                                <div
                                    key={exam.id}
                                    className="group bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div>
                                        {/* Icon Header */}
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-xl shadow-sm shadow-[#ff822d]/25">
                                                <i className="bi bi-file-earmark-text"></i>
                                            </div>
                                            <span className="flex items-center gap-1 px-3 py-1 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] rounded-full text-xs font-bold border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                                <i className="bi bi-stopwatch text-xs"></i>
                                                {exam.duration_minutes} Menit
                                            </span>
                                        </div>

                                        {/* Exam Info */}
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#ff822d] dark:group-hover:text-[#ff822d] transition-colors leading-snug mb-2">
                                            {exam.title}
                                        </h3>

                                        <div className="bg-[#fafcfb] dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
                                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 font-medium">
                                                {exam.description ||
                                                    "Tidak ada deskripsi khusus untuk paket ujian ini."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                        <Link
                                            href={`/exams/${exam.id}`}
                                            className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 border border-transparent dark:border-slate-700"
                                        >
                                            <span>Mulai Ujian</span>
                                            <svg
                                                className="w-3.5 h-3.5 text-[#60f2ce]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            /* Empty State */
                            <div className="col-span-full p-12 text-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/60 flex flex-col items-center justify-center min-h-[320px]">
                                <div className="w-16 h-16 rounded-3xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#ff822d] flex items-center justify-center text-3xl mb-3">
                                    <i className="bi bi-inbox"></i>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                    Belum Ada Paket Ujian
                                </h4>
                                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm">
                                    Belum ada paket CBT yang dijadwalkan atau
                                    tersedia untuk Anda saat ini.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}