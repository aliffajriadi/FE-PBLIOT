"use client";

import { CheckCircle, Clock, XCircle } from "lucide-react";

interface JadwalItem {
  waktu: string;
  pelajaran: string;
  status: "Hadir" | "Terlambat" | "Menunggu";
  jamAbsen?: string;
}

const data: JadwalItem[] = [
  { waktu: "08:00 - 09:30", pelajaran: "Matematika", status: "Hadir", jamAbsen: "07:58 WIB" },
  { waktu: "10:00 - 11:30", pelajaran: "Fisika", status: "Terlambat", jamAbsen: "11:00 WIB" },
  { waktu: "12:00 - 14:30", pelajaran: "Biologi", status: "Menunggu", jamAbsen: "07:58 WIB" },
];

export default function RingkasanHariIni() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Hadir":
        return <CheckCircle className="text-green-600 w-5 h-5" />;
      case "Terlambat":
        return <Clock className="text-yellow-600 w-5 h-5" />;
      default:
        return <XCircle className="text-gray-500 w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-[#29437c]">Ringkasan Kehadiran Hari Ini</h2>
      <p className="text-sm text-gray-500 mb-4">Senin, 6 Oktober 2025</p>

      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-all rounded-xl p-3 border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div>
                <p className="font-medium text-gray-700">{item.pelajaran}</p>
                <p className="text-xs text-gray-500">{item.waktu}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-semibold text-[#29437c]">
                {item.status} ({item.jamAbsen})
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
