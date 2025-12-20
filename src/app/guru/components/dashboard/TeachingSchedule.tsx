import React from 'react';
import { Activity, Clock } from "lucide-react"; 

export default function RecentActivity() {
  const activities = [
    { id: 1, name: "Siti Aminah", class: "Kelas XII A", initials: "SA", status: "Terlambat", time: "07:45", type: "late" },
    { id: 2, name: "Budi Santoso", class: "Kelas XII A", initials: "BS", status: "Hadir", time: "07:15", type: "present" },
    { id: 3, name: "Dewi Sartika", class: "Kelas XII A", initials: "DS", status: "Hadir", time: "07:10", type: "present" },
    { id: 4, name: "Ahmad Dahlan", class: "Kelas XII A", initials: "AD", status: "Hadir", time: "07:05", type: "present" },
    { id: 5, name: "Rudi Hartono", class: "Kelas XII A", initials: "RH", status: "Hadir", time: "07:00", type: "present" },
    { id: 6, name: "Rina Wati", class: "Kelas XII A", initials: "RW", status: "Hadir", time: "06:55", type: "present" },
    { id: 7, name: "Eko Prasetyo", class: "Kelas XII A", initials: "EP", status: "Hadir", time: "06:50", type: "present" },
    { id: 8, name: "Dina Mariana", class: "Kelas XII A", initials: "DM", status: "Hadir", time: "06:45", type: "present" },
  ];

  const getStatusStyle = (type: string) => {
    switch (type) {
      case "late": return "bg-red-50 text-red-600 border-red-200";
      case "present": return "bg-emerald-50 text-emerald-600 border-emerald-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getDotColor = (type: string) => {
    switch (type) {
      case "late": return "bg-red-500";
      case "present": return "bg-emerald-500";
      default: return "bg-gray-500";
    }
  };

  return (
    // PERBAIKAN DI SINI:
    // Gunakan h-[300px] (Fixed Height) agar sama persis dengan min-h kartu sebelah.
    // Jangan gunakan h-full agar tidak melar tak terkendali.
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col h-[300px] w-full">
      
      {/* Header: flex-none agar tidak gepeng */}
      <div className="flex justify-between items-center mb-4 flex-none">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary-600" />
          Aktivitas Terkini
        </h2>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
          LIVE
        </span>
      </div>

      {/* List Area:
          1. flex-1: Mengisi sisa ruang (dari 300px dikurangi header).
          2. overflow-y-auto: Scrollbar muncul DI SINI jika kontennya banyak.
          3. min-h-0: Mencegah flex item kebablasan keluar container.
      */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
        {activities.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow bg-white group shrink-0"
          >
            {/* KIRI */}
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-sm shrink-0">
                {item.initials}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-800 text-sm truncate group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{item.class}</p>
              </div>
            </div>

            {/* KANAN */}
            <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(item.type)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.type)}`}></span>
                {item.status}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}