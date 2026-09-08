import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'dark'; // default to dark
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f131a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <nav className="glass dark:glass-dark sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="flex items-center gap-2">
                                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                    <span className="font-bold text-lg tracking-tight">English-App</span>
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden space-x-6 sm:-my-px sm:ml-8 sm:flex">
                                <Link href="/home" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${window.location.pathname === '/home' ? 'border-blue-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                    Dashboard
                                </Link>
                                
                                <Link href="/study" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${window.location.pathname.startsWith('/study') ? 'border-blue-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                    Flashcard
                                </Link>

                                <Link href="/lessons" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${window.location.pathname.startsWith('/lessons') ? 'border-blue-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                    Buku Digital
                                </Link>

                                <Link href="/video-learning" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${window.location.pathname.startsWith('/video-learning') ? 'border-blue-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                    Video Learning
                                </Link>

                                <Link href="/shadowing" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${window.location.pathname.startsWith('/shadowing') ? 'border-blue-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                    Shadowing
                                </Link>

                                <Link href="/exams" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${window.location.pathname.startsWith('/exams') ? 'border-blue-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                    Evaluasi (CBT)
                                </Link>
                                
                                {user?.is_admin ? (
                                    <div className="relative flex items-center">
                                        <button
                                            onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                                            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-rose-500 hover:text-rose-600 transition duration-150 ease-in-out"
                                        >
                                            Admin Panel 🔒
                                            <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        
                                        {adminDropdownOpen && (
                                            <div className="absolute top-14 left-0 w-56 rounded-xl shadow-lg bg-white dark:bg-[#161b26] border border-slate-200 dark:border-slate-700/50 overflow-hidden z-50">
                                                <div className="py-1">
                                                    <Link href="/admin/study-items" className="block w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Materi Flashcard</Link>
                                                    <div className="border-t border-slate-200 dark:border-slate-700/50 my-1"></div>
                                                    <div className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Video Learning</div>
                                                    <Link href="/admin/video-folders" className="block w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Kelola Folder</Link>
                                                    <Link href="/admin/videos" className="block w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Kelola Video</Link>
                                                    <div className="border-t border-slate-200 dark:border-slate-700/50 my-1"></div>
                                                    <div className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Buku Digital</div>
                                                    <Link href="/admin/lesson-categories" className="block w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Kelola Kategori</Link>
                                                    <Link href="/admin/lessons" className="block w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Tulis Materi</Link>
                                                    <div className="border-t border-slate-200 dark:border-slate-700/50 my-1"></div>
                                                    <div className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Shadowing</div>
                                                    <Link href="/admin/shadowing" className="block w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Kelola Naskah</Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6 gap-2">
                            {/* Theme Toggler */}
                            <button
                                onClick={toggleTheme}
                                className="inline-flex items-center justify-center p-2 rounded-full text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none transition ease-in-out duration-150"
                                aria-label="Toggle Dark Mode"
                            >
                                {isDarkMode ? (
                                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 4.22a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.414l-.708-.707a1 1 0 010-1.415zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-4.22 4.22a1 1 0 010 1.415l-.707.708a1 1 0 01-1.415-1.414l.707-.708a1 1 0 011.415 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-4.22a1 1 0 01-1.415 0l-.708-.707a1 1 0 011.414-1.414l.708.707a1 1 0 010 1.415zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm4.22-4.22a1 1 0 010-1.415l.707-.708a1 1 0 011.415 1.414l-.707.708a1 1 0 01-1.415 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </button>

                            {/* Settings Dropdown */}
                            <div className="ml-3 relative">
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-slate-500 dark:text-slate-400 bg-transparent hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user?.name}
                                        <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-[#161b26] border border-slate-200 dark:border-slate-700/50 overflow-hidden z-50">
                                            <div className="py-1">
                                                <a href="/profile" className="block w-full px-4 py-2 text-left text-sm leading-5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-150 ease-in-out">
                                                    Profile
                                                </a>
                                                <form method="POST" action="/logout">
                                                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                                                    <button type="submit" className="block w-full px-4 py-2 text-left text-sm leading-5 text-rose-600 dark:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-150 ease-in-out">
                                                        Log Out
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/home" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${window.location.pathname === '/home' ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'}`}>
                            Dashboard
                        </Link>
                        <Link href="/study" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${window.location.pathname.startsWith('/study') ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'}`}>
                            Flashcard
                        </Link>
                        <Link href="/lessons" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${window.location.pathname.startsWith('/lessons') ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'}`}>
                            Buku Digital
                        </Link>
                        <Link href="/video-learning" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${window.location.pathname.startsWith('/video-learning') ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'}`}>
                            Video Learning
                        </Link>
                        <Link href="/shadowing" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${window.location.pathname.startsWith('/shadowing') ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'}`}>
                            Shadowing
                        </Link>
                        <Link href="/exams" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${window.location.pathname.startsWith('/exams') ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'}`}>
                            Evaluasi (CBT)
                        </Link>

                        {user?.is_admin ? (
                            <>
                                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">Admin Panel</div>
                                <Link href="/admin/study-items" className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Materi Flashcard</Link>
                                <Link href="/admin/video-folders" className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Folder Video</Link>
                                <Link href="/admin/videos" className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Kelola Video</Link>
                                <Link href="/admin/lesson-categories" className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Kategori Buku</Link>
                                <Link href="/admin/lessons" className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Tulis Materi</Link>
                                <Link href="/admin/shadowing" className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Naskah Shadowing</Link>
                            </>
                        ) : null}
                    </div>

                    <div className="pt-4 pb-1 border-t border-slate-200 dark:border-slate-700">
                        <div className="px-4">
                            <div className="font-medium text-base text-slate-800 dark:text-slate-200">{user?.name}</div>
                            <div className="font-medium text-sm text-slate-500">{user?.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <button
                                onClick={toggleTheme}
                                className="w-full text-left flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-150 ease-in-out"
                            >
                                {isDarkMode ? 'Tema Terang ☀️' : 'Tema Gelap 🌙'}
                            </button>

                            <form method="POST" action="/logout">
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                                <button type="submit" className="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-rose-600 dark:text-rose-500 hover:text-rose-800 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-150 ease-in-out">
                                    Log Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}

