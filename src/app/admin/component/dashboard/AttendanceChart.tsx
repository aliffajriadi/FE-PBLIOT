'use client';

import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const attendanceData = [
  { day: 'Sen', hadir: 120, tidak: 30 },
  { day: 'Sel', hadir: 135, tidak: 15 },
  { day: 'Rab', hadir: 128, tidak: 22 },
  { day: 'Kam', hadir: 142, tidak: 8 },
  { day: 'Jum', hadir: 138, tidak: 12 },
  { day: 'Sab', hadir: 145, tidak: 5 },
];

export default function AttendanceChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Statistik Kehadiran Minggu Ini</h2>
        <p className="text-sm text-gray-500">Grafik kehadiran siswa dalam 6 hari terakhir</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff'
            }} 
          />
          <Bar dataKey="tidak" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="hadir" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
