import React, { useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

export default function ShadowingIndex({ auth, topics = [] }) {
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Hitung total dialog keseluruhan
    const totalDialogues = useMemo(() => {
        return topics.reduce((acc, topic) => acc + (topic.lines_count || 0), 0);
    }, [topics]);

    // Hitung jumlah topik per tingkat kesulitan untuk badge filter
    const levelCounts = useMemo(() => {
        return {
            all: topics.length,
            beginner: topics.filter(
                (t) => t.level?.toLowerCase() === "beginner",
            ).length,
            intermediate: topics.filter(
                (t) => t.level?.toLowerCase() === "intermediate",
            ).length,
            advanced: topics.filter(
                (t) => t.level?.toLowerCase() === "advanced",
            ).length,
        };
    }, [topics]);

    // Filter topik berdasarkan level & teks pencarian
    const filteredTopics = useMemo(() => {
        return topics.filter((topic) => {
            const matchesLevel =
                selectedLevel === "all" ||
                topic.level?.toLowerCase() === selectedLevel;
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                !searchQuery ||
                topic.title?.toLowerCase().includes(query) ||
                topic.description?.toLowerCase().includes(query);
            return matchesLevel && matchesSearch;
        });
    }, [topics, selectedLevel, searchQuery]);

    const getLevelBadge = (level) => {
        switch (level?.toLowerCase()) {
            case "beginner":
                return "bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border-[#60f2ce]/50 dark:border-[#60f2ce]/30";
            case "intermediate":
                return "bg-[#fefc7c]/80 dark:bg-amber-400/20 text-[#854d0e] dark:text-amber-300 border-[#fcbf49]/50 dark:border-amber-400/30";
            case "advanced":
                return "bg-[#ff822d]/15 dark:bg-[#ff822d]/20 text-[#c2410c] dark:text-[#ff822d] border-[#ff822d]/40 dark:border-[#ff822d]/30";
            default:
                return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Latihan Shadowing" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-7xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                        {/* Kiri: Judul, Badge Kategori, & Subjudul */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                                    Latihan Shadowing 🗣️
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 whitespace-nowrap">
                                    Speaking & Fluency
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
                                Tirukan intonasi, ritme, dan pelafalan native speaker secara bertahap.
                            </p>
                        </div>

                        {/* Kanan: Ringkasan Metrik & Tombol Dashboard */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-[#ff822d] animate-pulse"></span>
                                <span>
                                    Tersedia:{" "}
                                    <strong className="font-bold text-slate-900 dark:text-white">
                                        {topics.length} Topik
                                    </strong>
                                    <span className="hidden xs:inline text-slate-400 dark:text-slate-500 font-normal">
                                        {" "}
                                        ({totalDialogues} Dialog)
                                    </span>
                                </span>
                            </div>
                            <Link
                                href="/home"
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 active:scale-95 transition whitespace-nowrap"
                            >
                                Ke Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Feature Highlight Card */}
                    <div className="rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-[#ff822d] via-[#fcbf49] to-[#60f2ce] text-slate-950 shadow-[0_12px_32px_-8px_rgba(255,130,45,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="absolute top-0 right-0 w-44 h-44 bg-[#fefc7c]/40 rounded-full blur-2xl pointer-events-none" />
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/50 backdrop-blur-md text-slate-950 mb-2.5 border border-white/40">
                                Metode Belajar Efektif 🎧
                            </span>
                            <h2 className="text-xl font-black leading-snug tracking-tight text-slate-950 mb-1">
                                Teknik Shadowing: Dengarkan, Ulangi, & Sesuaikan
                            </h2>
                            <p className="text-slate-900/90 text-xs font-medium leading-relaxed">
                                Latih memori motorik mulut dan intonasi alami dengan berbicara bersamaan dengan audio penutur asli.
                            </p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <span className="px-4 py-2 rounded-2xl bg-white/90 text-slate-950 text-xs font-bold shadow-sm inline-block">
                                Rekomendasi: 15 Menit / Hari
                            </span>
                        </div>
                    </div>

                    {/* Filter Tabs & Search Bar Controls */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/90 p-3 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors">
                        {/* Difficulty Level Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                            {[
                                {
                                    key: "all",
                                    label: "Semua Level",
                                    count: levelCounts.all,
                                },
                                {
                                    key: "beginner",
                                    label: "Beginner",
                                    count: levelCounts.beginner,
                                },
                                {
                                    key: "intermediate",
                                    label: "Intermediate",
                                    count: levelCounts.intermediate,
                                },
                                {
                                    key: "advanced",
                                    label: "Advanced",
                                    count: levelCounts.advanced,
                                },
                            ].map((tab) => {
                                const isActive = selectedLevel === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setSelectedLevel(tab.key)}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                                            isActive
                                                ? "bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 shadow-xs"
                                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                    >
                                        <span>{tab.label}</span>
                                        <span
                                            className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                                                isActive
                                                    ? "bg-white/20 dark:bg-slate-950/20 text-white dark:text-slate-950"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                            }`}
                                        >
                                            {tab.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input Box */}
                        <div className="relative w-full sm:w-64 shrink-0">
                            <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs"></i>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari topik shadowing..."
                                className="w-full pl-9 pr-8 py-2 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-[#fafcfb] dark:bg-slate-800/80 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all shadow-2xs"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                                >
                                    <i className="bi bi-x-circle-fill"></i>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTopics.length > 0 ? (
                            filteredTopics.map((topic) => {
                                const badgeStyle = getLevelBadge(topic.level);

                                return (
                                    <div
                                        key={topic.id}
                                        className="group bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div>
                                            {/* Meta Header */}
                                            <div className="flex justify-between items-center mb-4">
                                                <span
                                                    className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border ${badgeStyle}`}
                                                >
                                                    {topic.level || "General"}
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-400 text-xs font-semibold flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-100 dark:border-slate-700/60">
                                                    <i className="bi bi-chat-text text-[#ff822d]"></i>
                                                    <span>
                                                        {topic.lines_count || 0} Dialog
                                                    </span>
                                                </span>
                                            </div>

                                            {/* Title & Description */}
                                            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-[#ff822d] dark:group-hover:text-[#ff822d] transition-colors leading-snug mb-2">
                                                {topic.title}
                                            </h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6 font-medium">
                                                {topic.description || "Tidak ada deskripsi topik."}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                            <Link
                                                href={`/shadowing/${topic.slug}`}
                                                className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 border border-transparent dark:border-slate-700"
                                            >
                                                <span>Mulai Latihan</span>
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
                                );
                            })
                        ) : (
                            /* Empty Filter Result State */
                            <div className="col-span-full p-12 text-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/60 flex flex-col items-center justify-center min-h-[300px]">
                                <div className="w-14 h-14 rounded-2xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#ff822d] flex items-center justify-center text-2xl mb-3">
                                    <i className="bi bi-search"></i>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                                    Tidak Ada Topik yang Cocok
                                </h4>
                                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mb-4">
                                    {searchQuery
                                        ? `Tidak ditemukan materi dengan kata kunci "${searchQuery}" pada level yang dipilih.`
                                        : "Belum ada materi untuk level ini."}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedLevel("all");
                                        setSearchQuery("");
                                    }}
                                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition border dark:border-slate-700"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}