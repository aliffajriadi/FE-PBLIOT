// TableGuru.tsx
'use client';

import { ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { Teacher } from '@/types/Guru';
import { useRouter } from 'next/navigation';

interface TeachersTableProps {
  data: Teacher[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalData: number;
  limit: number;
}

export default function TeachersTable({ data, page, totalPages, onPageChange, totalData, limit }: TeachersTableProps) {
  const router = useRouter();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + data.length;

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) onPageChange(p);
  };

  if (!data || data.length === 0) {
    return <div className="text-center py-12 text-gray-500">Tidak ada data guru</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">NIP</th>
              <th className="py-3 px-4 text-left font-semibold">Nama</th>
              <th className="py-3 px-4 text-left font-semibold">Kontak</th>
              <th className="py-3 px-4 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((teacher, i) => (
              <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-mono text-sm">{`G00${startIndex + i + 1}`}</td>
                <td className="py-4 px-4 font-mono text-sm">{teacher.nip ?? '-'}</td>
                <td className="py-4 px-4 font-medium">{teacher.name}</td>
                <td className="py-4 px-4">{teacher.nohp ?? '-'}</td>
                <td className="py-4 px-4 flex gap-2">
                  <button onClick={() => router.push(`/admin/data-guru/${teacher.id}/edit`)} title="Edit" className="p-2 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                  </button>
                  <button title="Hapus" className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Pagination --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 px-2">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-medium">{startIndex + 1}</span> sampai <span className="font-medium">{Math.min(endIndex, totalData)}</span> dari <span className="font-medium">{totalData}</span> data
        </p>

        <div className="flex items-center gap-2">
          <button onClick={() => goToPage(page - 1)} disabled={page === 1} className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => goToPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium ${page === p ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {p}
            </button>
          ))}

          <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
