import { Clock, ChevronDown } from "lucide-react";

// Props yang diterima komponen
interface RealTimeMonitorProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
}

// Data dummy kelas dan jumlah siswa
// TODO: Nanti diganti dengan data dari API
const classData = {
  availableClasses: ["Kelas XII A", "Kelas XII B", "Kelas XII C", "Kelas XII D"],
  presentCount: 30,
  totalStudents: 31,
};

export default function RealTimeMonitor({
  selectedClass,
  setSelectedClass,
}: RealTimeMonitorProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      {/* Judul */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-primary-600" />
        Pemantauan Real-time Kelas
      </h2>

      {/* Pilihan kelas dan status */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm mb-6">
        {/* Dropdown pilih kelas */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Pilih Kelas:</span>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-300 text-gray-800 py-2 pl-3 pr-8 rounded-lg 
                         focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 cursor-pointer"
            >
              {classData.availableClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Status dan sisa waktu */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-green-600 px-3 py-1 bg-green-100 rounded-full">
            STATUS: TERBUKA
          </span>
          <span className="text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Sisa Waktu: 05:00
          </span>
        </div>
      </div>

      {/* Ringkasan jumlah hadir dan tombol tutup sesi */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-6 md:justify-between">
        <div className="text-4xl font-extrabold text-primary-600">
          {classData.presentCount}
          <span className="text-gray-400">/{classData.totalStudents}</span> Hadir
        </div>
        <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md 
                           hover:bg-red-700 transition duration-200">
          Tutup Sesi
        </button>
      </div>
    </div>
  );
}
