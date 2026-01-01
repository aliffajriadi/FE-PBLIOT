"use client"

import AdminLayout from "../component/layout/Layout";
import { useState } from "react";
import { baseurl } from "@/lib/api/laporan";

export default function LaporanPage() {
    const [periode, setPeriode] = useState("1");

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-800">Laporan Absensi</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Generate laporan absensi siswa berdasarkan periode.
                        </p>
                    </div>

                    {/* Form Laporan */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            {/* Dropdown Periode */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Pilih Periode Laporan
                                </label>
                                <select 
                                    value={periode}
                                    onChange={(e) => setPeriode(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                >
                                    <option value="6">Harian</option>
                                    <option value="1">Mingguan</option>
                                    <option value="2">Bulanan</option>
                                    <option value="3">3 Bulan</option>
                                    <option value="4">Semesteran</option>
                                    <option value="5">Tahunan</option>
                                </select>
                            </div>

                            {/* Tombol Generate */}
                            <div>
                                <a
                                    href={`${baseurl}/laporan/admin-laporan?periode=${periode}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                                >
                                    Generate Laporan
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}