'use client';

const recentActivities = [
  { id: 1, text: 'Dr. Sarah Johnson membuka sesi absensi Matematika 10A', time: '08:05' },
  { id: 2, text: 'Siswa baru John Doe telah didaftarkan', time: '07:45' },
  { id: 3, text: 'Laporan kehadiran mingguan telah dibuat', time: '07:30' },
  { id: 4, text: '25 notifikasi WhatsApp terkirim ke orang tua', time: '07:15' },
  { id: 5, text: 'Kelas Fisika 10B ditambahkan', time: '07:12' },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Aktivitas Terkini</h2>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 group">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-gray-700 text-sm leading-relaxed group-hover:text-blue-600 transition-colors">
                {activity.text}
              </p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
