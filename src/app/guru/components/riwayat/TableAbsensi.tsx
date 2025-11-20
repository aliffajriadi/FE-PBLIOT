"use client";

import StatusBadge from "./StatusBadge";
import { Download, CalendarDays } from "lucide-react";

interface AbsensiData {
  tanggal: string;
  nama: string;
  kelas: string;
  jamMasuk: string;
  status: string;
}

interface TableAbsensiProps {
  data: AbsensiData[];
}

export default function TableAbsensi({ data }: TableAbsensiProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <CalendarDays className="w-6 h-6 text-primary-600" />
          <span>Daftar Kehadiran</span>
        </h3>
        <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition duration-150 shadow-sm">
          <Download size={16} />
          <span>Ekspor PDF</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-50/50 text-left border-b border-indigo-200 text-primary-800">
              <th className="p-4 font-semibold w-1/6">TANGGAL</th>
              <th className="p-4 font-semibold w-1/4">NAMA SISWA</th>
              <th className="p-4 font-semibold w-1/6">KELAS</th>
              <th className="p-4 font-semibold w-1/6">JAM MASUK</th>
              <th className="p-4 font-semibold w-1/4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-indigo-50/30 transition duration-150"
                >
                  <td className="p-4 text-gray-600">{item.tanggal}</td>
                  <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                  <td className="p-4 text-gray-600">{item.kelas}</td>
                  <td className="p-4 text-gray-600">
                    {item.jamMasuk !== "-" ? item.jamMasuk : "-"}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-8">
                  Tidak ada data kehadiran yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
