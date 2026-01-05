'use client';

import Link from 'next/link';
import { UserPlus, GraduationCap, BookOpen } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { label: '+ Tambah Siswa', icon: UserPlus, href: '/admin/siswa' },
    { label: '+ Tambah Guru', icon: GraduationCap, href: '/admin/guru' },
    { label: '+ Buat Kelas', icon: BookOpen, href: '/admin/kelas' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {actions.map((action, idx) => (
        <Link
          key={idx}
          href={action.href}
          className="bg-primary from-blue-700 to-blue-800 hover:opacity-90 hover:to-blue-900 text-white rounded-xl p-6 flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          <action.icon className="w-5 h-5" />
          <span className="font-semibold">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}