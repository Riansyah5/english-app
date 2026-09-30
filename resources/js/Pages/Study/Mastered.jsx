import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function StudyMastered({ auth, masteredCards, query = '' }) {
    const [search, setSearch]         = useState(query);
    const [removingId, setRemovingId] = useState(null);
    // Local list so un-mastering removes the row instantly without a page reload
    const [localCards, setLocalCards] = useState(masteredCards.data ?? []);

    const { current_page, last_page, links } = masteredCards;

    // Search: navigate via Inertia so the server filters the list
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/study/mastered', { q: search }, { preserveState: true, replace: true });
    };

    // Toggle mastered → removes the card from this list instantly
    const handleUnmaster = (cardId) => {
        setRemovingId(cardId);
        axios.post(`/study/${cardId}/mastered`)
            .then(() => {
                setLocalCards(prev => prev.filter(c => c.id !== cardId));
            })
            .catch(err => {
                console.error(err);
                alert('Gagal menghapus tanda hafal.');
            })
            .finally(() => setRemovingId(null));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kata Sudah Hafal" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* ── Header ── */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Link
                                    href="/home"
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </Link>
                                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Kata Sudah Hafal
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                                    {masteredCards.total} kata
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                Kata-kata ini tidak akan muncul di Daily Review. Klik{' '}
                                <span className="font-semibold text-rose-500">Hapus Tanda</span>{' '}
                                untuk memasukkannya kembali.
                            </p>
                        </div>

                        <Link
                            href="/study/practice?source=all"
                            className="shrink-0 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition whitespace-nowrap"
                        >
                            Latihan Bebas →
                        </Link>
                    </div>

                    {/* ── Search Bar ── */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Cari kata atau terjemahan..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 dark:focus:ring-emerald-500/40 transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-2xl transition shadow-sm"
                        >
                            Cari
                        </button>
                        {query && (
                            <Link
                                href="/study/mastered"
                                className="px-4 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                            >
                                Reset
                            </Link>
                        )}
                    </form>

                    {/* ── Empty State ── */}
                    {localCards.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-10 text-center shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-emerald-400 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                                {query ? 'Tidak ada hasil untuk pencarian ini.' : 'Belum ada kata yang ditandai hafal.'}
                            </h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
                                {query
                                    ? 'Coba kata kunci yang berbeda.'
                                    : 'Tandai kata di Daily Review dengan tombol "Sudah Hafal" untuk menyimpannya di sini.'}
                            </p>
                            {!query && (
                                <Link
                                    href="/study"
                                    className="inline-block mt-5 px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] rounded-full shadow-sm hover:opacity-90 transition"
                                >
                                    Mulai Daily Review
                                </Link>
                            )}
                        </div>
                    ) : (
                        /* ── Table ── */
                        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden transition-colors">

                            {/* Table Header */}
                            <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                <div className="col-span-1">#</div>
                                <div className="col-span-4">Kata</div>
                                <div className="col-span-4">Terjemahan</div>
                                <div className="col-span-2">Tipe</div>
                                <div className="col-span-1 text-right">Aksi</div>
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {localCards.map((card, idx) => {
                                    const item  = card.study_item;
                                    const rowNo = (current_page - 1) * 30 + idx + 1;

                                    return (
                                        <div key={card.id} className="group px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                                            {/* Desktop row */}
                                            <div className="hidden sm:grid grid-cols-12 gap-3 items-center">
                                                <div className="col-span-1 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                                                    {rowNo}
                                                </div>
                                                <div className="col-span-4 min-w-0">
                                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                                        {item?.content ?? '—'}
                                                    </p>
                                                    {item?.level && (
                                                        <span className="text-[10px] font-semibold text-slate-400 uppercase">
                                                            {item.level}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-span-4 min-w-0">
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                                                        {item?.translation ?? '—'}
                                                    </p>
                                                </div>
                                                <div className="col-span-2">
                                                    {item?.type && (
                                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-600 uppercase">
                                                            {item.type.replace('_', ' ')}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-span-1 flex justify-end">
                                                    <UnmasterButton cardId={card.id} removingId={removingId} onUnmaster={handleUnmaster} />
                                                </div>
                                            </div>

                                            {/* Mobile card */}
                                            <div className="flex sm:hidden items-center justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                                        {item?.content ?? '—'}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                        {item?.translation ?? '—'}
                                                    </p>
                                                </div>
                                                <UnmasterButton cardId={card.id} removingId={removingId} onUnmaster={handleUnmaster} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── Pagination ── */}
                    {last_page > 1 && (
                        <div className="flex justify-center gap-1.5 flex-wrap">
                            {links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition ${
                                            link.active
                                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-3.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 bg-white dark:bg-slate-800 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* ── Small reusable button component ── */
function UnmasterButton({ cardId, removingId, onUnmaster }) {
    const isLoading = removingId === cardId;
    return (
        <button
            onClick={() => onUnmaster(cardId)}
            disabled={isLoading}
            title="Hapus tanda hafal — kata akan kembali ke Daily Review"
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/30 transition disabled:opacity-40 shrink-0"
        >
            {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            )}
        </button>
    );
}
