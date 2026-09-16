import React from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";

export default function StudyItemIndex({
    auth,
    items = { data: [], links: [] },
}) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Hapus materi ini secara permanen dari database?")) {
            router.delete(`/admin/study-items/${id}`);
        }
    };

    // Styling badge tipe materi sesuai palet Dashboard
    const getTypeBadgeStyle = (type) => {
        const normalized = type?.toLowerCase() || "";
        if (normalized.includes("word") || normalized.includes("vocab")) {
            return "bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border-[#60f2ce]/50 dark:border-[#60f2ce]/30";
        }
        if (normalized.includes("phrase") || normalized.includes("idiom")) {
            return "bg-[#fefc7c]/80 dark:bg-amber-400/20 text-[#854d0e] dark:text-amber-300 border-[#fcbf49]/50 dark:border-amber-400/30";
        }
        if (normalized.includes("grammar") || normalized.includes("sentence")) {
            return "bg-[#ff822d]/15 dark:bg-[#ff822d]/20 text-[#c2410c] dark:text-[#ff822d] border-[#ff822d]/40 dark:border-[#ff822d]/30";
        }
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Bank Materi" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-7xl mx-auto space-y-7">
                    {/* Top Bar Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                        {/* Kiri: Judul, Badge Kategori, & Subjudul */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                                    Kelola Bank Materi 📚
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 whitespace-nowrap">
                                    Database Admin
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
                                Manajemen bank data kosakata, frasa, dan materi
                                tata bahasa untuk modul pembelajaran.
                            </p>
                        </div>

                        {/* Kanan: Tombol Dashboard & Tambah Materi */}
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href="/home"
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 active:scale-95 transition whitespace-nowrap"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/admin/study-items/create"
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-[11px] sm:text-xs rounded-full shadow-sm shadow-[#fcbf49]/20 hover:opacity-95 active:scale-95 transition whitespace-nowrap"
                            >
                                <i className="bi bi-plus-circle-fill text-xs sm:text-sm"></i>
                                <span>Tambah Materi</span>
                            </Link>
                        </div>
                    </div>

                    {/* Flash Success Notification */}
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
                                        <th className="px-6 py-4 w-12 text-center">
                                            No.
                                        </th>
                                        <th className="px-6 py-4 w-1/4">
                                            Teks (Inggris)
                                        </th>
                                        <th className="px-6 py-4 w-1/6">
                                            Tipe Materi
                                        </th>
                                        <th className="px-6 py-4 w-1/12">
                                            Level
                                        </th>
                                        <th className="px-6 py-4 w-1/4">
                                            Terjemahan (Indonesia)
                                        </th>
                                        <th className="px-6 py-4 w-1/6 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {items.data && items.data.length > 0 ? (
                                        items.data.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-[#fafcfb] dark:hover:bg-slate-850 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-center font-bold text-slate-400 dark:text-slate-500">
                                                    {(items.from || 1) + index}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                                                        {item.content}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-lg border ${getTypeBadgeStyle(item.type)}`}
                                                    >
                                                        {item.type
                                                            ? item.type.replace(
                                                                  "_",
                                                                  " ",
                                                              )
                                                            : "GENERAL"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.level ? (
                                                        <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                            {item.level}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-300 dark:text-slate-600">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">
                                                    {item.translation}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <Link
                                                            href={`/admin/study-items/${item.id}/edit`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] hover:bg-[#60f2ce]/20 hover:border-[#60f2ce] transition-all shadow-2xs"
                                                            title="Edit Materi"
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/30 transition-all shadow-2xs"
                                                            title="Hapus Materi"
                                                        >
                                                            <i className="bi bi-trash3"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-14 text-center"
                                            >
                                                <div className="w-14 h-14 mx-auto rounded-3xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#ff822d] flex items-center justify-center text-2xl mb-3">
                                                    <i className="bi bi-inbox"></i>
                                                </div>
                                                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                                                    Belum Ada Data Materi
                                                </h3>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                                    Silakan tambahkan kosakata
                                                    atau materi baru ke dalam
                                                    bank materi.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Section */}
                    {items.links && items.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                Menampilkan data pada halaman saat ini
                            </span>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {items.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || "#"}
                                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all border ${
                                            link.active
                                                ? "bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 border-slate-900 dark:border-[#60f2ce] shadow-xs"
                                                : !link.url
                                                  ? "text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 cursor-not-allowed pointer-events-none"
                                                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
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