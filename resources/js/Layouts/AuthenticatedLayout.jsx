import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, children }) {
    const { url } = usePage();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

    const profileMenuRef = useRef(null);
    const adminMenuRef = useRef(null);

    // Menutup dropdown saat klik di luar area menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
                setAdminDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentUser = user || {};
    const userInitial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U';

    const navLinks = [
        { name: 'Dashboard', href: '/home', match: (p) => p === '/home' || p === '/' },
        { name: 'Flashcard', href: '/study', match: (p) => p.startsWith('/study') },
        { name: 'Buku Digital', href: '/lessons', match: (p) => p.startsWith('/lessons') },
        { name: 'Video Learning', href: '/video-learning', match: (p) => p.startsWith('/video-learning') },
        { name: 'Shadowing', href: '/shadowing', match: (p) => p.startsWith('/shadowing') },
        { name: 'Evaluasi (CBT)', href: '/exams', match: (p) => p.startsWith('/exams') },
    ];

    return (
        <div className="min-h-screen bg-[#fafcfb] text-slate-800 font-sans antialiased selection:bg-[#60f2ce]/40 selection:text-slate-900">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        
                        {/* Left Side: Logo & Main Navigation */}
                        <div className="flex items-center gap-6">
                            {/* Brand Logo */}
                            <Link href="/home" className="flex items-center gap-2.5 group">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-lg shadow-sm shadow-[#ff822d]/20 group-hover:scale-105 transition-transform duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-base tracking-tight text-slate-900 leading-tight">
                                        English<span className="text-[#ff822d]">App</span>
                                    </span>
                                    <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider">
                                        Active Learning
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav Items */}
                            <div className="hidden xl:flex items-center gap-1 ml-4">
                                {navLinks.map((item) => {
                                    const isActive = item.match(url);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-slate-900 text-white shadow-xs'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}

                                {/* Admin Menu Dropdown (Desktop) */}
                                {currentUser?.is_admin && (
                                    <div className="relative" ref={adminMenuRef}>
                                        <button
                                            onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                                                url.startsWith('/admin')
                                                    ? 'bg-[#ff822d] text-white shadow-xs'
                                                    : 'text-[#c2410c] bg-[#ff822d]/10 hover:bg-[#ff822d]/20 border border-[#ff822d]/25'
                                            }`}
                                        >
                                            <span>Admin Panel</span>
                                            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${adminDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {adminDropdownOpen && (
                                            <div className="absolute top-12 left-0 w-56 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Materi & Kursus
                                                </div>
                                                <Link 
                                                    href="/admin/study-items" 
                                                    onClick={() => setAdminDropdownOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#60f2ce]/20 hover:text-[#0d9488] rounded-2xl transition-colors"
                                                >
                                                    <i className="bi bi-card-text text-sm"></i>
                                                    <span>Bank Flashcard</span>
                                                </Link>
                                                <Link 
                                                    href="/admin/lesson-categories" 
                                                    onClick={() => setAdminDropdownOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#60f2ce]/20 hover:text-[#0d9488] rounded-2xl transition-colors"
                                                >
                                                    <i className="bi bi-bookmark text-sm"></i>
                                                    <span>Kategori Buku</span>
                                                </Link>
                                                <Link 
                                                    href="/admin/lessons" 
                                                    onClick={() => setAdminDropdownOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#60f2ce]/20 hover:text-[#0d9488] rounded-2xl transition-colors"
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
                                                    onClick={() => setAdminDropdownOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#fcbf49]/20 hover:text-[#b45309] rounded-2xl transition-colors"
                                                >
                                                    <i className="bi bi-folder-fill text-sm"></i>
                                                    <span>Folder Video</span>
                                                </Link>
                                                <Link 
                                                    href="/admin/videos" 
                                                    onClick={() => setAdminDropdownOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#fcbf49]/20 hover:text-[#b45309] rounded-2xl transition-colors"
                                                >
                                                    <i className="bi bi-film text-sm"></i>
                                                    <span>Kelola Video</span>
                                                </Link>
                                                <Link 
                                                    href="/admin/shadowing" 
                                                    onClick={() => setAdminDropdownOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#ff822d]/20 hover:text-[#c2410c] rounded-2xl transition-colors"
                                                >
                                                    <i className="bi bi-mic-fill text-sm"></i>
                                                    <span>Naskah Shadowing</span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side: User Profile & Actions */}
                        <div className="hidden sm:flex items-center gap-3">
                            {/* Pro Learner Chip */}
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse"></span>
                                Pro Learner
                            </span>

                            {/* User Profile Dropdown Button */}
                            <div className="relative" ref={profileMenuRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-xs shadow-xs">
                                        {userInitial}
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                                        {currentUser?.name || 'User'}
                                    </span>
                                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* User Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <div className="px-3.5 py-2.5 border-b border-slate-100">
                                            <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                                            <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors"
                                            >
                                                <i className="bi bi-person-gear text-sm text-slate-400"></i>
                                                <span>Pengaturan Target & Akun</span>
                                            </Link>

                                            <form method="POST" action="/logout">
                                                <input
                                                    type="hidden"
                                                    name="_token"
                                                    value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''}
                                                />
                                                <button
                                                    type="submit"
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors text-left"
                                                >
                                                    <i className="bi bi-box-arrow-right text-sm"></i>
                                                    <span>Keluar (Log Out)</span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hamburger Button for Mobile */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
                                aria-label="Toggle navigation menu"
                            >
                                <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Responsive Navigation Menu */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden border-b border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-150">
                        {/* Nav Links */}
                        <div className="space-y-1">
                            {navLinks.map((item) => {
                                const isActive = item.match(url);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                                            isActive
                                                ? 'bg-slate-900 text-white'
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span>{item.name}</span>
                                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#60f2ce]"></span>}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Admin Group (Mobile) */}
                        {currentUser?.is_admin && (
                            <div className="pt-2 border-t border-slate-100">
                                <div className="px-4 py-1 text-[10px] font-bold text-[#c2410c] uppercase tracking-wider">
                                    Admin Menu
                                </div>
                                <div className="grid grid-cols-2 gap-1 pt-1">
                                    <Link href="/admin/study-items" onClick={() => setShowingNavigationDropdown(false)} className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Bank Flashcard</Link>
                                    <Link href="/admin/lesson-categories" onClick={() => setShowingNavigationDropdown(false)} className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Kategori Buku</Link>
                                    <Link href="/admin/lessons" onClick={() => setShowingNavigationDropdown(false)} className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Tulis Bab</Link>
                                    <Link href="/admin/video-folders" onClick={() => setShowingNavigationDropdown(false)} className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Folder Video</Link>
                                    <Link href="/admin/videos" onClick={() => setShowingNavigationDropdown(false)} className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Kelola Video</Link>
                                    <Link href="/admin/shadowing" onClick={() => setShowingNavigationDropdown(false)} className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Naskah Shadowing</Link>
                                </div>
                            </div>
                        )}

                        {/* User Account Info (Mobile) */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-xs">
                                    {userInitial}
                                </div>
                                <div className="truncate max-w-[180px]">
                                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                                    <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
                                </div>
                            </div>

                            <form method="POST" action="/logout">
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''}
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                                >
                                    Log Out
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content Container */}
            <main>{children}</main>
        </div>
    );
}