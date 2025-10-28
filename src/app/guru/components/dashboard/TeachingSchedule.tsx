export default function TeachingSchedule() {
  const schedules = [
    { time: "08:00 - 09:30", subject: "Matematika - XII A", students: 32 },
    { time: "09:30 - 11:00", subject: "Matematika - XII B", students: 30 },
    { time: "12:30 - 14:30", subject: "Matematika - XII C", students: 31 },
    { time: "14:45 - 16:15", subject: "Matematika - XII D", students: 28 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Jadwal Mengajar Hari Ini
      </h2>

      <ul>
        {schedules.map(({ time, subject, students }) => (
          <li
            key={subject}
            className="flex justify-between items-center py-1 border-b border-gray-200"
          >
            <span className="text-gray-800">{time}</span>
            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
              {subject}
            </span>
            <span className="text-xs text-gray-400">{students} siswa</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
