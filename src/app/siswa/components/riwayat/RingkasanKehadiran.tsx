"use client";

import { CheckCircle, Clock, XCircle, Ban } from "lucide-react";

interface AbsensiData {
  tanggal: string;
  status: string;
}

interface Props {
  data: AbsensiData[];
}

export default function RingkasanKehadiran({ data }: Props) {
  const total = data.length;
  const hadir = data.filter((d) => d.status === "Hadir").length;
  const terlambat = data.filter((d) => d.status === "Terlambat").length;
  const izin = data.filter((d) => d.status === "Izin").length;

  const cards = [
    { title: "Total Hadir", value: hadir, icon: <CheckCircle className="w-7 h-7 text-green-600" />, color: "bg-green-50" },
    { title: "Terlambat", value: terlambat, icon: <Clock className="w-7 h-7 text-yellow-600" />, color: "bg-yellow-50" },
    { title: "Izin / Sakit", value: izin, icon: <Ban className="w-7 h-7 text-blue-600" />, color: "bg-blue-50" },
    { title: "Total Hari", value: total, icon: <XCircle className="w-7 h-7 text-indigo-600" />, color: "bg-indigo-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-5 rounded-xl shadow-md ${card.color} hover:shadow-lg transition duration-200 flex items-center gap-4`}
        >
          <div className="p-3 rounded-full bg-white shadow-sm">{card.icon}</div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
