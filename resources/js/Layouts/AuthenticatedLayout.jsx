import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function AuthenticatedLayout({ user, children }) {
    const { url } = usePage();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const [mobileAdminOpen, setMobileAdminOpen] = useState(false);

    const profileMenuRef = useRef(null);
    const adminMenuRef = useRef(null);

    // Menutup dropdown saat klik di luar area menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
            if (
                adminMenuRef.current &&
                !adminMenuRef.current.contains(event.target)
            ) {
                setAdminDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentUser = user || {};
    const userInitial = currentUser?.name
        ? currentUser.name.charAt(0).toUpperCase()
        : "U";

    // Item navigasi desktop & mobile
    const navLinks = [
        {
            name: "Home",
            href: "/home",
            icon: "bi-house-door-fill",
            match: (p) => p === "/home" || p === "/",
        },
        {
            name: "Flashcard",
            href: "/study",
            icon: "bi-card-text",
            match: (p) => p.startsWith("/study"),
        },
        {
            name: "Buku",
            href: "/lessons",
            icon: "bi-journal-bookmark-fill",
            match: (p) => p.startsWith("/lessons"),
        },
        {
            name: "Video",
            href: "/video-learning",
            icon: "bi-play-circle-fill",
            match: (p) => p.startsWith("/video-learning"),
        },
        {
            name: "Shadowing",
            href: "/shadowing",
            icon: "bi-mic-fill",
            match: (p) => p.startsWith("/shadowing"),
        },
        {
            name: "CBT",
            href: "/exams",
            icon: "bi-pencil-square",
            match: (p) => p.startsWith("/exams"),
        },
    ];

    return (
        <div className="min-h-screen bg-[#fafcfb] text-slate-800 font-sans antialiased selection:bg-[#60f2ce]/40 selection:text-slate-900">
            {/* Top Navigation Bar (Header Ringkas di Mobile, Lengkap di Desktop) */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 gap-3">
                        {/* Left Side: Back Button & Logo */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            {url !== "/home" && url !== "/" && (
                                <button
                                    onClick={() => window.history.back()}
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all shrink-0 active:scale-95"
                                    title="Kembali"
                                >
                                    <i className="bi bi-arrow-left text-lg"></i>
                                </button>
                            )}

                            {/* Brand Logo */}
                            <Link
                                href="/home"
                                className="flex items-center gap-2.5 group shrink-0"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-lg shadow-sm shadow-[#ff822d]/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col whitespace-nowrap">
                                    <span className="font-black text-base tracking-tight text-slate-900 leading-tight">
                                        English
                                        <span className="text-[#ff822d]">
                                            App
                                        </span>
                                    </span>
                                    <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider">
                                        Active Learning
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav Items (Hanya tampil di XL ke atas) */}
                            <div className="hidden xl:flex items-center gap-0.5 2xl:gap-1 ml-1 2xl:ml-2 shrink-0">
                                {navLinks.map((item) => {
                                    const isActive = item.match(url);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`px-2.5 2xl:px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                                                isActive
                                                    ? "bg-slate-900 text-white shadow-xs"
                                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}

                                {/* Admin Menu Dropdown (Desktop) */}
                                {currentUser?.is_admin && (
                                    <div
                                        className="relative shrink-0 ml-1"
                                        ref={adminMenuRef}
                                    >
                                        <button
                                            onClick={() =>
                                                setAdminDropdownOpen(
                                                    !adminDropdownOpen,
                                                )
                                            }
                                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                                                url.startsWith("/admin")
                                                    ? "bg-[#ff822d] text-white shadow-xs"
                                                    : "text-[#c2410c] bg-[#ff822d]/10 hover:bg-[#ff822d]/20 border border-[#ff822d]/25"
                                            }`}
                                        >
                                            <span>Admin Panel</span>
                                            <svg
                                                className={`w-3.5 h-3.5 transition-transform duration-200 ${adminDropdownOpen ? "rotate-180" : ""}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {adminDropdownOpen && (
                                            <div className="absolute top-12 left-0 w-56 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Materi & Kursus
                                                </div>
                                                <Link
                                                    href="/admin/study-items"
                                                    onClick={() =>
                                                        setAdminDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#60f2ce]/20 hover:text-[#0d9488] rounded-2xl transition-colors whitespace-nowrap"
                                                >
                                                    <i className="bi bi-card-text text-sm"></i>
                                                    <span>Bank Flashcard</span>
                                                </Link>
                                                <Link
                                                    href="/admin/lesson-categories"
                                                    onClick={() =>
                                                        setAdminDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#60f2ce]/20 hover:text-[#0d9488] rounded-2xl transition-colors whitespace-nowrap"
                                                >
                                                    <i className="bi bi-bookmark text-sm"></i>
                                                    <span>Kategori Buku</span>
                                                </Link>
                                                <Link
                                                    href="/admin/lessons"
                                                    onClick={() =>
                                                        setAdminDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#60f2ce]/20 hover:text-[#0d9488] rounded-2xl transition-colors whitespace-nowrap"
                                                >
                                                    <i className="bi bi-journal-text text-sm"></i>
                                                    <span>Tulis Bab Buku</span>
                                                </Link>
                                                <div className="border-t border-slate-100 my-1.5"></div>
                                                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Media & Evaluasi
                                                </div>
                                                <Link
                                                    href="/admin/video-folders"
                                                    onClick={() =>
                                                        setAdminDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#fcbf49]/20 hover:text-[#b45309] rounded-2xl transition-colors whitespace-nowrap"
                                                >
                                                    <i className="bi bi-folder-fill text-sm"></i>
                                                    <span>Folder Video</span>
                                                </Link>
                                                <Link
                                                    href="/admin/videos"
                                                    onClick={() =>
                                                        setAdminDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#fcbf49]/20 hover:text-[#b45309] rounded-2xl transition-colors whitespace-nowrap"
                                                >
                                                    <i className="bi bi-film text-sm"></i>
                                                    <span>Kelola Video</span>
                                                </Link>
                                                <Link
                                                    href="/admin/shadowing"
                                                    onClick={() =>
                                                        setAdminDropdownOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#ff822d]/20 hover:text-[#c2410c] rounded-2xl transition-colors whitespace-nowrap"
                                                >
                                                    <i className="bi bi-mic-fill text-sm"></i>
                                                    <span>
                                                        Naskah Shadowing
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side: Quick Admin (Mobile) & User Profile */}
                        <div className="flex items-center gap-2 shrink-0 ml-auto">
                            {/* Tombol Cepat Admin Khusus Layar Mobile */}
                            {currentUser?.is_admin && (
                                <button
                                    onClick={() =>
                                        setMobileAdminOpen(!mobileAdminOpen)
                                    }
                                    className="xl:hidden w-9 h-9 rounded-full bg-[#ff822d]/10 text-[#c2410c] border border-[#ff822d]/30 flex items-center justify-center text-sm font-bold active:scale-95"
                                    title="Menu Admin"
                                >
                                    <i className="bi bi-gear-wide-connected"></i>
                                </button>
                            )}

                            {/* Pro Learner Chip (Desktop Lebar) */}
                            <span className="hidden 2xl:inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 items-center gap-1.5 whitespace-nowrap select-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse"></span>
                                Pro Learner
                            </span>

                            {/* User Profile Dropdown Button */}
                            <div
                                className="relative shrink-0"
                                ref={profileMenuRef}
                            >
                                <button
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    className="flex items-center gap-2 p-1.5 pr-2.5 sm:pr-3 rounded-full bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors focus:outline-none active:scale-95"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                                        {userInitial}
                                    </div>
                                    <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[100px] truncate">
                                        {currentUser?.name || "User"}
                                    </span>
                                    <svg
                                        className="w-3.5 h-3.5 text-slate-400 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* User Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="px-3.5 py-2.5 border-b border-slate-100">
                                            <p className="text-xs font-bold text-slate-900 truncate">
                                                {currentUser?.name}
                                            </p>
                                            <p className="text-[11px] text-slate-400 truncate">
                                                {currentUser?.email}
                                            </p>
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors whitespace-nowrap"
                                            >
                                                <i className="bi bi-person-gear text-sm text-slate-400"></i>
                                                <span>Pengaturan Akun</span>
                                            </Link>

                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors text-left whitespace-nowrap"
                                            >
                                                <i className="bi bi-box-arrow-right text-sm"></i>
                                                <span>Keluar (Log Out)</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popover Admin Khusus Mobile saat icon gear diklik */}
                {mobileAdminOpen && currentUser?.is_admin && (
                    <div className="xl:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-3 animate-in slide-in-from-top-2 duration-150">
                        <div className="text-[10px] font-bold text-[#c2410c] uppercase tracking-wider mb-2">
                            Menu Admin Panel
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                            <Link
                                href="/admin/study-items"
                                onClick={() => setMobileAdminOpen(false)}
                                className="px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 rounded-xl truncate"
                            >
                                Bank Flashcard
                            </Link>
                            <Link
                                href="/admin/lesson-categories"
                                onClick={() => setMobileAdminOpen(false)}
                                className="px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 rounded-xl truncate"
                            >
                                Kategori Buku
                            </Link>
                            <Link
                                href="/admin/lessons"
                                onClick={() => setMobileAdminOpen(false)}
                                className="px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 rounded-xl truncate"
                            >
                                Tulis Bab
                            </Link>
                            <Link
                                href="/admin/video-folders"
                                onClick={() => setMobileAdminOpen(false)}
                                className="px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 rounded-xl truncate"
                            >
                                Folder Video
                            </Link>
                            <Link
                                href="/admin/videos"
                                onClick={() => setMobileAdminOpen(false)}
                                className="px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 rounded-xl truncate"
                            >
                                Kelola Video
                            </Link>
                            <Link
                                href="/admin/shadowing"
                                onClick={() => setMobileAdminOpen(false)}
                                className="px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 rounded-xl truncate"
                            >
                                Naskah Shadowing
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content: Diberi pb-24 agar konten bawah tidak tertutup Bottom Bar di mobile */}
            <main className="pb-24 xl:pb-6">{children}</main>

            {/* ========================================================= */}
            {/* MOBILE & PWA BOTTOM NAVIGATION BAR (SMOOTH SLIDING PILL)  */}
            {/* ========================================================= */}
            <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-x border-slate-200/70 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] select-none">
                <div className="flex items-center justify-around max-w-lg mx-auto">
                    {navLinks.map((item) => {
                        const isActive = item.match(url);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative flex flex-col items-center justify-center flex-1 py-1.5 px-0.5 rounded-2xl active:scale-95 transition-transform"
                            >
                                {/* Background Pill yang meluncur mulus */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabPill"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                        className="absolute inset-0 bg-[#ff822d]/10 rounded-2xl border border-[#ff822d]/25"
                                    />
                                )}

                                {/* Ikon & Titik Indikator */}
                                <div className="relative z-10 flex items-center justify-center w-7 h-7">
                                    <i
                                        className={`bi ${item.icon} text-lg transition-colors duration-200 ${
                                            isActive
                                                ? "text-[#ff822d]"
                                                : "text-slate-400"
                                        }`}
                                    />
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeTabDot"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                            className="absolute -top-0.5 right-0 w-1.5 h-1.5 rounded-full bg-[#ff822d]"
                                        />
                                    )}
                                </div>

                                {/* Label Teks */}
                                <span
                                    className={`relative z-10 text-[10px] tracking-tight mt-0.5 transition-colors duration-200 ${
                                        isActive
                                            ? "text-slate-900 font-extrabold"
                                            : "text-slate-500 font-semibold"
                                    }`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
