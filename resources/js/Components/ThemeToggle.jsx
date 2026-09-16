// resources/js/Components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isCurrentDark = document.documentElement.classList.contains('dark') ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(isCurrentDark);
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#60f2ce] bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-all duration-200 border border-transparent dark:border-slate-700/60 shadow-xs focus:outline-none"
        >
            {isDark ? (
                <i className="bi bi-sun-fill text-amber-300 text-base leading-none block"></i>
            ) : (
                <i className="bi bi-moon-stars-fill text-slate-600 text-base leading-none block"></i>
            )}
        </button>
    );
}