'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RingkasanKehadiran from "../components/riwayat/RingkasanKehadiran";
import FilterBulan from "../components/riwayat/FilterBulan";
import TableAbsensiSiswa from "../components/riwayat/TableAbsensiSiswa";
import Header from "../components/layout/layout";
import { useStatistikAbsensiSiswa } from "@/lib/hooks/useUser";
import { useLaporanAbsensiSiswa } from "@/lib/hooks/useLaporan";

export default function Page() {
  const [periode, setPeriode] = useState(1); // default bulan / filter
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  
 

  // Ambil data ringkasan statistik
  const { data: statistik } = useStatistikAbsensiSiswa();

  // Ambil data laporan absensi
  const { data: laporan, refetch, isLoading } = useLaporanAbsensiSiswa(page, limit, periode);

  // refetch data jika periode, page, atau limit berubah
  useEffect(() => {
    refetch();
  }, [periode, page, limit, refetch]);

  // Handler filter bulan
  const handleFilter = (value: number) => {
    setPeriode(value);
    setPage(1); // reset page saat filter berubah
  };

  // Hitung totalPages dari total data yang dikembalikan backend
  const totalPages = laporan?.totalPages || 1;
  const totalData = laporan?.total ? laporan.total.tepatWaktu + laporan.total.terlambat : 0;

  return (
    <Header>
      <motion.div
        className="space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Riwayat Kehadiran
        </h1>

        {/* Ringkasan Kehadiran */}
        <RingkasanKehadiran data={statistik} />

        {/* Filter Bulan */}
        <FilterBulan onFilter={handleFilter} />

        {/* Tabel Absensi dengan pagination */}
        <TableAbsensiSiswa
          data={laporan || { absensi: [] }}
          page={page}
          totalPages={totalPages}
          limit={limit}
          totalData={totalData}
          isLoading={isLoading}
          onPageChange={(newPage) => setPage(newPage)}
          periode={periode}
        />
      </motion.div>
    </Header>
  );
}
