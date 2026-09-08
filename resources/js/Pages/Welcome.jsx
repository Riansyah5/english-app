import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-slate-50 dark:bg-[#0f131a] selection:bg-blue-500 selection:text-white flex flex-col">
                <div className="relative w-full max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center">
                    <header className="absolute top-0 right-0 p-6 flex justify-end w-full">
                        {auth?.user ? (
                            <Link
                                href="/home"
                                className="font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                                >
                                    Log in
                                </a>

                                <a
                                    href="/register"
                                    className="ml-4 font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                                >
                                    Register
                                </a>
                            </>
                        )}
                    </header>

                    <main className="mt-16 text-center">
                        <div className="flex justify-center mb-8">
                            <svg className="w-24 h-24 text-blue-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                            English<span className="text-blue-500">App</span>
                        </h1>
                        <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
                            The modern way to master English through interactive flashcards, video lessons, and shadowing practice.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            {auth?.user ? (
                                <Link
                                    href="/home"
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <a
                                    href="/register"
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
                                >
                                    Get Started
                                </a>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

