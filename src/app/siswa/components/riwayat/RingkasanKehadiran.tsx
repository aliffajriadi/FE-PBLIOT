"use client";

import { CheckCircle, XCircle } from "lucide-react";

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
  const alfa = total - hadir;

  const cards = [
    {
      title: "Total Hadir",
      value: hadir,
      icon: <CheckCircle className="w-6 h-6 text-green-600/70" />,
      bg: "bg-green-50/40 border-green-100"
    },
    {
      title: "Tidak Hadir",
      value: alfa,
      icon: <XCircle className="w-6 h-6 text-red-600/70" />,
      bg: "bg-red-50/40 border-red-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-5 rounded-xl border shadow-sm hover:shadow-md transition duration-150 flex items-center gap-4 ${card.bg}`}
        >
          <div className="p-3 rounded-full bg-white border shadow-sm">
            {card.icon}
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
