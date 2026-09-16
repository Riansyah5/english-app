import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ExamIndex({ auth, exams = { data: [], links: [] } }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus ujian ini secara permanen?')) {
            router.delete(`/admin/exams/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Ujian" />
            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-7xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Kelola Ujian 📝
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    CBT Admin
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Buat dan kelola paket modul evaluasi ujian (CBT) untuk para siswa.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link 
                                href="/home" 
                                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/admin/exams/create"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                            >
                                <i className="bi bi-plus-circle-fill text-sm"></i>
                                <span>Tambah Ujian Baru</span>
                            </Link>
                        </div>
                    </div>

                    {/* Flash Notification */}
                    {flash?.success && (
                        <div className="flex items-center gap-2.5 p-4 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 text-[#0d9488] dark:text-[#60f2ce] rounded-2xl text-xs font-bold shadow-xs">
                            <i className="bi bi-check-circle-fill text-base"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Table Container Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="bg-[#fafcfb] dark:bg-slate-800/60 text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800">
                                        <th className="px-6 py-4 w-2/5">Judul Ujian</th>
                                        <th className="px-6 py-4 text-center w-1/6">Total Soal</th>
                                        <th className="px-6 py-4 text-center w-1/6">Durasi Waktu</th>
                                        <th className="px-6 py-4 text-right w-1/5">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {exams.data && exams.data.length > 0 ? (
                                        exams.data.map((exam) => (
                                            <tr key={exam.id} className="hover:bg-[#fafcfb] dark:hover:bg-slate-850 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-lg shadow-sm shadow-[#ff822d]/25 shrink-0">
                                                            <i className="bi bi-file-earmark-text"></i>
                                                        </div>
                                                        <div className="truncate max-w-xs md:max-w-md">
                                                            <span className="font-extrabold text-sm text-slate-900 dark:text-white block leading-tight truncate">
                                                                {exam.title}
                                                            </span>
                                                            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mt-0.5 truncate">
                                                                {exam.description || 'Tidak ada deskripsi khusus'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center min-w-[2.5rem] px-3 py-1 rounded-full bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 font-bold text-xs font-mono">
                                                        {exam.questions_count || 0} Soal
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs font-mono">
                                                        <i className="bi bi-stopwatch text-[#ff822d]"></i>
                                                        {exam.duration_minutes} Menit
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <Link
                                                            href={`/admin/exams/${exam.id}`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] hover:bg-[#60f2ce]/20 hover:border-[#60f2ce] transition-all shadow-2xs"
                                                            title="Kelola Butir Soal"
                                                        >
                                                            <i className="bi bi-list-task"></i>
                                                        </Link>
                                                        <Link
                                                            href={`/admin/exams/${exam.id}/edit`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-2xs"
                                                            title="Edit Paket Ujian"
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(exam.id)}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/30 transition-all shadow-2xs"
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
                                            <td colSpan="4" className="px-6 py-14 text-center">
                                                <div className="w-14 h-14 mx-auto rounded-3xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#ff822d] flex items-center justify-center text-2xl mb-3">
                                                    <i className="bi bi-ui-checks"></i>
                                                </div>
                                                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Belum Ada Paket Ujian</h3>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">Silakan tambahkan paket evaluasi CBT baru untuk mulai menguji pemahaman siswa.</p>
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
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                Menampilkan paket ujian pada halaman saat ini
                            </span>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {exams.links.map((link, i) => (
                                    <Link 
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all border ${
                                            link.active 
                                                ? 'bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 border-slate-900 dark:border-[#60f2ce] shadow-xs' 
                                                : !link.url 
                                                    ? 'text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 cursor-not-allowed pointer-events-none' 
                                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
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