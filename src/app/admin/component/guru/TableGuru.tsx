'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { teachersData } from '@/lib/mockData';

export default function TeachersTable() {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/admin/data-guru/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    // TODO: Show confirmation dialog
    console.log('Delete teacher:', id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 font-semibold text-gray-700">ID Guru</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Nama Guru</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Mata Pelajaran</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {teachersData.map((teacher) => (
            <tr
              key={teacher.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4">
                <span className="font-mono text-sm text-gray-600">{teacher.id}</span>
              </td>
              <td className="py-4 px-4">
                <span className="font-medium text-gray-800">{teacher.nama}</span>
              </td>
              <td className="py-4 px-4 text-gray-600">{teacher.email}</td>
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1">
                  {teacher.mataPelajaran.map((mapel, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium"
                    >
                      {mapel}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(teacher.id)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {teachersData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada data guru</p>
        </div>
      )}
    </div>
  );
}