import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import axios from "axios";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";

export default function StudyItemCreate({ auth }) {
    const [importing, setImporting] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const downloadTemplate = () => {
        const ws = XLSX.utils.json_to_sheet([
            {
                content: "Apple",
                type: "word",
                level: "A1",
                translation: "Apel",
                example_sentence: "I ate a red apple.",
                example_translation: "Saya makan apel merah.",
                notes: "Kata benda dasar",
            },
            {
                content: "Make up your mind",
                type: "idiom",
                level: "B2",
                translation: "Buat keputusan",
                example_sentence: "You need to make up your mind soon.",
                example_translation: "Kamu harus segera mengambil keputusan.",
                notes: "Sering dipakai dalam percakapan informal",
            },
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template Materi");
        XLSX.writeFile(wb, "Template_Import_Materi.xlsx");
        setDropdownOpen(false);
    };

    const handleImportExcel = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImporting(true);
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                const mappedData = data
                    .map((row) => ({
                        content:
                            row.content || row.Content || row.CONTENT || "",
                        type: row.type || row.Type || row.TYPE || "word",
                        level: row.level || row.Level || row.LEVEL || "",
                        translation:
                            row.translation ||
                            row.Translation ||
                            row.TRANSLATION ||
                            "",
                        example_sentence:
                            row.example_sentence ||
                            row.Example_Sentence ||
                            row["Example Sentence"] ||
                            "",
                        example_translation:
                            row.example_translation ||
                            row.Example_Translation ||
                            row["Example Translation"] ||
                            "",
                        notes: row.notes || row.Notes || row.NOTES || "",
                    }))
                    .filter((item) => item.content && item.translation);

                if (mappedData.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Data Kosong',
                        text: 'Tidak ada data valid yang bisa diimpor. Pastikan format kolom Excel sesuai.',
                        confirmButtonColor: '#0d9488'
                    });
                    setImporting(false);
                    return;
                }

                const chunkSize = 100;
                const totalChunks = Math.ceil(mappedData.length / chunkSize);
                let totalAdded = 0;
                let totalSkipped = 0;

                Swal.fire({
                    title: 'Mengimpor Data',
                    html: `Memproses data...<br>Progres: 0 / ${mappedData.length} baris`,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const processChunks = async () => {
                    try {
                        for (let i = 0; i < totalChunks; i++) {
                            const chunk = mappedData.slice(i * chunkSize, (i + 1) * chunkSize);
                            const response = await axios.post('/admin/study-items/import', {
                                items: chunk
                            }, {
                                headers: { 'Accept': 'application/json' }
                            });

                            if (response.data.success) {
                                totalAdded += response.data.added;
                                totalSkipped += response.data.skipped;
                            }

                            const currentProcessed = Math.min((i + 1) * chunkSize, mappedData.length);
                            Swal.update({
                                html: `Memproses data...<br>Progres: ${currentProcessed} / ${mappedData.length} baris`
                            });
                        }

                        setImporting(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Selesai!',
                            text: `Berhasil menambahkan ${totalAdded} materi baru. ${totalSkipped} materi dilewati (duplikat).`,
                            confirmButtonColor: '#0d9488'
                        }).then(() => {
                            router.visit('/admin/study-items');
                        });
                    } catch (err) {
                        setImporting(false);
                        
                        // Ekstrak pesan error asli dari backend (Laravel)
                        let errorMessage = err.response?.data?.message || err.message || 'Terjadi kesalahan tidak dikenal saat mengimpor data.';
                        
                        // Jika ada detail validasi dari Laravel, kita bisa tambahkan
                        if (err.response?.data?.errors) {
                            const firstErrorKey = Object.keys(err.response.data.errors)[0];
                            errorMessage += `\nDetail: ${err.response.data.errors[firstErrorKey][0]}`;
                        }

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: 'Gagal mengimpor data.' + '<br><br>' + errorMessage,
                            confirmButtonColor: '#0d9488'
                        });
                        console.error(err);
                    }
                };

                processChunks();
            } catch (error) {
                setImporting(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Gagal membaca file Excel. Pastikan format file benar.',
                    confirmButtonColor: '#0d9488'
                });
            }
        };
        reader.readAsBinaryString(file);
    };

    const { data, setData, post, processing, errors } = useForm({
        content: "",
        type: "word",
        level: "",
        translation: "",
        example_sentence: "",
        example_translation: "",
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/study-items");
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Materi Baru" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-3xl mx-auto space-y-7">
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between gap-3">
                        {/* Kiri: Tombol Kembali + Judul & Badge */}
                        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
                            <Link
                                href="/admin/study-items"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all shrink-0 active:scale-95"
                                title="Kembali ke Bank Materi"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </Link>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <h1 className="text-base sm:text-2xl font-extrabold tracking-tight text-slate-900 truncate">
                                        Tambah Materi 📝
                                    </h1>
                                    <span className="shrink-0 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 whitespace-nowrap">
                                        Form Entri
                                    </span>
                                </div>
                                <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 truncate hidden xs:block">
                                    Masukkan kosakata, frasa, atau aturan
                                    grammar baru.
                                </p>
                            </div>
                        </div>

                        {/* Kanan: Dropdown Import & Tombol Batal */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-[#fcbf49] text-[#ff822d] hover:bg-[#fff9f2] font-bold text-[11px] sm:text-xs rounded-xl sm:rounded-2xl shadow-xs transition flex items-center gap-1.5 sm:gap-2 whitespace-nowrap active:scale-95"
                                >
                                    <i className="bi bi-file-earmark-excel-fill text-xs sm:text-sm"></i>
                                    <span className="hidden xs:inline">
                                        Import
                                    </span>
                                    <span className="hidden sm:inline">
                                        Excel
                                    </span>
                                    <i
                                        className={`bi bi-chevron-down text-[9px] sm:text-[10px] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                                    ></i>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-1 z-30 overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={downloadTemplate}
                                            className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition flex items-center gap-2"
                                        >
                                            <i className="bi bi-download text-[#0d9488] text-sm"></i>
                                            <span className="truncate">
                                                Download Template
                                            </span>
                                        </button>
                                        <div className="h-px bg-slate-100 my-1 mx-2"></div>
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls, .csv"
                                            className="hidden"
                                            id="excel-upload"
                                            onChange={(e) => {
                                                setDropdownOpen(false);
                                                handleImportExcel(e);
                                            }}
                                        />
                                        <label
                                            htmlFor="excel-upload"
                                            className={`w-full cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition flex items-center gap-2 ${importing ? "opacity-50 pointer-events-none" : ""}`}
                                        >
                                            {importing ? (
                                                <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#ff822d] border-t-transparent shrink-0"></span>
                                            ) : (
                                                <i className="bi bi-upload text-[#ff822d] text-sm shrink-0"></i>
                                            )}
                                            <span className="truncate">
                                                Upload File Excel
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/admin/study-items"
                                className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-2xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Input Rows: Content & Type */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-6">
                                    <label
                                        htmlFor="content"
                                        className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2"
                                    >
                                        Teks (Bahasa Inggris){" "}
                                        <span className="text-[#ff822d]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="content"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                        placeholder="Contoh: Make up your mind"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.content
                                                ? "border-rose-400 bg-rose-50/30"
                                                : "border-slate-200"
                                        } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                        required
                                        autoFocus
                                    />
                                    {errors.content && (
                                        <p className="text-rose-500 text-xs font-semibold mt-1.5">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-3">
                                    <label
                                        htmlFor="type"
                                        className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2"
                                    >
                                        Tipe Materi{" "}
                                        <span className="text-[#ff822d]">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.type
                                                ? "border-rose-400 bg-rose-50/30"
                                                : "border-slate-200"
                                        } text-slate-800 shadow-2xs`}
                                        required
                                    >
                                        <option value="word">
                                            Word (Kata)
                                        </option>
                                        <option value="phrase">
                                            Phrase (Frasa)
                                        </option>
                                        <option value="idiom">Idiom</option>
                                        <option value="grammar_rule">
                                            Grammar Rule
                                        </option>
                                        <option value="speaking_prompt">
                                            Speaking Prompt
                                        </option>
                                    </select>
                                    {errors.type && (
                                        <p className="text-rose-500 text-xs font-semibold mt-1.5">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-3">
                                    <label
                                        htmlFor="level"
                                        className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2"
                                    >
                                        Level <span className="font-medium normal-case text-slate-400">(Opsional)</span>
                                    </label>
                                    <select
                                        id="level"
                                        value={data.level}
                                        onChange={(e) =>
                                            setData("level", e.target.value)
                                        }
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.level
                                                ? "border-rose-400 bg-rose-50/30"
                                                : "border-slate-200"
                                        } text-slate-800 shadow-2xs`}
                                    >
                                        <option value="">Semua Level</option>
                                        <option value="A1">A1 (Beginner)</option>
                                        <option value="A2">A2 (Elementary)</option>
                                        <option value="B1">B1 (Intermediate)</option>
                                        <option value="B2">B2 (Upper Intermediate)</option>
                                        <option value="C1">C1 (Advanced)</option>
                                        <option value="C2">C2 (Mastery)</option>
                                    </select>
                                    {errors.level && (
                                        <p className="text-rose-500 text-xs font-semibold mt-1.5">
                                            {errors.level}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Translation Input */}
                            <div>
                                <label
                                    htmlFor="translation"
                                    className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2"
                                >
                                    Terjemahan (Bahasa Indonesia){" "}
                                    <span className="text-[#ff822d]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="translation"
                                    value={data.translation}
                                    onChange={(e) =>
                                        setData("translation", e.target.value)
                                    }
                                    placeholder="Contoh: Buatlah keputusan / Putuskanlah"
                                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                        errors.translation
                                            ? "border-rose-400 bg-rose-50/30"
                                            : "border-slate-200"
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                    required
                                />
                                {errors.translation && (
                                    <p className="text-rose-500 text-xs font-semibold mt-1.5">
                                        {errors.translation}
                                    </p>
                                )}
                            </div>

                            {/* Example Sentence Input */}
                            <div>
                                <label
                                    htmlFor="example_sentence"
                                    className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2"
                                >
                                    Contoh Kalimat{" "}
                                    <span className="font-medium normal-case text-slate-400">
                                        (Opsional)
                                    </span>
                                </label>
                                <textarea
                                    id="example_sentence"
                                    value={data.example_sentence}
                                    onChange={(e) =>
                                        setData(
                                            "example_sentence",
                                            e.target.value,
                                        )
                                    }
                                    rows="2"
                                    placeholder="Contoh: You need to make up your mind before the deadline."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.example_sentence
                                            ? "border-rose-400 bg-rose-50/30"
                                            : "border-slate-200"
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs mb-4`}
                                />

                                <label
                                    htmlFor="example_translation"
                                    className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2"
                                >
                                    Terjemahan Contoh Kalimat{" "}
                                    <span className="font-medium normal-case text-slate-400">
                                        (Opsional)
                                    </span>
                                </label>
                                <textarea
                                    id="example_translation"
                                    value={data.example_translation}
                                    onChange={(e) =>
                                        setData(
                                            "example_translation",
                                            e.target.value,
                                        )
                                    }
                                    rows="2"
                                    placeholder="Contoh: Kamu harus membuat keputusan sebelum tenggat waktu."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.example_translation
                                            ? "border-rose-400 bg-rose-50/30"
                                            : "border-slate-200"
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                />

                                {/* Info Banner */}
                                <div className="mt-2 p-3 bg-[#60f2ce]/15 rounded-2xl border border-[#60f2ce]/40 flex gap-2.5 items-start text-xs text-[#0d9488]">
                                    <i className="bi bi-lightbulb-fill text-sm shrink-0"></i>
                                    <span className="font-medium">
                                        Sangat disarankan mengisi contoh kalimat
                                        agar siswa dapat memahami konteks
                                        penggunaan nyata materi.
                                    </span>
                                </div>
                                {errors.example_sentence && (
                                    <p className="text-rose-500 text-xs font-semibold mt-1.5">
                                        {errors.example_sentence}
                                    </p>
                                )}
                            </div>

                            {/* Additional Notes Input */}
                            <div>
                                <label
                                    htmlFor="notes"
                                    className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2"
                                >
                                    Catatan Tambahan{" "}
                                    <span className="font-medium normal-case text-slate-400">
                                        (Opsional)
                                    </span>
                                </label>
                                <textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    rows="2"
                                    placeholder="Contoh: Sangat umum digunakan dalam percakapan informal sehari-hari."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.notes
                                            ? "border-rose-400 bg-rose-50/30"
                                            : "border-slate-200"
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                />
                                {errors.notes && (
                                    <p className="text-rose-500 text-xs font-semibold mt-1.5">
                                        {errors.notes}
                                    </p>
                                )}
                            </div>

                            {/* Actions Bar */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <Link
                                    href="/admin/study-items"
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition shadow-2xs"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all ${
                                        processing
                                            ? "opacity-70 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {processing ? (
                                        <>
                                            <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent"></span>
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-save2-fill text-xs"></i>
                                            <span>Simpan Materi</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
