'use client';

import { Users, GraduationCap, Building2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useUserQuery } from '@/lib/hooks/useUser';

interface StatisticCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
}

function StatisticCard({ title, value, icon: Icon, gradient }: StatisticCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-4xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl ${gradient}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const siswaQuery = useUserQuery(`1`, `1`, "siswa");
  const guruQuery = useUserQuery(`1`, `1`, "guru");

  // Ambil total atau pakai placeholder "-"
  const totalSiswa = siswaQuery.data?.total ?? "-";
  const totalGuru = guruQuery.data?.total ?? "-";

  const stats = [
    { title: 'Total Siswa', value: totalSiswa.toString(), icon: Users, gradient: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { title: 'Total Guru', value: totalGuru.toString(), icon: GraduationCap, gradient: 'bg-gradient-to-br from-teal-500 to-teal-600' },
    { title: 'Total Kelas', value: '5', icon: Building2, gradient: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { title: 'Total Siswa', value: '150', icon: Users, gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatisticCard key={idx} {...stat} />
      ))}
    </div>
  );
}
