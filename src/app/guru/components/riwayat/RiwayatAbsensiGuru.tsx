"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import TableAbsensi from "./TableAbsensi";
import { useKelasAjar } from "@/lib/hooks/useClass";

interface KelasAjar {
  id: number;
  masuk: string | null;  // Biasanya ISO string dari backend
  keluar: string | null; // Biasanya ISO string dari backend
  nama?: string;         // Nama ruangan atau kelas
}

export default function RiwayatAbsensiGuru() {
  const { data: kelasAjar, isLoading, isError } = useKelasAjar();

  // State untuk filter
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");

  const historyData = useMemo(() => {
    if (!kelasAjar || !Array.isArray(kelasAjar)) return [];

    return kelasAjar.map((item: KelasAjar) => {
      const dateMasuk = item.masuk ? new Date(item.masuk) : null;
      const dateKeluar = item.keluar ? new Date(item.keluar) : null;

      const tglCantik = dateMasuk 
        ? dateMasuk.toLocaleDateString('id-ID', { 
            day: '2-digit', month: 'short', year: 'numeric' 
          }) 
        : "-";

      const jamMasuk = dateMasuk 
        ? dateMasuk.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
        : "-";
      
      const jamKeluar = dateKeluar 
        ? dateKeluar.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
        : "-";

      let totalSesi = "-";
      if (dateMasuk && dateKeluar) {
        const diffInMins = Math.floor((dateKeluar.getTime() - dateMasuk.getTime()) / (1000 * 60));
        totalSesi = diffInMins >= 60 
          ? `${Math.floor(diffInMins / 60)}j ${diffInMins % 60}m` 
          : `${diffInMins}m`;
      }

      return {
        id: item.id,
        tanggal: tglCantik,
        ruangan: item.nama || "Tanpa Nama",
        masuk: jamMasuk,
        keluar: jamKeluar,
        totalSesi: totalSesi,
      };
    });
  }, [kelasAjar]);

  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      const matchNama = item.ruangan.toLowerCase().includes(nama.toLowerCase());
      const matchTanggal = item.tanggal.includes(tanggal);
      return matchNama && matchTanggal;
    });
  }, [historyData, nama, tanggal]);

  if (isLoading) return <div className="p-10 text-center animate-pulse text-gray-500">Memuat data absensi...</div>;
  if (isError) return <div className="p-10 text-center text-red-500 font-semibold">Gagal mengambil data dari server.</div>;

  return (
    <motion.div
      className="space-y-6 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Riwayat Absensi
        </h1>
        <p className="text-gray-500">Data kehadiran pengajaran Anda.</p>
      </header>

      {/* --- BAGIAN FILTER (Baru ditambahkan) --- */}
      <div className="flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex-1">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-1 block">Cari Ruangan</label>
          <input 
            type="text"
            placeholder="Contoh: Lab Komputer..."
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-1 block">Filter Tanggal</label>
          <input 
            type="text"
            placeholder="Contoh: 24 Des"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>
      </div>
      {/* -------------------------------------- */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredData.length > 0 ? (
          <TableAbsensi data={filteredData} />
        ) : (
          <div className="p-10 text-center text-gray-400">Data tidak ditemukan.</div>
        )}
      </div>
    </motion.div>
  );
}