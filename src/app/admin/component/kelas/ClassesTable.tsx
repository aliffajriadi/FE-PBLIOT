'use client';

import { Edit2, Trash2 } from 'lucide-react';

// Mock Data
const classesData = [
  { id: 1, namaKelas: 'X IPA 1', waliKelas: 'Dr. Sarah Johnson', jumlahSiswa: 32 },
  { id: 2, namaKelas: 'X IPA 2', waliKelas: 'Prof. Michael Chen', jumlahSiswa: 30 },
  { id: 3, namaKelas: 'XI IPS 1', waliKelas: 'Dra. Siti Nurhaliza', jumlahSiswa: 28 },
  { id: 4, namaKelas: 'XI IPS 2', waliKelas: 'Dr. Ahmad Dhani', jumlahSiswa: 29 },
  { id: 5, namaKelas: 'XII IPA 1', waliKelas: 'Prof. Linda Wijaya', jumlahSiswa: 31 },
];

export default function ClassesTable() {
  const handleEdit = (id: number) => {
    console.log('Edit class:', id);
    // TODO: Navigate to edit page or open modal
  };

  const handleDelete = (id: number) => {
    console.log('Delete class:', id);
    // TODO: Show confirmation dialog
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Nama Kelas</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Wali Kelas</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Jumlah Siswa</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {classesData.map((kelas) => (
            <tr
              key={kelas.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-4">
                <span className="font-medium text-gray-800">{kelas.namaKelas}</span>
              </td>
              <td className="py-4 px-4 text-gray-600">{kelas.waliKelas}</td>
              <td className="py-4 px-4 text-gray-600">{kelas.jumlahSiswa}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(kelas.id)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(kelas.id)}
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

      {classesData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada data kelas</p>
        </div>
      )}
    </div>
  );
}