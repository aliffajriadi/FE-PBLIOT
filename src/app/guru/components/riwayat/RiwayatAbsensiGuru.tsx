"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import FilterAbsensi from "./FilterAbsensi";
import TableAbsensi from "./TableAbsensi";

// Data dummy, bisa diganti dengan props atau fetch data
const historyData = [
  { tanggal: "06/10/2025", nama: "Muhammad Yuki", kelas: "XII A", jamMasuk: "07:58", status: "Hadir" },
  { tanggal: "06/10/2025", nama: "Muhammad Raihan", kelas: "XII A", jamMasuk: "08:15", status: "Terlambat" },
  { tanggal: "06/10/2025", nama: "Alif Fajriadi", kelas: "XII A", jamMasuk: "-", status: "Tidak Masuk" },
  { tanggal: "05/10/2025", nama: "Adi Nugraha", kelas: "XII A", jamMasuk: "07:59", status: "Hadir" },
  { tanggal: "05/10/2025", nama: "Dian Permata", kelas: "X IPA 1", jamMasuk: "-", status: "Izin" },
  { tanggal: "04/10/2025", nama: "Fajar Ramadan", kelas: "X IPS 2", jamMasuk: "08:01", status: "Terlambat" },
  { tanggal: "04/10/2025", nama: "Gita Puspita", kelas: "X IPS 2", jamMasuk: "-", status: "Sakit" },
];

export default function RiwayatAbsensiGuru() {
  const [kelas, setKelas] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [filteredData, setFilteredData] = useState(historyData);

  const handleFilter = () => {
    let filtered = historyData;

    if (kelas) {
      filtered = filtered.filter((item) => item.kelas === kelas);
    }
    if (nama) {
      filtered = filtered.filter((item) =>
        item.nama.toLowerCase().includes(nama.toLowerCase())
      );
    }
    if (tanggal) {
      filtered = filtered.filter((item) => item.tanggal === tanggal);
    }

    setFilteredData(filtered);
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold tracking-tight text-gray-800">
        Riwayat Absensi
      </h1>

      <FilterAbsensi
        kelas={kelas}
        setKelas={setKelas}
        nama={nama}
        setNama={setNama}
        tanggal={tanggal}
        setTanggal={setTanggal}
        onFilter={handleFilter}
      />

      <TableAbsensi data={filteredData} />
    </motion.div>
  );
}
