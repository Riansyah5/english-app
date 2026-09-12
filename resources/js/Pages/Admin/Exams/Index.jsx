import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ExamIndex({ auth, exams = { data: [], links: [] } }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus paket ujian ini secara permanen beserta seluruh butir soalnya?')) {
            router.delete(`/admin/exams/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Ujian (CBT)" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-4 sm:p-6 md:p-8 font-sans">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                        {/* Kiri: Judul, Badge, & Subjudul */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 truncate">
                                    Kelola Evaluasi CBT 📝
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 whitespace-nowrap">
                                    Exam Engine
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 sm:line-clamp-none">
                                Buat paket tes berkala, susun butir soal pilihan ganda, dan atur batas durasi pengerjaan.
                            </p>
                        </div>

                        {/* Kanan: Tombol Dashboard & Tambah Ujian */}
                        <div className="flex items-center gap-2 shrink-0">
                            <Link 
                                href="/dashboard" 
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-xs hover:bg-slate-50 active:scale-95 transition whitespace-nowrap"
                            >
                                Dashboard
                            </Link>

                            <Link 
                                href="/admin/exams/create" 
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-[11px] sm:text-xs rounded-full shadow-sm shadow-[#fcbf49]/20 hover:opacity-95 active:scale-95 transition whitespace-nowrap"
                            >
                                <i className="bi bi-plus-circle-fill text-xs sm:text-sm"></i>
                                <span>Buat Ujian Baru</span>
                            </Link>
                        </div>
                    </div>

                    {/* Flash Notification */}
                    {flash?.success && (
                        <div className="flex items-center gap-2.5 p-3.5 sm:p-4 bg-[#60f2ce]/20 border border-[#60f2ce]/50 text-[#0d9488] rounded-2xl text-xs font-bold shadow-xs">
                            <i className="bi bi-check-circle-fill text-base shrink-0"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Table Container Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="bg-[#fafcfb] text-slate-400 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] border-b border-slate-100">
                                        <th className="px-5 sm:px-6 py-3.5 sm:py-4 w-2/5">Judul Paket Ujian</th>
                                        <th className="px-5 sm:px-6 py-3.5 sm:py-4 text-center w-1/6">Jumlah Soal</th>
                                        <th className="px-5 sm:px-6 py-3.5 sm:py-4 text-center w-1/6">Durasi Waktu</th>
                                        <th className="px-5 sm:px-6 py-3.5 sm:py-4 text-right w-1/4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {exams.data && exams.data.length > 0 ? (
                                        exams.data.map((exam) => (
                                            <tr key={exam.id} className="hover:bg-[#fafcfb] transition-colors group">
                                                {/* Judul & Deskripsi */}
                                                <td className="px-5 sm:px-6 py-3.5 sm:py-4">
                                                    <div className="flex items-center gap-3 sm:gap-3.5">
                                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-base sm:text-lg shadow-xs shadow-[#ff822d]/20 shrink-0">
                                                            <i className="bi bi-card-checklist"></i>
                                                        </div>
                                                        <div className="truncate max-w-xs md:max-w-md min-w-0">
                                                            <span className="font-extrabold text-xs sm:text-sm text-slate-900 block leading-tight truncate">
                                                                {exam.title}
                                                            </span>
                                                            <span className="text-[11px] font-medium text-slate-400 block truncate mt-0.5">
                                                                {exam.description || 'Tidak ada deskripsi ujian.'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Jumlah Soal Pill */}
                                                <td className="px-5 sm:px-6 py-3.5 sm:py-4 text-center">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 whitespace-nowrap">
                                                        <i className="bi bi-question-circle-fill text-[10px] sm:text-[11px]"></i>
                                                        <span>{exam.questions_count || 0} Butir Soal</span>
                                                    </span>
                                                </td>

                                                {/* Durasi Menit Pill */}
                                                <td className="px-5 sm:px-6 py-3.5 sm:py-4 text-center">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/80 whitespace-nowrap">
                                                        <i className="bi bi-clock-history text-[#ff822d]"></i>
                                                        <span>{exam.duration_minutes || 0} Menit</span>
                                                    </span>
                                                </td>

                                                {/* Aksi Controls */}
                                                <td className="px-5 sm:px-6 py-3.5 sm:py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <Link
                                                            href={`/admin/exams/${exam.id}`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-[#0d9488] hover:bg-[#60f2ce]/20 hover:border-[#60f2ce] active:scale-95 transition-all shadow-2xs"
                                                            title="Kelola Butir Soal"
                                                        >
                                                            <i className="bi bi-ui-checks"></i>
                                                        </Link>

                                                        <Link
                                                            href={`/admin/exams/${exam.id}/edit`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all shadow-2xs"
                                                            title="Edit Paket Ujian"
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(exam.id)}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-rose-500 hover:bg-rose-50 hover:border-rose-300 active:scale-95 transition-all shadow-2xs"
                                                            title="Hapus Ujian"
                                                        >
                                                            <i className="bi bi-trash3"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 sm:py-14 text-center">
                                                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-3xl bg-[#fcbf49]/20 text-[#ff822d] flex items-center justify-center text-xl sm:text-2xl mb-3">
                                                    <i className="bi bi-clipboard-x"></i>
                                                </div>
                                                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Belum Ada Paket Ujian</h3>
                                                <p className="text-xs text-slate-400">Silakan buat paket ujian baru untuk mulai mengadakan evaluasi kemampuan siswa.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Section */}
                    {exams.links && exams.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                            <span className="text-[11px] sm:text-xs text-slate-400">
                                Menampilkan paket ujian pada halaman saat ini
                            </span>
                            <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
                                {exams.links.map((link, i) => (
                                    <Link 
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-xl transition-all border ${
                                            link.active 
                                                ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                                                : !link.url 
                                                    ? 'text-slate-300 border-slate-100 bg-white cursor-not-allowed pointer-events-none' 
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}