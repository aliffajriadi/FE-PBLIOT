"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RingkasanKehadiran from "../components/riwayat/RingkasanKehadiran";
import FilterBulan from "../components/riwayat/FilterBulan";
import TableAbsensiSiswa from "../components/riwayat/TableAbsensiSiswa";
import Header from "../components/layout/Header";

// --- DATA DUMMY ---
const absensiData = [
  { tanggal: "06/10/2025", nama: "Muhammad Yuki", kelas: "XII A", jamMasuk: "07:58", status: "Hadir" },
  { tanggal: "05/10/2025", nama: "Muhammad Yuki", kelas: "XII A", jamMasuk: "08:10", status: "Terlambat" },
  { tanggal: "04/09/2025", nama: "Muhammad Yuki", kelas: "XII A", jamMasuk: "-", status: "Izin" },
  { tanggal: "03/09/2025", nama: "Muhammad Yuki", kelas: "XII A", jamMasuk: "07:59", status: "Hadir" },
  { tanggal: "02/08/2025", nama: "Muhammad Yuki", kelas: "XII A", jamMasuk: "-", status: "Sakit" },
];

export default function Page() {
  const [filteredMonth, setFilteredMonth] = useState<string>("");
  const [filteredData, setFilteredData] = useState(absensiData);

  const handleFilter = (bulan: string) => {
    setFilteredMonth(bulan);

    if (!bulan) {
      setFilteredData(absensiData);
      return;
    }

    // ambil angka bulan dari string bulan
    const monthNumber = new Date(`${bulan} 1, 2025`).getMonth() + 1;
    const formattedMonth = monthNumber.toString().padStart(2, "0");

    // filter data berdasarkan bulan
    const newData = absensiData.filter((d) => d.tanggal.split("/")[1] === formattedMonth);
    setFilteredData(newData);
  };

  return (
    <Header>
        <motion.div
        className="space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        >
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">Riwayat Kehadiran</h1>

        <RingkasanKehadiran data={absensiData} />

        <FilterBulan onFilter={handleFilter} />

        <TableAbsensiSiswa data={filteredData} />
        </motion.div>
    </Header>
  );
}
