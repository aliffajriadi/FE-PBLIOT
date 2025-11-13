"use client";

import Header from "./components/layout/layout";
import RingkasanHariIni from "./components/dashboard/RingkasanHariIni";
import JadwalHariIni from "./components/dashboard/JadwalHariIni";
import StatistikKehadiran from "./components/dashboard/StatistikKehadiran";

export default function SiswaPage() {
  return (
    <Header>
      <div className="p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Siswa</h1>

        {/* Ringkasan Kehadiran Hari Ini */}
        <RingkasanHariIni />

        {/* Jadwal Hari Ini */}
        <JadwalHariIni />

        {/* Statistik Kehadiran */}
        <StatistikKehadiran />
      </div>
    </Header>
  );
}
