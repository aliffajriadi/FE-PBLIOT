export default function JadwalHariIni() {
  const jadwal = [
    { waktu: "08:00", pelajaran: "Matematika" },
    { waktu: "10:00", pelajaran: "Fisika" },
    { waktu: "13:00", pelajaran: "Biologi" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-[#29437c] mb-4">Jadwal Hari Ini</h2>
      <div className="space-y-2">
        {jadwal.map((item, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 text-gray-700 hover:translate-x-1 transition-transform"
          >
            <span className="font-semibold w-14">{item.waktu}</span>
            <span>{item.pelajaran}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
