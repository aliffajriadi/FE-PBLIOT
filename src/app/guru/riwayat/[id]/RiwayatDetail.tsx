"use client";

import Link from "next/link";
import { ArrowLeft, Users, AlertCircle, UserCircle, LogIn, LogOut } from "lucide-react";
import { useSiswaByKelasId } from "@/lib/hooks/useClass";
import { useState } from "react";
import Image from "next/image";

interface Student {
  id: number;
  name: string;
  nisn?: string;
  photo?: string;
  rfid?: {
    rfid: string;
  };
}

interface AbsensiData {
  id: number;
  masuk: string;
  keluar: string;
  user: Student;
}

interface RiwayatDetailProps {
  id: number;
}

export default function RiwayatDetail({ id }: RiwayatDetailProps) {
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const { data: siswaByKelasId, isLoading, isError } = useSiswaByKelasId(id, page, limit);
  
  const absensiData = siswaByKelasId?.users || [];
  const totalPages = siswaByKelasId?.totalPages || 0;
  const total = siswaByKelasId?.total || 0;

  const BackButton = () => (
    <Link
      href="/guru/riwayat"
      className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium text-sm">Kembali ke Halaman Riwayat</span>
    </Link>
  );

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-6">
        <BackButton />
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-800">Daftar Siswa</h1>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="animate-pulse flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="space-y-6">
        <BackButton />
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-800">Daftar Siswa</h1>
          </div>

          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Gagal Memuat Data
            </h3>
            <p className="text-gray-600">
              Terjadi kesalahan saat mengambil data siswa
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (absensiData.length === 0) {
    return (
      <div className="space-y-6">
        <BackButton />
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-800">Daftar Siswa</h1>
          </div>

          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tidak Ada Data Siswa
            </h3>
            <p className="text-gray-600">
              Belum ada siswa yang terdaftar di kelas ini
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success State with Data
  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-800">Daftar Siswa</h1>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
            {total} siswa
          </span>
        </div>

        <div className="space-y-3">
          {absensiData.map((absensi: AbsensiData) => (
            <StudentCard key={absensi.id} absensi={absensi} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-gray-50"
            >
              ← Sebelumnya
            </button>
            
            <span className="text-sm text-gray-600">
              Halaman {page} dari {totalPages}
            </span>
            
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-gray-50"
            >
              Selanjutnya →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentCard({ absensi }: { absensi: AbsensiData }) {
  const [isLoading, setIsLoading] = useState(true);
  const student = absensi.user;

  const finalPhoto = student.photo ?? "default";
  const src =
    finalPhoto === "default"
      ? "/default.jpeg"
      : `https://jokilek.diskon.com/storage/files/${finalPhoto}`;

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-primary/5 rounded-lg border border-gray-200 hover:border-primary/30 transition-all">
      <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-gray-200 group-hover:ring-primary/50 transition-all flex-shrink-0">
        {isLoading && (
          <div className="absolute inset-0 rounded-full bg-gray-300 animate-pulse" />
        )}
        <Image
          src={src}
          alt={student.name}
          width={48}
          height={48}
          className={`rounded-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
          {student.name}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-600">
          {student.nisn && (
            <span className="flex items-center gap-1">
              <UserCircle className="w-3 h-3" />
              NISN: {student.nisn}
            </span>
          )}
          {student.rfid?.rfid && (
            <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">
              RFID: {student.rfid.rfid}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
          <LogIn className="w-3 h-3" />
          <span className="font-medium">{formatTime(absensi.masuk)}</span>
        </div>
        <div className="flex items-center gap-2 text-red-700 bg-red-50 px-3 py-1.5 rounded-lg">
          <LogOut className="w-3 h-3" />
          <span className="font-medium">{formatTime(absensi.keluar)}</span>
        </div>
      </div>
    </div>
  );
}