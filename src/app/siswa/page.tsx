"use client";

import Header from "./components/layout/layout";
import RingkasanHariIni from "./components/dashboard/RingkasanHariIni";
import StatistikKehadiran from "./components/dashboard/StatistikKehadiran";
import { motion } from "framer-motion";
import LogsAktifitas from "./components/dashboard/LogsAktifitas";
import { Button } from "@/components/ui/button";
import { User, Calendar } from "lucide-react";
import Link from "next/link";
import { House } from "lucide-react";

export default function SiswaPage() {
  return (
    <Header>
      <motion.div
        className="space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="space-y-5">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800"><House className="w-7 h-7"/> Dashboard Siswa</h1>

          {/* Ringkasan Kehadiran Hari Ini */}
          <RingkasanHariIni />

          {/* Statistik Kehadiran */}
          <StatistikKehadiran />

          {/* Jadwal Hari Ini */}
          <LogsAktifitas />

          <div className="flex gap-4 mb-7">
            <Link href="/siswa/riwayat" className="flex-1">
              <Button className="w-full py-8 flex items-center justify-center gap-2">
                <Calendar /> Riwayat Kehadiran
              </Button>
            </Link>

            <Link href="/siswa/pengaturan" className="flex-1">
              <Button className="w-full py-8 flex items-center justify-center gap-2">
                <User /> Pengaturan Profile
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Header>
  );
}
