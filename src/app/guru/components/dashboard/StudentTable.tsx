// Tipe data siswa
interface Student {
  id: number;
  name: string;
  attendanceStatus: "Hadir" | "Tidak Hadir";
  time: string;
}

// Props untuk komponen
interface StudentTableProps {
  selectedClass: string;
}

// Data dummy siswa per kelas
// TODO: Nanti diganti dengan API
const studentsData: Record<string, Student[]> = {
  "Kelas XII A": [
    { id: 1, name: "Budi", attendanceStatus: "Hadir", time: "07:30" },
    { id: 2, name: "Ani", attendanceStatus: "Tidak Hadir", time: "-" },
  ],
  "Kelas XII B": [
    { id: 3, name: "Dewi", attendanceStatus: "Hadir", time: "07:35" },
    { id: 4, name: "Rizal", attendanceStatus: "Hadir", time: "07:40" },
  ],
};

export default function StudentTable({ selectedClass }: StudentTableProps) {
  const students = studentsData[selectedClass] || [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      {/* Judul tabel */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M17 9V7a5 5 0 00-10 0v2" />
          <path d="M5 11h14v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6z" />
        </svg>
        Daftar Siswa ({selectedClass})
      </h2>

      {/* Tabel siswa */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="text-primary-700 bg-indigo-50">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Nama Siswa</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Status Kehadiran</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Waktu Absen</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Tidak ada data siswa untuk kelas ini.
                </td>
              </tr>
            ) : (
              students.map(({ id, name, attendanceStatus, time }) => (
                <tr key={id} className="text-gray-800 hover:bg-indigo-50 transition-colors duration-150">
                  <td className="border border-gray-300 px-3 py-2">{name}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        attendanceStatus === "Hadir" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {attendanceStatus}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">{time}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <button
                      className="text-primary-600 hover:text-primary-800 font-medium text-xs px-2 py-1 rounded-md hover:bg-indigo-50 transition duration-150"
                      onClick={() => console.log(`Edit status for ${name}`)}
                    >
                      Ubah Status
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
